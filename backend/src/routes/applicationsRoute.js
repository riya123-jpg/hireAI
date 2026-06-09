const express = require("express");
const {
  applyJob,
  getMyApplication,
  getAllApplications,
  updateApplication,
} = require("../controller/application.js");
const {
  indentifyUser,
  seekerOnly,
  recruiterOnly,
} = require("../middleware/authMiddleware.js");

//only seeker can apply for the job this is protected route
//  /api/application/apply/:jobId
const applicationRouter = express.Router();

applicationRouter.post("/apply/:jobId", indentifyUser, seekerOnly, applyJob);

//seeker can see their application only
//   /api/application/my

applicationRouter.get("/me", indentifyUser, seekerOnly, getMyApplication);

//only recsuiter cazn see all the applications of theri jobs

//  /api/application/job/:jobId

applicationRouter.get(
  "/job/:jobId",
  indentifyUser,
  recruiterOnly,
  getAllApplications,
);

//recruiter can update their jobs status

//  /api/application/:id/status

applicationRouter.patch(
  "/:id/status",
  indentifyUser,
  recruiterOnly,
  updateApplication,
);

module.exports = applicationRouter;
