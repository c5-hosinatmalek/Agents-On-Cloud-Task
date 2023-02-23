const connection = require("../models/db");
 

const addToFavorite = (req, res) => {
  const item_id = req.params.item_id;
  const userId = req.token.userId;

  const query = `INSERT INTO favorite (item_id ,user_id) VALUES (?,?);`;
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
      massage: `item has been added to favorite`,
      result: result,
    });
  });
};

////////////////////////

 
const getAllFavorite = (req, res) => {

    const userId = req.token.userId;
  
    const query = `SELECT  items.id, title,img,price FROM favorite INNER JOIN  items ON  favorite.item_id =items.id WHERE favorite.user_id=? AND favorite.is_deleted = 0 ;`;
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
        massage: `  favorite items `,
        result: result,
      });
    });
  };


////////////////////////////////////

const removeFavorite = (req, res) => {
    const id = req.params.id;
    const userId = req.token.userId;
  
    const query = `UPDATE favorite SET is_deleted=1 WHERE  user_id=? AND item_id=?;`;
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
        massage: `item has been removed from favorite `,
        result: result,
      });
    });
  };
  







module.exports = { addToFavorite ,getAllFavorite ,removeFavorite};