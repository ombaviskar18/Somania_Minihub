#!/usr/bin/env node

/**
 * Telegram Bot Setup Script for Somnia MiniHub
 * This script configures the Telegram bot with proper webhook and commands
 */

const TELEGRAM_BOT_TOKEN = 'Your_Token';
const TELEGRAM_API_URL = `https://api.telegram.org/bot${TELEGRAM_BOT_TOKEN}`;
const WEBHOOK_URL = 'https://Somnia-minihub.vercel.app/api/telegram/webhook';
const WEB_APP_URL = 'https://Somnia-minihub.vercel.app/';

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

async function setupBot() {
  console.log('🚀 Setting up Somnia MiniHub Telegram Bot...\n');
  
  try {
    // 1. Get bot info
    console.log('1️⃣ Getting bot information...');
    const botInfo = await makeRequest('getMe');
    if (botInfo.ok) {
      console.log(`✅ Bot: @${botInfo.result.username} (${botInfo.result.first_name})`);
    } else {
      throw new Error('Failed to get bot info');
    }
    
    // 2. Set webhook
    console.log('\n2️⃣ Setting webhook...');
    const webhookResult = await makeRequest('setWebhook', {
      url: WEBHOOK_URL,
      allowed_updates: ['message', 'callback_query', 'web_app_data'],
      drop_pending_updates: true
    });
    
    if (webhookResult.ok) {
      console.log(`✅ Webhook set to: ${WEBHOOK_URL}`);
    } else {
      console.log(`❌ Webhook setup failed: ${webhookResult.description}`);
    }
    
    // 3. Set bot commands
    console.log('\n3️⃣ Setting bot commands...');
    const commands = [
      { command: 'start', description: '🎮 Start gaming on Somnia MiniHub' },
      { command: 'games', description: '🎯 View available games' },
      { command: 'stats', description: '📊 Platform statistics' },
      { command: 'leaderboard', description: '🏆 View top players' },
      { command: 'agent', description: '🤖 AI Agent information' },
      { command: 'pricing', description: '💎 View subscription plans' },
      { command: 'help', description: '❓ Get help and support' }
    ];
    
    const commandsResult = await makeRequest('setMyCommands', { commands });
    if (commandsResult.ok) {
      console.log(`✅ Set ${commands.length} bot commands`);
    } else {
      console.log(`❌ Commands setup failed: ${commandsResult.description}`);
    }
    
    // 4. Set menu button
    console.log('\n4️⃣ Setting menu button...');
    const menuResult = await makeRequest('setChatMenuButton', {
      menu_button: {
        type: 'web_app',
        text: '🎮 Play Games',
        web_app: { url: WEB_APP_URL }
      }
    });
    
    if (menuResult.ok) {
      console.log('✅ Menu button set to launch web app');
    } else {
      console.log(`❌ Menu button setup failed: ${menuResult.description}`);
    }
    
    // 5. Set bot description
    console.log('\n5️⃣ Setting bot description...');
    const description = `🎮 Somnia MiniHub - AI-powered gaming platform on Somnia Network!

🚀 Features:
• 15+ AI-powered mini-games
• Blockchain rewards (SMT tokens)
• AI agent deployment
• Global leaderboards
• Real-time multiplayer

Start gaming now with /start command!`;
    
    const descResult = await makeRequest('setMyDescription', { description });
    if (descResult.ok) {
      console.log('✅ Bot description set');
    } else {
      console.log(`❌ Description setup failed: ${descResult.description}`);
    }
    
    // 6. Set short description
    console.log('\n6️⃣ Setting short description...');
    const shortDescription = '🎮 AI-powered gaming platform on Somnia Network. Play games, earn rewards, deploy AI agents!';
    
    const shortDescResult = await makeRequest('setMyShortDescription', { 
      short_description: shortDescription 
    });
    if (shortDescResult.ok) {
      console.log('✅ Short description set');
    } else {
      console.log(`❌ Short description setup failed: ${shortDescResult.description}`);
    }
    
    // 7. Verify webhook
    console.log('\n7️⃣ Verifying webhook...');
    const webhookInfo = await makeRequest('getWebhookInfo');
    if (webhookInfo.ok) {
      const info = webhookInfo.result;
      console.log('✅ Webhook verification:');
      console.log(`   URL: ${info.url}`);
      console.log(`   Has custom certificate: ${info.has_custom_certificate}`);
      console.log(`   Pending updates: ${info.pending_update_count}`);
      console.log(`   Last error date: ${info.last_error_date || 'None'}`);
      console.log(`   Max connections: ${info.max_connections}`);
    }
    
    console.log('\n🎉 Bot setup completed successfully!');
    console.log('\n📱 Bot Information:');
    console.log(`   Username: @Somnia_Minihub_bot`);
    console.log(`   Link: https://t.me/Somnia_Minihub_bot`);
    console.log(`   Web App: ${WEB_APP_URL}`);
    console.log(`   Webhook: ${WEBHOOK_URL}`);
    
    console.log('\n🔧 Next Steps:');
    console.log('1. Test the bot by sending /start');
    console.log('2. Try the menu button to launch the web app');
    console.log('3. Use various commands to test functionality');
    console.log('4. Monitor webhook logs for any issues');
    
  } catch (error) {
    console.error('\n❌ Bot setup failed:', error.message);
    process.exit(1);
  }
}

// Run the setup
setupBot();