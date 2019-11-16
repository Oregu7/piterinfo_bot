const { MuseumModel } = require("../../models");
const Messages = require("../../messages");
const { getMuseumPage } = require("./share");

exports.getList = async(ctx) => {
    const [, pageNumber] = ctx.match;
    const { museum, message, extra } = await getMuseumPage(ctx, pageNumber);
    ctx.answerCbQuery().catch(console.error);

    return ctx.editMessageMedia({ type: "photo", media: museum.image, caption: message }, extra);
};

exports.getSubList = async(ctx) => {
    const [, pageNumber, baseMuseumId, baseMuseumPage] = ctx.match;
    const paginationData = await MuseumModel.paginationSubList(pageNumber, baseMuseumId);
    const museum = paginationData.docs[0];
    const { message, extra } = Messages.museum.subList(ctx, museum, paginationData, baseMuseumId, baseMuseumPage);
    ctx.answerCbQuery().catch(console.error);

    return ctx.editMessageMedia({ type: "photo", media: museum.image, caption: message }, extra);
};

exports.getAddress = async(ctx) => {
    const [, museumId] = ctx.match;
    const museum = await MuseumModel.findByPk(museumId);

    return ctx.answerCbQuery(museum.address, true).catch(console.error);
};