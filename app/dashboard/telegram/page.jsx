'use client';
import Image from 'next/image';
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';

const Telegram = () => {
  const [botSetupStatus, setBotSetupStatus] = useState(null);

  const setupBot = async () => {
    try {
      setBotSetupStatus('Setting up bot...');
      const response = await fetch('/api/telegram/setup', {
        method: 'POST'
      });
      const result = await response.json();
      
      if (result.success) {
        setBotSetupStatus('Bot setup completed successfully! 🎉');
      } else {
        setBotSetupStatus('Setup failed. Please try again.');
      }
    } catch (error) {
      setBotSetupStatus('Setup failed. Please try again.');
      console.error('Bot setup error:', error);
    }
  };

  const features = [
    {
      icon: '🎮',
      title: 'Instant Gaming',
      description: 'Play all Somnia MiniHub games directly in Telegram'
    },
    {
      icon: '💰',
      title: 'Earn Rewards',
      description: 'Get SMT tokens and climb leaderboards'
    },
    {
      icon: '🤖',
      title: 'AI Integration',
      description: 'Access AI agent features and automation'
    },
    {
      icon: '⚡',
      title: 'Real-time Updates',
      description: 'Get instant notifications and game alerts'
    }
  ];

  const commands = [
    { command: '/start', description: 'Launch Somnia MiniHub' },
    { command: '/games', description: 'View available games' },
    { command: '/stats', description: 'Platform statistics' },
    { command: '/leaderboard', description: 'Top players' },
    { command: '/agent', description: 'AI Agent info' },
    { command: '/pricing', description: 'Subscription plans' },
    { command: '/help', description: 'Get help and support' }
  ];

  return (
    <div className="bg-black text-white font-mono min-h-screen">
      {/* Background Effects */}
      <div className="fixed inset-0 pointer-events-none z-10">
        <div className="absolute inset-0 bg-black opacity-20"></div>
        <div className="absolute inset-0 bg-[linear-gradient(transparent_0%,rgba(0,191,255,0.05)_1px,transparent_1px)] bg-[size:1px_1px]"></div>
      </div>

      <div className="relative min-h-screen px-4 py-12 z-20">
        {/* Header Section */}
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
              src="/teleg.jpeg" 
              alt="Telegram Bot" 
              width={150}
              height={150}
              className="rounded-lg shadow-lg shadow-cyan-500/50 hover:shadow-cyan-500/80 transition-shadow duration-300"
            />
          </motion.div>
          
          <h1 className="text-5xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-cyan-400 via-blue-400 to-purple-400 bg-clip-text text-transparent">
            📱 Telegram Gaming Bot
          </h1>
          <p className="text-xl text-gray-300 mb-8 max-w-3xl mx-auto">
            Experience Somnia MiniHub directly in Telegram! Play games, earn rewards, and manage your AI agent - all in one place.
          </p>
          
          <div className="flex flex-col md:flex-row gap-4 justify-center items-center">
            <Link href="https://t.me/Somnia_Minihub_bot">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="bg-gradient-to-r from-cyan-600 to-blue-600 text-white px-8 py-4 rounded-lg font-bold text-lg hover:from-cyan-700 hover:to-blue-700 transition-all duration-300 shadow-lg hover:shadow-cyan-500/25"
              >
                🚀 Start Telegram Bot
              </motion.button>
            </Link>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={setupBot}
              className="border-2 border-cyan-500 text-cyan-400 px-8 py-4 rounded-lg font-bold text-lg hover:bg-cyan-500 hover:text-white transition-all duration-300"
            >
              ⚙️ Setup Bot
            </motion.button>
          </div>
          
          {botSetupStatus && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="mt-4 p-4 bg-gray-900 rounded-lg border border-cyan-500/30"
            >
              <p className="text-cyan-400">{botSetupStatus}</p>
            </motion.div>
          )}
        </motion.div>

        {/* Features Grid */}
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="mb-20"
        >
          <h2 className="text-4xl font-bold text-center mb-12 bg-gradient-to-r from-cyan-400 to-blue-400 bg-clip-text text-transparent">
            🌟 Bot Features
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 max-w-7xl mx-auto">
            {features.map((feature, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 * index }}
                whileHover={{ scale: 1.05 }}
                className="bg-gradient-to-br from-gray-900 to-gray-800 rounded-xl p-6 border border-cyan-500/20 hover:border-cyan-500/50 transition-all duration-300 text-center"
              >
                <div className="text-4xl mb-4">{feature.icon}</div>
                <h3 className="text-xl font-bold text-cyan-400 mb-3">{feature.title}</h3>
                <p className="text-gray-300">{feature.description}</p>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Bot Commands */}
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
          className="mb-20"
        >
          <h2 className="text-4xl font-bold text-center mb-12 bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
            🤖 Available Commands
          </h2>
          
          <div className="max-w-4xl mx-auto">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {commands.map((cmd, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.1 * index }}
                  className="bg-gradient-to-r from-gray-900/50 to-gray-800/50 rounded-xl p-4 border border-gray-700 hover:border-purple-500/50 transition-all duration-300"
                >
                  <div className="flex items-center space-x-4">
                    <code className="bg-purple-900/30 text-purple-400 px-3 py-1 rounded font-mono text-sm">
                      {cmd.command}
                    </code>
                    <span className="text-gray-300">{cmd.description}</span>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </motion.div>

        {/* Integration Info */}
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.9 }}
          className="mb-20"
        >
          <h2 className="text-4xl font-bold text-center mb-12 bg-gradient-to-r from-green-400 to-blue-400 bg-clip-text text-transparent">
            🔗 Integration Details
          </h2>
          
          <div className="max-w-4xl mx-auto bg-gradient-to-br from-gray-900 to-gray-800 rounded-xl p-8 border border-cyan-500/30">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div>
                <h3 className="text-xl font-bold text-cyan-400 mb-4">🤖 Bot Information</h3>
                <div className="space-y-2 text-gray-300">
                  <p><strong>Bot Username:</strong> @Somnia_Minihub_bot</p>
                  <p><strong>Bot Token:</strong> 8306788744:AAE***</p>
                  <p><strong>Web App URL:</strong> http://Somnia-minihub.vercel.app/</p>
                  <p><strong>Webhook:</strong> /api/telegram/webhook</p>
                </div>
              </div>
              
              <div>
                <h3 className="text-xl font-bold text-cyan-400 mb-4">⚡ Quick Actions</h3>
                <div className="space-y-3">
                  <Link href="https://t.me/Somnia_Minihub_bot">
                    <button className="w-full bg-gradient-to-r from-cyan-600 to-blue-600 text-white px-4 py-2 rounded-lg font-bold hover:from-cyan-700 hover:to-blue-700 transition-all duration-300">
                      Open Bot in Telegram
                    </button>
                  </Link>
                  <button 
                    onClick={() => window.open('https://core.telegram.org/bots/webapps', '_blank')}
                    className="w-full border-2 border-cyan-500 text-cyan-400 px-4 py-2 rounded-lg font-bold hover:bg-cyan-500 hover:text-white transition-all duration-300"
                  >
                    Telegram Web Apps Docs
                  </button>
                </div>
              </div>
            </div>
          </div>
        </motion.div>

        {/* CTA Section */}
        <motion.div 
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 1.2 }}
          className="text-center bg-gradient-to-r from-cyan-900/30 to-blue-900/30 rounded-xl p-12 border border-cyan-500/30"
        >
          <h2 className="text-3xl font-bold mb-4 bg-gradient-to-r from-cyan-400 to-blue-400 bg-clip-text text-transparent">
            🚀 Ready to Game on Telegram?
          </h2>
          <p className="text-xl text-gray-300 mb-6">
            Join thousands of players gaming directly in Telegram
          </p>
          <Link href="https://t.me/Somnia_Minihub_bot">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="bg-gradient-to-r from-cyan-600 to-blue-600 text-white px-8 py-3 rounded-lg font-bold hover:from-cyan-700 hover:to-blue-700 transition-all duration-300 shadow-lg"
            >
              🎮 Start Gaming Now
            </motion.button>
          </Link>
        </motion.div>
      </div>
    </div>
  );
};

export default Telegram;