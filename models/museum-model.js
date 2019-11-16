const Sequelize = require("sequelize");
const db = require("./database");
const Mixins = require("./mixins");

const MuseumModel = db.define("museum", {
    id: {
        type: Sequelize.INTEGER(11),
        primaryKey: true,
    },
    parent_id: {
        type: Sequelize.INTEGER(11),
        defaultValue: 0,
    },
    name: {
        type: Sequelize.STRING(250),
    },
    image: {
        type: Sequelize.STRING(200),
    },
    description: {
        type: Sequelize.STRING(4000),
    },
    rating: {
        type: Sequelize.SMALLINT(5),
        defaultValue: 0,
    },
    address: {
        type: Sequelize.STRING(300),
        allowNull: true,
    },
    date_add: {
        type: Sequelize.DATE,
    },
}, {
    timestamps: false,
});
Mixins.pagination(MuseumModel);

MuseumModel.paginationBaseList = function(page = 1) {
    return this.pagination({ page: Number(page) }, { where: { parent_id: 0 } });
};

MuseumModel.paginationSubList = function(page, baseMuseumId) {
    return this.pagination({ page: Number(page) }, { where: { parent_id: baseMuseumId } });
};

MuseumModel.buildingsCount = function(museumId) {
    return this.count({ where: { parent_id: museumId } });
};

module.exports = MuseumModel;