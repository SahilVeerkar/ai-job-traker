
const mongoose = require("mongoose");

const jobSchema = new mongoose.Schema(
  {
    company: {
      type: String,
      required: true,
      trim: true,
    },

    role: {
      type: String,
      required: true,
      trim: true,
    },

    jobLink: {
      type: String,
      default: "",
    },

    status: {
      type: String,
      enum: ["Interested", "Applied", "Interview", "Rejected", "Offer"],
      default: "Applied",
    },

    appliedDate: {
      type: Date,
      default: Date.now,
    },

    notes: {
      type: String,
      default: "",
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Job", jobSchema);
