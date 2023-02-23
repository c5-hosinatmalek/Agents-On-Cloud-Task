const connection = require("../models/db");

//this function to 	Add a new item

const setNewItem = (req, res) => {
  const { title, description, img, price } = req.body;
  const owner_id = req.token.userId;
  console.log(owner_id);
  const query = `INSERT INTO items (title, description, img, price,owner_id ) VALUES (?,?,?,?,?);`;
  const data = [title, description, img, price, owner_id];

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
      massage: "Item uploaded",
      result: result,
    });
  });
};

//this function to get all items

const getAllItems = (req, res) => {
  const query = `SELECT * FROM items WHERE is_deleted=0;`;
  connection.query(query, (err, result) => {
    if (err) {
      return res.status(500).json({
        success: false,
        massage: "server error",
        err: err,
      });
    }
    return res.status(200).json({
      success: true,
      massage: "All the items",
      result: result,
    });
  });
};

// //this function to get the item by it's id

const getItemById = (req, res) => {
  const id = req.params.id;

  const query = `SELECT  * FROM items  WHERE items.id=? AND is_deleted=0;`;
  const data = [id];

  connection.query(query, data, (err, result) => {
    if (err) {
      return res.status(500).json({
        success: false,
        massage: "Server Error",
        err: err,
      });
    }
    if (!result.length) {
      return res.status(404).json({
        success: false,
        massage: "The item is Not Found",
      });
    }
    return res.status(200).json({
      success: true,
      massage: `The item ${id}`,
      result: result,
    });
  });
};

//
const updateItemById = (req, res) => {
  const id = req.params.id;
  const owner_id = req.token.userId;
  const { title, price } = req.body;
  const query = `SELECT * FROM items WHERE id=? AND is_deleted=0  ;`;

  const data = [id, owner_id];

  connection.query(query, data, (err, result) => {
    if (err) {
      return res.status(500).json({
        success: false,
        massage: "Server Error",
        err: err.message,
      });
    }
    if (!result.length) {
      return res.status(404).json({
        success: false,
        massage: "The item is Not Found",
      });
    }
    if (result[0].owner_id != owner_id) {
      return res.status(201).json({
        success: false,
        massage: `you are not authorized to edit this item`,
      });
    }

    const query2 = `UPDATE items SET title=?, price=? WHERE id=?;`;
    const data2 = [title || result[0].title, price || result[0].price, id];

    connection.query(query2, data2, (err, result2) => {
      res.status(200).json({
        success: true,
        massage: `Succeeded to update item with id: ${id}`,
        result: result2,
      });
    });
  });
};

//this function to delete an item

const deleteItemById = (req, res) => {
  const id = req.params.id;
  const owner_id = req.token.userId;

  const query = `SELECT * FROM items WHERE id=? AND is_deleted=0  ;`;

  const data = [id, owner_id];

  connection.query(query, data, (err, result) => {
    if (err) {
      return res.status(500).json({
        success: false,
        massage: "Server Error",
        err: err.message,
      });
    }
    if (!result.length) {
      return res.status(404).json({
        success: false,
        massage: "The item is Not Found",
      });
    }
    if (result[0].owner_id != owner_id) {
      return res.status(201).json({
        success: false,
        massage: `you are not authorized to delete this item`,
      });
    }

    const query2 = `UPDATE items SET is_deleted=1 WHERE   id=?;`;
    const data2 = [id];

    connection.query(query2, data2, (err, result2) => {
      res.status(200).json({
        success: true,
        massage: `Succeeded to delete item with id: ${id}`,
        result: result2,
      });
    });
  });
};

//this function to get all comment about an item

const getCommentById = (req, res) => {
  const id = req.params.id;
  console.log(id);
  const query = `SELECT * FROM comments WHERE item_id=?`;
  const data = [id];

  connection.query(query, data, (err, results) => {
    if (err) {
      return res.status(500).json({
        success: false,
        massage: "Server Error",
        err: err,
      });
    }
    if (!results.length) {
      return res.status(404).json({
        success: false,
        massage: "The Item Not found",
      });
    }
    return res.status(200).json({
      success: true,
      massage: `The Item ${id}`,
      results: results,
    });
  });
};

module.exports = {
  setNewItem,
  getAllItems,
  getItemById,
  updateItemById,
  deleteItemById,
  getCommentById,
};
