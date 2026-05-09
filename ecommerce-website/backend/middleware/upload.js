const multer = require("multer");

const storage = multer.memoryStorage();

const upload = multer({
  storage,

  limits: {
    fileSize: 15 * 1024 * 1024, // 15MB
  },

  fileFilter: (req, file, cb) => {
    // Accept ANY image type
    if (file.mimetype.startsWith("image/")) {
      cb(null, true);
    } else {
      cb(new Error("Only image files are allowed"), false);
    }
  },
});

module.exports = upload;