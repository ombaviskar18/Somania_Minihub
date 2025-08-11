'use client';
import Image from 'next/image';
import React, { useState } from 'react';
import { motion } from 'framer-motion';

const UpgradePage = () => {
  const [billingCycle, setBillingCycle] = useState('monthly');
  
  const plans = [
    {
      name: "Starter",
      description: "Perfect for casual gamers",
      monthlyPrice: 0,
      yearlyPrice: 0,
      popular: false,
      features: [
        "Access to 10 basic games",
        "Standard gameplay features",
        "Basic leaderboard access",
        "Community support",
        "Daily login rewards",
        "Basic game statistics"
      ],
      buttonText: "Current Plan",
      buttonDisabled: true,
      gradient: "from-gray-700 to-gray-800",
      borderColor: "border-gray-600",
      icon: "🎮"
    },
    {
      name: "Pro Gamer",
      description: "For serious gaming enthusiasts",
      monthlyPrice: 19.99,
      yearlyPrice: 199.99,
      popular: true,
      features: [
        "Access to 100+ premium games",
        "Advanced AI-powered Somania game hosting",
        "Priority matchmaking",
        "Exclusive tournaments",
        "Advanced analytics dashboard",
        "Custom game creation tools",
        "Premium support",
        "2x reward multiplier",
        "NFT game assets"
      ],
      buttonText: "Upgrade to Pro",
      buttonDisabled: false,
      gradient: "from-purple-600 to-pink-600",
      borderColor: "border-purple-500",
      icon: "👑"
    },
    {
      name: "Somania Elite",
      description: "Ultimate gaming experience",
      monthlyPrice: 49.99,
      yearlyPrice: 499.99,
      popular: false,
      features: [
        "Unlimited access to all games",
        "Custom AI agent deployment",
        "White-label gaming solutions",
        "API access for developers",
        "Dedicated account manager",
        "Early access to new features",
        "Custom smart contract deployment",
        "5x reward multiplier",
        "Exclusive Somania Elite NFTs",
        "Revenue sharing program"
      ],
      buttonText: "Contact Sales",
      buttonDisabled: false,
      gradient: "from-cyan-500 to-blue-600",
      borderColor: "border-cyan-500",
      icon: "🚀"
    }
  ];

  const addOns = [
    {
      name: "AI Game Generator",
      description: "Create unlimited custom games with AI",
      price: "$9.99/month",
      icon: "🤖"
    },
    {
      name: "Tournament Hosting",
      description: "Host your own gaming tournaments",
      price: "$14.99/month",
      icon: "🏆"
    },
    {
      name: "Advanced Analytics",
      description: "Deep insights into gaming performance",
      price: "$7.99/month",
      icon: "📊"
    },
    {
      name: "NFT Marketplace Access",
      description: "Trade exclusive gaming NFTs",
      price: "$12.99/month",
      icon: "🎨"
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
              src="/pay.gif" 
              alt="Pricing" 
              width={150}
              height={150}
              className="rounded-lg shadow-lg shadow-purple-500/50 hover:shadow-purple-500/80 transition-shadow duration-300"
            />
          </motion.div>
          
          <h1 className="text-5xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-purple-400 via-pink-400 to-cyan-400 bg-clip-text text-transparent">
            💎 Somania Pricing
          </h1>
          <p className="text-xl text-gray-300 mb-8 max-w-3xl mx-auto">
            Unlock the full potential of Somania Network gaming. Choose the perfect plan for your gaming journey.
          </p>
          
          {/* Billing Toggle */}
          <motion.div 
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.2 }}
            className="flex items-center justify-center mb-12"
          >
            <div className="bg-gray-900 rounded-xl p-2 border border-purple-500/30">
              <button
                onClick={() => setBillingCycle('monthly')}
                className={`px-6 py-3 rounded-lg font-bold transition-all duration-300 mr-2 ${
                  billingCycle === 'monthly'
                    ? 'bg-gradient-to-r from-purple-600 to-pink-600 text-white shadow-lg'
                    : 'text-gray-400 hover:text-white'
                }`}
              >
                Monthly
              </button>
              <button
                onClick={() => setBillingCycle('yearly')}
                className={`px-6 py-3 rounded-lg font-bold transition-all duration-300 ${
                  billingCycle === 'yearly'
                    ? 'bg-gradient-to-r from-purple-600 to-pink-600 text-white shadow-lg'
                    : 'text-gray-400 hover:text-white'
                }`}
              >
                Yearly 
                <span className="ml-2 bg-green-500 text-black px-2 py-1 rounded-full text-xs font-bold">
                  Save 17%
                </span>
              </button>
            </div>
          </motion.div>
        </motion.div>

        {/* Pricing Cards */}
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="grid grid-cols-1 lg:grid-cols-3 gap-8 max-w-7xl mx-auto mb-20"
        >
          {plans.map((plan, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 * index }}
              whileHover={{ scale: 1.02, rotateY: 2 }}
              className={`relative bg-gradient-to-br from-gray-900 to-gray-800 rounded-2xl p-8 border-2 ${
                plan.popular ? 'border-purple-500 shadow-purple-500/50' : plan.borderColor
              } transition-all duration-300 ${
                plan.popular ? 'transform scale-105' : ''
              }`}
            >
              {plan.popular && (
                <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                  <span className="bg-gradient-to-r from-purple-500 to-pink-500 text-white px-6 py-2 rounded-full text-sm font-bold shadow-lg">
                    🔥 Most Popular
                  </span>
                </div>
              )}
              
              <div className="text-center mb-8">
                <div className="text-4xl mb-4">{plan.icon}</div>
                <h3 className="text-2xl font-bold text-white mb-2">{plan.name}</h3>
                <p className="text-gray-400 mb-6">{plan.description}</p>
                
                <div className="mb-6">
                  <span className={`text-5xl font-bold bg-gradient-to-r ${plan.gradient} bg-clip-text text-transparent`}>
                    ${billingCycle === 'monthly' ? plan.monthlyPrice : plan.yearlyPrice}
                  </span>
                  <span className="text-gray-400 ml-2">
                    {billingCycle === 'monthly' ? '/month' : '/year'}
                  </span>
                  {billingCycle === 'yearly' && plan.monthlyPrice > 0 && (
                    <div className="text-sm text-green-400 mt-1">
                      ${(plan.monthlyPrice * 12 - plan.yearlyPrice).toFixed(2)} saved annually
                    </div>
                  )}
                </div>
              </div>
              
              <ul className="space-y-3 mb-8">
                {plan.features.map((feature, featureIndex) => (
                  <li key={featureIndex} className="flex items-center text-gray-300">
                    <span className="text-green-400 mr-3">✓</span>
                    {feature}
                  </li>
                ))}
              </ul>
              
              <motion.button
                whileHover={plan.buttonDisabled ? {} : { scale: 1.05 }}
                whileTap={plan.buttonDisabled ? {} : { scale: 0.95 }}
                className={`w-full py-4 rounded-xl font-bold text-lg transition-all duration-300 ${
                  plan.buttonDisabled
                    ? 'bg-gray-600 text-gray-400 cursor-not-allowed'
                    : plan.popular
                    ? 'bg-gradient-to-r from-purple-600 to-pink-600 text-white hover:from-purple-700 hover:to-pink-700 shadow-lg hover:shadow-purple-500/25'
                    : `bg-gradient-to-r ${plan.gradient} text-white hover:opacity-90 shadow-lg`
                }`}
                disabled={plan.buttonDisabled}
                onClick={() => {
                  if (!plan.buttonDisabled) {
                    alert(`${plan.name} plan will be available soon on Somania Network!`);
                  }
                }}
              >
                {plan.buttonText}
              </motion.button>
            </motion.div>
          ))}
        </motion.div>

        {/* Add-ons Section */}
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.7 }}
          className="mb-20"
        >
          <h2 className="text-4xl font-bold text-center mb-12 bg-gradient-to-r from-cyan-400 to-blue-400 bg-clip-text text-transparent">
            🔧 Premium Add-ons
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-7xl mx-auto">
            {addOns.map((addon, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 * index }}
                whileHover={{ scale: 1.05 }}
                className="bg-gradient-to-br from-gray-900 to-gray-800 rounded-xl p-6 border border-purple-500/20 hover:border-purple-500/50 transition-all duration-300"
              >
                <div className="text-3xl mb-4 text-center">{addon.icon}</div>
                <h3 className="text-lg font-bold text-white mb-2 text-center">{addon.name}</h3>
                <p className="text-gray-400 text-sm mb-4 text-center">{addon.description}</p>
                <div className="text-center">
                  <span className="text-xl font-bold text-purple-400">{addon.price}</span>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* FAQ Section */}
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1 }}
          className="max-w-4xl mx-auto"
        >
          <h2 className="text-4xl font-bold text-center mb-12 bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
            ❓ Frequently Asked Questions
          </h2>
          
          <div className="space-y-6">
            {[
              {
                question: "What is Somania Network?",
                answer: "Somania is a high-performance, EVM-compatible Layer 1 blockchain capable of processing over 1 million TPS with sub-second finality, perfect for gaming applications."
              },
              {
                question: "How do I pay with STT tokens?",
                answer: "You can pay for subscriptions using STT (Somania Test Tokens) directly from your connected wallet. We also accept major cryptocurrencies and fiat payments."
              },
              {
                question: "Can I change my plan anytime?",
                answer: "Yes! You can upgrade or downgrade your plan at any time. Changes take effect immediately and billing is prorated."
              },
              {
                question: "What happens to my games if I downgrade?",
                answer: "Your created games remain accessible, but some premium features may be limited based on your new plan. All game data is preserved."
              }
            ].map((faq, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.1 * index }}
                className="bg-gradient-to-r from-gray-900/50 to-gray-800/50 rounded-xl p-6 border border-gray-700"
              >
                <h3 className="text-lg font-bold text-purple-400 mb-3">{faq.question}</h3>
                <p className="text-gray-300">{faq.answer}</p>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* CTA Section */}
        <motion.div 
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 1.3 }}
          className="text-center mt-20 bg-gradient-to-r from-purple-900/30 to-pink-900/30 rounded-xl p-12 border border-purple-500/30"
        >
          <h2 className="text-3xl font-bold mb-4 bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
            🚀 Ready to Level Up Your Gaming?
          </h2>
          <p className="text-xl text-gray-300 mb-6">
            Join thousands of gamers already earning on Somania Network
          </p>
          <div className="flex flex-col md:flex-row gap-4 justify-center">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="bg-gradient-to-r from-purple-600 to-pink-600 text-white px-8 py-3 rounded-lg font-bold hover:from-purple-700 hover:to-pink-700 transition-all duration-300 shadow-lg"
              onClick={() => alert("Pro Gamer plan coming soon!")}
            >
              Start Free Trial
            </motion.button>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="border-2 border-purple-500 text-purple-400 px-8 py-3 rounded-lg font-bold hover:bg-purple-500 hover:text-white transition-all duration-300"
            >
              Contact Sales
            </motion.button>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default UpgradePage;
