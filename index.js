const express = require("express");
const cors = require("cors");
const fs = require("fs");
const path = require("path");
const { sequelize } = require("./models");
const { Routes } = require("./src/router/routes");
const { getFilesByType } = require("./src/controllers/sortFilesBy");

const app = express();
app.use(express.json());
app.use(cors());

const uploadDir = path.join(__dirname, "uploads");

if (!fs.existsSync(uploadDir)) {
  fs.mkdirSync(uploadDir);
}

sequelize
  .authenticate()
  .then(() => {
    console.log("Database connected");
  })
  .catch((error) => {
    console.error("Unable to connect to the database:", error);
  });

app.use("/folders", Routes);

app.get("/files", getFilesByType);

// Start the server
const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
