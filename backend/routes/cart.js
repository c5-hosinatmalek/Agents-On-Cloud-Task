const express =require("express");

const {getAllCartItems ,removeFromCart} =require("../controllers/cart")
 
const authentication = require("../middleware/authentication");

const cartRouter = express.Router();

cartRouter.get("/",authentication, getAllCartItems);
cartRouter.put("/:id",authentication, removeFromCart);

module.exports = cartRouter;