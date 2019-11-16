const Markup = require("telegraf/markup");
const { createMessage, getUserMentionHTML } = require("./helpers");
const BOT = require("config").get("bot");

exports.start = (ctx) => {
    const message = `Привет, ${getUserMentionHTML(ctx.from)}🙋🏻‍♀ Я <b>${BOT.username}</b>, твой помощник для выбора мест в <b>Санкт-Петербурге</b>, куда можно отправиться сегодня.\n
    ❗️ Чтобы узнать больше про наш гайд по <b>Санкт-Петербургу</b> нажмите кнопку "О проекте".`;
    const buttons = [
        ["🏛️ Музеи", "🍽️ Еда"],
        ["🏕️ Парки", "🎡 Интересные места"],
        ["🚀 О проекте"],
    ];

    return createMessage(message, buttons, { keyboardType: "keyboard" });
};

exports.default = (ctx) => {
    const message = `⚠️ <b>Внимание, вероятнее всего, была введена неверная команда!</b>\n
    Используйте команду /start`;

    return createMessage(message);
};

exports.featureInDevelopment = (ctx) => {
    const message = "Функция в разработке, следите за обновлениями в канале";

    return createMessage(message);
};

exports.aboutProject = (ctx) => {
    const message = `🚀 О проекте\n
    Привет! Я ${BOT.username}.Твой помощник для выбора мест в Санкт-Петербурге.`;
    const buttons = [
        [
            Markup.urlButton("📑 Справка", "https://t.me/PiterInfoBot"),
            Markup.urlButton("👨‍💻 Поддержка", "https://t.me/PiterInfoBot"),
        ],
        [
            Markup.urlButton("📰 Новости", "https://t.me/PiterInfoBot"),
        ],
        //[Markup.callbackButton("🌎 Язык бота", Actions.langCommandCallback.callback())],
    ];

    return createMessage(message, buttons);
};