const { Folder, File } = require("../../models");
const path = require("path");
const fs = require("fs");
const { uploadToCloudinary } = require("../config/cloudinary.js");

const fileUpload = async (req, res) => {
  try {
    const { folderId } = req.params;
    const { description } = req.body;
    const { file } = req;

    console.log(req.file);

    const folder = await Folder.findOne({ where: { folderId: folderId } });
    if (!folder) {
      return res.status(404).json({ error: "Folder not found." });
    }

    const originalname = req.file.originalname;
    console.log(originalname);
    // Validate file type matches folder type
    const fileType = path.extname(req.file.originalname).slice(1).toLowerCase();
    if (folder.type !== fileType) {
      return res
        .status(400)
        .json({ error: "File type does not match the folder type." });
    }

    // Validate max file limit
    const filesInFolder = fs.readdirSync(
      path.join(__dirname, "..", "..", "uploads", folder.name)
    );
    if (filesInFolder.length >= folder.maxFileLimit) {
      return res
        .status(400)
        .json({ error: "Folder has reached its maximum file limit" });
    }
    console.log("cloud start");
    const cloudinaryResponse = await uploadToCloudinary(req.file.path);
    console.log("creating start");
    const newFile = await File.create({
      folderId: folderId,
      name: file.originalname,
      description: description,
      type: file.mimetype,
      size: file.size,
    });
    return res
      .status(201)
      .json({ message: "File uploaded successfully", file: newFile });
  } catch (error) {
    console.error(error);
    res
      .status(500)
      .send({ message: "Error while uploading file", error: error.message });
  }
};

const fileUpdate = async (req, res) => {
  try {
    const { description } = req.body;
    const { fileId, folderId } = req.params;

    if (!description) {
      return res.status(400).json({ error: "Description field is required." });
    }

    const file = await File.findOne({ where: { fileId, folderId } });

    if (!file) {
      return res
        .status(404)
        .json({ error: "File does not exist in the specified folder." });
    }

    // Update the file description
    file.description = description;
    await file.save();

    res.status(200).json({
      message: "File description updated successfully",
      file: {
        fileId: file.fileId,
        description: file.description,
      },
    });
  } catch (error) {
    console.error(error);
    return res.status(500).send({ message: "Error while updating file" });
  }
};

const fileDelete = async (req, res) => {
  try {
    const { fileId, folderId } = req.params;
    const file = await File.findOne({ where: { fileId, folderId } });
    if (!file) {
      return res
        .status(404)
        .json({ error: "File does not exist in the specified folder." });
    }

    // Delete the file from the database
    await file.destroy();

    res.status(200).json({ message: "File deleted successfully" });
  } catch (error) {
    console.error(error);
    return res.status(500).send({ message: "Error while deleting file" });
  }
};

const getFiles = async (req, res) => {
  try {
    const { folderId } = req.params;
    const files = await File.findAll({ where: { folderId: folderId } });

    if (!files) {
      return res.status(404).json({ error: "Files not found." });
    }

    const filesData = files.map((file) => ({
      fileId: file.fileId,
      name: file.name,
      description: file.description,
      size: file.size,
      uploadedAt: file.uploadedAt,
    }));
    return res.status(200).json(filesData);
  } catch (error) {
    console.error(error);
    return res.status(500).send({ message: "Error while fetching files" });
  }
};
module.exports = { fileUpload, fileUpdate, fileDelete, getFiles };
