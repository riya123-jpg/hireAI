const dotenv = require("dotenv");
dotenv.config();

if (!process.env.MONGO_URI) {
  throw new Error("MONGO_URI in not defined in environmnety variables");
}
if (!process.env.JWT_SECRET) {
  throw new Error("JWT_SECRET is not defined in enviroment variables");
}
module.exports = config = {
  MONGO_URI: process.env.MONGO_URI,
  JWT_SECRET: process.env.JWT_SECRET,
};
