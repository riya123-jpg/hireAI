const dotenv = require("dotenv");
dotenv.config();
const app = require("./src/app.js");
const connectDB = require("./src/config/database.js");
const PORT = 5000;
connectDB();

app.listen(PORT, () => {
  console.log(`server runing on port ${PORT}`);
});
