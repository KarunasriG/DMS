const { Router } = require("express");
const multer = require("multer");
const { upload } = require("../middleware/fileUpload");
const {
  createFolder,
  updateFolder,
  deleteFolder,
  getFolders,
} = require("../controllers/folderController");

const {
  fileUpload,
  fileUpdate,
  fileDelete,
  getFiles,
} = require("../controllers/fileController");
const {
  sortFilesBy,
  getFilesByType,
  getFileMetadata,
} = require("../controllers/sortFilesBy");

const Routes = Router();

// Routes for folder management
Routes.get("/", getFolders);
Routes.post("/create", createFolder);
Routes.put("/:folderId", updateFolder);
Routes.delete("/:folderId", deleteFolder);

// Routes for file management
Routes.post("/:folderId/files", upload.single("file"), fileUpload);

Routes.put("/:folderId/files/:fileId", upload.single("file"), fileUpdate);

Routes.delete("/:folderId/files/:fileId", fileDelete);

Routes.get("/:folderId/files", getFiles);

// Routes for sorting files
Routes.get("/:folderId/filesBySort", sortFilesBy);

// Routes.get("/files", getFilesByType);

Routes.get("/:folderId/files/metadata", getFileMetadata);

module.exports = { Routes };
