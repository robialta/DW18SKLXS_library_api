const { Category } = require("../../models");

exports.getCategory = async (req, res) => {
    try {
        const categories = await Category.findAll({
            attributes: { exclude: ["createdAt", "updatedAt"] },
        });
        res.send({
            message: "Successfully get all categories",
            data: {
                categories,
            },
        });
    } catch (error) {
        console.log(error);
        res.send({
            message: `Error getting category ${error}`,
        });
    }
};

exports.detailCategory = async (req, res) => {
    try {
        const { id } = req.params;
        const detailedCategory = await Category.findOne({
            where: {
                id,
            },
            attributes: { exclude: ["createdAt", "updatedAt"] },
        });
        res.send({
            message: "Succesfully getting detail category",
            data: {
                detailedCategory,
            },
        });
    } catch (error) {
        console.log(error);
        res.send({
            message: `Error getting detail category ${error}`,
        });
    }
};

exports.addCategory = async (req, res) => {
    try {
        const body = req.body;
        const addedCategory = await Category.create(body);
        res.send({
            message: "Succesfully adding category",
            data: {
                name: addedCategory.name,
            },
        });
    } catch (error) {
        console.log(error);
        res.send({
            message: `Error adding category ${error}`,
        });
    }
};

exports.updateCategory = async (req, res) => {
    try {
        const { id } = req.params;
        const { name } = req.body;
        const updatedCategory = await Category.update(
            {
                name: name,
            },
            {
                where: {
                    id,
                },
            }
        );
        res.send({
            message: "Succesfully update category",
            data: {
                id: id,
                name: name,
            },
        });
    } catch (error) {
        console.log(error);
        res.send({
            message: `Error updating category ${error}`,
        });
    }
};

exports.deleteCategory = async (req, res) => {
    try {
        const { id } = req.params;
        const deletedCategory = await Category.destroy({
            where: {
                id,
            },
        });
        res.send({
            message: "Successfully deleting category",
            data: {
                id: id,
            },
        });
    } catch (error) {
        console.log(error);
        res.send({
            message: `Error deleting category ${error}`,
        });
    }
};
