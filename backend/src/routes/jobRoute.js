const express = require("express");
const {
  indentifyUser,
  recruiterOnly,
} = require("../middleware/authMiddleware.js");
const {
  createJob,
  getAllJobs,
  getSingleJob,
  updateJob,
  deleteJob,
} = require("../controller/job.js");
const jobRoute = express.Router();

//protected route which only recruiter cn create
//  /api/jobs/create
jobRoute.post("/create", indentifyUser, recruiterOnly, createJob);

//public router which any one can see the jobs without login

jobRoute.get("/", getAllJobs);

//public router get one job
//   /api/jobs/:id
jobRoute.get("/:id", getSingleJob);

//protected route only recruiter can update the job
//  /api/jobs/:id

jobRoute.put("/:id", indentifyUser, recruiterOnly, updateJob);

//protected router only recruiter who own the job can delte the job
//  /api/jobs/:id

jobRoute.delete("/:id", indentifyUser, recruiterOnly, deleteJob);

module.exports = jobRoute;
