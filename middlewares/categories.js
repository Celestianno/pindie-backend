const { categories } = require("../models");

const findAllCategories = async(req, res, next) => {
    console.log("GET api/categories");

    req.categoriesArray = await categories.find({});

    next();
}

const findCategoryById = async(req, res, next) => {
    console.log("GET api/categories/:id");

    try {
        req.category = await categories.findById(req.params.id);
        next();
    } catch (error) {
        res.setHeader("Content-Type", "application/json");
        res.status(404).send(JSON.stringify({ message: "Category not found" }));
    }
}

const createCategory = async(req, res, next) => {
    console.log("POST api/categories");

    try {
        console.log(req.body);
        req.category = await categories.create(req.body);
        next();
    } catch (error) {
        res.setHeader("Content-Type", "application/json");
        res.status(400).send(JSON.stringify({ message: "Error creating category" }));
    }
}

const updateCategory = async(req, res, next) => {
    console.log("PUT api/categories/:id");

    try {
        req.category = await categories.findByIdAndUpdate(req.params.id, req.body);
        next();
    } catch (error) {
        res.setHeader("Content-Type", "application/json");
        res.status(400).send(JSON.stringify({ message: "Error updating category" }));
    }
}

const deleteCategory = async(req, res, next) => {
    console.log("DELETE api/categories/:id");

    try {
        req.category = await categories.findByIdAndDelete(req.params.id);
        next();
    } catch (error) {
        res.setHeader("Content-Type", "application/json");
        res.status(400).send(JSON.stringify({ message: "Error deleting category" }));
    }
}

const checkIsCategoryExists = async(req, res, next) => {
    const isInArray = req.categoriesArray.find((category) => {
        return req.body.name === category.name;
    });

    if(isInArray) {
        res.setHeader("Content-Type", "application/json");
        res.status(400).send(JSON.stringify({ message: "Category already exist" }));
    } else {
        next();
    }
}

const checkEmptyName = async(req, res, next) => {
    if(!req.body.name) {
        res.setHeader("Content-Type", "application/json");
        res.status(400).send(JSON.stringify({ message: "Empty name" }));
    } else {
        next();
    }
}

module.exports = {
    findAllCategories,
    findCategoryById,
    createCategory,
    updateCategory,
    deleteCategory,
    checkIsCategoryExists,
    checkEmptyName
}