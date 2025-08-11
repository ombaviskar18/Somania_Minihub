'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';
import Image from 'next/image';

const SomniaAgent = () => {
  const features = [
    {
      title: "Autonomous Game Management",
      description: "AI agent automatically manages game sessions, monitors player behavior, and optimizes gameplay experiences in real-time.",
      icon: "🤖"
    },
    {
      title: "Revenue Generation",
      description: "Generate passive income through automated trading, yield farming, and smart contract interactions on Somnia Network.",
      icon: "💰"
    },
    {
      title: "Smart Contract Optimization",
      description: "Automatically optimize gas fees, execute transactions at optimal times, and manage smart contract interactions.",
      icon: "⚡"
    },
    {
      title: "Predictive Analytics",
      description: "Advanced AI algorithms predict market trends, player preferences, and optimal reward distribution strategies.",
      icon: "📊"
    },
    {
      title: "Cross-Chain Integration",
      description: "Seamlessly interact with multiple blockchain networks while maintaining security and efficiency.",
      icon: "🌐"
    },
    {
      title: "24/7 Monitoring",
      description: "Continuous monitoring of platform health, security threats, and performance optimization opportunities.",
      icon: "🛡️"
    }
  ];

  const revenueStreams = [
    {
      name: "Gaming Rewards",
      percentage: "35%",
      amount: "$2,450",
      color: "from-purple-500 to-pink-500"
    },
    {
      name: "DeFi Yield",
      percentage: "25%",
      amount: "$1,750",
      color: "from-blue-500 to-cyan-500"
    },
    {
      name: "NFT Trading",
      percentage: "20%",
      amount: "$1,400",
      color: "from-green-500 to-emerald-500"
    },
    {
      name: "Staking Rewards",
      percentage: "15%",
      amount: "$1,050",
      color: "from-orange-500 to-red-500"
    },
    {
      name: "Agent Services",
      percentage: "5%",
      amount: "$350",
      color: "from-indigo-500 to-purple-500"
    }
  ];

  return (
    <div className="bg-black text-white font-mono min-h-screen">
      {/* Background Effects */}
      <div className="fixed inset-0 pointer-events-none z-10">
        <div className="absolute inset-0 bg-black opacity-20"></div>
        <div className="absolute inset-0 bg-[linear-gradient(transparent_0%,rgba(147,51,234,0.05)_1px,transparent_1px)] bg-[size:1px_1px]"></div>
      </div>

      <div className="relative min-h-screen px-4 py-12 z-20">
        {/* Hero Section */}
        <motion.div 
          initial={{ opacity: 0, y: -50 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-16"
        >
          <motion.div 
            initial={{ scale: 0.9 }}
            animate={{ scale: 1 }}
            transition={{ duration: 0.5 }}
            className="flex justify-center mb-8"
          >
            <Image 
              src="/agent.png" 
              alt="Somnia Agent" 
              width={200}
              height={200}
              className="rounded-lg shadow-lg shadow-purple-500/50 hover:shadow-purple-500/80 transition-all duration-300"
            />
          </motion.div>
          
          <h1 className="text-6xl md:text-7xl font-bold mb-6 tracking-wider uppercase bg-gradient-to-r from-purple-400 via-pink-400 to-cyan-400 bg-clip-text text-transparent">
            Somnia Agent
          </h1>
          <p className="text-xl md:text-2xl text-gray-300 mb-8 max-w-4xl mx-auto">
            The future of autonomous gaming and revenue generation on Somnia Network. 
            Our AI agent handles everything while you earn passive income.
          </p>
          
          <div className="flex flex-col md:flex-row gap-4 justify-center items-center">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="bg-gradient-to-r from-purple-600 to-pink-600 text-white px-8 py-4 rounded-lg font-bold text-lg hover:from-purple-700 hover:to-pink-700 transition-all duration-300 shadow-lg hover:shadow-purple-500/25"
            >
              Launch Agent (Coming Soon)
            </motion.button>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="border-2 border-purple-500 text-purple-400 px-8 py-4 rounded-lg font-bold text-lg hover:bg-purple-500 hover:text-white transition-all duration-300"
            >
              View Documentation
            </motion.button>
          </div>
        </motion.div>

        {/* Features Grid */}
        <motion.div 
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="mb-20"
        >
          <h2 className="text-4xl font-bold text-center mb-12 bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
            Agent Capabilities
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-7xl mx-auto">
            {features.map((feature, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 * index }}
                whileHover={{ scale: 1.05, rotateY: 5 }}
                className="bg-gradient-to-br from-gray-900 to-gray-800 rounded-xl p-6 border border-purple-500/20 hover:border-purple-500/50 transition-all duration-300 shadow-lg hover:shadow-purple-500/25"
              >
                <div className="text-4xl mb-4">{feature.icon}</div>
                <h3 className="text-xl font-bold text-purple-400 mb-3">{feature.title}</h3>
                <p className="text-gray-300 leading-relaxed">{feature.description}</p>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Revenue Dashboard */}
        <motion.div 
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
          className="mb-20"
        >
          <h2 className="text-4xl font-bold text-center mb-12 bg-gradient-to-r from-green-400 to-blue-400 bg-clip-text text-transparent">
            Revenue Generation Dashboard
          </h2>
          
          <div className="max-w-6xl mx-auto">
            {/* Total Revenue */}
            <motion.div 
              whileHover={{ scale: 1.02 }}
              className="bg-gradient-to-r from-purple-900/50 to-pink-900/50 rounded-xl p-8 mb-8 border border-purple-500/30"
            >
              <div className="text-center">
                <h3 className="text-2xl font-bold text-gray-300 mb-2">Total Monthly Revenue</h3>
                <p className="text-5xl font-bold bg-gradient-to-r from-green-400 to-emerald-400 bg-clip-text text-transparent">
                  $7,000
                </p>
                <p className="text-green-400 text-lg mt-2">↗ +23.5% from last month</p>
              </div>
            </motion.div>

            {/* Revenue Streams */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {revenueStreams.map((stream, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 0.1 * index }}
                  whileHover={{ scale: 1.05 }}
                  className="bg-gradient-to-br from-gray-900 to-gray-800 rounded-xl p-6 border border-gray-700 hover:border-purple-500/50 transition-all duration-300"
                >
                  <div className={`w-full h-2 bg-gradient-to-r ${stream.color} rounded-full mb-4`}></div>
                  <h4 className="text-lg font-bold text-white mb-2">{stream.name}</h4>
                  <div className="flex justify-between items-center">
                    <span className="text-2xl font-bold text-green-400">{stream.amount}</span>
                    <span className="text-purple-400 font-bold">{stream.percentage}</span>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </motion.div>

        {/* How It Works */}
        <motion.div 
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.9 }}
          className="mb-20"
        >
          <h2 className="text-4xl font-bold text-center mb-12 bg-gradient-to-r from-cyan-400 to-blue-400 bg-clip-text text-transparent">
            How Somnia Agent Works
          </h2>
          
          <div className="max-w-4xl mx-auto">
            <div className="space-y-8">
              {[
                {
                  step: "01",
                  title: "Deploy Your Agent",
                  description: "Connect your wallet and deploy your personal Somnia Agent with customizable parameters and risk settings."
                },
                {
                  step: "02", 
                  title: "AI Learns & Adapts",
                  description: "The agent analyzes market conditions, gaming patterns, and optimal strategies using advanced machine learning algorithms."
                },
                {
                  step: "03",
                  title: "Autonomous Operations",
                  description: "Agent executes trades, manages games, optimizes rewards, and handles all blockchain interactions automatically."
                },
                {
                  step: "04",
                  title: "Earn Passive Income",
                  description: "Monitor your growing revenue through our dashboard while the agent works 24/7 to maximize your earnings."
                }
              ].map((item, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, x: -50 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.2 * index }}
                  className="flex items-center space-x-6 bg-gradient-to-r from-gray-900/50 to-gray-800/50 rounded-xl p-6 border border-gray-700"
                >
                  <div className="flex-shrink-0 w-16 h-16 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full flex items-center justify-center text-2xl font-bold">
                    {item.step}
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-purple-400 mb-2">{item.title}</h3>
                    <p className="text-gray-300">{item.description}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </motion.div>

        {/* Coming Soon Banner */}
        <motion.div 
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 1.2 }}
          className="text-center bg-gradient-to-r from-purple-900/30 to-pink-900/30 rounded-xl p-12 border border-purple-500/30"
        >
          <h2 className="text-3xl font-bold mb-4 bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
            🚀 Launching Soon on Somnia Network
          </h2>
          <p className="text-xl text-gray-300 mb-6">
            Be among the first to experience autonomous gaming and revenue generation
          </p>
          <div className="flex flex-col md:flex-row gap-4 justify-center">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="bg-gradient-to-r from-purple-600 to-pink-600 text-white px-8 py-3 rounded-lg font-bold hover:from-purple-700 hover:to-pink-700 transition-all duration-300"
            >
              Join Waitlist
            </motion.button>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="border-2 border-purple-500 text-purple-400 px-8 py-3 rounded-lg font-bold hover:bg-purple-500 hover:text-white transition-all duration-300"
            >
              Learn More
            </motion.button>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default SomniaAgent;