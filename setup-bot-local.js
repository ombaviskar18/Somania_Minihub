// Local Bot Setup Script for Somnia MiniHub
// Run this with: node setup-bot-local.js

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
    console.log(`${endpoint}:`, result.ok ? '✅ Success' : '❌ Failed', result.description || '');
    return result;
  } catch (error) {
    console.error(`❌ Error with ${endpoint}:`, error.message);
    return { ok: false, error: error.message };
  }
}

async function setupBot() {
  console.log('🚀 Setting up Somnia MiniHub Telegram Bot...\n');
  
  try {
    // 1. Get bot info
    console.log('1️⃣ Getting bot information...');
    const botInfo = await makeRequest('getMe');
    if (botInfo.ok) {
      console.log(`   Bot: @${botInfo.result.username} (${botInfo.result.first_name})`);
      console.log(`   ID: ${botInfo.result.id}`);
    }
    
    // 2. Delete existing webhook
    console.log('\n2️⃣ Clearing existing webhook...');
    await makeRequest('deleteWebhook', { drop_pending_updates: true });
    
    // 3. Set new webhook
    console.log('\n3️⃣ Setting webhook...');
    await makeRequest('setWebhook', {
      url: WEBHOOK_URL,
      allowed_updates: ['message', 'callback_query', 'web_app_data'],
      drop_pending_updates: true
    });
    
    // 4. Set bot name
    console.log('\n4️⃣ Setting bot name...');
    await makeRequest('setMyName', {
      name: 'Somnia MiniHub'
    });
    
    // 5. Set bot commands
    console.log('\n5️⃣ Setting bot commands...');
    const commands = [
      { command: 'start', description: '🎮 Launch Somnia MiniHub' },
      { command: 'games', description: '🎯 View available games' },
      { command: 'stats', description: '📊 Platform statistics' },
      { command: 'leaderboard', description: '🏆 View top players' },
      { command: 'agent', description: '🤖 AI Agent information' },
      { command: 'pricing', description: '💎 View subscription plans' },
      { command: 'help', description: '❓ Get help and support' }
    ];
    
    await makeRequest('setMyCommands', { commands });
    
    // 6. Set menu button
    console.log('\n6️⃣ Setting menu button...');
    await makeRequest('setChatMenuButton', {
      menu_button: {
        type: 'web_app',
        text: '🎮 Somnia Games',
        web_app: { url: WEB_APP_URL }
      }
    });
    
    // 7. Set bot description
    console.log('\n7️⃣ Setting bot description...');
    const description = `🎮 Somnia MiniHub - AI-powered gaming platform on Somnia Network!

🚀 Experience the future of blockchain gaming:
• 15+ AI-powered mini-games
• Earn SMT tokens while playing
• Deploy your own AI gaming agent
• Compete on global leaderboards
• Real-time multiplayer gaming

🌟 Built on Somnia Network - the fastest EVM-compatible blockchain with 1M+ TPS!

Click the menu button or send /start to begin your gaming journey!`;
    
    await makeRequest('setMyDescription', { description });
    
    // 8. Set short description
    console.log('\n8️⃣ Setting short description...');
    await makeRequest('setMyShortDescription', { 
      short_description: '🎮 AI-powered gaming platform on Somnia Network. Play games, earn SMT tokens, deploy AI agents!' 
    });
    
    // 9. Verify setup
    console.log('\n9️⃣ Verifying setup...');
    const webhookInfo = await makeRequest('getWebhookInfo');
    if (webhookInfo.ok) {
      console.log(`   Webhook URL: ${webhookInfo.result.url}`);
      console.log(`   Pending updates: ${webhookInfo.result.pending_update_count}`);
    }
    
    console.log('\n🎉 Bot setup completed successfully!');
    console.log('\n📱 Bot Information:');
    console.log(`   Username: @Somnia_MiniHub_bot`);
    console.log(`   Link: https://t.me/Somnia_MiniHub_bot`);
    console.log(`   Web App: ${WEB_APP_URL}`);
    console.log(`   Webhook: ${WEBHOOK_URL}`);
    
    console.log('\n🔧 Test the bot:');
    console.log('1. Open https://t.me/Somnia_MiniHub_bot');
    console.log('2. Send /start command');
    console.log('3. Click the menu button to launch web app');
    console.log('4. Try other commands like /games, /stats');
    
  } catch (error) {
    console.error('\n❌ Setup failed:', error.message);
  }
}

// Run the setup
setupBot();