const { MuseumModel } = require("../../models");
const Messages = require("../../messages");

exports.getList = async(ctx) => {
    const [, pageNumber] = ctx.match;
    const paginationData = await MuseumModel.pagination({ page: Number(pageNumber), limit: 1 });
    const museum = paginationData.docs[0];
    const { message, extra } = Messages.museum.information(ctx, museum, paginationData);

    ctx.answerCbQuery().catch(console.error);
    return ctx.editMessageMedia({ type: "photo", media: museum.image, caption: message }, extra);
};

exports.getAddress = async(ctx) => {
    const [, museumId] = ctx.match;
    const museum = await MuseumModel.findByPk(museumId);

    return ctx.answerCbQuery(museum.address, true).catch(console.error);
};