"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
    class Book extends Model {
        /**
         * Helper method for defining associations.
         * This method is not a part of Sequelize lifecycle.
         * The `models/index` file will call this method automatically.
         */
        static associate(models) {
            // define association here
            Book.belongsTo(models.Category, {
                as: "category",
                foreignKey: {
                    name: "categoryId",
                },
            });
            Book.belongsTo(models.User, {
                as: "user",
                foreignKey: {
                    name: "userId",
                },
            });
        }
    }
    Book.init(
        {
            title: DataTypes.STRING,
            publication: DataTypes.STRING,
            categoryId: DataTypes.INTEGER,
            userId: DataTypes.INTEGER,
            pages: DataTypes.INTEGER,
            ISBN: DataTypes.STRING,
            aboutBook: DataTypes.STRING,
            file: DataTypes.STRING,
            status: DataTypes.STRING,
        },
        {
            sequelize,
            modelName: "Book",
        }
    );
    return Book;
};
