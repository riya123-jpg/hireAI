const mongoose = require("mongoose");

const jobSchema = mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
      trim: true,
    },
    description: {
      type: String,
      required: true,
    },
    company: {
      type: String,
      required: true,
    },
    location: {
      type: String,
      required: true,
    },
    salary: {
      min: Number,
      max: Number,
    },
    skills: { type: [String] },
    jobtype: {
      type: String,
      enum: ["fulltime", "parttime", "internship", "remote"],
      default: "fulltime",
    },
    recruiter: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Users",
      required: true,
    },
    isOpen: {
      type: Boolean,
      default: true,
    },
  },
  { Timestamp: true },
);

const jobModel = mongoose.model("job", jobSchema);

module.exports = jobModel;
