const { User } = require("../../models");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const key = "koderahasia";

exports.login = async (req, res) => {
    try {
        const { email, password } = req.body;

        const schema = joi.object({
            email: joi.string().email().min(10).required(),
            password: joi.string().min(8).required(),
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
                fullName: user.fullName,
                token,
            },
        });
    } catch (err) {
        console.log(err);
    }
};

exports.register = async (req, res) => {
    try {
        const { fullName, email, password, phone, address, gender } = req.body;

        const checkEmail = await User.findOne({
            where: {
                email,
            },
        });

        if (checkEmail) {
            return res.status(400).send({
                error: {
                    message: "Email already been existed",
                },
            });
        }

        const saltRounds = 10;
        const hashedPassword = await bcrypt.hash(password, saltRounds);

        const user = await User.create({
            fullName,
            email,
            address,
            gender,
            phone,
            type: "basic",
            password: hashedPassword,
        });

        const token = jwt.sign(
            {
                id: user.id,
            },
            key
        );

        res.send({
            message: "You has been registered",
            data: {
                email: user.email,
                token,
            },
        });
    } catch (err) {
        console.log(err);

        res.status(500).send({
            error: {
                message: "Server ERROR",
            },
        });
    }
};
