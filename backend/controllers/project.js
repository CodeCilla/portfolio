const cloudinary = require('cloudinary').v2;
const Project = require('../models/project');
const fs = require('fs');

const deleteImageFromCloudinary = (imageUrl) => {
  return new Promise((resolve, reject) => {
    if (!imageUrl) return resolve();

    try {
      const publicId = imageUrl
        .split('/upload/')[1]
        .split('/')
        .slice(1)
        .join('/')
        .split('.')[0];

      cloudinary.uploader.destroy(publicId, (error, result) => {
        if (error) {
          console.error('[Cloudinary] Erreur suppression :', error);
          resolve(result);
        } else {
          resolve(result);
        }
      });
    } catch (error) {
      console.error(
        "[Cloudinary] Erreur lors de l'extraction de l'ID :",
        error,
      );
      resolve();
    }
  });
};

exports.getAllProjects = (req, res, next) => {
  const language = req.query.lang || 'fr'; // Récupérer la langue depuis la requête, 'fr' par défaut
  Project.find()
    .then((projects) => {
      const projectsWithLanguage = projects.map((project) => ({
        title: project.title[language], // Récupérer le titre dans la langue demandée
        description: project.description[language], // Récupérer la description dans la langue demandée
        image: project.image,
        skills: project.skills,
        github: project.github,
      }));
      res.status(200).json(projectsWithLanguage);
    })
    .catch((error) => res.status(400).json({ error }));
};

<<<<<<< HEAD
exports.createProject = (req, res, next) => {
  try {
    if (!req.body.project) {
      return res.status(400).json({ message: 'Données du projet manquantes' });
    }

    const projectObject = JSON.parse(req.body.project);

    // Vérification des champs obligatoires
    if (
      !projectObject.title ||
      !projectObject.title.fr ||
      !projectObject.title.en
    ) {
      return res
        .status(400)
        .json({ message: 'Le titre est requis en français et en anglais' });
    }
    if (
      !projectObject.description ||
      !projectObject.description.fr ||
      !projectObject.description.en
    ) {
      return res.status(400).json({
        message: 'La description est requise en français et en anglais',
      });
    }
    if (!req.file) {
      return res.status(400).json({ message: "L'image est requise" });
    }

    delete projectObject._id;
    delete projectObject._userId;

    const project = new Project({
      ...projectObject,
      userId: req.auth.userId,
      image: `${req.protocol}://${req.get('host')}/images/${req.file.filename}`,
    });

    project
      .save()
      .then(() => res.status(201).json({ message: 'Projet enregistré !' }))
      .catch((error) => res.status(500).json({ error }));
  } catch (error) {
    res.status(500).json({
      message: 'Erreur lors de la création du projet',
      error: error.message,
    });
  }
};

=======
>>>>>>> main
exports.getOneProject = (req, res, next) => {
  const language = req.query.lang || 'fr'; // Récupérer la langue depuis la requête, 'fr' par défaut
  Project.findOne({ _id: req.params.id })
    .then((project) => {
      if (!project) {
        return res.status(404).json({ error: 'Projet non trouvé' });
      }

      res.status(200).json({
        title: project.title[language], // Récupérer le titre dans la langue demandée
        description: project.description[language], // Récupérer la description dans la langue demandée
        image: project.image,
        skills: project.skills,
        github: project.github,
      });
    })
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
      imageUrl: req.imageUrl,
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
    let projectObject;

    if (req.file) {
      projectObject = {
        ...JSON.parse(req.body.project),
        imageUrl: req.imageUrl,
      };
    } else {
      projectObject = { ...req.body };
    }

    delete projectObject._userId;

    const oldProject = await Project.findOne({ _id: req.params.id });

    if (!oldProject) {
      return res.status(404).json({ message: 'Projet non trouvé' });
    }

    if (oldProject.userId != req.auth.userId) {
      return res.status(401).json({ message: 'Non autorisé' });
    }

    if (req.file && oldProject.imageUrl) {
      await deleteImageFromCloudinary(oldProject.imageUrl);
    }

    await Project.updateOne(
      { _id: req.params.id },
      { ...projectObject, _id: req.params.id },
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

    if (project.imageUrl) {
      await deleteImageFromCloudinary(project.imageUrl);
    }

    await Project.deleteOne({ _id: req.params.id });

    res.status(200).json({ message: 'Projet supprimé !' });
  } catch (error) {
    console.error('Erreur deleteProject :', error);
    res.status(500).json({ error });
  }
};
