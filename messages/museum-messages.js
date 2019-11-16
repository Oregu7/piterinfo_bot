const Markup = require("telegraf/markup");
const Actions = require("config").get("actions");
const { createMessage, simplePaginator } = require("./helpers");

exports.information = (ctx, museum, paginationData) => {
    const message = `<b>${museum.name}</b>\n\n${museum.description}`;
    const paginator = simplePaginator(Actions.museumList, paginationData);
    const buttons = [
        [Markup.callbackButton("🏘️ Корпуса (7)", "2")],
        [Markup.callbackButton("ℹ️ Подробнее", "4"), Markup.callbackButton("🖼️ Фотографии", "3")],
        [Markup.callbackButton("💵 Стоимость", "5"), Markup.callbackButton("⏱️ Часы работы", "1")],
        [Markup.callbackButton("🌐 Как добраться?", Actions.museumAddress.callback(museum.id))],
        [
            paginator.backButton,
            Markup.callbackButton(`${paginationData.page} из ${paginationData.count}`, "2"),
            paginator.nextButton,
        ],
    ];
    return createMessage(message, buttons);
};