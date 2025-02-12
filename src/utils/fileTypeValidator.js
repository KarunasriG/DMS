const path = require("path");

const fileTypeValidator = (file) => {
  // console.log(file);
  const fileTypes = /csv|pdf|ppt|img|jpg|jpeg|png/;
  const extname = fileTypes.test(path.extname(file.originalname).toLowerCase());
  const mimeType = fileTypes.test(file.mimetype);
  return mimeType && extname;
};

module.exports = { fileTypeValidator };
