require("dotenv").config();
require("express-async-errors");
const express = require("express");
const app = express();
const path = require("path");
const { logger, logEvents } = require("./middleware/logger");
const errorHandler = require("./middleware/errorHandler");
const cookieParser = require("cookie-parser");
const cors = require("cors");
const corsOptions = require("./config/corsOptions");
const connectDB = require("./config/dbConn");
const mongoose = require("mongoose");
const fileUpload = require("express-fileupload");
const fs = require("fs");
const { v4: uuidv4 } = require('uuid'); // Import UUID library
const PORT = process.env.PORT || 3500;

console.log(process.env.NODE_ENV);

connectDB();

app.use(logger);

app.use(cors(corsOptions));

app.use(express.json());

app.use(cookieParser());

app.use(fileUpload());

app.use("/", express.static(path.join(__dirname, "public")));

/* Begin Routes */
app.use("/", require("./routes/root"));
app.use("/auth", require("./routes/authRoutes"));
app.use("/users", require("./routes/userRoutes"));
app.use("/posts", require("./routes/postRoutes"));
app.use("/workouts", require("./routes/workoutRoutes"));
app.use("/groups", require("./routes/groupRoutes"));
app.use("/progress-logs", require("./routes/progressLogRoutes"));

app.post("/upload", (req, res) => {
  console.log("Received upload request:", req.files);

  if (!req.files || Object.keys(req.files).length === 0) {
    console.error("No files were uploaded.");
    return res.status(400).send("No files were uploaded.");
  }

  const file = req.files.image; // Assuming the file input name is 'image'
  const uploadDir = path.join(__dirname, "uploads");

  // Ensure the uploads directory exists
  if (!fs.existsSync(uploadDir)) {
    fs.mkdirSync(uploadDir, { recursive: true });
  }

  // Generate a unique file name
  const uniqueFileName = `${Date.now()}-${uuidv4()}${path.extname(file.name)}`;
  const uploadPath = path.join(uploadDir, uniqueFileName);

  file.mv(uploadPath, (err) => {
    if (err) {
      console.error("Error moving file:", err);
      return res.status(500).send(err);
    }
    const fileUrl = `${req.protocol}://${req.get(
      "host"
    )}/uploads/${uniqueFileName}`;
    console.log("File uploaded successfully:", fileUrl);
    res.status(200).json({ fileUrl });
  });
});

app.use("/uploads", express.static(path.join(__dirname, "uploads")));
/* End Routes */

app.all("*", (req, res) => {
  res.status(404);
  if (req.accepts("html")) {
    res.sendFile(path.join(__dirname, "views", "404.html"));
  } else if (req.accepts("json")) {
    res.json({ message: "404 Not Found" });
  } else {
    res.type("txt").send("404 Not Found");
  }
});

app.use(errorHandler);

mongoose.connection.once("open", () => {
  console.log("Connected to MongoDB");
  app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
});

mongoose.connection.on("error", (err) => {
  console.log(err);
  logEvents(
    `${err.no}: ${err.code}\t${err.syscall}\t${err.hostname}`,
    "mongoErrLog.log"
  );
});
