const jwt = require("jsonwebtoken");
const jwtKey = process.env.JWT_KEY;
const key = "koderahasia";

exports.authenticated = (req, res, next) => {
    let header, token;

    if (
        !(header = req.header("Authorization")) ||
        !(token = header.replace("Bearer ", ""))
    ) {
        return res.status(400).send({
            error: {
                message: "Access Denied Login Required",
            },
        });
    }

    try {
        const verified = jwt.verify(token, key);

        req.user = verified;
        next();
    } catch (err) {
        console.log(err);
        res.status(400).send({
            error: {
                message: `Invalid Token ${token}`,
            },
        });
    }
};
