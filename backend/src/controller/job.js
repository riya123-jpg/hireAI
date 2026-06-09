const jobModel = require("../models/jobModel.js");

async function createJob(req, res) {
  const { title, description, company, location, salary, skills, jobtype } =
    req.body;

  const job = await jobModel.create({
    title,
    description,
    company,
    salary,
    location,
    skills,
    jobtype,
    recruiter: req.user.id,
  });

  res.status(201).json({
    job,
  });
}

async function getAllJobs(req, res) {
  const { search, location, jobtype } = req.query;
  const filter = { isOpen: true };

  if (search) {
    filter.$or = [
      { title: { $regex: search, $options: "i" } },
      { company: { $regex: search, $options: "i" } },
      { skills: { $regex: search, $options: "i" } },
    ];
  }

  if (location) {
    filter.location = { $regex: localtion, $options: "i" };
  }
  if (jobtype) filter.jobtype = jobtype;

  const jobs = await jobModel
    .find(filter)
    .populate("recruiter", "name email")
    .sort({ createdAt: -1 });

  res.json(jobs);

  if (!jobs) {
    return res.status(404).json({
      message: "not found",
    });
  }
}

async function getSingleJob(req, res) {
  const job = await jobModel
    .findById(req.params.id)
    .populate("recruiter", "name email");

  if (!job) {
    return res.status(404).json({
      message: "jobs not found",
    });
  }

  res.json(job);
}

async function updateJob(req, res) {
  const job = await jobModel.findById(req.params.id);

  if (!job) {
    return res.statue(404).json({
      message: "job not found",
    });
  }

  //check the recruiter own this job
  if (job.recruiter.toString() !== req.user.id) {
    return res.status(403).json({
      message: "Not authorized to edit this job",
    });
  }

  const updateJob = await jobModel.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
  });

  res.json(updateJob);
}

async function deleteJob(req, res) {
  const job = await jobModel.findById(req.params.id);

  if (!job) {
    return res.status(404).json({
      message: "job not found",
    });
  }

  if (job.recruiter.toString() !== req.user.id) {
    return res.status(403).json({
      message: "not authorized to delete the job",
    });
  }

  await jobModel.findByIdAndDelete(req.params.id);

  res.status(200).json({
    message: "job deleted successfully",
  });
}
module.exports = { createJob, getAllJobs, getSingleJob, updateJob, deleteJob };
