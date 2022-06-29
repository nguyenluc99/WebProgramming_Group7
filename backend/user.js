/*
 * This constant store global information about the 
 * user who is currently using the program.
 * Currently, we are using only the token to save
 * the user's working session.
 */

const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  first_name: { type: String, default: null },
  last_name: { type: String, default: null },
  email: { type: String, unique: true },
  password: { type: String },
  token: { type: String, default: null},
});

module.exports = mongoose.model("user", userSchema);