# 🫘 BEANS Decider Bot

A fun Telegram bot that settles important disputes by making completely unbiased decisions between two people!

## 🎯 Features

- **Interactive Decision Making**: Ask BEANS to decide between two people for any question
- **Realistic Thinking Animation**: The bot shows thinking dots and witty comments while "deciding"
- **Variable Response Time**: Takes between 2-22 seconds to make decisions, just like real contemplation
- **Witty Commentary**: Includes sassy and humorous comments throughout the process
- **Simple Command Structure**: Easy-to-use `/decide` command format

## 🚀 Commands

- `/start` - Get started with BEANS and see usage instructions
- `/help` - Show help message with examples
- `/decide who is <something> me or @username` - Let BEANS make a decision!

## 💬 Usage Examples

```
/decide who is more handsome me or @john
/decide who is the bigger fool me or @sarah
/decide who is more likely to win me or @alex
/decide who is funnier me or @buddy
```

## 🎭 How It Works

1. User sends a `/decide` command with the format: `who is <something> me or @username`
2. BEANS shows thinking comments and animated dots for 2-22 seconds
3. BEANS announces the decision with witty commentary
4. The decision is final and scientifically accurate! 😏

## 🛠️ Setup & Installation

### Prerequisites
- Node.js 18+
- A Telegram Bot Token from [@BotFather](https://t.me/botfather)

### Local Development

1. Clone this repository:
```bash
git clone https://github.com/ikbenFranco/Battleebitz.git
cd beans-decider-bot
```

2. Install dependencies:
```bash
npm install
# or
bun install
```

3. Configure environment variables:
```bash
cp .env.example .env
```

Edit `.env` and add your bot token:
```
BOT_TOKEN=your_telegram_bot_token_here
```

4. Run the bot:
```bash
npm start
# or for development with auto-restart:
npm run dev
```

## 🚀 Deployment on Render

### Step 1: Prepare for Deployment

1. Make sure your `.env` file is configured with the production bot token
2. The bot includes a health check server that runs on the PORT environment variable

### Step 2: Deploy to Render

1. **Connect Repository**: Link your GitHub repository to Render
2. **Create New Web Service**: Choose "Web Service" (not Background Worker)
3. **Configure Build & Deploy**:
   - **Build Command**: `npm install`
   - **Start Command**: `npm start`
   - **Environment**: Node
4. **Set Environment Variables**:
   - `BOT_TOKEN`: Your Telegram bot token
   - `NODE_ENV`: `production`
5. **Deploy**: Click "Create Web Service"

### Step 3: Verify Deployment

1. Check the health endpoint: `https://your-app-name.onrender.com/health`
2. Test the bot in Telegram with `/start`

## 📁 Project Structure

```
beans-decider-bot/
├── index.js          # Main bot logic
├── server.js         # Health check server for Render
├── package.json      # Dependencies and scripts
├── .env              # Environment variables (not in git)
├── .env.example      # Environment template
├── .gitignore        # Git ignore rules
└── README.md         # This file
```

## 🎨 Customization

### Adding More Comments

You can customize the bot's personality by editing the comment arrays in `index.js`:

- `thinkingComments`: Comments shown while "thinking"
- `decisionComments`: Comments shown with the final decision
- `sassyComments`: Optional sassy remarks

### Adjusting Timing

Change the thinking duration by modifying the `getRandomDelay()` function:

```javascript
function getRandomDelay() {
    return Math.floor(Math.random() * 20000) + 2000; // 2-22 seconds
}
```

## 🐛 Troubleshooting

### Bot Not Responding
1. Check if the bot token is correct
2. Verify the bot is running (`npm start`)
3. Check the logs for any error messages

### Render Deployment Issues
1. Ensure the health check endpoint returns 200 OK
2. Check that all environment variables are set
3. Verify the start command is correct: `npm start`

### Message Not Updating
- The bot uses message editing for animations
- If rate limited, some animation frames might be skipped (this is normal)

## 📄 License

MIT License - feel free to modify and use as you like!

## 🤝 Contributing

1. Fork the repository
2. Create your feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

---

**Made with ❤️ and lots of ☕ by Franco**

*Remember: BEANS' decisions are final and scientifically accurate! 🧬*
