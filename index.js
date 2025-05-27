import TelegramBot from 'node-telegram-bot-api';
import dotenv from 'dotenv';
import './server.js'; // Start health check server

dotenv.config();

// Bot token from environment variable
const token = process.env.BOT_TOKEN;

if (!token) {
    console.error('❌ BOT_TOKEN environment variable is required!');
    console.error('Please set your Telegram bot token in the .env file');
    process.exit(1);
}

// Create a bot that uses 'polling' to fetch new updates
const bot = new TelegramBot(token, { polling: true });

// Witty thinking comments
const thinkingComments = [
    "🤔 Hmm, this is a tough one...",
    "🧠 Let me consult my superior intelligence...",
    "⚖️ Weighing the evidence carefully...",
    "🎭 Analyzing the drama levels...",
    "🔍 Investigating the situation...",
    "💭 This requires deep contemplation...",
    "🎪 What a circus this is...",
    "😏 Oh, this is interesting...",
    "🎯 Calculating the odds...",
    "🌟 The stars are aligning...",
    "🎲 Rolling the cosmic dice...",
    "👑 Determining the hierarchy...",
    "🔮 Consulting the crystal ball...",
    "📊 Running advanced algorithms...",
    "🎨 Appreciating the artistry of this question...",
    "🎪 What a delightful mess...",
    "🧙‍♂️ Channeling ancient wisdom...",
    "🎭 The plot thickens...",
    "🚀 Launching investigation protocols...",
    "🎯 Precision targeting in progress..."
];

// Final decision comments
const decisionComments = [
    "The verdict is crystal clear! 💎",
    "After careful deliberation... 🎭",
    "The beans have spoken! 🫘",
    "Case closed! 🔨",
    "The universe has decided! 🌌",
    "Elementary, my dear Watson! 🕵️",
    "The answer was obvious all along! 😏",
    "Scientific analysis complete! 🧬",
    "The cosmic scales have tipped! ⚖️",
    "Behold, the truth emerges! ✨",
    "The drama concludes! 🎬",
    "Justice has been served! ⚡",
    "The mystery is solved! 🔍",
    "Destiny has chosen! 🌟",
    "The final judgment! 👨‍⚖️"
];

// Additional sassy comments (optional)
const sassyComments = [
    "Honestly, wasn't even close! 😂",
    "Sorry, not sorry! 🤷‍♂️",
    "The competition was fierce... just kidding! 😏",
    "Better luck next time! 😘",
    "Don't take it personally... or do! 🤭",
    "The people have spoken! 📢",
    "Science doesn't lie! 🧪",
    "Math is math! 📐",
    "Facts don't care about feelings! 💯",
    "The evidence was overwhelming! 📋"
];

// Function to get random item from array
function getRandomItem(array) {
    return array[Math.floor(Math.random() * array.length)];
}

// Function to get random delay between 2-22 seconds
function getRandomDelay() {
    return Math.floor(Math.random() * 20000) + 2000; // 2000ms to 22000ms
}

// Function to parse the decide command
function parseDecideCommand(text) {
    // Remove /decide and trim
    const command = text.replace('/decide', '').trim();

    // Look for pattern: "who is <input> me or @username" or "who is <input> @username or me"
    const regex = /who is (.+?) (me|@\w+) or (me|@\w+)/i;
    const match = command.match(regex);

    if (!match) {
        return null;
    }

    const question = match[1].trim();
    const person1 = match[2].trim();
    const person2 = match[3].trim();

    return { question, person1, person2 };
}

// Function to create thinking animation
async function showThinkingAnimation(chatId, messageId) {
    const dots = ['⏳', '⏳.', '⏳..', '⏳...'];
    let dotIndex = 0;

    // Show thinking comment
    const thinkingText = getRandomItem(thinkingComments);
    await bot.editMessageText(thinkingText, {
        chat_id: chatId,
        message_id: messageId
    });

    // Wait a bit before starting dots
    await new Promise(resolve => setTimeout(resolve, 1500));

    // Animate dots
    const animationDuration = getRandomDelay() - 1500; // Subtract the initial wait
    const dotInterval = 800; // Change dots every 800ms
    const animationSteps = Math.floor(animationDuration / dotInterval);

    for (let i = 0; i < animationSteps; i++) {
        const dotText = `${thinkingText} ${dots[dotIndex]}`;
        try {
            await bot.editMessageText(dotText, {
                chat_id: chatId,
                message_id: messageId
            });
        } catch (error) {
            // Ignore rate limit errors
            if (!error.message.includes('message is not modified')) {
                console.log('Animation error:', error.message);
            }
        }

        dotIndex = (dotIndex + 1) % dots.length;
        await new Promise(resolve => setTimeout(resolve, dotInterval));
    }
}

// Listen for /decide command
bot.onText(/\/decide (.+)/, async (msg, match) => {
    const chatId = msg.chat.id;
    const userId = msg.from.id;
    const username = msg.from.username || msg.from.first_name || 'User';

    console.log(`Decide command from ${username}: ${match[1]}`);

    // Parse the command
    const parsed = parseDecideCommand(match[0]);

    if (!parsed) {
        bot.sendMessage(chatId,
            `🤨 I don't understand that format, ${username}!\n\n` +
            `Use: \`/decide who is <something> me or @username\`\n` +
            `Example: \`/decide who is more handsome me or @john\``,
            { parse_mode: 'Markdown' }
        );
        return;
    }

    const { question, person1, person2 } = parsed;

    // Send initial message
    const initialMessage = await bot.sendMessage(chatId, '🤖 BEANS is thinking...');

    try {
        // Show thinking animation
        await showThinkingAnimation(chatId, initialMessage.message_id);

        // Randomly choose winner
        const winner = Math.random() < 0.5 ? person1 : person2;

        // Replace "me" with the user's mention
        const finalWinner = winner === 'me' ? `@${username}` : winner;

        // Create final response
        const decisionComment = getRandomItem(decisionComments);
        const sassyComment = Math.random() < 0.6 ? `\n${getRandomItem(sassyComments)}` : '';

        const finalMessage =
            `${decisionComment}\n\n` +
            `🫘 **BEANS decides** ${finalWinner} is the one who is **${question}**!${sassyComment}`;

        // Send final decision
        await bot.editMessageText(finalMessage, {
            chat_id: chatId,
            message_id: initialMessage.message_id,
            parse_mode: 'Markdown'
        });

    } catch (error) {
        console.error('Error during decision process:', error);
        bot.editMessageText(
            '❌ Something went wrong! Even BEANS makes mistakes sometimes... 😅',
            {
                chat_id: chatId,
                message_id: initialMessage.message_id
            }
        );
    }
});

// Listen for /start command
bot.onText(/\/start/, (msg) => {
    const chatId = msg.chat.id;
    const username = msg.from.first_name || 'there';

    bot.sendMessage(chatId,
        `👋 Hey ${username}! I'm **BEANS Decider** 🫘\n\n` +
        `I help settle important disputes by making completely unbiased decisions! 😏\n\n` +
        `**How to use me:**\n` +
        `\`/decide who is <something> me or @username\`\n\n` +
        `**Examples:**\n` +
        `• \`/decide who is more handsome me or @john\`\n` +
        `• \`/decide who is the bigger fool me or @sarah\`\n` +
        `• \`/decide who is more likely to win me or @alex\`\n\n` +
        `Let the beans decide your fate! 🎲✨`,
        { parse_mode: 'Markdown' }
    );
});

// Listen for /help command
bot.onText(/\/help/, (msg) => {
    const chatId = msg.chat.id;

    bot.sendMessage(chatId,
        `🆘 **BEANS Decider Help** 🫘\n\n` +
        `**Commands:**\n` +
        `• \`/start\` - Get started with BEANS\n` +
        `• \`/help\` - Show this help message\n` +
        `• \`/decide who is <something> me or @username\` - Let BEANS decide!\n\n` +
        `**Examples:**\n` +
        `• \`/decide who is smarter me or @friend\`\n` +
        `• \`/decide who is funnier me or @buddy\`\n` +
        `• \`/decide who is more awesome me or @pal\`\n\n` +
        `Remember: BEANS' decisions are final and scientifically accurate! 🧬`,
        { parse_mode: 'Markdown' }
    );
});

// Error handling
bot.on('error', (error) => {
    console.error('Bot error:', error);
});

bot.on('polling_error', (error) => {
    console.error('Polling error:', error);
});

console.log('🫘 BEANS Decider Bot is running!');
console.log('Ready to make important life decisions...');
