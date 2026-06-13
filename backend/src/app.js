const express = require("express");
const cors = require("cors");

const authRoute = require("./routes/authRoute.js");
const jobRoute = require("./routes/jobRoute.js");
const applicationRoute = require("./routes/applicationsRoute.js");

const app = express();
// app.use(cors());
app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true,
  }),
);
app.use(express.json());
// ADD THIS TEMPORARY LINE
app.use((req, res, next) => {
  console.log("Body received:", req.body);
  next();
});

app.use("/api/auth", authRoute);
app.use("/api/jobs", jobRoute);
app.use("/api/application", applicationRoute);

module.exports = app;
