const { MuseumModel } = require("../../models");
const Messages = require("../../messages");
const { getMuseumPage } = require("./share");

exports.main = (ctx) => {
    const { message, extra } = Messages.museum.main(ctx);
    return ctx.reply(message, extra);
};

exports.getList = async(ctx) => {
    const { museum, message, extra } = await getMuseumPage(ctx, 1);
    return ctx.replyWithPhoto(museum.image, extra.load({ caption: message }));
};