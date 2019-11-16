const { MuseumModel } = require("../../models");
const Messages = require("../../messages");

exports.getMuseumPage = async(ctx, page) => {
    const paginationData = await MuseumModel.paginationBaseList(page);
    const museum = paginationData.docs[0];
    const buildingsCount = await MuseumModel.buildingsCount(museum.id);

    const messageData = Messages.museum.baseList(ctx, museum, paginationData, buildingsCount);
    return Object.assign({}, messageData, { museum });
};