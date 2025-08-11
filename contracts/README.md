# 🎮 Somania MiniHub Smart Contracts

Smart contracts for the Somania MiniHub gaming platform built on Somania Network (EVM-compatible Layer 1 blockchain).

## 📋 Overview

This repository contains the smart contracts that power the Somania MiniHub gaming ecosystem, including game management, rewards distribution, and tokenomics.

## 🏗️ Architecture

### Core Contracts

1. **SomaniaMiniHub.sol** - Main gaming platform contract
   - Game registration and management
   - Player registration and scoring
   - Leaderboard functionality
   - Reward pool management

2. **SomaniaToken.sol** - Platform utility token (SMT)
   - ERC20 token with additional gaming features
   - Reward distribution mechanisms
   - Staking and governance functionality

3. **GameRewards.sol** - Advanced reward system
   - Multi-tier reward structure
   - Achievement system
   - Daily rewards
   - Bonus multipliers

## 🌐 Network Details

### Somania Testnet
- **Chain ID**: 50312
- **RPC URL**: https://dream-rpc.somnia.network/
- **Block Explorer**: https://shannon-explorer.somnia.network/
- **Faucet**: https://testnet.somnia.network/

## 🚀 Quick Start

### Prerequisites

```bash
npm install
```

### Compilation

```bash
npm run compile
```

### Testing

```bash
npm run test
```

### Deployment

#### Local Development
```bash
npx hardhat run scripts/deploy.js
```

#### Somania Testnet
```bash
npm run deploy:testnet
```

### Environment Setup

Create a `.env` file in the contracts directory:

```env
PRIVATE_KEY=your_private_key_here
SOMANIA_RPC_URL=https://dream-rpc.somnia.network/
ETHERSCAN_API_KEY=your_api_key_here
```

## 🎯 Contract Features

### SomaniaMiniHub
- ✅ Player registration system
- ✅ Game creation and management
- ✅ Score tracking and leaderboards
- ✅ Reward pool distribution
- ✅ Multi-game support

### SomaniaToken (SMT)
- ✅ ERC20 standard compliance
- ✅ Mintable with supply cap (1B tokens)
- ✅ Burnable functionality
- ✅ Pausable transfers
- ✅ Role-based access control

### GameRewards
- ✅ Tier-based reward system (Bronze to Diamond)
- ✅ Achievement unlocking
- ✅ Daily reward claiming
- ✅ Score-based multipliers
- ✅ Treasury management

## 🏆 Reward Tiers

| Tier | Score Range | Bonus Multiplier |
|------|-------------|------------------|
| Bronze | 0 - 999 | 5% |
| Silver | 1,000 - 4,999 | 10% |
| Gold | 5,000 - 9,999 | 20% |
| Platinum | 10,000 - 24,999 | 30% |
| Diamond | 25,000+ | 50% |

## 🏅 Default Achievements

| Achievement | Requirement | Reward |
|-------------|-------------|---------|
| First Win | Score 1 point | 50 SMT |
| Century | Score 100 points | 100 SMT |
| High Scorer | Score 1,000 points | 500 SMT |
| Master Player | Score 5,000 points | 1,000 SMT |
| Legend | Score 10,000 points | 2,500 SMT |

## 🔧 Contract Interaction

### Player Registration
```solidity
// Register as a new player
somaniaMiniHub.registerPlayer();
```

### Create a Game
```solidity
// Create a new game with reward pool
somaniaMiniHub.createGame("Game Name", "Description", rewardAmount);
```

### Play a Game
```solidity
// Submit game score
somaniaMiniHub.playGame(gameId, score);
```

### Claim Rewards
```solidity
// Claim rewards for a game session
somaniaMiniHub.claimRewards(sessionId);

// Claim daily reward
gameRewards.claimDailyReward();
```

## 📊 Gas Optimization

The contracts are optimized for gas efficiency:
- Batch operations where possible
- Efficient storage patterns
- Minimal external calls
- Optimized loops and calculations

## 🔐 Security Features

- **ReentrancyGuard**: Protection against reentrancy attacks
- **Access Control**: Role-based permissions
- **Input Validation**: Comprehensive parameter checking
- **Emergency Functions**: Owner-only emergency controls
- **Pausable**: Ability to pause critical functions

## 🧪 Testing

Run the comprehensive test suite:

```bash
npx hardhat test
```

Test coverage includes:
- Contract deployment
- Player registration and management
- Game creation and gameplay
- Reward calculations and distribution
- Achievement unlocking
- Access control and security

## 📈 Tokenomics

### SMT Token Distribution
- **Total Supply**: 1,000,000,000 SMT
- **Initial Supply**: 100,000,000 SMT
- **Treasury**: 60% (600M SMT)
- **Rewards Pool**: 25% (250M SMT)
- **Team & Development**: 10% (100M SMT)
- **Community & Marketing**: 5% (50M SMT)

## 🔗 Integration

### Frontend Integration
```javascript
// Connect to Somania Network
const provider = new ethers.providers.JsonRpcProvider('https://dream-rpc.somnia.network/');

// Contract instances
const miniHub = new ethers.Contract(MINIHUB_ADDRESS, MINIHUB_ABI, signer);
const rewards = new ethers.Contract(REWARDS_ADDRESS, REWARDS_ABI, signer);
```

### Game Integration
```javascript
// Submit score after game completion
await miniHub.playGame(gameId, finalScore);

// Check for available rewards
const rewardAmount = await miniHub.calculateReward(gameId, score);
```

## 🛠️ Development

### Adding New Games
1. Register game through `createGame()`
2. Set up reward pool
3. Implement score submission logic
4. Configure reward tiers if needed

### Custom Achievements
```solidity
// Add new achievement
gameRewards.addAchievement(
    "Achievement Name",
    "Description",
    requiredScore,
    rewardAmount
);
```

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests for new functionality
5. Submit a pull request

## 📄 License

MIT License - see LICENSE file for details

## 🆘 Support

- [Discord](https://discord.com/invite/somnia)
- [Documentation](https://docs.somnia.network/)
- [GitHub Issues](https://github.com/somania-minihub/contracts/issues)

---

Built with ❤️ for the Somania ecosystem