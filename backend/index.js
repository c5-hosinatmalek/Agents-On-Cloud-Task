const express = require("express");
const cors = require("cors");
require("dotenv").config();
require("./models/db");

const app = express();
const PORT = 5000;

// Import Routers
const signUpRouter = require("./routes/signUp");
const loginRouter = require("./routes/login");
const itemRouter =require("./routes/items")
const commentRouter=require("./routes/comments")
const favoriteRouter=require("./routes/favorite")
 const cartRouter=require("./routes/cart")
//built-in middleware
app.use(cors());
app.use(express.json());

// Routes Middleware
app.use("/signup", signUpRouter);
app.use("/login", loginRouter);
app.use("/items", itemRouter);
app.use("/comment",commentRouter)
app.use("/favorite", favoriteRouter);

app.use("/cart", cartRouter);
// Handles any other endpoints [unassigned - endpoints]
app.use("*", (req, res) => res.status(404).json("NO content at this path"));

app.listen(PORT, () => {
  console.log(`Server listening at http://localhost:${PORT}`);
});
