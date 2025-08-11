// Telegram Bot Configuration for Somania MiniHub
const TELEGRAM_BOT_TOKEN = '8306788744:AAEupHI0I1zwmEvy_WdtoGO-mFnZeP904kA';
const TELEGRAM_API_URL = `https://api.telegram.org/bot${TELEGRAM_BOT_TOKEN}`;
const WEB_APP_URL = 'http://somania-minihub.vercel.app/';
const BOT_USERNAME = '@Somania_Minihub_bot';

/**
 * Send message to Telegram chat
 */
export async function sendMessage(chatId, text, options = {}) {
  try {
    const response = await fetch(`${TELEGRAM_API_URL}/sendMessage`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        chat_id: chatId,
        text: text,
        parse_mode: 'HTML',
        ...options,
      }),
    });
    
    return await response.json();
  } catch (error) {
    console.error('Error sending message:', error);
    throw error;
  }
}

/**
 * Send welcome message with web app button
 */
export async function sendWelcomeMessage(chatId) {
  const welcomeText = `
🎮 <b>Welcome to Somania MiniHub!</b>

🚀 <b>Experience AI-powered gaming on Somania Network</b>

💰 <b>What you can do:</b>
• Play 15+ AI-powered mini-games
• Earn SMT tokens while gaming
• Deploy your own AI gaming agent
• Compete on global leaderboards
• Join real-time multiplayer matches

🌟 <b>Built on Somania Network:</b>
• Ultra-fast blockchain (1M+ TPS)
• Sub-second transaction finality
• EVM-compatible smart contracts
• Low gas fees

<b>🎯 Ready to start gaming?</b>
Click the button below to launch the full platform! 👇
  `;

  const keyboard = {
    inline_keyboard: [
      [
        {
          text: '🚀 Launch Somania MiniHub',
          web_app: { url: WEB_APP_URL }
        }
      ],
      [
        {
          text: '🎮 View Games',
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
      ],
      [
        {
          text: '📖 GitHub Repository',
          url: 'https://github.com/ombaviskar18/Somania_Minihub'
        },
        {
          text: '🌐 Somania Network',
          url: 'https://docs.somnia.network/'
        }
      ]
    ]
  };

  return await sendMessage(chatId, welcomeText, {
    reply_markup: keyboard
  });
}

/**
 * Send game stats message
 */
export async function sendGameStats(chatId) {
  const statsText = `
📊 <b>Somania MiniHub Statistics</b>

🎮 <b>Games Available:</b> 15+
👥 <b>Active Players:</b> 12,847
🏆 <b>Games Played:</b> 1,234,567
💰 <b>Rewards Distributed:</b> 456,789 SMT
⚡ <b>Active Today:</b> 3,421

<b>🔥 Popular Games:</b>
• Connect Four AI
• Reaction Duel
• Chess Blitz
• Memory Match
• Snake Game

Ready to join the action? 🚀
  `;

  const keyboard = {
    inline_keyboard: [
      [
        {
          text: '🎮 Play Now',
          web_app: { url: WEB_APP_URL }
        }
      ]
    ]
  };

  return await sendMessage(chatId, statsText, {
    reply_markup: keyboard
  });
}

/**
 * Send help message
 */
export async function sendHelpMessage(chatId) {
  const helpText = `
❓ <b>Somania MiniHub Help</b>

<b>🎮 Gaming Commands:</b>
/start - Welcome & launch game
/games - View available games
/stats - Platform statistics
/leaderboard - Top players
/agent - AI Agent info
/pricing - Subscription plans

<b>🚀 Quick Actions:</b>
• Use the menu button to access all features
• Click "Launch Game" to start playing
• Connect your MetaMask for rewards
• Join tournaments for bigger prizes

<b>🔗 Useful Links:</b>
• Website: http://somania-minihub.vercel.app/
• GitHub: https://github.com/ombaviskar18/Somania_Minihub
• Somania Network: https://docs.somnia.network/

Need more help? Contact our support team! 💬
  `;

  return await sendMessage(chatId, helpText);
}

/**
 * Handle bot commands
 */
export function getBotCommands() {
  return [
    { command: 'start', description: 'Start gaming on Somania MiniHub' },
    { command: 'games', description: 'View available games' },
    { command: 'stats', description: 'Platform statistics' },
    { command: 'leaderboard', description: 'View top players' },
    { command: 'agent', description: 'AI Agent information' },
    { command: 'pricing', description: 'View subscription plans' },
    { command: 'help', description: 'Get help and support' }
  ];
}

/**
 * Set bot commands
 */
export async function setBotCommands() {
  try {
    const response = await fetch(`${TELEGRAM_API_URL}/setMyCommands`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        commands: getBotCommands()
      }),
    });
    
    return await response.json();
  } catch (error) {
    console.error('Error setting bot commands:', error);
    throw error;
  }
}

/**
 * Set bot menu button
 */
export async function setBotMenuButton() {
  try {
    const response = await fetch(`${TELEGRAM_API_URL}/setChatMenuButton`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        menu_button: {
          type: 'web_app',
          text: '🎮 Play Games',
          web_app: { url: WEB_APP_URL }
        }
      }),
    });
    
    return await response.json();
  } catch (error) {
    console.error('Error setting menu button:', error);
    throw error;
  }
}