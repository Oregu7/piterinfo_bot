const Sequelize = require("sequelize");
const db = require("./database");
const Mixins = require("./mixins");

const MuseumModel = db.define("museum", {
    id: {
        type: Sequelize.INTEGER(11),
        primaryKey: true,
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

module.exports = MuseumModel;