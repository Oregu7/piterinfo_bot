const Sequelize = require("sequelize");
const escape = require("escape-html");
const db = require("./database");

const UserModel = db.define("user", {
    id: {
        type: Sequelize.INTEGER(20),
        primaryKey: true,
    },
    first_name: {
        type: Sequelize.STRING(250),
        allowNull: true,
    },
    last_name: {
        type: Sequelize.STRING(250),
        allowNull: true,
    },
    username: {
        type: Sequelize.STRING(250),
        allowNull: true,
    },
    language_code: {
        type: Sequelize.STRING(10),
        allowNull: true,
    },
    is_bot: {
        type: Sequelize.TINYINT(1),
        defaultValue: 0,
    },
    language_bot: {
        type: Sequelize.STRING(6),
        allowNull: true,
    },
    date_add: {
        type: Sequelize.DATE,
    },
    date_update: {
        type: Sequelize.DATE,
        defaultValue: Date.now,
    },
}, {
    timestamps: false,
    getterMethods: {
        fullName: function() {
            const fullName = this.first_name + (this.last_name ? " " + this.last_name : "");
            return fullName;
        },
    },
});

UserModel.getOrCreate = async function(ctx) {
    const {
        id: userId,
        is_bot: isBot,
        first_name: firstName,
        last_name: lastName = "",
        username,
        language_code: languageCode,
    } = ctx.from;

    const [user] = await this.findOrCreate({
        where: {
            id: userId,
        },
        defaults: {
            first_name: escape(firstName),
            last_name: escape(lastName),
            username: escape(username),
            is_bot: isBot ? 1 : 0,
            language_code: languageCode,
            date_add: Date.now(),
        },
    });

    return user;
};

module.exports = UserModel;