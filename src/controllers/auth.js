const { User } = require("../../models");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const key = "koderahasia";

exports.register = async (req, res) => {
    try {
        const saveedUser = await User.create({
            name: req.body.name,
            email: req.body.email,
            password: req.body.password,
        });
        console.log(req.body);
        const token = await jwt.sign(
            {
                id: saveedUser.id,
            },
            key
        );
        res.send({
            message: "User added",
            token: token,
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
