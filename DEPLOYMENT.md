# Quick Deployment Guide for Vercel

## 🚀 Deploy in 3 Simple Steps

### Step 1: Import to Vercel
1. Go to [vercel.com](https://vercel.com) and sign in
2. Click "New Project"
3. Import your GitHub repository: `ombaviskar18/Somania_Minihub`
4. Select the `Somania_Minihub` folder as the root directory

### Step 2: Configure Environment Variables (Optional)
The app will work without any environment variables, but you can add these for enhanced features:

**Optional Environment Variables:**
- `TELEGRAM_BOT_TOKEN` - For Telegram bot functionality
- `TELEGRAM_BOT_USERNAME` - Your bot username (e.g., Somania_MiniHub_bot)
- `OPENAI_API_KEY` - For AI-powered game suggestions
- `NEXT_PUBLIC_APP_URL` - Your deployed app URL (auto-set by Vercel)

**How to add them in Vercel:**
1. In your project settings, go to "Environment Variables"
2. Add each variable with its value
3. Deploy again if needed

### Step 3: Deploy
1. Click "Deploy"
2. Wait for deployment to complete (2-3 minutes)
3. Your app will be live at `https://your-project-name.vercel.app`

## 🎮 What Works Out of the Box

✅ All games (Chess, Snake, Tetris, Ping Pong, etc.)
✅ Dashboard and navigation
✅ Leaderboard
✅ Game mechanics
✅ Responsive design

## 🤖 Optional Features (Require API Keys)

- **AI Game Suggestions** - Requires `OPENAI_API_KEY`
- **Telegram Bot** - Requires `TELEGRAM_BOT_TOKEN`

## 🔧 Troubleshooting

If deployment fails:
1. Make sure the root directory is set to `Somania_Minihub`
2. Check that all environment variables are properly formatted
3. Redeploy from the Vercel dashboard

## 📱 Test Your Deployment

After deployment, test these features:
- Navigate to `/dashboard` - Should show the game dashboard
- Try playing a game like `/dashboard/games/snake`
- Check that all games load properly

That's it! Your Somania MiniHub is now live! 🎉
