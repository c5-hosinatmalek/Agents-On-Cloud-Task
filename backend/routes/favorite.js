const express =require("express");

const {getAllFavorite ,removeFavorite} =require("../controllers/favorite")

const authentication = require("../middleware/authentication");

const favoriteRouter = express.Router();

favoriteRouter.get("/",authentication, getAllFavorite);
favoriteRouter.put("/:id",authentication, removeFavorite);

module.exports = favoriteRouter;