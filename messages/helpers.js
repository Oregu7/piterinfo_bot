const Markup = require("telegraf/markup");
const Extra = require("telegraf/extra");

function getUserFullName(user) {
    const { first_name: firstName, last_name: lastName = "" } = user;
    return firstName + (lastName ? " " + lastName : "");
}

function getUserMentionHTML(user) {
    const { id: userId } = user;
    const fullName = getUserFullName(user);
    return `<a href="tg://user?id=${userId}">${fullName}</a>`;
}

function createMessage(messageText, buttons = [], { messageType = "HTML", keyboardType = "inline" } = {}) {
    const message = compileMessage(messageText);
    const keyboard = keyboardType == "inline" ? Markup.inlineKeyboard(buttons) : Markup.keyboard(buttons).resize(true);
    const extra = createExtra(keyboard, messageType);
    return {
        message,
        keyboard,
        extra,
    };
}

function compileMessage(msg) {
    return msg.split("\n").map((item) => item.trim()).join("\n");
}

function createExtra(keyboard, type = "HTML", webPreview = false) {
    const extra = Extra
        .webPreview(webPreview)
        .markup(keyboard);
    if (type === "HTML")
        extra.HTML();
    else
        extra.markdown();

    return extra;
}

function simplePaginator(action, { page, pages }, properties = []) {
    // рассчитываем следующую и предыдущую страницу
    let next = page + 1;
    let previous = page - 1;
    if (next > pages) next = 1;
    if (previous <= 0) previous = pages;

    const nextButton = Markup.callbackButton("»", action.callback(next, ...properties));
    const backButton = Markup.callbackButton("«", action.callback(previous, ...properties));
    return {
        buttons: [backButton, nextButton],
        nextButton,
        backButton,
    };
}

module.exports = {
    simplePaginator,
    getUserFullName,
    getUserMentionHTML,
    createMessage,
    compileMessage,
};