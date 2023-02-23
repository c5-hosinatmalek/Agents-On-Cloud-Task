const express = require("express");

const { setNewItem ,getAllItems,getItemById ,updateItemById,deleteItemById,getCommentById} = require("../controllers/items");



const {addToFavorite} =require("../controllers/favorite")
const {addToCart} =require("../controllers/cart")

const authentication = require("../middleware/authentication");

const itemRouter = express.Router();

itemRouter.post("/",authentication, setNewItem);
itemRouter.get("/", getAllItems);
itemRouter.get("/:id", getItemById);
itemRouter.put("/:id",authentication, deleteItemById);
itemRouter.put("/:id/edit",authentication, updateItemById);
itemRouter.get("/comments/:id", getCommentById);


itemRouter.post("/favorite/:item_id", authentication,addToFavorite);


itemRouter.post("/cart/:item_id", authentication,addToCart);
 module.exports = itemRouter;
