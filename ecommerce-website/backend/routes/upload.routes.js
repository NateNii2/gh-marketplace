const express = require("express");
const cloudinary = require("../config/cloudinary");
const upload = require("../middleware/upload");

const router = express.Router();

/* ---------------- IMAGE UPLOAD ---------------- */

router.post("/", upload.single("image"), async (req, res) => {
  try {
    // Ensure a file was sent
    if (!req.file) {
      return res.status(400).json({ message: "No image provided" });
    }

    // Upload to Cloudinary
    const stream = cloudinary.uploader.upload_stream(
      {
        folder: "products",
        resource_type: "image",
        format: "jpg", // converts HEIC/PNG/etc → JPG automatically
      },
      (error, result) => {
        if (error) {
          console.error("Cloudinary upload error:", error);
          return res.status(500).json({
            message: "Image upload failed",
          });
        }

        // Send back the secure URL
        res.json({
          url: result.secure_url,
        });
      }
    );

    // Send file buffer to Cloudinary
    stream.end(req.file.buffer);

  } catch (error) {
    console.error("Upload route error:", error);

    res.status(500).json({
      message: "Server error during upload",
    });
  }
});

module.exports = router;