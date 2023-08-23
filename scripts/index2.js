const TelegramBot = require('node-telegram-bot-api');
const token = '6534548999:AAFNdBsQORmZAmg6-A5W3G5EW8fQNDKqdwQ'; // Замените на свой фактический токен бота
const bot = new TelegramBot(token, { polling: true });

// Объект для хранения последних трех сообщений для каждого пользователя
const allowedGroupChatId = -1001738327426;

const lastThreeMessages = {};

bot.on('message', async (msg) => {
    const chatId = msg.chat.id;
    const userId = msg.from.id;

    // Проверяем, существует ли запись для этого пользователя
    if (!lastThreeMessages[userId]) {
        lastThreeMessages[userId] = [];
    }

    // Проверяем, содержится ли это сообщение среди последних трех сообщений пользователя
    const isDuplicate = lastThreeMessages[userId].some((message) => message.text === msg.text);

    if (isDuplicate) {
        try {
            // Пытаемся удалить сообщение и обрабатываем возможные ошибки
            await bot.deleteMessage(chatId, msg.message_id);
        } catch (error) {
            // Если возникла ошибка, выводим ее в консоль
            console.error(`Error deleting duplicate message (Chat ID: ${chatId}, Message ID: ${msg.message_id}): ${error.message}`);
        }
    } else {
        // Если не дубликат, добавляем сообщение в начало списка последних сообщений пользователя
        lastThreeMessages[userId].unshift({ text: msg.text, timestamp: Date.now() });
        // Ограничиваем список только тремя последними сообщениями
        lastThreeMessages[userId] = lastThreeMessages[userId].slice(0, 4);
    }
});

bot.on('message', (msg) => {
    const chatId = msg.chat.id;

    // Проверяем, что сообщение пришло из разрешенной группы
    if (chatId !== allowedGroupChatId) {
        console.log(`Received a message from an unauthorized chat (Chat ID: ${chatId}). Ignoring.`);
        return;
    }

    // Ваш код для обработки сообщений из разрешенной группы
    console.log(`Received a message from the allowed group (Chat ID: ${chatId}): ${msg.text}`);
});

bot.on('polling_error', (error) => {
    console.error(error.message);
});

// Удаляем старые сообщения из lastThreeMessages каждый час
setInterval(() => {
    for (const userId in lastThreeMessages) {
        const messages = lastThreeMessages[userId];
        lastThreeMessages[userId] = messages.filter((message) => Date.now() - message.timestamp <= 3600000);
    }
}, 3600000);