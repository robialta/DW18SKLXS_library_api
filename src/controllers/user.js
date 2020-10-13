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
