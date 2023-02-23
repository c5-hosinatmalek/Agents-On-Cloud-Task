const connection = require("../models/db");
 

const addToCart = (req, res) => {
  const item_id = req.params.item_id;
  const userId = req.token.userId;

  const query = `INSERT INTO cart (item_id ,user_id) VALUES (?,?);`;
  const data = [item_id, userId];
  connection.query(query, data, (err, result) => {
    if (err) {
      return res.status(500).json({
        success: false,
        massage: "Server error",
        err: err,
      });
    }

    return res.status(200).json({
      success: true,
      massage: `item has been added to cart`,
      result: result,
    });
  });
};

////////////////////////

 
const getAllCartItems = (req, res) => {

    const userId = req.token.userId;
  
    const query = `SELECT  items.id, title,img,price FROM cart INNER JOIN  items ON  cart.item_id =items.id WHERE cart.user_id=? AND cart.is_deleted = 0 ;`;
    const data = [userId];
console.log(data);
     connection.query(query, data, (err, result) => {
      if (err) {
        return res.status(500).json({
          success: false,
          massage: "Server error",
          err: err.message,
        });
      }
      return res.status(200).json({
        success: true,
        massage: `  cart items `,
        result: result,
      });
    });
  };


////////////////////////////////////

const removeFromCart = (req, res) => {
    const id = req.params.id;
    const userId = req.token.userId;
  
    const query = `UPDATE cart SET is_deleted=1 WHERE  user_id=? AND item_id=?;`;
    const data = [userId, id];
    connection.query(query, data, (err, result) => {
      if (err) {
        return res.status(500).json({
          success: false,
          massage: "Server error",
          err: err,
        });
      }
      return res.status(200).json({
        success: true,
        massage: `item has been removed from cart `,
        result: result,
      });
    });
  };
  





//addToCart ,getAllCartItems ,removeFromCart

module.exports = { addToCart ,getAllCartItems ,removeFromCart};