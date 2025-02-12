const fs = require("fs");
const path = require("path");

// Base directory for folder creation
const BASE_UPLOADS_DIR = path.join(__dirname, "..", "..", "uploads");

const ensureUploadsDirExists = () => {
  if (!fs.existsSync(BASE_UPLOADS_DIR)) {
    fs.mkdirSync(BASE_UPLOADS_DIR, { recursive: true });
    console.log("Base uploads directory created at:", BASE_UPLOADS_DIR);
  }
};

const createPhysicalFolder = (folderName) => {
  ensureUploadsDirExists();

  const folderPath = path.join(BASE_UPLOADS_DIR, folderName);

  if (!fs.existsSync(folderPath)) {
    fs.mkdirSync(folderPath, { recursive: true });
    console.log(`Folder "${folderName}" created successfully at:`, folderPath);
  } else {
    console.log(`Folder "${folderName}" already exists.`);
  }

  return folderPath;
};

const deletePhysicalFolder = (folderName) => {
  const folderPath = path.join(BASE_UPLOADS_DIR, folderName);

  if (fs.existsSync(folderPath)) {
    fs.rmdirSync(folderPath, { recursive: true });
    console.log(`Folder "${folderName}" deleted successfully.`);
  } else {
    console.log(`Folder "${folderName}" does not exist.`);
  }
};

module.exports = {
  createPhysicalFolder,
  deletePhysicalFolder,
};
