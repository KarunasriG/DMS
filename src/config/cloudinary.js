const { v2 } = require("cloudinary");
require("dotenv").config();

const cloudinary = v2;

const cloudinaryConfig = () => {
  cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET,
  });
};

const uploadToCloudinary = async (filePath) => {
  try {
    cloudinaryConfig();
    const result = await cloudinary.uploader.upload(filePath);
    return result;
  } catch (error) {
    console.error("Error while uploading to Cloudinary", error);
  }
};

module.exports = {
  uploadToCloudinary,
  cloudinaryConfig,
};
