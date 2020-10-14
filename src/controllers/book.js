const { Book, User, Category } = require("../../models");

exports.getBooks = async (req, res) => {
    try {
        const books = await Book.findAll({
            attributes: [
                "id",
                "title",
                "publication",
                "pages",
                "ISBN",
                "aboutBook",
                "file",
                "status",
            ],
            include: [
                {
                    model: User,
                    as: "user",
                    attributes: [
                        "id",
                        "fullName",
                        "email",
                        "phone",
                        "address",
                        "gender",
                    ],
                },
                {
                    model: Category,
                    as: "category",
                    attributes: ["id", "name"],
                },
            ],
        });
        res.send({
            message: "Successfully geting books",
            data: {
                books,
            },
        });
    } catch (error) {
        console.log(error);
        res.send({
            message: `Error geting book ${error}`,
        });
    }
};

exports.detailBook = async (req, res) => {
    try {
        const { id } = req.params;
        const detailedBook = await Book.findOne({
            where: {
                id,
            },
            attributes: [
                "id",
                "title",
                "publication",
                "pages",
                "ISBN",
                "aboutBook",
                "file",
                "status",
            ],
            include: [
                {
                    model: User,
                    as: "user",
                    attributes: [
                        "id",
                        "fullName",
                        "email",
                        "phone",
                        "address",
                        "gender",
                    ],
                },
                {
                    model: Category,
                    as: "category",
                    attributes: ["id", "name"],
                },
            ],
        });
        res.send({
            message: "Successfully get detail book",
            data: detailedBook,
        });
    } catch (error) {
        console.log(error);
        res.send({
            message: `Error get detail book ${error}`,
        });
    }
};

exports.addBook = async (req, res) => {
    try {
        const body = req.body;
        body.status = "Waiting to be verified";
        const addedBook = await Book.create(body);
        res.send({
            message: "Successfully adding book",
            data: body,
        });
    } catch (error) {
        console.log(error);
        res.send({
            message: `Error adding book ${error}`,
        });
    }
};

exports.updateBook = async (req, res) => {
    try {
        const body = req.body;
        const { id } = req.params;
        const updatedBook = await Book.update(body, {
            where: {
                id,
            },
        });
        res.send({
            message: "Successfully updating book",
            data: body,
        });
    } catch (error) {
        console.log(error);
        res.send({
            message: `Error updating book ${error}`,
        });
    }
};

exports.deleteBook = async (req, res) => {
    try {
        const { id } = req.params;
        const deletedBook = await Book.destroy({
            where: {
                id,
            },
        });
        res.send({
            message: "Successfully deleting book",
            data: {
                id,
            },
        });
    } catch (error) {
        console.log(error);
        res.send({
            message: `Error deleting book ${error}`,
        });
    }
};
