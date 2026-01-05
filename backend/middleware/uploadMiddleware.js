const multer = require('multer');
const sharp = require('sharp');
const path = require('path');
const fs = require('fs-extra');
const cloudinary = require('./cloudinaryConfig');

// Multer storage in memory
const storage = multer.memoryStorage();
const upload = multer({ storage });

// Convert image to WebP and upload to Cloudinary
const processImage = async (req, res, next) => {
  if (!req.file) {
    return res.status(400).json({ error: 'Aucune image envoyée' });
  }

  try {
    // Create a temporary file
    const tempPath = path.join(__dirname, 'temp', `${Date.now()}.webp`);
    await fs.ensureDir(path.join(__dirname, 'temp'));

    // Convert in webp with sharp
    await sharp(req.file.buffer).webp({ quality: 80 }).toFile(tempPath);

    // Upload on Cloudinary
    const result = await cloudinary.uploader.upload(tempPath, {
      folder: 'portfolio-images',
      use_filename: true,
      resource_type: 'image',
    });

    // Remove temporary file
    await fs.remove(tempPath);

    // Add image URL to req object
    req.imageUrl = result.secure_url;
    next();
  } catch (error) {
    console.error("Erreur lors du traitement de l'image :", error);
    res.status(500).json({ error: "Erreur lors du traitement de l'image" });
  }
};

module.exports = { upload, processImage };
