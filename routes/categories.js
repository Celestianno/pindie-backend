const categoriesRouter = require("express").Router();
const { findAllCategories, findCategoryById, createCategory, updateCategory, deleteCategory, checkIsCategoryExists, checkEmptyName, checkAuth } = require("../middlewares");
const { sendAllCategories, sendCategoryById, sendCategoryCreated, sendCategoryUpdated, sendCategoryDeleted } = require("../controllers");

categoriesRouter.get("/categories", findAllCategories, sendAllCategories);
categoriesRouter.get("/categories/:id", findCategoryById, sendCategoryById);
categoriesRouter.post("/categories", findAllCategories, checkEmptyName, checkIsCategoryExists, checkAuth, createCategory, sendCategoryCreated);
categoriesRouter.put("/categories/:id", checkEmptyName, checkAuth, updateCategory, sendCategoryUpdated);
categoriesRouter.delete("/categories/:id", checkAuth, deleteCategory, sendCategoryDeleted);

module.exports = categoriesRouter;