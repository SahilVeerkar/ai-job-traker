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

module.exports = router;
