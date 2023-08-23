const telegramBot = require("node-telegram-bot-api");

const token = '6388009418:AAE-RuZkK-hCaQc5j7pRtrPGIAkxeovaLQA';

const tokennotuse = '6388009418:AAE-RuZkK-hCaQc5j7pRtrPGIAkxeovaLQA';
const bot = new telegramBot(token, {polling: true});

const pressedButtons = {};
const pressedQuestions = {};

let detailedText = '';

let forwarding = false;



const start = async (url, options) => {

    await bot.setMyCommands([
        {command: '/start', description: 'Начать'},
        {command: '/info', description: 'Информация о боте'},
        {command: '/tarif', description: 'Наши вклады'},
        {command: '/questions', description: 'Ответы на вопросы'},
    ])

    function sendTarifButtonMessage(chatId) {
        const message = '📊 Выберите свой идеальный тариф среди наших лучших предложений! 🏆\n' +
            '\n' +
            'Scorpix предлагает разнообразные тарифы, которые помогут вам увеличить ваш капитал с уверенностью и безопасностью. 💼 Наша компания является крупным рекламным холдингом в сфере недвижимости ОАЭ, и наши клиенты уже давно пользуются преимуществами наших тарифных планов. 💰\n' +
            '\n' +
            'Выбирайте из множества опций и начинайте зарабатывать с нами:';
        const btnOptions = {
            reply_markup: {
                inline_keyboard: [
                    [
                        {text: '«FAIRWAY VILLAS»', callback_data: 'button1'},
                        {text: '«OHANA BY THE SEA»', callback_data: 'ohana'},
                    ],
                    [
                        {text: '«SAMANA MYKONOS»', callback_data: 'button3'},
                        {text: '«MAMA RESIDENCES»', callback_data: 'button4'},
                    ],
                    [
                        {text: '«BEACH OASIS»', callback_data: 'button5'},
                        {text: '«BURJ BINGHATTI»', callback_data: 'bugati'},
                    ],
                ],
            },
        };
        bot.sendMessage(chatId, message, btnOptions);
    };

    function sendQuestionsButtonMessage(chatId) {
        const message = 'Часто задаваемые вопросы представлены ниже. Если вы не нашли ответ на свой вопрос используйте команду /forward.';
        const quesoptions = {
            reply_markup: {
                inline_keyboard: [
                    [{ text: 'Что такое «Цена объекта»?', callback_data: 'question_button1' }],
                    [{ text: 'Что такое «Рекламный депозит на команду»?', callback_data: 'question_button2' }],
                    [{ text: 'Что такое «Количество участников команды»?', callback_data: 'question_button3' }],
                    [{ text: 'Что такое «Депозит на одного члена команды»?', callback_data: 'question_button4' }],
                    [{ text: 'Что такое «Доход Scorpix за продажу объекта»?', callback_data: 'question_button5' }],
                    [{ text: 'Что такое «Комиссия Scorpix»?', callback_data: 'question_button6' }],
                    [{ text: 'Что такое «Чистая прибыль команды с продажи»?', callback_data: 'question_button7' }],
                    [{ text: 'Что такое «Чистая прибыль одного участника команды»?', callback_data: 'question_button8' }],
                    [{ text: 'Что такое «Срок работы командного депозита»?', callback_data: 'question_button9' }],
                    [{ text: 'Где я могу просмотреть объекты, которые рекламируются?', callback_data: 'question_button10' }],
                    [{ text: 'Чем можете гарантировать безопасность средств?', callback_data: 'question_button11' }],
                    [{ text: 'Есть ли у нашего проекта успешные кейсы и положительные отзывы?', callback_data: 'question_button12' }],
                ],
            },
        };
        bot.sendMessage(chatId, message, quesoptions);
    }

    const fourwardoptions= {
        reply_markup: {
            inline_keyboard: [
                [
                    {
                        text: 'Подробнее о нас:',
                        callback_data: 'button_pressed',
                    },
                ],
            ],
        },
    };

    const infooptions= {
        reply_markup: {
            inline_keyboard: [
                [
                    {
                        text: 'Подробнее о нас:',
                        callback_data: 'button_pressed',
                    },
                ],
            ],
        },
    };

    const referaloptions= {
        reply_markup: {
            inline_keyboard: [
                [
                    {
                        text: 'Стать партнером:',
                        url: 'https://scorpix.io',
                    },
                ],
            ],
        },
    };



    bot.on('callback_query', async (query) => {
        const chatId = query.message.chat.id;
        if (query.data === 'button_pressed') {
            await bot.sendMessage(chatId, 'Мы предлагаем Вам стать частью нашей команды.Наши клиенты уже заработали более 30% годовых на рекламе. Вам не нужно обладать миллионным капиталом, для того чтобы зарабатывать дополнительно от $2500 до $5000 в месяц. Scorpix поможет вам выйти на этот уровень дохода в течении 2-х месяцев, коллективно рекламируя недвижимость в Эмиратах вы получаете:\n' +
                '\n' +
                '• *Экспертную поддержку*     • *Сильное комьюнити* \n' +
                '\n' +
                '• *Стабильный доход от $2500  в месяц* \n' +
                '\n' +
                '• *Возможность осуществить свою мечту* \n' +
                '\n' +
                '• *Дисконт на посещение Дубая как турист* \n' +
                '\n' +
                '• *Возможность посетить Дубай вместе со своей семьей* \n' +
                '\n' +
                '• *Развитие лидерских и командных качеств* \n' +
                '\n' +
                '• *Возможность купить / инвестировать напрямую в недвижимость Дубая* \n' +
                '\n' +
                '*Больше информации на сайте: scorpix.io *' , {parse_mode: 'Markdown'})
        }
    });

    bot.on('callback_query', async (query) => {
        const chatId = query.message.chat.id;
        if (!pressedButtons[chatId] || !pressedButtons[chatId][query.data]) {
            switch (query.data) {
                case 'button1':
                    await bot.sendPhoto(chatId, "https://realestatedubai.online/oc-content/uploads/0/260.jpg")
                    await bot.sendMessage(chatId, 'ВКЛАД «FAIRWAY VILLAS»:\n' +
                        '\n' +
                        '*Вклад: $1000 - $5000 ( 93500 RUB - 235000 RUB )*\n' +
                        '*Первый взнос: от $250 ( от 23500 RUB )*  \n' +
                        '------------------------------------------------------------------\n' +
                        '• Доход в сутки: *$0.75 - $15 (  70 RUB - 1400 RUB )*   \n' +
                        '• Доход в месяц: *$25 - $500 ( 2300 RUB - 47000 RUB )*  \n' +
                        '• Доход в год: *$300 - $6000 ( 28000 RUB - 550000 RUB )*   \n' +
                        'Страхование вклада: Allianz\n' +
                        '*Вывод дохода: 1 раз в месяц. *\n' +
                        '------------------------------------------------------------------\n' +
                        '|[Презентация проекта](https://drive.google.com/file/d/1PtgrmVmfsJK1zDg1Cjelnwop9rEnyrJL/view)\n' +
                        '|[Преимущества](https://drive.google.com/file/d/1Sr5o1KbwWZcR_mK7suTQMeWlKlno5TFJ/view)\n' +
                        '|[Планировка](https://drive.google.com/file/d/157z0XBwYAlUDQ9f9Tw2hGkJpuScJz-Ep/view)\n' +
                        '|[План оплат](https://drive.google.com/file/d/1I0-MEwEDlBpN6koNWuUEYT0gdGtvnCo7/view)\n' +
                        '|[Геопозиция](https://drive.google.com/file/d/1Hx83EKJWxSmLdKDQS7TgZZyLDZvMY4a6/view)\n'
                        , {parse_mode: 'Markdown'});
                    break;
                case 'ohana':
                    await bot.sendPhoto(chatId, "https://architizer-prod.imgix.net/media/1385401526833August_2013_7.jpg")
                    await bot.sendMessage(chatId, 'ВКЛАД «OHANA BY THE SEA»:\n' +
                        '\n' +
                        '*Вклад: $5000 - $10000 ( 235000 RUB - 930000 RUB )*\n' +
                        '*Первый взнос: от $1500 ( от 140500 RUB )*\n' +
                        '*Сроки работы: от 24 месяцев ( от 730 дней )*\n' +
                        '------------------------------------------------------------------\n' +
                        '• Доход в сутки: *$7.50 - $50 (  700 RUB - 4500 RUB )*\n' +
                        '• Доход в месяц: *$225 - $1500 ( 21000 RUB - 140000 RUB )*\n' +
                        '• Доход в год: *$2700 - $18000 ( 250500 RUB - 1680000 RUB )*\n' +
                        '  Страхование вклада: Allianz   \n' +
                        ' * Вывод дохода: 1 раз в месяц.*\n' +
                        '------------------------------------------------------------------\n' +
                        '|[Презентация проекта](https://drive.google.com/file/d/19_hjPF3QV3K79keJwtc92XMqRGOsspec/view)\n' +
                        '|[План оплат и планировок](https://drive.google.com/file/d/1iERQjjOAIqyg10AX0-AM1lmcswKmwuwV/view)\n' +
                        '|[Виртуальный тур по вилле ](https://storage.net-fs.com/hosting/4574030/95/)\n'
                        , {parse_mode: 'Markdown'});
                    break;
                case 'button3':
                    await bot.sendPhoto(chatId, "https://goldenbee.estate/files/uploaded/f4c88b19ee2359e41eb6379b.jpg")
                    await bot.sendMessage(chatId, 'ВКЛАД «SAMANA MYKONOS»:\n' +
                        '\n' +
                        '*Вклад: $10000 - $25000 ( 930000 RUB - 2330000 RUB )*  \n' +
                        '*Первый взнос: от $4000 ( от 370000 RUB )*   \n' +
                        '*Сроки работы: от 36 месяцев ( от 1095 дней )*  \n' +
                        '*Первый взнос: от $250 ( от 23500 RUB )*  \n' +
                        '------------------------------------------------------------------\n' +
                        '• Доход в сутки: *$68 - $425 (  6500 RUB - 39500 RUB )*\n' +
                        '• Доход в месяц: *$840 - $5250 ( 78500 RUB - 490000 RUB )*\n' +
                        '• Доход в год: *$10000 - $62500 ( 930000 RUB - 5850000 RUB )*\n' +
                        ' Страхование вклада: Allianz \n' +
                        ' *Вывод дохода: 1 раз в месяц. *\n' +
                        '------------------------------------------------------------------\n' +
                        '|[Презентация](https://drive.google.com/file/d/1V1C3C_6OmjwhhwLn2ASvMSxFdw9A04bk/view)\n' +
                        '|[Преимущества](https://drive.google.com/file/d/1V1C3C_6OmjwhhwLn2ASvMSxFdw9A04bk/view)\n' +
                        '|[План оплат](https://drive.google.com/file/d/1AyEVHsk38fAugIHdae5eQUqKFKjBg62a/view)\n' +
                        '|[Акционный план оплат](https://drive.google.com/file/d/1Ei7rAWSm6dVfZnbq8JOYXtoxttXwEN-Y/view)\n'
                        , {parse_mode: 'Markdown'});
                    break;
                case 'button4':
                    await bot.sendPhoto(chatId, "https://everhomes.ae/fileadmin/_processed_/5/c/csm_mama-residences-exterior-3_bfe6ee516e.jpg")
                    await bot.sendMessage(chatId, 'ВКЛАД «MAMA RESIDENCES»:\n' +
                        '\n' +
                        '*Вклад: $25000 - $50000 (  2330000 RUB - 4675000 RUB )*  \n' +
                        '*Первый взнос: от $15000 ( от 1400000 RUB )*   \n' +
                        '*Сроки работы: от 48 месяцев ( от 1460 дней )  *\n' +
                        '------------------------------------------------------------------\n' +
                        '• Доход в сутки: *$135 - $450 (  12500 RUB - 42000 RUB )*   \n' +
                        '• Доход в месяц: *$4125 - $13750 ( 385500 RUB - 1285000 RUB )*  \n' +
                        '• Доход в год: *$49500 - $165000 ( 4600250 RUB - 15430500 RUB )*   \n' +
                        ' Страхование вклада: Allianz \n' +
                        ' *Вывод дохода: 1 раз в месяц. *\n' +
                        '------------------------------------------------------------------\n' +
                        '|[Презентация проекта](https://drive.google.com/file/d/1o8OmAWhHF9IGsxQsZNBgD0gfyT8N3c_m/view)\n' +
                        '|[План оплат](https://drive.google.com/file/d/13qyEpLErLbLhbzeiPmxPJ0wbrJmG51qe/view)'
                        , {parse_mode: 'Markdown'});
                    break;
                case 'button5':
                    await bot.sendPhoto(chatId, "https://dubairealestateproperties.com/admin_dReP060606/images/property/icon/prop_icon_7979_Azizi-Beach-Oasis.jpg")
                    await bot.sendMessage(chatId, 'ВКЛАД «BEACH OASIS»:\n' +
                        '\n' +
                        '*Вклад: $50000 - $100000 (  4675000 RUB - 9350000 RUB )*  \n' +
                        '*Первый взнос: от $37500 ( от 3500000 RUB )*   \n' +
                        '*Сроки работы: от 60 месяцев ( от 1825 дней )*\n' +
                        '------------------------------------------------------------------\n' +
                        '• Доход в сутки: *$375 - $1000 (  35000 RUB - 93500 RUB )*\n' +
                        '• Доход в месяц: *$12200 - $32500 ( 114000 RUB - 3000000RUB )*\n' +
                        '• Доход в год: *$146500 - $390000 ( 13000750 RUB - 36450000 RUB )*\n' +
                        ' Страхование вклада: Allianz \n' +
                        ' *Вывод дохода: 1 раз в месяц. *\n' +
                        '------------------------------------------------------------------\n' +
                        '|[Презентация проекта](https://drive.google.com/file/d/1YAOOuBcO737YVFVrdQdwXpAbjl2wlClw/view)\n' +
                        '|[Планировка](https://drive.google.com/file/d/1OQnVKqcltfOtEYwKmOJ3ePoO5kQzR_39/view)\n' +
                        '|[План оплат](http://drive.google.com/file/d/1YAOOuBcO737YVFVrdQdwXpAbjl2wlClw/view)\n' +
                        '|[Акционный план оплат](https://docs.google.com/presentation/d/1Qk4fSdkJpBiFzp8XhOsav7bPWFMK90Tf/edit#slide=id.p1)'
                        , {parse_mode: 'Markdown'});
                    break;
                case 'bugati':
                    await bot.sendPhoto(chatId, "https://static.tildacdn.com/tild6561-6138-4535-b832-356165333361/image-062.jpg");
                    await bot.sendMessage(chatId, 'ВКЛАД «BURJ BINGHATTI»:\n' +
                        '\n' +
                        '*Вклад: от $100000 ( от  9350000 RUB )*\n' +
                        '*Первый взнос: от $90000 ( от 8400000 RUB ) *\n' +
                        '*Сроки работы: от 120 месяцев ( от 3650 дней )*\n' +
                        '------------------------------------------------------------------\n' +
                        '• Доход в сутки: *от $1170 (  от 109400 RUB )*   \n' +
                        '• Доход в месяц: *от $36900 ( от 3450000 RUB )*  \n' +
                        '• Доход в год: *от  $450000 ( 42075000 RUB ) *   \n' +
                        ' Страхование вклада: Allianz \n' +
                        '*Вывод дохода: 1 раз в месяц. *\n' +
                        '------------------------------------------------------------------\n' +
                        '|[Презентация проекта](https://drive.google.com/file/d/1XBYu3r1TElko-x4JOn3Ke9fiNnlpKwIB/view)'
                        , {parse_mode: 'Markdown'});
                    break;
                default:
                    break;
            }

            // Помечаем кнопку как нажатую
            if (!pressedButtons[chatId]) {
                pressedButtons[chatId] = {};
            }
            pressedButtons[chatId][query.data] = true;

            // Отвечаем на запрос обратного вызова, чтобы кнопка стала неактивной
            await bot.answerCallbackQuery(query.id);
        } else {
            // Если кнопка уже была нажата, отправить уведомление
            await bot.answerCallbackQuery(query.id, 'Вы уже нажимали эту кнопку!', false);
        }

});

    bot.on('callback_query', async (query) => {
        const chatId = query.message.chat.id;

        if (!pressedQuestions[chatId] || !pressedQuestions[chatId][query.data]) {
            let message = '';
            let buttonText = '';


            switch (query.data) {
                case 'question_button1':
                    message = '*Что такое «Цена объекта»?* \n' +
                        'Это стоимость объекта недвижимости, который находится на продаже, собранная команда финансирует рекламную кампанию данного объекта.';
                    buttonText = 'Узнать ответ на ваш вопрос:';
                    detailedText = '*Для того чтобы связаться с тех.поддержкой и узнать ответ на свой вопрос используйте команду /forward и напишите свой вопрос.*';
                    break;
                case 'question_button2':
                    message = '*Что такое «Рекламный депозит на команду»?* \n' +
                        'Этой суммой оплачивается рекламная кампания, благодаря которой идет активный поиск клиента на покупку рекламируемого объекта недвижимости. Формула: % от общей стоимости объекта.';
                    buttonText = 'Узнать ответ на ваш вопрос:';
                    detailedText = '*Для того чтобы связаться с тех.поддержкой и узнать ответ на свой вопрос используйте команду /forward и напишите свой вопрос.*';
                    break;
                case 'question_button3':
                    message = '*Что такое «Количество участников команды»?* \n' +
                        'Максимальное количество мест в команде, Вы можете выбрать участие в той программе, которая Вас больше всего заинтересовала.';
                    buttonText = 'Узнать ответ на ваш вопрос:';
                    detailedText = '*Для того чтобы связаться с тех.поддержкой и узнать ответ на свой вопрос используйте команду /forward и напишите свой вопрос.*';
                    break;
                case 'question_button4':
                    message = '*Что такое «Депозит на одного члена команды»?* \n' +
                        'Необходимая сумма для вступления в ту или иную команду (зависит от выбранной Вами программы), рассчитывается пропорционально от общего количества мест в команде.';
                    buttonText = 'Узнать ответ на ваш вопрос:';
                    detailedText = '*Для того чтобы связаться с тех.поддержкой и узнать ответ на свой вопрос используйте команду /forward и напишите свой вопрос.*';
                    break;
                case 'question_button5':
                    message = '*Что такое «Доход Scorpix за продажу объекта»?* \n' +
                        'Общая сумма комиссионных выплачиваемых нашей компании за клиента, которого мы нашли благодаря рекламной кампании команды (выплачиваются сразу от общей стоимости объекта, независимо от того куплен ли объект за полную оплату или в рассрочку). Формула: 1.5–5 % от общей стоимости объекта.';
                    buttonText = 'Узнать ответ на ваш вопрос:';
                    detailedText = '*Для того чтобы связаться с тех.поддержкой и узнать ответ на свой вопрос используйте команду /forward и напишите свой вопрос.*';
                    break;
                case 'question_button6':
                    message = '*Что такое «Комиссия Scorpix»?* \n' +
                        'Чистый доход нашей компании от общей суммы комиссии, которую получил Scorpix. Вы должны понимать, что мы разделяем нашу комиссию с риелторскими агентствами, работниками нашей компании и оплачиваем все налоги и прочие расходы при подписании контракта на покупку объекта. Формула: 15–40 % от общего дохода за продажу объекта.';
                    buttonText = 'Узнать ответ на ваш вопрос:';
                    detailedText = '*Для того чтобы связаться с тех.поддержкой и узнать ответ на свой вопрос используйте команду /forward и напишите свой вопрос.*';
                    break;
                case 'question_button7':
                    message = '*Что такое «Чистая прибыль команды с продажи»?* Чистая прибыль в $ на всех участников команды.';
                    buttonText = 'Узнать ответ на ваш вопрос:';
                    detailedText = '*Для того чтобы связаться с тех.поддержкой и узнать ответ на свой вопрос используйте команду /forward и напишите свой вопрос.*';
                    break;
                case 'question_button8':
                    message = '*Что такое «Чистая прибыль одного участника команды»?* \n' +
                        'Чистая выручка в $ на одного участника, рассчитывается пропорционально от общего количества участников в команде.';
                    buttonText = 'Узнать ответ на ваш вопрос:';
                    detailedText = '*Для того чтобы связаться с тех.поддержкой и узнать ответ на свой вопрос используйте команду /forward и напишите свой вопрос.*';
                    break;
                case 'question_button9':
                    message = '*Что такое «Срок работы командного депозита»? *\n' +
                        'Это максимальное время работы рекламной кампании до осуществления сделки по покупке объекта.';
                    buttonText = 'Узнать ответ на ваш вопрос:';
                    detailedText = '*Для того чтобы связаться с тех.поддержкой и узнать ответ на свой вопрос используйте команду /forward и напишите свой вопрос.*';
                    break;
                case 'question_button10':
                    message = '*Где я могу просмотреть объекты, которые рекламируются?*\n' +
                        'Вы можете ознакомиться с объектами, на которые формируются команды в закрытой группе, после разговора с менеджером нашей компании Вас переведут в группу, где формируются новые команды на рекламу объектов.';
                    buttonText = 'Узнать ответ на ваш вопрос:';
                    detailedText = '*Для того чтобы связаться с тех.поддержкой и узнать ответ на свой вопрос используйте команду /forward и напишите свой вопрос.*';
                    break;
                case 'question_button11':
                    message = '*Чем можете гарантировать безопасность средств?* \n' +
                        'Каждого нового клиента мы обучаем преимуществу блокчейна, перед пополнением депозита Вы пройдете подготовку у нашего аналитического отдела и научитесь отслеживать Ваш депозит и его передвижение в реальном времени. В личном кабинете проекта вы сможете также отслеживать всю информацию и проверять наличие ваших финансов.';
                    buttonText = 'Узнать ответ на ваш вопрос:';
                    detailedText = '*Для того чтобы связаться с тех.поддержкой и узнать ответ на свой вопрос используйте команду /forward и напишите свой вопрос.*';
                    break;
                case 'question_button12':
                    message = '*Есть ли у нашего проекта успешные кейсы и положительные отзывы? *\n' +
                        'Да, есть. Вы сможете пообщаться с действующими клиентами в закрытой группе после общения с нашими менеджерами. Коллективный формат работы является новинкой в сфере недвижимости и рекламы, так что не теряйте время и оставляйте заявку на обратную связь. Мы понимаем, как трудно выгодно вложить небольшую сумму что бы успешно с нее заработать, именно поэтому даем возможность каждому желающему попробовать работать с нами в коллективном формате.';
                    buttonText = 'Узнать ответ на ваш вопрос:';
                    detailedText = '*Для того чтобы связаться с тех.поддержкой и узнать ответ на свой вопрос используйте команду /forward и напишите свой вопрос.*';
                    break;

                default:
                    break;
            }

            if (message !== '') {
                const keyboard = {
                    inline_keyboard: [[{ text: buttonText, callback_data: query.data }]]
                };

                // Отправляем сообщение с кнопкой "Узнать больше"
                const sentMessage = await bot.sendMessage(chatId, message, {
                    parse_mode: 'Markdown',
                    reply_markup: JSON.stringify(keyboard)
                });

                // Сохраняем информацию о последнем отправленном сообщении с кнопкой "Узнать больше"
                pressedQuestions[chatId] = {
                    [query.data]: sentMessage.message_id
                };
            }

            // Используем новый способ ответа на callback-запрос
            await bot.answerCallbackQuery({
                callback_query_id: query.id,
                text: 'Запрос обработан'
            });
        } else if (pressedQuestions[chatId][query.data]) {
            // Отправляем дополнительный текст только при нажатии на кнопку "Узнать больше"
            await bot.sendMessage(chatId, detailedText, {
                parse_mode: 'Markdown'
            });

            // Используем новый способ ответа на callback-запрос
            await bot.answerCallbackQuery({
                callback_query_id: query.id,
                text: 'Запрос обработан'
            });
        } else {
            // Используем новый способ ответа на callback-запрос
            await bot.answerCallbackQuery({
                callback_query_id: query.id,
                text: 'Вы уже нажимали эту кнопку!',
                show_alert: false
            });
        }
    });





    bot.onText(/\/start/, async (msg) => {
        const chatId = msg.chat.id
        await bot.sendMessage(chatId, '*Приветствую!*👋', {parse_mode: 'Markdown'})
        await bot.sendMessage(chatId, '🏢 Добро пожаловать в Scorpix – ваш путь к финансовому успеху! 🚀\n' +
            '\n' +
            'Мы – крупный рекламный холдинг в сфере недвижимости ОАЭ. Сотни наших клиентов уже увеличили свой капитал в десятки раз, благодаря нашим финансовым рекомендациям. 💼\n' +
            '\n' +
            'Независимо от вашего местоположения, вы можете получать стабильный доход, рекламируя недвижимость в ОАЭ. 🏖️ Наши аналитики разработали целую линейку рекламных предложений, которые позволяют нашим партнерам получать доход от 70 до 208% годовых. 💰\n' +
            '\n' +
            'Приготовьтесь войти в захватывающий мир возможностей! Начните свой успех с нами прямо сейчас, выбрав команду /start. 👇\n' +
            '\n' +
            '📢 Реклама недвижимости в ОАЭ – ваш шаг к финансовой независимости! 🌟', {parse_mode: 'Markdown'})
    });

    bot.onText(/\/info/, async (msg) => {
        const chatId = msg.chat.id
        await bot.sendMessage(chatId, 'Scorpix является крупным рекламным холдингом в сфере недвижимости ОАЭ\n' +
            '\n' +
            'Сотни клиентов смогли увеличить свой капитал в десятки раз благодаря нашим финансовым рекомендациям.\n' +
            'Вы можете находиться в любой точке мира, получая при этом стабильный доход благодаря рекламе недвижимости в ОАЭ. Нашими аналитиками была разработана целая линейка рекламных предложений, благодаря которым партнеры могут получать доход от 70 до 208% годовых.\n' +
            'Мы гарантируем:' +
            '\n' +
            '• Лояльность администрации проекта к новичкам \n' +
            '\n' +
            '• Мгновенный вывод средств по запросу \n' +
            '\n' +
            '• Круглосуточную поддержку\n' +
            ''
            , infooptions)
    });

    bot.onText(/\/tarif/, async (msg) => {
        const chatId = msg.chat.id;
        pressedButtons[chatId] = {};
        sendTarifButtonMessage(chatId);
    });

    bot.onText(/\/questions/, (msg) => {
        const chatId = msg.chat.id;
        pressedQuestions[chatId] = {}; // Сброс состояния кнопок для команды /questions
        sendQuestionsButtonMessage(chatId);
    });

    bot.onText(/\/referal/, async (msg) => {
        const chatId = msg.chat.id
        await bot.sendMessage(chatId, 'Реферальная программа для агентов, частных брокеров, бизнес-ассистентов и банковских менеджеров.\n' +
            '\n' +
            'Если у вас есть клиент, желающий купить или рекламировать недвижимость в Дубае - познакомьте его с Scorpix через эту платформу и получайте вознаграждение за каждую сделку.\n' +
            '\n' +
            'У нас есть фонд быстрых выплат, поэтому вы получите свои деньги в течение 7 рабочих дней.\n' +
            '\n' +
            'Например, если клиент, которого вы переведете к нашему брокеру, купит квартиру в Дубае за 350 000$, мы выплатим вам бонус в размере (1%) 3 500$ в течение недели. Если клиент вступит в рекламную команду, мы выплатим вам реферальное вознаграждение в размере 10% от депозита клиента в течение 15 минут.\n' +
            '\n' +
            'Партнер, который переведет наибольшее количество клиентов в Scorpix за 6 месяцев, получит дополнительный % со всех сделок!\n'
            , referaloptions)
    });

    await bot.onText(/\/forward/, async (msg) => {
        const chatId = msg.chat.id;
        forwarding = true; // Включаем режим пересылки
        await bot.sendMessage(chatId, 'Теперь я начну пересылать все твои сообщения в группу. Отправь /stop, чтобы остановить.');
    });

// Обработчик команды /stop
    await bot.onText(/\/stop/, async (msg) => {
        const chatId = msg.chat.id;
        forwarding = false; // Выключаем режим пересылки
        await bot.sendMessage(chatId, 'Пересылка остановлена.');
    });

// Обработчик всех входящих личных сообщений
    await bot.on('message', async (msg) => {
        if (forwarding && msg.text && msg.chat.type === 'private') {
            // Замените `groupId` на ID группы, в которую вы хотите пересылать сообщения
            const groupId =  -1001972519702;

            let senderUsername = msg.from.username ? `@${msg.from.username}` : '';
            let senderLink = `[${msg.from.first_name} ${msg.from.last_name || ''}](https://t.me/${senderUsername})`;
            let forwardedMessage = `Отправитель: ${senderLink}\nСообщение: ${msg.text}`;


            await bot.sendMessage(groupId, forwardedMessage, { parse_mode: 'Markdown' });
        }
    });


}
start()