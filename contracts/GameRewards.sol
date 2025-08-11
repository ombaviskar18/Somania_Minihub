// SPDX-License-Identifier: MIT
pragma solidity ^0.8.19;

import "@openzeppelin/contracts/token/ERC20/IERC20.sol";
import "@openzeppelin/contracts/security/ReentrancyGuard.sol";
import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/utils/math/SafeMath.sol";

/**
 * @title GameRewards
 * @dev Manages reward distribution for Somania MiniHub games
 * @notice Handles different reward tiers and distribution mechanisms
 */
contract GameRewards is ReentrancyGuard, Ownable {
    using SafeMath for uint256;
    
    // Reward tier structure
    struct RewardTier {
        string name;
        uint256 minScore;
        uint256 maxScore;
        uint256 rewardMultiplier; // in basis points (10000 = 100%)
        bool active;
    }
    
    // Daily reward tracking
    struct DailyReward {
        uint256 totalClaimed;
        uint256 lastClaimTime;
        bool claimed;
    }
    
    // Achievement structure
    struct Achievement {
        uint256 id;
        string name;
        string description;
        uint256 requiredScore;
        uint256 rewardAmount;
        bool active;
    }
    
    // Events
    event RewardClaimed(address indexed player, uint256 amount, string tier);
    event DailyRewardClaimed(address indexed player, uint256 amount);
    event AchievementUnlocked(address indexed player, uint256 achievementId, uint256 reward);
    event RewardTierUpdated(uint256 tierId, string name, uint256 minScore, uint256 maxScore);
    event TreasuryUpdated(uint256 amount);
    
    // State variables
    IERC20 public rewardToken;
    address public gameContract;
    
    mapping(uint256 => RewardTier) public rewardTiers;
    mapping(address => DailyReward) public dailyRewards;
    mapping(uint256 => Achievement) public achievements;
    mapping(address => mapping(uint256 => bool)) public playerAchievements;
    mapping(address => uint256) public totalRewardsClaimed;
    
    uint256 public tierCounter;
    uint256 public achievementCounter;
    uint256 public dailyRewardAmount = 100 * 10**18; // 100 tokens
    uint256 public treasuryBalance;
    uint256 public constant BASIS_POINTS = 10000;
    uint256 public constant DAILY_REWARD_COOLDOWN = 24 hours;
    
    modifier onlyGameContract() {
        require(msg.sender == gameContract, "Only game contract can call");
        _;
    }
    
    constructor(
        address _rewardToken,
        address _gameContract
    ) {
        require(_rewardToken != address(0), "Invalid token address");
        require(_gameContract != address(0), "Invalid game contract address");
        
        rewardToken = IERC20(_rewardToken);
        gameContract = _gameContract;
        
        // Initialize default reward tiers
        _createDefaultTiers();
        _createDefaultAchievements();
    }
    
    /**
     * @dev Create default reward tiers
     */
    function _createDefaultTiers() internal {
        // Bronze Tier
        _addRewardTier("Bronze", 0, 999, 500); // 5% bonus
        
        // Silver Tier  
        _addRewardTier("Silver", 1000, 4999, 1000); // 10% bonus
        
        // Gold Tier
        _addRewardTier("Gold", 5000, 9999, 2000); // 20% bonus
        
        // Platinum Tier
        _addRewardTier("Platinum", 10000, 24999, 3000); // 30% bonus
        
        // Diamond Tier
        _addRewardTier("Diamond", 25000, type(uint256).max, 5000); // 50% bonus
    }
    
    /**
     * @dev Create default achievements
     */
    function _createDefaultAchievements() internal {
        _addAchievement("First Win", "Win your first game", 1, 50 * 10**18);
        _addAchievement("Century", "Score 100 points in a single game", 100, 100 * 10**18);
        _addAchievement("High Scorer", "Score 1000 points in a single game", 1000, 500 * 10**18);
        _addAchievement("Master Player", "Score 5000 points in a single game", 5000, 1000 * 10**18);
        _addAchievement("Legend", "Score 10000 points in a single game", 10000, 2500 * 10**18);
    }
    
    /**
     * @dev Add a new reward tier
     */
    function _addRewardTier(
        string memory _name,
        uint256 _minScore,
        uint256 _maxScore,
        uint256 _rewardMultiplier
    ) internal {
        tierCounter++;
        rewardTiers[tierCounter] = RewardTier({
            name: _name,
            minScore: _minScore,
            maxScore: _maxScore,
            rewardMultiplier: _rewardMultiplier,
            active: true
        });
    }
    
    /**
     * @dev Add a new achievement
     */
    function _addAchievement(
        string memory _name,
        string memory _description,
        uint256 _requiredScore,
        uint256 _rewardAmount
    ) internal {
        achievementCounter++;
        achievements[achievementCounter] = Achievement({
            id: achievementCounter,
            name: _name,
            description: _description,
            requiredScore: _requiredScore,
            rewardAmount: _rewardAmount,
            active: true
        });
    }
    
    /**
     * @dev Calculate reward based on score and tier
     */
    function calculateReward(uint256 _score, uint256 _baseReward) 
        public 
        view 
        returns (uint256 finalReward, string memory tierName) 
    {
        uint256 tierId = getTierByScore(_score);
        if (tierId == 0) {
            return (_baseReward, "None");
        }
        
        RewardTier memory tier = rewardTiers[tierId];
        uint256 bonus = _baseReward.mul(tier.rewardMultiplier).div(BASIS_POINTS);
        finalReward = _baseReward.add(bonus);
        tierName = tier.name;
    }
    
    /**
     * @dev Get tier ID by score
     */
    function getTierByScore(uint256 _score) public view returns (uint256) {
        for (uint256 i = 1; i <= tierCounter; i++) {
            RewardTier memory tier = rewardTiers[i];
            if (tier.active && _score >= tier.minScore && _score <= tier.maxScore) {
                return i;
            }
        }
        return 0;
    }
    
    /**
     * @dev Distribute reward to player (called by game contract)
     */
    function distributeReward(
        address _player, 
        uint256 _score, 
        uint256 _baseReward
    ) external onlyGameContract nonReentrant {
        require(_player != address(0), "Invalid player address");
        require(_baseReward > 0, "Base reward must be greater than 0");
        
        (uint256 finalReward, string memory tierName) = calculateReward(_score, _baseReward);
        
        require(rewardToken.balanceOf(address(this)) >= finalReward, "Insufficient reward balance");
        
        // Transfer reward to player
        require(rewardToken.transfer(_player, finalReward), "Reward transfer failed");
        
        // Update total rewards claimed
        totalRewardsClaimed[_player] = totalRewardsClaimed[_player].add(finalReward);
        
        // Check for achievements
        _checkAchievements(_player, _score);
        
        emit RewardClaimed(_player, finalReward, tierName);
    }
    
    /**
     * @dev Claim daily reward
     */
    function claimDailyReward() external nonReentrant {
        DailyReward storage reward = dailyRewards[msg.sender];
        
        require(
            block.timestamp >= reward.lastClaimTime.add(DAILY_REWARD_COOLDOWN),
            "Daily reward not available yet"
        );
        
        require(
            rewardToken.balanceOf(address(this)) >= dailyRewardAmount,
            "Insufficient reward balance"
        );
        
        reward.totalClaimed = reward.totalClaimed.add(dailyRewardAmount);
        reward.lastClaimTime = block.timestamp;
        reward.claimed = true;
        
        require(rewardToken.transfer(msg.sender, dailyRewardAmount), "Daily reward transfer failed");
        
        totalRewardsClaimed[msg.sender] = totalRewardsClaimed[msg.sender].add(dailyRewardAmount);
        
        emit DailyRewardClaimed(msg.sender, dailyRewardAmount);
    }
    
    /**
     * @dev Check and unlock achievements
     */
    function _checkAchievements(address _player, uint256 _score) internal {
        for (uint256 i = 1; i <= achievementCounter; i++) {
            Achievement memory achievement = achievements[i];
            
            if (
                achievement.active &&
                !playerAchievements[_player][i] &&
                _score >= achievement.requiredScore
            ) {
                playerAchievements[_player][i] = true;
                
                // Award achievement reward
                if (rewardToken.balanceOf(address(this)) >= achievement.rewardAmount) {
                    require(
                        rewardToken.transfer(_player, achievement.rewardAmount),
                        "Achievement reward transfer failed"
                    );
                    
                    totalRewardsClaimed[_player] = totalRewardsClaimed[_player].add(achievement.rewardAmount);
                    
                    emit AchievementUnlocked(_player, i, achievement.rewardAmount);
                }
            }
        }
    }
    
    /**
     * @dev Add new reward tier (only owner)
     */
    function addRewardTier(
        string memory _name,
        uint256 _minScore,
        uint256 _maxScore,
        uint256 _rewardMultiplier
    ) external onlyOwner {
        require(bytes(_name).length > 0, "Name cannot be empty");
        require(_maxScore > _minScore, "Invalid score range");
        require(_rewardMultiplier <= 10000, "Multiplier too high");
        
        _addRewardTier(_name, _minScore, _maxScore, _rewardMultiplier);
        
        emit RewardTierUpdated(tierCounter, _name, _minScore, _maxScore);
    }
    
    /**
     * @dev Add new achievement (only owner)
     */
    function addAchievement(
        string memory _name,
        string memory _description,
        uint256 _requiredScore,
        uint256 _rewardAmount
    ) external onlyOwner {
        require(bytes(_name).length > 0, "Name cannot be empty");
        require(_rewardAmount > 0, "Reward amount must be greater than 0");
        
        _addAchievement(_name, _description, _requiredScore, _rewardAmount);
    }
    
    /**
     * @dev Update daily reward amount (only owner)
     */
    function updateDailyRewardAmount(uint256 _newAmount) external onlyOwner {
        require(_newAmount > 0, "Amount must be greater than 0");
        dailyRewardAmount = _newAmount;
    }
    
    /**
     * @dev Deposit tokens to treasury (only owner)
     */
    function depositToTreasury(uint256 _amount) external onlyOwner {
        require(_amount > 0, "Amount must be greater than 0");
        require(
            rewardToken.transferFrom(msg.sender, address(this), _amount),
            "Treasury deposit failed"
        );
        
        treasuryBalance = treasuryBalance.add(_amount);
        emit TreasuryUpdated(treasuryBalance);
    }
    
    /**
     * @dev Get player achievements
     */
    function getPlayerAchievements(address _player) 
        external 
        view 
        returns (uint256[] memory unlockedAchievements) 
    {
        uint256 count = 0;
        
        // Count unlocked achievements
        for (uint256 i = 1; i <= achievementCounter; i++) {
            if (playerAchievements[_player][i]) {
                count++;
            }
        }
        
        // Create array of unlocked achievements
        unlockedAchievements = new uint256[](count);
        uint256 index = 0;
        
        for (uint256 i = 1; i <= achievementCounter; i++) {
            if (playerAchievements[_player][i]) {
                unlockedAchievements[index] = i;
                index++;
            }
        }
    }
    
    /**
     * @dev Check if daily reward is available
     */
    function isDailyRewardAvailable(address _player) external view returns (bool) {
        DailyReward memory reward = dailyRewards[_player];
        return block.timestamp >= reward.lastClaimTime.add(DAILY_REWARD_COOLDOWN);
    }
    
    /**
     * @dev Get contract balance
     */
    function getContractBalance() external view returns (uint256) {
        return rewardToken.balanceOf(address(this));
    }
    
    /**
     * @dev Emergency withdrawal (only owner)
     */
    function emergencyWithdraw(uint256 _amount) external onlyOwner {
        require(_amount <= rewardToken.balanceOf(address(this)), "Insufficient balance");
        require(rewardToken.transfer(owner(), _amount), "Emergency withdrawal failed");
    }
}