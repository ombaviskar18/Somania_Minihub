// Bot Status Check Script for Somania MiniHub
// Run this with: node check-bot-status.js

const TELEGRAM_BOT_TOKEN = '8306788744:AAEupHI0I1zwmEvy_WdtoGO-mFnZeP904kA';
const TELEGRAM_API_URL = `https://api.telegram.org/bot${TELEGRAM_BOT_TOKEN}`;

async function makeRequest(endpoint) {
  try {
    const response = await fetch(`${TELEGRAM_API_URL}/${endpoint}`);
    const result = await response.json();
    return result;
  } catch (error) {
    console.error(`❌ Error with ${endpoint}:`, error.message);
    return { ok: false, error: error.message };
  }
}

async function checkBotStatus() {
  console.log('🔍 Checking Somania MiniHub Telegram Bot Status...\n');
  
  try {
    // 1. Bot Info
    console.log('1️⃣ Bot Information:');
    const botInfo = await makeRequest('getMe');
    if (botInfo.ok) {
      const bot = botInfo.result;
      console.log(`   ✅ Name: ${bot.first_name}`);
      console.log(`   ✅ Username: @${bot.username}`);
      console.log(`   ✅ ID: ${bot.id}`);
      console.log(`   ✅ Can join groups: ${bot.can_join_groups}`);
      console.log(`   ✅ Supports inline: ${bot.supports_inline_queries}`);
    } else {
      console.log('   ❌ Failed to get bot info');
    }
    
    // 2. Webhook Status
    console.log('\n2️⃣ Webhook Status:');
    const webhookInfo = await makeRequest('getWebhookInfo');
    if (webhookInfo.ok) {
      const webhook = webhookInfo.result;
      console.log(`   ✅ URL: ${webhook.url}`);
      console.log(`   ✅ Has certificate: ${webhook.has_custom_certificate}`);
      console.log(`   ✅ Pending updates: ${webhook.pending_update_count}`);
      console.log(`   ✅ Max connections: ${webhook.max_connections}`);
      if (webhook.last_error_date) {
        console.log(`   ⚠️ Last error: ${new Date(webhook.last_error_date * 1000).toISOString()}`);
        console.log(`   ⚠️ Error message: ${webhook.last_error_message}`);
      } else {
        console.log('   ✅ No recent errors');
      }
    } else {
      console.log('   ❌ Failed to get webhook info');
    }
    
    // 3. Commands
    console.log('\n3️⃣ Bot Commands:');
    const commandsInfo = await makeRequest('getMyCommands');
    if (commandsInfo.ok) {
      const commands = commandsInfo.result;
      console.log(`   ✅ Total commands: ${commands.length}`);
      commands.forEach(cmd => {
        console.log(`   • /${cmd.command} - ${cmd.description}`);
      });
    } else {
      console.log('   ❌ Failed to get commands');
    }
    
    // 4. Menu Button
    console.log('\n4️⃣ Menu Button:');
    const menuInfo = await makeRequest('getChatMenuButton');
    if (menuInfo.ok) {
      const menu = menuInfo.result;
      console.log(`   ✅ Type: ${menu.type}`);
      if (menu.text) console.log(`   ✅ Text: ${menu.text}`);
      if (menu.web_app) console.log(`   ✅ Web App URL: ${menu.web_app.url}`);
    } else {
      console.log('   ❌ Failed to get menu button');
    }
    
    // 5. Recent Updates
    console.log('\n5️⃣ Recent Activity:');
    const updates = await makeRequest('getUpdates?limit=3');
    if (updates.ok) {
      console.log(`   ✅ Recent updates: ${updates.result.length}`);
      if (updates.result.length > 0) {
        updates.result.forEach((update, index) => {
          console.log(`   ${index + 1}. Update ID: ${update.update_id}`);
          if (update.message) {
            console.log(`      From: ${update.message.from.first_name} (@${update.message.from.username || 'no_username'})`);
            console.log(`      Text: "${update.message.text || 'No text'}"`);
            console.log(`      Date: ${new Date(update.message.date * 1000).toISOString()}`);
          }
        });
      } else {
        console.log('   📝 No recent messages');
      }
    } else {
      console.log('   ❌ Failed to get updates');
    }
    
    console.log('\n🎯 Quick Test Links:');
    console.log('   Bot: https://t.me/Somania_MiniHub_bot');
    console.log('   Web App: https://somania-minihub.vercel.app/');
    console.log('   Test Page: https://somania-minihub.vercel.app/telegram-test.html');
    
    console.log('\n✅ Status check completed!');
    console.log('\n📋 Next Steps:');
    console.log('1. Open the bot link above');
    console.log('2. Send /start to test welcome message');
    console.log('3. Click menu button to test web app');
    console.log('4. Try other commands like /games, /leaderboard');
    
  } catch (error) {
    console.error('\n❌ Status check failed:', error.message);
  }
}

// Run the status check
checkBotStatus();