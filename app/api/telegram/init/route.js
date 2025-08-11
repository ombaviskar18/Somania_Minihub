import { NextResponse } from 'next/server';

const TELEGRAM_BOT_TOKEN = '8306788744:AAEupHI0I1zwmEvy_WdtoGO-mFnZeP904kA';
const TELEGRAM_API_URL = `https://api.telegram.org/bot${TELEGRAM_BOT_TOKEN}`;
const WEBHOOK_URL = 'https://somania-minihub.vercel.app/api/telegram/webhook';
const WEB_APP_URL = 'https://somania-minihub.vercel.app/';

async function makeRequest(endpoint, data = {}) {
  try {
    const response = await fetch(`${TELEGRAM_API_URL}/${endpoint}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    });
    
    const result = await response.json();
    return result;
  } catch (error) {
    console.error(`Error making request to ${endpoint}:`, error);
    throw error;
  }
}

export async function POST() {
  try {
    console.log('🚀 Initializing Somania MiniHub Telegram Bot...');
    
    const results = [];
    
    // 1. Delete existing webhook first
    console.log('1️⃣ Clearing existing webhook...');
    const deleteResult = await makeRequest('deleteWebhook', { drop_pending_updates: true });
    results.push({ action: 'deleteWebhook', result: deleteResult });
    
    // 2. Set new webhook
    console.log('2️⃣ Setting new webhook...');
    const webhookResult = await makeRequest('setWebhook', {
      url: WEBHOOK_URL,
      allowed_updates: ['message', 'callback_query', 'web_app_data'],
      drop_pending_updates: true
    });
    results.push({ action: 'setWebhook', result: webhookResult });
    
    // 3. Set bot commands
    console.log('3️⃣ Setting bot commands...');
    const commands = [
      { command: 'start', description: '🎮 Launch Somania MiniHub' },
      { command: 'games', description: '🎯 View available games' },
      { command: 'stats', description: '📊 Platform statistics' },
      { command: 'leaderboard', description: '🏆 View top players' },
      { command: 'agent', description: '🤖 AI Agent information' },
      { command: 'pricing', description: '💎 View subscription plans' },
      { command: 'help', description: '❓ Get help and support' }
    ];
    
    const commandsResult = await makeRequest('setMyCommands', { commands });
    results.push({ action: 'setMyCommands', result: commandsResult });
    
    // 4. Set menu button with Web App
    console.log('4️⃣ Setting menu button...');
    const menuResult = await makeRequest('setChatMenuButton', {
      menu_button: {
        type: 'web_app',
        text: '🎮 Somania Games',
        web_app: { url: WEB_APP_URL }
      }
    });
    results.push({ action: 'setChatMenuButton', result: menuResult });
    
    // 5. Set bot name
    console.log('5️⃣ Setting bot name...');
    const nameResult = await makeRequest('setMyName', {
      name: 'Somania MiniHub'
    });
    results.push({ action: 'setMyName', result: nameResult });
    
    // 6. Set bot description
    console.log('6️⃣ Setting bot description...');
    const description = `🎮 Somania MiniHub - AI-powered gaming platform on Somania Network!

🚀 Experience the future of blockchain gaming:
• 15+ AI-powered mini-games
• Earn SMT tokens while playing
• Deploy your own AI gaming agent
• Compete on global leaderboards
• Real-time multiplayer gaming

🌟 Built on Somania Network - the fastest EVM-compatible blockchain with 1M+ TPS!

Click the menu button or send /start to begin your gaming journey!`;
    
    const descResult = await makeRequest('setMyDescription', { description });
    results.push({ action: 'setMyDescription', result: descResult });
    
    // 7. Set short description
    console.log('7️⃣ Setting short description...');
    const shortDescription = '🎮 AI-powered gaming platform on Somania Network. Play games, earn SMT tokens, deploy AI agents!';
    
    const shortDescResult = await makeRequest('setMyShortDescription', { 
      short_description: shortDescription 
    });
    results.push({ action: 'setMyShortDescription', result: shortDescResult });
    
    // 8. Send a test message to verify webhook
    console.log('8️⃣ Testing webhook...');
    const webhookTest = await makeRequest('getWebhookInfo');
    results.push({ action: 'getWebhookInfo', result: webhookTest });
    
    return NextResponse.json({
      success: true,
      message: '🎉 Somania MiniHub Telegram Bot initialized successfully!',
      bot_info: {
        username: '@Somania_MiniHub_bot',
        bot_link: 'https://t.me/Somania_MiniHub_bot',
        web_app_url: WEB_APP_URL,
        webhook_url: WEBHOOK_URL
      },
      results: results,
      next_steps: [
        '1. Open https://t.me/Somania_MiniHub_bot',
        '2. Send /start to test the bot',
        '3. Click the menu button to launch the web app',
        '4. Try various commands to test functionality'
      ]
    });
    
  } catch (error) {
    console.error('Bot initialization error:', error);
    return NextResponse.json(
      { 
        success: false,
        error: 'Failed to initialize bot',
        details: error.message 
      },
      { status: 500 }
    );
  }
}

export async function GET() {
  try {
    // Get current bot status
    const botInfo = await makeRequest('getMe');
    const webhookInfo = await makeRequest('getWebhookInfo');
    
    return NextResponse.json({
      bot_info: botInfo,
      webhook_info: webhookInfo,
      initialization_url: 'POST to this endpoint to initialize the bot',
      bot_link: 'https://t.me/Somania_MiniHub_bot'
    });
    
  } catch (error) {
    console.error('Error getting bot status:', error);
    return NextResponse.json(
      { error: 'Failed to get bot status' },
      { status: 500 }
    );
  }
}