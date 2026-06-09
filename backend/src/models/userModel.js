const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },
    email: {
      type: String,
      unique: true,
      required: true,
      lowercase: true,
    },
    password: {
      type: String,
      required: true,
    },
    role: {
      type: String,
      enum: ["seeker", "recruiter"],
      default: "seeker",
    },
    profile: {
      bio: String,
      skills: [String],
      resumeUrl: String,
    },
  },
  { timestamps: true },
);

const userModel = mongoose.model("Users", userSchema);

module.exports = userModel;
