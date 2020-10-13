const { User } = require("../../models");

exports.getUsers = async (req, res) => {
    try {
        const users = await User.findAll({
            attributes: { exclude: ["type", "createdAt", "updatedAt"] },
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
};
