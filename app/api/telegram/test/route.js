import { NextResponse } from 'next/server';

const TELEGRAM_BOT_TOKEN = process.env.TELEGRAM_BOT_TOKEN || 'Your_Token';
const TELEGRAM_API_URL = `https://api.telegram.org/bot${TELEGRAM_BOT_TOKEN}`;
const WEB_APP_URL = process.env.NEXT_PUBLIC_APP_URL || 'https://Somnia-minihub.vercel.app/';

async function sendTestMessage(chatId) {
  try {
    const message = `🧪 <b>Somnia MiniHub Test Message</b>

🎮 This is a test message from your Somnia MiniHub bot!

✅ If you're seeing this, the bot is working correctly.

🚀 <b>Next steps:</b>
• Try the /start command
• Click the menu button below
• Use the web app button to launch games

🌟 <b>Web App URL:</b> ${WEB_APP_URL}`;

    const keyboard = {
      inline_keyboard: [
        [
          {
            text: '🎮 Launch Somnia MiniHub',
            web_app: { url: WEB_APP_URL }
          }
        ],
        [
          {
            text: '🎯 View Games',
            web_app: { url: `${WEB_APP_URL}dashboard` }
          },
          {
            text: '🏆 Leaderboard',
            web_app: { url: `${WEB_APP_URL}dashboard/leaderboard` }
          }
        ],
        [
          {
            text: '🤖 AI Agent',
            web_app: { url: `${WEB_APP_URL}dashboard/agent` }
          },
          {
            text: '💎 Pricing',
            web_app: { url: `${WEB_APP_URL}dashboard/upgrade` }
          }
        ]
      ]
    };

    const response = await fetch(`${TELEGRAM_API_URL}/sendMessage`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        chat_id: chatId,
        text: message,
        parse_mode: 'HTML',
        reply_markup: keyboard
      }),
    });
    
    return await response.json();
  } catch (error) {
    console.error('Error sending test message:', error);
    throw error;
  }
}

export async function POST(request) {
  try {
    const { chatId } = await request.json();
    
    if (!chatId) {
      return NextResponse.json(
        { error: 'Chat ID is required' },
        { status: 400 }
      );
    }
    
    const result = await sendTestMessage(chatId);
    
    return NextResponse.json({
      success: true,
      message: 'Test message sent successfully!',
      result: result,
      bot_info: {
        username: '@Somnia_MiniHub_bot',
        bot_link: 'https://t.me/Somnia_MiniHub_bot',
        web_app_url: WEB_APP_URL
      }
    });
    
  } catch (error) {
    console.error('Test message error:', error);
    return NextResponse.json(
      { 
        success: false,
        error: 'Failed to send test message',
        details: error.message 
      },
      { status: 500 }
    );
  }
}

export async function GET() {
  try {
    // Get bot info and recent updates
    const botInfoResponse = await fetch(`${TELEGRAM_API_URL}/getMe`);
    const botInfo = await botInfoResponse.json();
    
    const updatesResponse = await fetch(`${TELEGRAM_API_URL}/getUpdates?limit=5`);
    const updates = await updatesResponse.json();
    
    const webhookResponse = await fetch(`${TELEGRAM_API_URL}/getWebhookInfo`);
    const webhookInfo = await webhookResponse.json();
    
    return NextResponse.json({
      bot_info: botInfo,
      recent_updates: updates,
      webhook_info: webhookInfo,
      instructions: {
        test_message: 'POST to this endpoint with {"chatId": "YOUR_CHAT_ID"} to send a test message',
        get_chat_id: 'Send any message to the bot and check the webhook logs for your chat ID',
        bot_link: 'https://t.me/Somnia_MiniHub_bot'
      }
    });
    
  } catch (error) {
    console.error('Error getting bot test info:', error);
    return NextResponse.json(
      { error: 'Failed to get bot test information' },
      { status: 500 }
    );
  }
}