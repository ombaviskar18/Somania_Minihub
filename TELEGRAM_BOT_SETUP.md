# 🤖 Somnia MiniHub Telegram Bot Setup

This guide explains how to set up and use the Somnia MiniHub Telegram bot integration.

## 📋 Bot Information

- **Bot Username**: `@Somnia_Minihub_bot`
- **Bot Token**: `Your_Token`
- **Web App URL**: `http://Somnia-minihub.vercel.app/`
- **GitHub Repository**: `https://github.com/ombaviskar18/Somnia_Minihub`

## 🚀 Quick Start

### 1. Access the Bot
- Open Telegram and search for `@Somnia_Minihub_bot`
- Or click this link: [https://t.me/Somnia_Minihub_bot](https://t.me/Somnia_Minihub_bot)
- Send `/start` to begin

### 2. Available Commands
```
/start      - Launch Somnia MiniHub
/games      - View available games
/stats      - Platform statistics  
/leaderboard - View top players
/agent      - AI Agent information
/pricing    - View subscription plans
/help       - Get help and support
```

### 3. Web App Integration
The bot includes a Web App that opens Somnia MiniHub directly in Telegram:
- Click the "🎮 Play Games" menu button
- Use inline keyboard buttons in bot messages
- Access all platform features seamlessly

## 🛠️ Technical Setup

### Environment Variables
Create a `.env.local` file with:
```env
TELEGRAM_BOT_TOKEN=Your_Token
TELEGRAM_BOT_USERNAME=SomniaMinihubBot
NEXT_PUBLIC_APP_URL=http://Somnia-minihub.vercel.app/
NEXT_PUBLIC_TELEGRAM_WEB_APP_URL=http://Somnia-minihub.vercel.app/
```

### API Endpoints

#### Webhook Endpoint
- **URL**: `/api/telegram/webhook`
- **Method**: POST
- **Purpose**: Handles incoming messages from Telegram

#### Setup Endpoint  
- **URL**: `/api/telegram/setup`
- **Method**: POST
- **Purpose**: Configures bot commands and webhook

### Bot Configuration
Run the setup endpoint to configure the bot:
```bash
curl -X POST https://Somnia-minihub.vercel.app/api/telegram/setup
```

This will:
- Set webhook URL
- Configure bot commands
- Set menu button
- Set bot description

## 🎮 Features

### 1. Game Integration
- **Direct Gaming**: Play games directly in Telegram
- **Web App**: Full platform access via Telegram Web Apps
- **Real-time Updates**: Instant notifications and game alerts

### 2. Reward System
- **SMT Tokens**: Earn Somnia Test Tokens
- **Leaderboards**: Compete with other players
- **Achievements**: Unlock special rewards

### 3. AI Agent
- **Revenue Tracking**: Monitor AI agent earnings
- **Automation**: Autonomous gaming and trading
- **Analytics**: Performance insights

### 4. Social Features
- **Multiplayer**: Play with friends
- **Tournaments**: Join competitive events
- **Community**: Connect with other gamers

## 📱 User Experience

### Bot Flow
1. **Welcome Message**: Introduction and main features
2. **Game Selection**: Choose from 15+ available games
3. **Web App Launch**: Seamless transition to full platform
4. **Progress Tracking**: Monitor scores and rewards
5. **Social Sharing**: Share achievements

### Interface Elements
- **Inline Keyboards**: Quick action buttons
- **Web App Buttons**: Launch full platform
- **Rich Messages**: Formatted text with emojis
- **Menu Button**: Persistent game access

## 🔧 Development

### File Structure
```
lib/telegram/
├── bot.js                 # Bot logic and message handlers
app/api/telegram/
├── webhook/route.js       # Webhook handler
└── setup/route.js         # Bot setup endpoint
```

### Key Functions
- `sendWelcomeMessage()` - Welcome new users
- `sendGameStats()` - Display platform statistics
- `sendHelpMessage()` - Provide user support
- `setBotCommands()` - Configure bot commands
- `setBotMenuButton()` - Set persistent menu

### Message Handling
The bot handles various message types:
- **Text Messages**: Commands and user input
- **Callback Queries**: Button presses
- **Web App Data**: Data from web app interactions

## 🌐 Web App Integration

### Features
- **Seamless Experience**: Native Telegram integration
- **Full Platform Access**: All Somnia MiniHub features
- **Real-time Sync**: Synchronized with bot interactions
- **Responsive Design**: Optimized for mobile

### Implementation
```javascript
// Web App button in inline keyboard
{
  text: '🎮 Launch Game',
  web_app: { url: 'http://Somnia-minihub.vercel.app/' }
}

// Menu button configuration
{
  type: 'web_app',
  text: '🎮 Play Games',
  web_app: { url: 'http://Somnia-minihub.vercel.app/' }
}
```

## 📊 Analytics & Monitoring

### Bot Metrics
- **User Engagement**: Command usage statistics
- **Game Launch Rate**: Web app access frequency
- **Retention**: Daily/weekly active users
- **Feature Usage**: Most popular bot features

### Performance Monitoring
- **Response Time**: Bot message handling speed
- **Error Rate**: Failed webhook deliveries
- **Uptime**: Bot availability status
- **Web App Performance**: Loading times and errors

## 🔒 Security

### Best Practices
- **Token Security**: Bot token stored securely
- **Webhook Validation**: Verify Telegram requests
- **Rate Limiting**: Prevent spam and abuse
- **Data Privacy**: Minimal user data collection

### Error Handling
- **Graceful Failures**: User-friendly error messages
- **Logging**: Comprehensive error tracking
- **Fallback Options**: Alternative access methods
- **Recovery**: Automatic error recovery

## 🚀 Deployment

### Vercel Deployment
1. Deploy to Vercel: `vercel --prod`
2. Set environment variables in Vercel dashboard
3. Run setup endpoint: `/api/telegram/setup`
4. Test bot functionality

### Webhook Configuration
The webhook URL is automatically set to:
`https://Somnia-minihub.vercel.app/api/telegram/webhook`

## 📞 Support

### Getting Help
- Use `/help` command in bot
- Check GitHub repository issues
- Contact support team
- Join Somnia Discord community

### Common Issues
1. **Bot Not Responding**: Check webhook configuration
2. **Web App Not Loading**: Verify URL configuration  
3. **Commands Not Working**: Run setup endpoint
4. **Missing Features**: Update bot code and redeploy

## 🔄 Updates

### Bot Updates
- New game integrations
- Enhanced AI features
- Improved user experience
- Additional Web App functionality

### Maintenance
- Regular bot health checks
- Webhook monitoring
- Performance optimization
- Security updates

---

**🎮 Ready to start gaming on Telegram? Visit [@Somnia_Minihub_bot](https://t.me/Somnia_Minihub_bot) now!**