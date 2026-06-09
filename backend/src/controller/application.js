const applicationModel = require("../models/applicationModel.js");
const jobModel = require("../models/jobModel.js");

async function applyJob(req, res) {
  const { resumeUrl, coverLetter } = req.body;

  const jobId = req.params.jobId;

  const job = await jobModel.findById(jobId);

  if (!job) {
    return res.status(404).json({
      messgae: "job not found",
    });
  }

  console.log("hello");

  if (!job.isOpen) {
    return res.status(400).json({
      message: "this job is no longer accepting applications",
    });
  }

  const alreadyApplied = await applicationModel.findOne({
    job: jobId,
    applicant: req.user.id,
  });

  if (alreadyApplied) {
    return res.status(400).json({
      message: "you have already applied ti this job ",
    });
  }

  const application = await applicationModel.create({
    job: jobId,
    applicant: req.user.id,
    resumeUrl,
    coverLetter,
  });

  res.status(201).json({
    application,
  });
}

async function getMyApplication(req, res) {
  const applications = await applicationModel
    .find({ applicant: req.user.id })
    .populate("job", "title company location salary")
    .sort({ createdAt: -1 });

  res.json({ applications });
}

async function getAllApplications(req, res) {
  const job = await jobModel.findById(req.params.jobId);

  if (!job) {
    return res.status(404).json({
      message: "job not found",
    });
  }

  if (job.recruiter.toString() !== req.user.id) {
    return res.status(403).json({
      message: "not authorized",
    });
  }

  const applications = await applicationModel
    .find({ job: req.params.jobId })
    .populate("applicant", "name email profile")
    .sort({ createdAt: -1 });

  res.json(applications);
}

async function updateApplication(req, res) {
  const { status } = req.body;

  const application = await applicationModel.findByIdAndUpdate(
    req.params.id,
    { status },
    { new: true },
  );

  if (!application) {
    return res.status(404).json({
      message: "application not found",
    });
  }

  res.json(application);
}

module.exports = {
  applyJob,
  getMyApplication,
  getAllApplications,
  updateApplication,
};
