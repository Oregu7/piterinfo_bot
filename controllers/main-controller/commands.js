const { UserModel } = require("../../models");
const Messages = require("../../messages");

exports.start = (ctx) => {
    UserModel.getOrCreate(ctx).catch(console.error);
    const { message, extra } = Messages.main.start(ctx);
    return ctx.reply(message, extra);
};

exports.default = (ctx) => {
    const { message_id: messageId } = ctx.message;
    const { message, extra } = Messages.main.default(ctx);
    return ctx.reply(message, extra.inReplyTo(messageId));
};

exports.featureInDevelopment = (ctx) => {
    const { message_id: messageId } = ctx.message;
    const { message, extra } = Messages.main.featureInDevelopment(ctx);
    return ctx.reply(message, extra.inReplyTo(messageId));
};

exports.aboutProject = (ctx) => {
    const { message, extra } = Messages.main.aboutProject(ctx);
    return ctx.reply(message, extra);
};