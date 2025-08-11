// SPDX-License-Identifier: MIT
pragma solidity ^0.8.19;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";
import "@openzeppelin/contracts/token/ERC20/extensions/ERC20Burnable.sol";
import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/security/Pausable.sol";

/**
 * @title SomaniaToken
 * @dev ERC20 token for Somania MiniHub ecosystem
 * @notice This token is used for rewards, staking, and governance in the platform
 */
contract SomaniaToken is ERC20, ERC20Burnable, Ownable, Pausable {
    
    // Token configuration
    uint256 public constant MAX_SUPPLY = 1000000000 * 10**18; // 1 billion tokens
    uint256 public constant INITIAL_SUPPLY = 100000000 * 10**18; // 100 million tokens
    
    // Reward rates (in basis points)
    uint256 public gameRewardRate = 100; // 1% of transaction for game rewards
    uint256 public stakingRewardRate = 200; // 2% for staking rewards
    
    // Addresses
    address public rewardPool;
    address public stakingContract;
    address public treasuryWallet;
    
    // Events
    event RewardPoolUpdated(address indexed oldPool, address indexed newPool);
    event StakingContractUpdated(address indexed oldContract, address indexed newContract);
    event TreasuryWalletUpdated(address indexed oldWallet, address indexed newWallet);
    event RewardRatesUpdated(uint256 gameRate, uint256 stakingRate);
    event TokensMinted(address indexed to, uint256 amount);
    
    modifier onlyAuthorized() {
        require(
            msg.sender == owner() || 
            msg.sender == rewardPool || 
            msg.sender == stakingContract,
            "Not authorized"
        );
        _;
    }
    
    constructor(
        address _rewardPool,
        address _stakingContract,
        address _treasuryWallet
    ) ERC20("Somania Token", "SMT") {
        require(_rewardPool != address(0), "Invalid reward pool address");
        require(_stakingContract != address(0), "Invalid staking contract address");
        require(_treasuryWallet != address(0), "Invalid treasury wallet address");
        
        rewardPool = _rewardPool;
        stakingContract = _stakingContract;
        treasuryWallet = _treasuryWallet;
        
        // Mint initial supply to treasury
        _mint(_treasuryWallet, INITIAL_SUPPLY);
        
        emit TokensMinted(_treasuryWallet, INITIAL_SUPPLY);
    }
    
    /**
     * @dev Mint tokens for rewards (only authorized addresses)
     */
    function mintReward(address _to, uint256 _amount) external onlyAuthorized {
        require(_to != address(0), "Cannot mint to zero address");
        require(_amount > 0, "Amount must be greater than 0");
        require(totalSupply() + _amount <= MAX_SUPPLY, "Would exceed max supply");
        
        _mint(_to, _amount);
        emit TokensMinted(_to, _amount);
    }
    
    /**
     * @dev Batch mint tokens for multiple recipients
     */
    function batchMint(
        address[] calldata _recipients, 
        uint256[] calldata _amounts
    ) external onlyOwner {
        require(_recipients.length == _amounts.length, "Arrays length mismatch");
        require(_recipients.length > 0, "Empty arrays");
        
        uint256 totalAmount = 0;
        for (uint256 i = 0; i < _amounts.length; i++) {
            totalAmount += _amounts[i];
        }
        
        require(totalSupply() + totalAmount <= MAX_SUPPLY, "Would exceed max supply");
        
        for (uint256 i = 0; i < _recipients.length; i++) {
            require(_recipients[i] != address(0), "Cannot mint to zero address");
            require(_amounts[i] > 0, "Amount must be greater than 0");
            
            _mint(_recipients[i], _amounts[i]);
            emit TokensMinted(_recipients[i], _amounts[i]);
        }
    }
    
    /**
     * @dev Update reward pool address
     */
    function updateRewardPool(address _newRewardPool) external onlyOwner {
        require(_newRewardPool != address(0), "Invalid address");
        address oldPool = rewardPool;
        rewardPool = _newRewardPool;
        emit RewardPoolUpdated(oldPool, _newRewardPool);
    }
    
    /**
     * @dev Update staking contract address
     */
    function updateStakingContract(address _newStakingContract) external onlyOwner {
        require(_newStakingContract != address(0), "Invalid address");
        address oldContract = stakingContract;
        stakingContract = _newStakingContract;
        emit StakingContractUpdated(oldContract, _newStakingContract);
    }
    
    /**
     * @dev Update treasury wallet address
     */
    function updateTreasuryWallet(address _newTreasuryWallet) external onlyOwner {
        require(_newTreasuryWallet != address(0), "Invalid address");
        address oldWallet = treasuryWallet;
        treasuryWallet = _newTreasuryWallet;
        emit TreasuryWalletUpdated(oldWallet, _newTreasuryWallet);
    }
    
    /**
     * @dev Update reward rates
     */
    function updateRewardRates(
        uint256 _gameRewardRate, 
        uint256 _stakingRewardRate
    ) external onlyOwner {
        require(_gameRewardRate <= 1000, "Game reward rate too high"); // Max 10%
        require(_stakingRewardRate <= 1000, "Staking reward rate too high"); // Max 10%
        
        gameRewardRate = _gameRewardRate;
        stakingRewardRate = _stakingRewardRate;
        
        emit RewardRatesUpdated(_gameRewardRate, _stakingRewardRate);
    }
    
    /**
     * @dev Pause token transfers
     */
    function pause() external onlyOwner {
        _pause();
    }
    
    /**
     * @dev Unpause token transfers
     */
    function unpause() external onlyOwner {
        _unpause();
    }
    
    /**
     * @dev Override transfer function to include pause functionality
     */
    function _beforeTokenTransfer(
        address from,
        address to,
        uint256 amount
    ) internal override whenNotPaused {
        super._beforeTokenTransfer(from, to, amount);
    }
    
    /**
     * @dev Calculate game reward for a transaction
     */
    function calculateGameReward(uint256 _amount) public view returns (uint256) {
        return (_amount * gameRewardRate) / 10000;
    }
    
    /**
     * @dev Calculate staking reward for a transaction
     */
    function calculateStakingReward(uint256 _amount) public view returns (uint256) {
        return (_amount * stakingRewardRate) / 10000;
    }
    
    /**
     * @dev Get token information
     */
    function getTokenInfo() external view returns (
        uint256 currentSupply,
        uint256 maxSupply,
        uint256 gameRate,
        uint256 stakingRate,
        address rewardPoolAddress,
        address stakingAddress,
        address treasuryAddress
    ) {
        return (
            totalSupply(),
            MAX_SUPPLY,
            gameRewardRate,
            stakingRewardRate,
            rewardPool,
            stakingContract,
            treasuryWallet
        );
    }
    
    /**
     * @dev Emergency function to recover accidentally sent tokens
     */
    function recoverERC20(address _tokenAddress, uint256 _amount) external onlyOwner {
        require(_tokenAddress != address(this), "Cannot recover native token");
        IERC20(_tokenAddress).transfer(owner(), _amount);
    }
    
    /**
     * @dev Check if address is authorized to mint
     */
    function isAuthorizedMinter(address _address) external view returns (bool) {
        return _address == owner() || _address == rewardPool || _address == stakingContract;
    }
}