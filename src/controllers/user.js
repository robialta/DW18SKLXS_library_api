const { User, Book } = require("../../models");

exports.getUsers = async (req, res) => {
    try {
        const users = await User.findAll({
            attributes: { exclude: ["createdAt", "updatedAt"] },
        });
        res.send({
            message: "Successfully Get All Users",
            data: {
                users,
            },
        });
    } catch (error) {
        console.log(error);
    }
};

exports.deleteUser = async (req, res) => {
    try {
        const { id } = req.params;
        const deletedUser = await User.destroy({
            where: {
                id,
            },
        });
        res.send({
            message: "Successfuly delete user",
            data: {
                id: `${deletedUser.id}`,
            },
        });
    } catch (error) {
        console.log(error);
        res.send({
            message: "Error deleting user",
        });
    }
};
