const { User } = require("../../models");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const key = "koderahasia";

exports.register = async (req, res) => {
    try {
        const body = req.body;
        body.type = "basic";
        const savedUser = await User.create(body);
        const token = await jwt.sign(
            {
                id: savedUser.id,
            },
            key
        );
        res.send({
            message: "Successfully added new user",
            data: {
                email: savedUser.email,
                token: token,
            },
        });
    } catch (error) {
        console.log(error);
    }
};

exports.login = async (req, res) => {
    try {
        const body = req.body;
        const getUser = await User.findOne({
            where: {
                email: body.email,
            },
        });
        const token = await jwt.sign(
            {
                id: getUser.id,
            },
            key
        );

        res.send({
            message: " Success",
            token: token,
        });
    } catch (error) {
        console.log(error);
    }
};
