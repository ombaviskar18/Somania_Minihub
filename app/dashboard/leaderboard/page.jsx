'use client';
import Image from 'next/image';
import React, { useState } from 'react';
import { motion } from 'framer-motion';

const LeaderBoard = () => {
  const [activeTab, setActiveTab] = useState('overall');
  
  // Mock leaderboard data
  const leaderboardData = {
    overall: [
      { rank: 1, name: "CryptoGamer_99", score: 125450, games: 342, rewards: "2,450 SMT", avatar: "👑" },
      { rank: 2, name: "SomaniaKing", score: 98720, games: 287, rewards: "1,890 SMT", avatar: "🥈" },
      { rank: 3, name: "BlockchainPro", score: 87650, games: 245, rewards: "1,650 SMT", avatar: "🥉" },
      { rank: 4, name: "GameMaster2024", score: 76543, games: 198, rewards: "1,420 SMT", avatar: "⭐" },
      { rank: 5, name: "AIChallenger", score: 65432, games: 176, rewards: "1,200 SMT", avatar: "🎯" },
      { rank: 6, name: "PixelWarrior", score: 54321, games: 145, rewards: "980 SMT", avatar: "⚡" },
      { rank: 7, name: "ChainGamer", score: 43210, games: 132, rewards: "850 SMT", avatar: "🎮" },
      { rank: 8, name: "MetaPlayer", score: 38765, games: 121, rewards: "720 SMT", avatar: "🚀" }
    ],
    weekly: [
      { rank: 1, name: "WeeklyChamp", score: 15420, games: 45, rewards: "420 SMT", avatar: "🔥" },
      { rank: 2, name: "SpeedRunner", score: 12350, games: 38, rewards: "350 SMT", avatar: "💨" },
      { rank: 3, name: "QuickWin", score: 10980, games: 32, rewards: "280 SMT", avatar: "⚡" }
    ],
    daily: [
      { rank: 1, name: "DailyHero", score: 2450, games: 8, rewards: "85 SMT", avatar: "🌟" },
      { rank: 2, name: "TodaysBest", score: 1890, games: 6, rewards: "65 SMT", avatar: "🎯" },
      { rank: 3, name: "FlashGamer", score: 1650, games: 5, rewards: "50 SMT", avatar: "💫" }
    ]
  };

  const tabs = [
    { id: 'overall', name: 'All Time', icon: '🏆' },
    { id: 'weekly', name: 'Weekly', icon: '📅' },
    { id: 'daily', name: 'Daily', icon: '⏰' }
  ];

  const getRankColor = (rank) => {
    switch(rank) {
      case 1: return 'from-yellow-400 to-orange-500';
      case 2: return 'from-gray-300 to-gray-500';
      case 3: return 'from-orange-400 to-yellow-600';
      default: return 'from-purple-400 to-pink-500';
    }
  };

  const getRankBorder = (rank) => {
    switch(rank) {
      case 1: return 'border-yellow-400 shadow-yellow-400/50';
      case 2: return 'border-gray-400 shadow-gray-400/50';
      case 3: return 'border-orange-400 shadow-orange-400/50';
      default: return 'border-purple-400 shadow-purple-400/30';
    }
  };

  return (
    <div className="bg-black text-white font-mono min-h-screen">
      {/* Background Effects */}
      <div className="fixed inset-0 pointer-events-none z-10">
        <div className="absolute inset-0 bg-black opacity-20"></div>
        <div className="absolute inset-0 bg-[linear-gradient(transparent_0%,rgba(147,51,234,0.05)_1px,transparent_1px)] bg-[size:1px_1px]"></div>
      </div>

      <div className="relative min-h-screen px-4 py-12 z-20">
        {/* Header Section */}
        <motion.div 
          initial={{ opacity: 0, y: -50 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-12"
        >
          <motion.div 
            initial={{ scale: 0.9 }}
            animate={{ scale: 1 }}
            transition={{ duration: 0.5 }}
            className="flex justify-center mb-8"
          >
            <Image 
              src="/tropy.gif" 
              alt="Trophy" 
              width={150}
              height={150}
              className="rounded-lg shadow-lg shadow-purple-500/50 hover:shadow-purple-500/80 transition-shadow duration-300"
            />
          </motion.div>

          <h1 className="text-5xl md:text-6xl font-bold mb-4 bg-gradient-to-r from-purple-400 via-pink-400 to-cyan-400 bg-clip-text text-transparent">
            🏆 Somania Leaderboard
          </h1>
          
          <p className="text-xl text-gray-300 mb-8 max-w-3xl mx-auto">
            Compete with players worldwide on Somania Network. Climb the ranks, earn rewards, and become a legend!
          </p>
        </motion.div>

        {/* Tabs */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="flex justify-center mb-8"
        >
          <div className="bg-gray-900 rounded-xl p-2 border border-purple-500/30">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`px-6 py-3 rounded-lg font-bold transition-all duration-300 mr-2 last:mr-0 ${
                  activeTab === tab.id
                    ? 'bg-gradient-to-r from-purple-600 to-pink-600 text-white shadow-lg'
                    : 'text-gray-400 hover:text-white hover:bg-gray-800'
                }`}
              >
                <span className="mr-2">{tab.icon}</span>
                {tab.name}
              </button>
            ))}
          </div>
        </motion.div>

        {/* Leaderboard */}
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="max-w-6xl mx-auto"
        >
          {/* Top 3 Podium */}
          {activeTab === 'overall' && (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
              {leaderboardData[activeTab].slice(0, 3).map((player, index) => (
                <motion.div
                  key={player.rank}
                  initial={{ opacity: 0, y: 50 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.1 * index }}
                  whileHover={{ scale: 1.05 }}
                  className={`bg-gradient-to-br from-gray-900 to-gray-800 rounded-xl p-6 border-2 ${getRankBorder(player.rank)} text-center`}
                >
                  <div className="text-6xl mb-4">{player.avatar}</div>
                  <div className={`text-2xl font-bold bg-gradient-to-r ${getRankColor(player.rank)} bg-clip-text text-transparent mb-2`}>
                    #{player.rank}
                  </div>
                  <h3 className="text-xl font-bold text-white mb-2">{player.name}</h3>
                  <div className="space-y-1 text-gray-300">
                    <p className="text-2xl font-bold text-purple-400">{player.score.toLocaleString()}</p>
                    <p className="text-sm">{player.games} games played</p>
                    <p className="text-green-400 font-bold">{player.rewards}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          )}

          {/* Full Leaderboard Table */}
          <div className="bg-gradient-to-br from-gray-900 to-gray-800 rounded-xl border border-purple-500/30 overflow-hidden">
            <div className="bg-gradient-to-r from-purple-900/50 to-pink-900/50 p-4 border-b border-purple-500/30">
              <h2 className="text-2xl font-bold text-center bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
                {tabs.find(t => t.id === activeTab)?.name} Rankings
              </h2>
            </div>
            
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-gray-700">
                    <th className="px-6 py-4 text-left text-purple-400 font-bold">Rank</th>
                    <th className="px-6 py-4 text-left text-purple-400 font-bold">Player</th>
                    <th className="px-6 py-4 text-center text-purple-400 font-bold">Score</th>
                    <th className="px-6 py-4 text-center text-purple-400 font-bold">Games</th>
                    <th className="px-6 py-4 text-center text-purple-400 font-bold">Rewards</th>
                  </tr>
                </thead>
                <tbody>
                  {leaderboardData[activeTab].map((player, index) => (
                    <motion.tr
                      key={player.rank}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.05 * index }}
                      whileHover={{ backgroundColor: 'rgba(147, 51, 234, 0.1)' }}
                      className="border-b border-gray-800 hover:bg-purple-900/20 transition-all duration-300"
                    >
                      <td className="px-6 py-4">
                        <div className={`inline-flex items-center justify-center w-10 h-10 rounded-full bg-gradient-to-r ${getRankColor(player.rank)} text-white font-bold`}>
                          {player.rank}
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <div className="flex items-center space-x-3">
                          <span className="text-2xl">{player.avatar}</span>
                          <span className="font-bold text-white">{player.name}</span>
                        </div>
                      </td>
                      <td className="px-6 py-4 text-center">
                        <span className="text-xl font-bold text-purple-400">
                          {player.score.toLocaleString()}
                        </span>
                      </td>
                      <td className="px-6 py-4 text-center text-gray-300">
                        {player.games}
                      </td>
                      <td className="px-6 py-4 text-center">
                        <span className="text-green-400 font-bold">
                          {player.rewards}
                        </span>
                      </td>
                    </motion.tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </motion.div>

        {/* Stats Cards */}
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
          className="grid grid-cols-1 md:grid-cols-4 gap-6 mt-12 max-w-6xl mx-auto"
        >
          {[
            { title: "Total Players", value: "12,847", icon: "👥", color: "from-blue-500 to-cyan-500" },
            { title: "Games Played", value: "1,234,567", icon: "🎮", color: "from-green-500 to-emerald-500" },
            { title: "Rewards Distributed", value: "456,789 SMT", icon: "💰", color: "from-yellow-500 to-orange-500" },
            { title: "Active Today", value: "3,421", icon: "⚡", color: "from-purple-500 to-pink-500" }
          ].map((stat, index) => (
            <motion.div
              key={index}
              whileHover={{ scale: 1.05 }}
              className="bg-gradient-to-br from-gray-900 to-gray-800 rounded-xl p-6 border border-purple-500/20 text-center"
            >
              <div className="text-3xl mb-2">{stat.icon}</div>
              <h3 className="text-gray-400 text-sm mb-1">{stat.title}</h3>
              <p className={`text-2xl font-bold bg-gradient-to-r ${stat.color} bg-clip-text text-transparent`}>
                {stat.value}
              </p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </div>
  );
};

export default LeaderBoard;