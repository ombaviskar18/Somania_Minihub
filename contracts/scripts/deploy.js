const hre = require("hardhat");

async function main() {
  const [deployer] = await hre.ethers.getSigners();

  console.log("Deploying contracts with the account:", deployer.address);
  console.log("Account balance:", (await deployer.getBalance()).toString());

  // Deploy SomaniaToken first
  console.log("\n🚀 Deploying SomaniaToken...");
  const SomaniaToken = await hre.ethers.getContractFactory("SomaniaToken");
  
  // For testnet, we'll use placeholder addresses that will be updated later
  const treasuryWallet = deployer.address; // Use deployer as treasury for now
  const rewardPoolAddress = deployer.address; // Will be updated after GameRewards deployment
  const stakingAddress = deployer.address; // Will be updated when staking is implemented
  
  const somaniaToken = await SomaniaToken.deploy(
    rewardPoolAddress,
    stakingAddress,
    treasuryWallet
  );
  await somaniaToken.deployed();
  console.log("✅ SomaniaToken deployed to:", somaniaToken.address);

  // Deploy GameRewards
  console.log("\n🎮 Deploying GameRewards...");
  const GameRewards = await hre.ethers.getContractFactory("GameRewards");
  const gameRewards = await GameRewards.deploy(
    somaniaToken.address,
    deployer.address // Will be updated after SomaniaMiniHub deployment
  );
  await gameRewards.deployed();
  console.log("✅ GameRewards deployed to:", gameRewards.address);

  // Deploy SomaniaMiniHub
  console.log("\n🎯 Deploying SomaniaMiniHub...");
  const SomaniaMiniHub = await hre.ethers.getContractFactory("SomaniaMiniHub");
  const somaniaMiniHub = await SomaniaMiniHub.deploy(somaniaToken.address);
  await somaniaMiniHub.deployed();
  console.log("✅ SomaniaMiniHub deployed to:", somaniaMiniHub.address);

  // Update GameRewards with correct game contract address
  console.log("\n🔄 Updating GameRewards configuration...");
  await gameRewards.transferOwnership(deployer.address);
  console.log("✅ GameRewards ownership configured");

  // Update SomaniaToken with correct addresses
  console.log("\n🔄 Updating SomaniaToken configuration...");
  await somaniaToken.updateRewardPool(gameRewards.address);
  console.log("✅ SomaniaToken reward pool updated");

  // Transfer some tokens to GameRewards for initial rewards
  console.log("\n💰 Setting up initial reward pool...");
  const initialRewardAmount = hre.ethers.utils.parseEther("10000"); // 10,000 tokens
  await somaniaToken.transfer(gameRewards.address, initialRewardAmount);
  console.log("✅ Initial reward pool funded with 10,000 tokens");

  // Display deployment summary
  console.log("\n📋 DEPLOYMENT SUMMARY");
  console.log("=====================");
  console.log("SomaniaToken:", somaniaToken.address);
  console.log("GameRewards:", gameRewards.address);
  console.log("SomaniaMiniHub:", somaniaMiniHub.address);
  console.log("Deployer:", deployer.address);
  console.log("Network:", hre.network.name);
  console.log("Chain ID:", hre.network.config.chainId);

  // Save deployment addresses to file
  const fs = require('fs');
  const deploymentData = {
    network: hre.network.name,
    chainId: hre.network.config.chainId,
    deployer: deployer.address,
    contracts: {
      SomaniaToken: somaniaToken.address,
      GameRewards: gameRewards.address,
      SomaniaMiniHub: somaniaMiniHub.address
    },
    deployedAt: new Date().toISOString()
  };

  fs.writeFileSync(
    `./deployments-${hre.network.name}.json`,
    JSON.stringify(deploymentData, null, 2)
  );

  console.log(`\n💾 Deployment details saved to deployments-${hre.network.name}.json`);

  // Verification instructions
  if (hre.network.name !== "hardhat") {
    console.log("\n🔍 To verify contracts on block explorer, run:");
    console.log(`npx hardhat verify --network ${hre.network.name} ${somaniaToken.address} "${rewardPoolAddress}" "${stakingAddress}" "${treasuryWallet}"`);
    console.log(`npx hardhat verify --network ${hre.network.name} ${gameRewards.address} "${somaniaToken.address}" "${deployer.address}"`);
    console.log(`npx hardhat verify --network ${hre.network.name} ${somaniaMiniHub.address} "${somaniaToken.address}"`);
  }

  console.log("\n🎉 Deployment completed successfully!");
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error("❌ Deployment failed:", error);
    process.exit(1);
  });