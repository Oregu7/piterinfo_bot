const { MuseumModel } = require("../../models");
const Messages = require("../../messages");

exports.getList = async(ctx) => {
    const paginationData = await MuseumModel.pagination();
    const museum = paginationData.docs[0];
    const { message, extra } = Messages.museum.information(ctx, museum, paginationData);
    return ctx.replyWithPhoto(museum.image, extra.load({ caption: message }));
};