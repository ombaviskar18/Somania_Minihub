// SPDX-License-Identifier: MIT
pragma solidity ^0.8.19;

import "@openzeppelin/contracts/token/ERC20/IERC20.sol";
import "@openzeppelin/contracts/security/ReentrancyGuard.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

/**
 * @title SomniaMiniHub
 * @dev Main contract for Somnia MiniHub gaming platform
 * @notice Handles game registration, scoring, and rewards on Somnia Network
 */
contract SomniaMiniHub is ReentrancyGuard, Ownable {
    
    // Game structure
    struct Game {
        uint256 id;
        string name;
        string description;
        address creator;
        uint256 rewardPool;
        bool active;
        uint256 createdAt;
    }
    
    // Player structure
    struct Player {
        address playerAddress;
        uint256 totalScore;
        uint256 gamesPlayed;
        uint256 totalRewards;
        bool registered;
    }
    
    // Game session structure
    struct GameSession {
        uint256 gameId;
        address player;
        uint256 score;
        uint256 timestamp;
        bool rewardClaimed;
    }
    
    // Events
    event GameCreated(uint256 indexed gameId, string name, address indexed creator);
    event GamePlayed(uint256 indexed gameId, address indexed player, uint256 score);
    event PlayerRegistered(address indexed player);
    event RewardClaimed(address indexed player, uint256 amount);
    event RewardPoolUpdated(uint256 indexed gameId, uint256 newPool);
    
    // State variables
    mapping(uint256 => Game) public games;
    mapping(address => Player) public players;
    mapping(uint256 => GameSession) public gameSessions;
    mapping(uint256 => address[]) public gameLeaderboards;
    mapping(address => uint256[]) public playerGameSessions;
    
    uint256 public gameCounter;
    uint256 public sessionCounter;
    uint256 public constant PLATFORM_FEE = 500; // 5% platform fee
    uint256 public constant BASIS_POINTS = 10000;
    
    IERC20 public sttToken; // Somnia Test Token
    
    modifier onlyRegisteredPlayer() {
        require(players[msg.sender].registered, "Player not registered");
        _;
    }
    
    modifier gameExists(uint256 _gameId) {
        require(_gameId > 0 && _gameId <= gameCounter, "Game does not exist");
        _;
    }
    
    constructor(address _sttToken) {
        sttToken = IERC20(_sttToken);
        gameCounter = 0;
        sessionCounter = 0;
    }
    
    /**
     * @dev Register a new player
     */
    function registerPlayer() external {
        require(!players[msg.sender].registered, "Player already registered");
        
        players[msg.sender] = Player({
            playerAddress: msg.sender,
            totalScore: 0,
            gamesPlayed: 0,
            totalRewards: 0,
            registered: true
        });
        
        emit PlayerRegistered(msg.sender);
    }
    
    /**
     * @dev Create a new game
     */
    function createGame(
        string memory _name,
        string memory _description,
        uint256 _initialRewardPool
    ) external {
        require(bytes(_name).length > 0, "Game name cannot be empty");
        require(_initialRewardPool > 0, "Initial reward pool must be greater than 0");
        
        if (_initialRewardPool > 0) {
            require(
                sttToken.transferFrom(msg.sender, address(this), _initialRewardPool),
                "Failed to transfer reward pool"
            );
        }
        
        gameCounter++;
        
        games[gameCounter] = Game({
            id: gameCounter,
            name: _name,
            description: _description,
            creator: msg.sender,
            rewardPool: _initialRewardPool,
            active: true,
            createdAt: block.timestamp
        });
        
        emit GameCreated(gameCounter, _name, msg.sender);
    }
    
    /**
     * @dev Record a game session
     */
    function playGame(uint256 _gameId, uint256 _score) 
        external 
        onlyRegisteredPlayer 
        gameExists(_gameId) 
    {
        require(games[_gameId].active, "Game is not active");
        
        sessionCounter++;
        
        gameSessions[sessionCounter] = GameSession({
            gameId: _gameId,
            player: msg.sender,
            score: _score,
            timestamp: block.timestamp,
            rewardClaimed: false
        });
        
        // Update player stats
        players[msg.sender].totalScore += _score;
        players[msg.sender].gamesPlayed++;
        
        // Add to player's game sessions
        playerGameSessions[msg.sender].push(sessionCounter);
        
        // Update leaderboard
        gameLeaderboards[_gameId].push(msg.sender);
        
        emit GamePlayed(_gameId, msg.sender, _score);
    }
    
    /**
     * @dev Add rewards to a game pool
     */
    function addRewardPool(uint256 _gameId, uint256 _amount) 
        external 
        gameExists(_gameId) 
    {
        require(_amount > 0, "Amount must be greater than 0");
        require(
            sttToken.transferFrom(msg.sender, address(this), _amount),
            "Failed to transfer tokens"
        );
        
        games[_gameId].rewardPool += _amount;
        
        emit RewardPoolUpdated(_gameId, games[_gameId].rewardPool);
    }
    
    /**
     * @dev Claim rewards for high scores
     */
    function claimRewards(uint256 _sessionId) external nonReentrant {
        GameSession storage session = gameSessions[_sessionId];
        require(session.player == msg.sender, "Not your game session");
        require(!session.rewardClaimed, "Rewards already claimed");
        require(games[session.gameId].rewardPool > 0, "No rewards available");
        
        // Calculate reward based on score and game pool
        uint256 rewardAmount = calculateReward(session.gameId, session.score);
        
        if (rewardAmount > 0) {
            session.rewardClaimed = true;
            players[msg.sender].totalRewards += rewardAmount;
            games[session.gameId].rewardPool -= rewardAmount;
            
            require(sttToken.transfer(msg.sender, rewardAmount), "Failed to transfer reward");
            
            emit RewardClaimed(msg.sender, rewardAmount);
        }
    }
    
    /**
     * @dev Calculate reward amount based on score
     */
    function calculateReward(uint256 _gameId, uint256 _score) 
        public 
        view 
        returns (uint256) 
    {
        if (_score == 0 || games[_gameId].rewardPool == 0) return 0;
        
        // Simple reward calculation: higher score = higher reward
        // This can be made more sophisticated based on game requirements
        uint256 baseReward = games[_gameId].rewardPool / 100; // 1% of pool
        uint256 scoreMultiplier = _score > 1000 ? _score / 100 : 10;
        
        return (baseReward * scoreMultiplier) / 100;
    }
    
    /**
     * @dev Get top players for a game
     */
    function getTopPlayers(uint256 _gameId, uint256 _limit) 
        external 
        view 
        gameExists(_gameId)
        returns (address[] memory topPlayers, uint256[] memory scores) 
    {
        address[] memory gamePlayers = gameLeaderboards[_gameId];
        uint256 playerCount = gamePlayers.length;
        uint256 limit = _limit > playerCount ? playerCount : _limit;
        
        topPlayers = new address[](limit);
        scores = new uint256[](limit);
        
        // Simple implementation - can be optimized with sorting
        for (uint256 i = 0; i < limit; i++) {
            topPlayers[i] = gamePlayers[i];
            scores[i] = players[gamePlayers[i]].totalScore;
        }
        
        return (topPlayers, scores);
    }
    
    /**
     * @dev Get player stats
     */
    function getPlayerStats(address _player) 
        external 
        view 
        returns (
            uint256 totalScore,
            uint256 gamesPlayed,
            uint256 totalRewards,
            bool registered
        ) 
    {
        Player memory player = players[_player];
        return (
            player.totalScore,
            player.gamesPlayed,
            player.totalRewards,
            player.registered
        );
    }
    
    /**
     * @dev Get game details
     */
    function getGameDetails(uint256 _gameId) 
        external 
        view 
        gameExists(_gameId)
        returns (
            string memory name,
            string memory description,
            address creator,
            uint256 rewardPool,
            bool active,
            uint256 createdAt
        ) 
    {
        Game memory game = games[_gameId];
        return (
            game.name,
            game.description,
            game.creator,
            game.rewardPool,
            game.active,
            game.createdAt
        );
    }
    
    /**
     * @dev Toggle game active status (only creator or owner)
     */
    function toggleGameStatus(uint256 _gameId) 
        external 
        gameExists(_gameId) 
    {
        require(
            msg.sender == games[_gameId].creator || msg.sender == owner(),
            "Not authorized"
        );
        
        games[_gameId].active = !games[_gameId].active;
    }
    
    /**
     * @dev Emergency withdrawal (only owner)
     */
    function emergencyWithdraw(uint256 _amount) external onlyOwner {
        require(_amount <= sttToken.balanceOf(address(this)), "Insufficient balance");
        require(sttToken.transfer(owner(), _amount), "Transfer failed");
    }
    
    /**
     * @dev Get total games count
     */
    function getTotalGames() external view returns (uint256) {
        return gameCounter;
    }
    
    /**
     * @dev Get total sessions count
     */
    function getTotalSessions() external view returns (uint256) {
        return sessionCounter;
    }
}