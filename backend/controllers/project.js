const cloudinary = require('cloudinary').v2;
const Project = require('../models/project');
const fs = require('fs');

// --- HELPER FUNCTION ---
// Fonction utilitaire pour supprimer une image de Cloudinary
// On la met en dehors des exports pour qu'elle soit privée (accessible uniquement dans ce fichier)
const deleteImageFromCloudinary = (imageUrl) => {
  return new Promise((resolve, reject) => {
    if (!imageUrl) return resolve(); // Pas d'image à supprimer

    try {
      // Extraction de l'ID Public (basé sur ton code qui gère les dossiers)
      const publicId = imageUrl
        .split('/upload/')[1]
        .split('/')
        .slice(1)
        .join('/')
        .split('.')[0];

      console.log(`[Cloudinary] Suppression de l'image : ${publicId}`);

      cloudinary.uploader.destroy(publicId, (error, result) => {
        if (error) {
          console.error('[Cloudinary] Erreur suppression :', error);
          // On ne reject pas forcément ici, pour ne pas bloquer la suppression du projet en base
          // mais on log l'erreur.
          resolve(result); 
        } else {
          console.log('[Cloudinary] Image supprimée avec succès');
          resolve(result);
        }
      });
    } catch (error) {
      console.error("[Cloudinary] Erreur lors de l'extraction de l'ID :", error);
      resolve(); // On continue même si l'URL est malformée
    }
  });
};

// --- CONTROLLERS ---

exports.getAllProjects = (req, res, next) => {
  Project.find()
    .then((projects) => res.status(200).json(projects))
    .catch((error) => res.status(400).json({ error }));
};

exports.getOneProject = (req, res, next) => {
  Project.findOne({ _id: req.params.id })
    .then((project) => res.status(200).json(project))
    .catch((error) => res.status(404).json({ error }));
};

exports.createProject = async (req, res, next) => {
  try {
    const projectObject = JSON.parse(req.body.project);
    delete projectObject._id;
    delete projectObject._userId;

    const project = new Project({
      ...projectObject,
      userId: req.auth.userId,
      // On utilise imageUrl pour être cohérent avec le schéma Mongoose
      imageUrl: req.imageUrl, 
      // On s'assure que isConfidential est bien un booléen
      isConfidential: projectObject.isConfidential || false,
    });

    await project.save();
    res.status(201).json({ message: 'Projet enregistré !' });

  } catch (error) {
    console.error('Erreur createProject :', error);
    res.status(400).json({ error });
  }
};

exports.updateProject = async (req, res, next) => {
    try {
        // 1. Récupération des données (soit JSON pur, soit FormData avec fichier)
        let projectObject;
        
        if (req.file) {
            // Cas : Nouvelle image envoyée
            projectObject = {
                ...JSON.parse(req.body.project),
                imageUrl: req.imageUrl, // URL générée par ton middleware Cloudinary/Multer
            };
        } else {
            // Cas : Modification texte uniquement
            projectObject = { ...req.body };
        }

        delete projectObject._userId; // Sécurité

        // 2. Recherche du projet existant pour vérification
        const oldProject = await Project.findOne({ _id: req.params.id });

        if (!oldProject) {
            return res.status(404).json({ message: 'Projet non trouvé' });
        }

        // 3. Vérification des droits (Propriétaire)
        if (oldProject.userId != req.auth.userId) {
            return res.status(401).json({ message: 'Non autorisé' });
        }

        // 4. GESTION DE L'IMAGE : Si on remplace l'image, on supprime l'ancienne
        if (req.file && oldProject.imageUrl) {
             // On attend que la suppression soit finie avant de continuer (optionnel mais plus propre)
             await deleteImageFromCloudinary(oldProject.imageUrl);
        }

        // 5. Mise à jour en base
        await Project.updateOne(
            { _id: req.params.id }, 
            { ...projectObject, _id: req.params.id }
        );

        res.status(200).json({ message: 'Projet modifié !' });

    } catch (error) {
        console.error('Erreur modifyProject :', error);
        res.status(400).json({ error });
    }
};

exports.deleteProject = async (req, res, next) => {
    try {
        const project = await Project.findOne({ _id: req.params.id });

        if (!project) {
            return res.status(404).json({ message: 'Projet non trouvé !' });
        }

        if (project.userId != req.auth.userId) {
            return res.status(401).json({ message: 'Non autorisé' });
        }

        // 1. Suppression de l'image sur Cloudinary via notre Helper
        if (project.imageUrl) {
            await deleteImageFromCloudinary(project.imageUrl);
        }

        // 2. Suppression du projet en base de données
        await Project.deleteOne({ _id: req.params.id });
        
        res.status(200).json({ message: 'Projet supprimé !' });

    } catch (error) {
        console.error('Erreur deleteProject :', error);
        res.status(500).json({ error });
    }
};