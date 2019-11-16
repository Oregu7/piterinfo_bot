const Markup = require("telegraf/markup");
const Actions = require("config").get("actions");
const { createMessage, simplePaginator } = require("./helpers");

exports.main = (ctx) => {
    const message = `🏛️ Музеи\n
    Мы подготовили для вас подборку лучших музеев Санкт-Петеребурга. Если вы не нашли свой любимый музей, можете отправить информацию о нем.`;
    const buttons = [
        ["📊 Топ музеев", "✍️ Добавить музей"],
        [Markup.locationRequestButton("Отправить геолокацию")],
        ["🔙 Назад"],
    ];

    return createMessage(message, buttons, { keyboardType: "keyboard" });
};

exports.baseList = (ctx, museum, paginationData, buildingsCount = 0) => {
    const message = `<b>${museum.name}</b>\n\n${museum.description}`;
    const paginator = simplePaginator(Actions.museumList, paginationData);
    const buttons = [
        [Markup.callbackButton("📖 Подробнее", "4"), Markup.callbackButton("🖼️ Фотографии", "3")],
        [Markup.callbackButton("💵 Стоимость", "5"), Markup.callbackButton("⏱️ Часы работы", "1")],
        [Markup.callbackButton("🌐 Как добраться?", Actions.museumAddress.callback(museum.id))],
        [
            paginator.backButton,
            Markup.callbackButton(`${paginationData.page} из ${paginationData.count}`, "2"),
            paginator.nextButton,
        ],
    ];
    // у музея есть доп.корпуса
    if (buildingsCount)
        buttons.unshift([Markup.callbackButton(`🏘️ Корпуса (${buildingsCount})`, Actions.museumSubList.callback(1, museum.id, paginationData.page))]);

    return createMessage(message, buttons);
};

exports.subList = (ctx, museum, paginationData, baseMuseumId, baseMuseumPage) => {
    const message = `<b>${museum.name}</b>\n\n${museum.description}`;
    const paginator = simplePaginator(Actions.museumSubList, paginationData, [baseMuseumId, baseMuseumPage]);
    const buttons = [
        [Markup.callbackButton("↩️ Вернуться к Главному", Actions.museumList.callback(baseMuseumPage))],
        [Markup.callbackButton("📖 Подробнее", "4"), Markup.callbackButton("🖼️ Фотографии", "3")],
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