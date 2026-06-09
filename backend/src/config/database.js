const mongoose = require("mongoose");
const config = require("./config.js");
async function connectDB() {
  try {
    await mongoose.connect(config.MONGO_URI);
    console.log("connect to databse");
  } catch (err) {
    console.error(`Error: ${err.message}`);
  }
}
module.exports = connectDB;
