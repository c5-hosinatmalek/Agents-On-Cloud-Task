const connection = require("../models/db");

const bcrypt = require("bcrypt");
const saltRounds = 10;

const signUp = async (req, res) => {
  const { firstName, lastName , email, password} =
    req.body;

  const encryptedPassword = await bcrypt.hash(password, saltRounds);

  const query = `INSERT INTO users (firstName, lastName, email, password) VALUES (?,?,?,?)`;
  const data = [
    firstName,
    lastName,
    email,
    encryptedPassword,
    
  ];
  connection.query(query, data, (err, result) => {
    if (err) {
     return res.status(409).json({
        success: false,
        massage: "The email already exists",
        err
      });
    }
   return res.status(200).json({
      success: true,
      massage: "Account Created Successfully",
      result
    });
  });
};

module.exports = {
    signUp
};