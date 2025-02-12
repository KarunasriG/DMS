const { Folder, File } = require("../../models");

const sortFilesBy = async (req, res) => {
  try {
    const { folderId } = req.params;
    const { sort } = req.query;

    if (!sort) {
      return res.status(400).json({ error: "Sort field is required." });
    }

    if (sort !== "size" && sort !== "uploadedAt") {
      return res.status(400).json({ error: "Invalid sort field." });
    }
    const files = await File.findAll({ where: { folderId: folderId } });

    if (!files) {
      return res.status(404).json({ error: "Files not found." });
    }
    const sortedFiles = files.sort((a, b) =>
      sort === "size" ? a.size - b.size : a.uploadedAt - b.uploadedAt
    );
    res.status(200).json(sortedFiles);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Error while sorting files" });
  }
};

const getFilesByType = async (req, res) => {
  try {
    const { type } = req.query;

    if (!type) {
      return res.status(400).json({ error: "Type field is required." });
    }
    // "csv", "img", "pdf", "ppt

    if (type !== "csv" && type !== "img" && type !== "pdf" && type !== "ppt") {
      return res.status(400).json({ error: "Invalid type field." });
    }

    const files = await File.findAll({
      where: { type: `application/${type}` },
    });

    if (!files) {
      return res.status(404).json({ error: "Files not found." });
    }
    res.status(200).json({ files });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Error while fetching files" });
  }
};

const getFileMetadata = async (req, res) => {
  try {
    const { folderId } = req.params;

    const folder = await Folder.findOne({ where: { folderId } });
    if (!folder) {
      return res.status(404).json({ error: "Folder not found." });
    }

    const files = await File.findAll({
      where: { folderId },
      attributes: ["fileId", "name", "size", "description"],
    });

    if (!files.length) {
      return res
        .status(404)
        .json({ message: "No files found in the specified folder." });
    }
    res.status(200).json({
      files,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      error: "Error retrieving file metadata.",
      details: error.message,
    });
  }
};
module.exports = { sortFilesBy, getFilesByType, getFileMetadata };
