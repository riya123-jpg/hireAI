const mongoose = require("mongoose");

const applicationSchema = new mongoose.Schema(
  {
    job: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "job",
      required: true,
    },
    applicant: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Users",
      required: true,
    },
    resumeUrl: {
      type: String,
      required: true,
    },
    coverLetter: {
      type: String,
    },
    status: {
      type: String,
      enum: ["pending", "reviewed", "shortlisted", "rejected"],
      default: "pending",
    },
    aiScore: {
      type: Number,
      missingSkills: [String],
      feedBack: String,
    },
  },
  { Timestamp: true },
);

applicationSchema.index({ jobs: 1, applicant: 1 }, { unique: true });

const applicationModel = mongoose.model("application", applicationSchema);

module.exports = applicationModel;
