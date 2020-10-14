const { User } = require("../../models");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const joi = require("@hapi/joi");
const key = "koderahasia";

exports.login = async (req, res) => {
    try {
        const { email, password } = req.body;

        const schema = joi.object({
            email: joi.string().email().min(10).required(),
            password: joi.string().min(6).required(),
        });

        const { error } = schema.validate(req.body);

        if (error) {
            return res.status(400).send({
                error: {
                    message: error.details[0].message,
                },
            });
        }

        const user = await User.findOne({
            where: {
                email,
            },
        });

        if (!user) {
            return res.status(400).send({
                error: {
                    message: "Email not existed",
                },
            });
        }

        const validPassword = await bcrypt.compare(password, user.password);

        if (!validPassword) {
            return res.status(400).send({
                error: {
                    message: "Email or password invalid",
                },
            });
        }

        const token = jwt.sign(
            {
                id: user.id,
            },
            key
        );

        res.send({
            message: "Login Success",
            data: {
                email: user.email,
                token,
            },
        });
    } catch (err) {
        console.log(err);
        res.send({
            message: `Login Failed ${err}`,
        });
    }
};
