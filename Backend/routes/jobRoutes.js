const express = require("express");
const router = express.Router();

const Job = require("../models/Job");

router.post("/", async (req, res) => {
  try {
    const newJob = await Job.create(req.body);

    res.status(201).json({
      success: true,
      message: "Job application saved successfully",
      data: newJob,
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: error.message,
    });
  }
});

router.get("/", async (req, res) => {
  try {
    const jobs = await Job.find();

    res.status(201).json({
      success: true,
      count:jobs.length,
      data: jobs,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
});

router.get("/:id", async (req, res) => {
  try {
    const job = await Job.findById(req.params.id);

    if (!job) {
      return res.status(404).json({
        success: false,
        message: "Job not found",
      });
    }

    res.json({
      success: true,
      data: job,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
});

router.patch("/:id", async (req, res) => {
  try {
    const updateJob = await Job.findByIdAndUpdate(
      req.params.id,
      req.body,
    { new: true, runValidators: true }
  );

    if (!updateJob) {
      return res.status(404).json({
        success: false,
        message: "Job not found",
      });
    }

    res.json({
      success: true,
      data: updateJob,
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: error.message,
    });
  }
});

router.delete("/:id", async (req, res) => {
  try {
    const deletedJob = await Job.findByIdAndDelete(req.params.id);

    if (!deletedJob) {
      return res.status(404).json({
        success: false,
        message: "Job not found",
      });
    }

    res.json({
      success: true,
      message: "Job deleted successfully",
      data: deletedJob,
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: error.message,
    });
  }
});

module.exports = router;
