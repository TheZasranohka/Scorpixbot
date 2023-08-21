const axios = require('axios');
const fs = require('fs');

// Ваш токен Telegram бота
const botToken = '6388009418:AAE-RuZkK-hCaQc5j7pRtrPGIAkxeovaLQA';

// chat_id, куда необходимо загрузить аватарку (можно получить как описано в предыдущем ответе)
const chatId = '1082446304';

// Путь к файлу с аватаркой (изображением в формате .jpg, .png и т.п.)
const avatarFilePath = 'C:/Users/Windows 11/Desktop/scorpixsquare.gif';

// Функция для загрузки аватарки
async function uploadAvatar() {
    try {
        const avatarData = await fs.promises.readFile(avatarFilePath);

        // Отправляем POST-запрос к методу setChatPhoto Telegram Bot API
        const response = await axios.post(`https://api.telegram.org/bot${botToken}/setChatPhoto`, {
            chat_id: chatId,
            photo: avatarData,
        });

        // Обрабатываем ответ от Telegram API
        if (response.data.ok) {
            console.log('Аватарка успешно загружена!');
        } else {
            console.error('Произошла ошибка при загрузке аватарки:', response.data);
        }
    } catch (error) {
        console.error('Произошла ошибка:', error.message);
    }
}

// Запускаем функцию загрузки аватарки
uploadAvatar();