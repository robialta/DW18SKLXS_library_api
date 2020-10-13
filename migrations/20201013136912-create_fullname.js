"use strict";

module.exports = {
    up: async (queryInterface, Sequelize) => {
        /**
         * Add altering commands here.
         *
         * Example:
         * */
        // await queryInterface.addColumn("Users", "fullName", Sequelize.STRING);
        await queryInterface.removeColumn("Users", "phone");
        await queryInterface.removeColumn("Users", "isAdmin");
    },

    down: async (queryInterface, Sequelize) => {
        /**
         * Add reverting commands here.
         *
         * Example:
         * await queryInterface.dropTable('users');
         */
        // await queryInterface.removeColumn(
        //     "Users",
        //     "fullName",
        //     Sequelize.STRING
        // );
        await queryInterface.addeColumn("Users", "phone", Sequelize.INTEGER);
        await queryInterface.addeColumn("Users", "isAdmin", Sequelize.BOOLEAN);
    },
};
