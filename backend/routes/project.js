const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const validateProject = require('../middleware/validateProject');
const { upload, processImage } = require('../middleware/uploadMiddleware');

const projectCtrl = require('../controllers/project');

// Routes Publiques
router.get('/', projectCtrl.getAllProjects);
router.get('/:id', projectCtrl.getOneProject);

// Routes Privées (Auth requise)

// Création
router.post(
  '/',
  auth,
  upload.single('image'),
  processImage,
  validateProject,
  projectCtrl.createProject,
);

router.put(
  '/:id',
  auth,
  upload.single('image'),
  processImage,
  // validateProject,
  projectCtrl.updateProject,
);

// Suppression
router.delete('/:id', auth, projectCtrl.deleteProject);

module.exports = router;
