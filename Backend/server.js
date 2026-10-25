const express = require("express");
const dotenv = require("dotenv");
const connectDB = require("./config/db");
const jobRoutes= require("./routes/jobRoutes");
const cors = require("cors");

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

app.use(express.json());
app.use(cors());

app.get("/", (req, res) => {
  res.json({
    success: true,
    message: "AI Job Tracker API is running!",
  });
});

app.use("/api/jobs", jobRoutes);

async function startServer() {
  await connectDB();

  app.listen(PORT, () => {
    console.log(`Server running on port http://localhost:${PORT}`);
  });
}

startServer();