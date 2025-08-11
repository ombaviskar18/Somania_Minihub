import { NextResponse } from 'next/server';
import { 
  sendWelcomeMessage, 
  sendGameStats, 
  sendHelpMessage,
  sendMessage 
} from '../../../../lib/telegram/bot.js';

export async function POST(request) {
  try {
    const body = await request.json();
    console.log('📥 Webhook received:', JSON.stringify(body, null, 2));
    
    // Handle incoming webhook from Telegram
    if (body.message) {
      const { chat, text, from } = body.message;
      const chatId = chat.id;
      const command = text?.toLowerCase();

      console.log(`📨 Message from ${from.first_name} (@${from.username || 'no_username'}): "${text}"`);
      console.log(`💬 Chat ID: ${chatId}`);

      // Handle different commands
      switch (command) {
        case '/start':
          console.log('🚀 Sending welcome message...');
          const welcomeResult = await sendWelcomeMessage(chatId);
          console.log('✅ Welcome message sent:', welcomeResult.ok ? 'Success' : 'Failed');
          break;
          
        case '/games':
          await sendMessage(chatId, `
🎮 <b>Available Games on Somania MiniHub:</b>

🔥 <b>AI-Powered Games:</b>
• Connect Four AI
• Reaction Duel  
• Chess Blitz
• Maze Escape
• Memory Match
• Tic Tac Toe
• Hangman Challenge
• Tank Fire Game
• Color Shooting
• Object Fire
• Snake Game
• Ping Pong

💡 <b>Create Your Own:</b>
• AI Game Generator
• Custom Game Builder

Ready to play? Click the button below! 👇
          `, {
            reply_markup: {
              inline_keyboard: [
                [
                  {
                    text: '🎮 Play Games Now',
                    web_app: { url: 'http://somania-minihub.vercel.app/dashboard' }
                  }
                ]
              ]
            }
          });
          break;
          
        case '/stats':
          await sendGameStats(chatId);
          break;
          
        case '/leaderboard':
          await sendMessage(chatId, `
🏆 <b>Somania MiniHub Leaderboard</b>

🥇 <b>Top Players:</b>
1. CryptoGamer_99 - 125,450 pts
2. SomaniaKing - 98,720 pts  
3. BlockchainPro - 87,650 pts
4. GameMaster2024 - 76,543 pts
5. AIChallenger - 65,432 pts

💰 <b>Total Rewards:</b> 456,789 SMT
🎮 <b>Games Played:</b> 1,234,567
👥 <b>Active Players:</b> 12,847

View full leaderboard and compete! 🚀
          `, {
            reply_markup: {
              inline_keyboard: [
                [
                  {
                    text: '🏆 View Full Leaderboard',
                    web_app: { url: 'http://somania-minihub.vercel.app/dashboard/leaderboard' }
                  }
                ]
              ]
            }
          });
          break;
          
        case '/agent':
          await sendMessage(chatId, `
🤖 <b>Somania AI Agent</b>

🚀 <b>Autonomous Gaming & Revenue Generation</b>

💰 <b>Monthly Revenue:</b> $7,000
📈 <b>Revenue Streams:</b>
• Gaming Rewards (35%) - $2,450
• DeFi Yield (25%) - $1,750  
• NFT Trading (20%) - $1,400
• Staking Rewards (15%) - $1,050
• Agent Services (5%) - $350

🔥 <b>Key Features:</b>
• 24/7 Autonomous Operations
• Smart Contract Optimization
• Predictive Analytics
• Cross-Chain Integration
• Revenue Maximization

Coming Soon on Somania Network! 🌟
          `, {
            reply_markup: {
              inline_keyboard: [
                [
                  {
                    text: '🤖 Learn More About AI Agent',
                    web_app: { url: 'http://somania-minihub.vercel.app/dashboard/agent' }
                  }
                ]
              ]
            }
          });
          break;
          
        case '/pricing':
          await sendMessage(chatId, `
💎 <b>Somania MiniHub Pricing</b>

🆓 <b>Starter Plan - FREE</b>
• Access to 10 basic games
• Standard gameplay features
• Basic leaderboard access

👑 <b>Pro Gamer - $19.99/month</b>
• 100+ premium games
• AI-powered game hosting
• Priority matchmaking
• 2x reward multiplier
• NFT game assets

🚀 <b>Somania Elite - $49.99/month</b>
• Unlimited game access
• Custom AI agent deployment
• White-label solutions
• 5x reward multiplier
• Revenue sharing program

💰 <b>Save 17% with yearly billing!</b>
          `, {
            reply_markup: {
              inline_keyboard: [
                [
                  {
                    text: '💎 View All Plans',
                    web_app: { url: 'http://somania-minihub.vercel.app/dashboard/upgrade' }
                  }
                ]
              ]
            }
          });
          break;
          
        case '/help':
          await sendHelpMessage(chatId);
          break;
          
        default:
          // Default response for unknown commands
          await sendMessage(chatId, `
👋 Hello ${from.first_name}!

I didn't understand that command. Here's what I can help you with:

🎮 /start - Launch Somania MiniHub
🎯 /games - View available games  
📊 /stats - Platform statistics
🏆 /leaderboard - Top players
🤖 /agent - AI Agent info
💎 /pricing - Subscription plans
❓ /help - Get help

Or use the menu button to access all features! 👇
          `, {
            reply_markup: {
              inline_keyboard: [
                [
                  {
                    text: '🎮 Launch Game',
                    web_app: { url: 'http://somania-minihub.vercel.app/' }
                  }
                ]
              ]
            }
          });
      }
    }
    
    // Handle callback queries (button presses)
    if (body.callback_query) {
      const { data, from, message } = body.callback_query;
      const chatId = message.chat.id;
      
      // Handle different callback actions
      switch (data) {
        case 'play_games':
          await sendMessage(chatId, '🎮 Launching Somania MiniHub games...');
          break;
        case 'view_stats':
          await sendGameStats(chatId);
          break;
        default:
          console.log('Unknown callback query:', data);
      }
    }

    return NextResponse.json({ success: true });
    
  } catch (error) {
    console.error('Webhook error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}

// Handle GET requests (for webhook verification)
export async function GET() {
  return NextResponse.json({ 
    status: 'Somania MiniHub Telegram Bot is running!',
    timestamp: new Date().toISOString(),
    webhook_url: 'https://somania-minihub.vercel.app/api/telegram/webhook'
  });
}