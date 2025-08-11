import { NextResponse } from 'next/server';
import { setBotCommands, setBotMenuButton } from '../../../../lib/telegram/bot.js';

const TELEGRAM_BOT_TOKEN = process.env.TELEGRAM_BOT_TOKEN || 'Your_Token';
const TELEGRAM_API_URL = `https://api.telegram.org/bot${TELEGRAM_BOT_TOKEN}`;
const WEBHOOK_URL = `${process.env.NEXT_PUBLIC_APP_URL || 'https://somania-minihub.vercel.app'}/api/telegram/webhook`;

export async function POST() {
  try {
    const results = [];
    
    // Set webhook
    const webhookResponse = await fetch(`${TELEGRAM_API_URL}/setWebhook`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        url: WEBHOOK_URL,
        allowed_updates: ['message', 'callback_query']
      }),
    });
    
    const webhookResult = await webhookResponse.json();
    results.push({ action: 'setWebhook', result: webhookResult });
    
    // Set bot commands
    const commandsResult = await setBotCommands();
    results.push({ action: 'setBotCommands', result: commandsResult });
    
    // Set menu button
    const menuResult = await setBotMenuButton();
    results.push({ action: 'setBotMenuButton', result: menuResult });
    
    // Set bot description
    const descriptionResponse = await fetch(`${TELEGRAM_API_URL}/setMyDescription`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        description: `🎮 Somania MiniHub - AI-powered gaming platform on Somania Network!

🚀 Features:
• 15+ AI-powered mini-games
• Blockchain rewards (SMT tokens)
• AI agent deployment
• Global leaderboards
• Real-time multiplayer

Start gaming now with /start command!`
      }),
    });
    
    const descriptionResult = await descriptionResponse.json();
    results.push({ action: 'setMyDescription', result: descriptionResult });
    
    // Set bot short description
    const shortDescResponse = await fetch(`${TELEGRAM_API_URL}/setMyShortDescription`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        short_description: '🎮 AI-powered gaming platform on Somania Network. Play games, earn rewards, deploy AI agents!'
      }),
    });
    
    const shortDescResult = await shortDescResponse.json();
    results.push({ action: 'setMyShortDescription', result: shortDescResult });
    
    return NextResponse.json({
      success: true,
      message: 'Telegram bot setup completed successfully!',
      results: results,
      webhook_url: WEBHOOK_URL,
      bot_username: '@Somania_Minihub_bot'
    });
    
  } catch (error) {
    console.error('Bot setup error:', error);
    return NextResponse.json(
      { 
        success: false,
        error: 'Failed to setup bot',
        details: error.message 
      },
      { status: 500 }
    );
  }
}

export async function GET() {
  try {
    // Get bot info
    const botInfoResponse = await fetch(`${TELEGRAM_API_URL}/getMe`);
    const botInfo = await botInfoResponse.json();
    
    // Get webhook info
    const webhookInfoResponse = await fetch(`${TELEGRAM_API_URL}/getWebhookInfo`);
    const webhookInfo = await webhookInfoResponse.json();
    
    return NextResponse.json({
      bot_info: botInfo,
      webhook_info: webhookInfo,
      setup_url: 'https://somania-minihub.vercel.app/api/telegram/setup',
      webhook_url: WEBHOOK_URL
    });
    
  } catch (error) {
    console.error('Error getting bot info:', error);
    return NextResponse.json(
      { error: 'Failed to get bot information' },
      { status: 500 }
    );
  }
}