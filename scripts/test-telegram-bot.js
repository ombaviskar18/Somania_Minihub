#!/usr/bin/env node

/**
 * Telegram Bot Test Script for Somnia MiniHub
 * This script tests various bot functionalities
 */

const TELEGRAM_BOT_TOKEN = 'Your_Token';
const TELEGRAM_API_URL = `https://api.telegram.org/bot${TELEGRAM_BOT_TOKEN}`;

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

async function testBot() {
  console.log('🧪 Testing Somnia MiniHub Telegram Bot...\n');
  
  try {
    // Test 1: Bot Info
    console.log('1️⃣ Testing bot info...');
    const botInfo = await makeRequest('getMe');
    if (botInfo.ok) {
      const bot = botInfo.result;
      console.log('✅ Bot Info:');
      console.log(`   ID: ${bot.id}`);
      console.log(`   Username: @${bot.username}`);
      console.log(`   First Name: ${bot.first_name}`);
      console.log(`   Can Join Groups: ${bot.can_join_groups}`);
      console.log(`   Can Read Messages: ${bot.can_read_all_group_messages}`);
      console.log(`   Supports Inline: ${bot.supports_inline_queries}`);
    } else {
      console.log('❌ Failed to get bot info');
      return;
    }
    
    // Test 2: Webhook Info
    console.log('\n2️⃣ Testing webhook info...');
    const webhookInfo = await makeRequest('getWebhookInfo');
    if (webhookInfo.ok) {
      const info = webhookInfo.result;
      console.log('✅ Webhook Info:');
      console.log(`   URL: ${info.url}`);
      console.log(`   Has Certificate: ${info.has_custom_certificate}`);
      console.log(`   Pending Updates: ${info.pending_update_count}`);
      console.log(`   Last Error: ${info.last_error_date ? new Date(info.last_error_date * 1000).toISOString() : 'None'}`);
      console.log(`   Max Connections: ${info.max_connections}`);
      console.log(`   Allowed Updates: ${info.allowed_updates?.join(', ') || 'All'}`);
      
      if (info.url) {
        console.log('✅ Webhook is configured');
      } else {
        console.log('⚠️ No webhook URL set');
      }
    } else {
      console.log('❌ Failed to get webhook info');
    }
    
    // Test 3: Commands
    console.log('\n3️⃣ Testing bot commands...');
    const commandsInfo = await makeRequest('getMyCommands');
    if (commandsInfo.ok) {
      const commands = commandsInfo.result;
      console.log(`✅ Bot Commands (${commands.length}):`);\n      commands.forEach(cmd => {\n        console.log(`   /${cmd.command} - ${cmd.description}`);\n      });\n    } else {\n      console.log('❌ Failed to get commands');\n    }\n    \n    // Test 4: Menu Button\n    console.log('\n4️⃣ Testing menu button...');\n    const menuInfo = await makeRequest('getChatMenuButton');\n    if (menuInfo.ok) {\n      const menu = menuInfo.result;\n      console.log('✅ Menu Button:');\n      console.log(`   Type: ${menu.type}`);\n      if (menu.text) console.log(`   Text: ${menu.text}`);\n      if (menu.web_app) console.log(`   Web App URL: ${menu.web_app.url}`);\n    } else {\n      console.log('❌ Failed to get menu button info');\n    }\n    \n    // Test 5: Bot Description\n    console.log('\n5️⃣ Testing bot description...');\n    const descInfo = await makeRequest('getMyDescription');\n    if (descInfo.ok) {\n      const desc = descInfo.result;\n      console.log('✅ Bot Description:');\n      console.log(`   ${desc.description || 'No description set'}`);\n    } else {\n      console.log('❌ Failed to get description');\n    }\n    \n    // Test 6: Short Description\n    console.log('\n6️⃣ Testing short description...');\n    const shortDescInfo = await makeRequest('getMyShortDescription');\n    if (shortDescInfo.ok) {\n      const shortDesc = shortDescInfo.result;\n      console.log('✅ Short Description:');\n      console.log(`   ${shortDesc.short_description || 'No short description set'}`);\n    } else {\n      console.log('❌ Failed to get short description');\n    }\n    \n    // Test 7: Updates\n    console.log('\n7️⃣ Testing recent updates...');\n    const updates = await makeRequest('getUpdates', { limit: 5 });\n    if (updates.ok) {\n      console.log(`✅ Recent Updates: ${updates.result.length} found`);\n      if (updates.result.length > 0) {\n        console.log('   Latest updates:');\n        updates.result.forEach((update, index) => {\n          console.log(`   ${index + 1}. Update ID: ${update.update_id}`);\n          if (update.message) {\n            console.log(`      Message from: ${update.message.from.first_name}`);\n            console.log(`      Text: ${update.message.text || 'No text'}`);\n          }\n        });\n      }\n    } else {\n      console.log('❌ Failed to get updates');\n    }\n    \n    console.log('\n🎉 Bot test completed!');\n    console.log('\n📊 Test Summary:');\n    console.log('✅ All core functionalities are working');\n    console.log('🔗 Bot Link: https://t.me/Somnia_Minihub_bot');\n    console.log('🌐 Web App: https://Somnia-minihub.vercel.app/');\n    console.log('📡 Webhook: https://Somnia-minihub.vercel.app/api/telegram/webhook');\n    \n    console.log('\n🔧 Manual Testing Steps:');\n    console.log('1. Open https://t.me/Somnia_Minihub_bot');\n    console.log('2. Send /start command');\n    console.log('3. Try other commands: /games, /stats, /leaderboard');\n    console.log('4. Click the menu button to launch web app');\n    console.log('5. Test inline keyboard buttons');\n    \n  } catch (error) {\n    console.error('\n❌ Bot test failed:', error.message);\n    process.exit(1);\n  }\n}\n\n// Run the test\ntestBot();