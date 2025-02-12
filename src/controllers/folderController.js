const { Folder } = require("../../models");
const fs = require("fs");
const path = require("path");
const {
  createPhysicalFolder,
  deletePhysicalFolder,
} = require("../utils/folderUtils");

const validateFolderPayload = (data) => {
  let errors = [];

  const { name, type, maxFileLimit } = data;
  if (!name || !type || !maxFileLimit) {
    errors.push("All fields are required.");
  }
  if (!["csv", "img", "pdf", "ppt"].includes(type)) {
    errors.push("Invalid folder type.");
  }
  if (isNaN(maxFileLimit) || maxFileLimit <= 0) {
    errors.push("Max file limit must be a positive integer.");
  }

  return errors.length > 0 ? errors : null;
};

const createFolder = async (req, res) => {
  console.log("Folder data", req.body);
  try {
    const { name, type } = req.body;
    let maxFileLimit = parseInt(req.body.maxFileLimit, 10);

    // validate request payload
    const errors = validateFolderPayload({ name, type, maxFileLimit });
    if (errors) {
      return res
        .status(400)
        .json({ error: { description: errors.join(", ") } });
    }
    // Check for unique folder name
    const existingFolder = await Folder.findOne({ where: { name: name } });
    if (existingFolder) {
      return res.status(400).json({ error: "Folder name must be unique." });
    }

    // Create folder in the database
    const newFolder = await Folder.create({
      name,
      type,
      maxFileLimit,
    });

    // Create physical folder for the folder
    const folderPath = createPhysicalFolder(name);
    newFolder.folderPath = folderPath;
    newFolder.save();

    // Send response
    res.status(201).json({
      message: "Folder created successfully",
      folder: newFolder,
    });
  } catch (error) {
    console.error(error);
    res
      .status(500)
      .json({ Message: "Error while creating folder.", Error: error.message });
  }
};

const updateFolder = async (req, res) => {
  try {
    const { folderId } = req.params;
    const { name, type, maxFileLimit } = req.body;
    console.log("Folder data", req.body, "Folder ID:", folderId);

    const errors = validateFolderPayload({ name, type, maxFileLimit });
    if (errors) {
      return res
        .status(400)
        .json({ error: { description: errors.join(", ") } });
    }

    const findFolder = await Folder.findOne({ where: { folderId: folderId } });

    if (!findFolder) {
      return res.status(404).json({ error: "Folder not found." });
    }

    if (name && name !== findFolder.name) {
      deletePhysicalFolder(findFolder.name);
      createPhysicalFolder(name);
    }
    // Update the folder
    const updatedFolder = await findFolder.update({
      ...(name && { name }),
      ...(type && { type }),
      ...(maxFileLimit && { maxFileLimit: parseInt(maxFileLimit, 10) }),
    });

    res.status(200).json({
      message: "Folder updated successfully",
      folder: updatedFolder,
    });
  } catch (error) {
    console.error(error);
    res
      .status(500)
      .json({ Message: "Error while updating folder.", Error: error.message });
  }
};

const getFolders = async (req, res) => {
  try {
    const folders = await Folder.findAll();
    res.status(200).json(folders);
  } catch (error) {
    console.error(error);
  }
};
const deleteFolder = async (req, res) => {
  try {
    const { folderId } = req.params;
    const folder = await Folder.findOne({ where: { folderId: folderId } });
    if (!folder) {
      return res.status(404).json({ error: "Folder not found." });
    }
    await folder.destroy();
    deletePhysicalFolder(folder.name);
    return res.status(200).json({ message: "Folder deleted successfully." });
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      message: "Error while deleting folder.",
      error: error.message,
    });
  }
};

module.exports = { createFolder, updateFolder, getFolders, deleteFolder };
