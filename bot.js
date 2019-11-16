const config = require("config");
const Telegraf = require("telegraf");
const mainController = require("./controllers/main-controller");
const museumController = require("./controllers/museum-controller");

const Actions = config.get("actions");
const bot = new Telegraf(config.get("bot.token"));
// commands
bot.start(mainController.commands.start);
// patterns
bot.hears("🏛️ Музеи", museumController.commands.main);
bot.hears("📊 Топ музеев", museumController.commands.getList);

bot.hears("🍽️ Еда", mainController.commands.featureInDevelopment);
bot.hears("🏕️ Парки", mainController.commands.featureInDevelopment);
bot.hears("🎡 Интересные места", mainController.commands.featureInDevelopment);

bot.hears("🚀 О проекте", mainController.commands.aboutProject);
bot.hears("🔙 Назад", mainController.commands.start);
// actions
bot.action(Actions.museumList.regexp("\\d+"), museumController.actions.getList);
bot.action(Actions.museumSubList.regexp("\\d+", "\\d+", "\\d+"), museumController.actions.getSubList);
bot.action(Actions.museumAddress.regexp("\\d+"), museumController.actions.getAddress);
// handlers
bot.on("photo", (ctx) => ctx.reply(JSON.stringify(ctx.message.photo)));
bot.on("message", mainController.commands.default);
bot.on("callback_query", (ctx) => {
    ctx.answerCbQuery().catch(console.error);
});
bot.catch(console.error);

module.exports = bot;