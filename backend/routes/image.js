const client = require("../config/db");
const express = require("express");
const upload=require("../multer/multer")
const router = express.Router();
const {
  getImagesByProject,
  getAllImages,
  deleteImage,
  uploadImages,
} = require("../controller/image");

// route to upload project images
router.post(
  "/api/upload/image/projects/:id",
  upload.array("image"),  uploadImages
);

// route to get images by project
router.get("/api/images/projects/:id", getImagesByProject);
// route to get all images
router.get("/api/images", getAllImages);
// route to delete image by id
router.delete("/api/images/:id", deleteImage);
// 
module.exports = router;
