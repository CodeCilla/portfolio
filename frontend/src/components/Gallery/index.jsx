import { useState, useEffect } from 'react';
import { fetchProjects } from '../../api';
import GalleryItem from '../GalleryItem';
import ProjectModal from '../ProjectModal';
import './style.scss';

const Gallery = () => {
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true); // Chargement de la grille
  const [error, setError] = useState(null);

  // Gestion de la modale
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedProject, setSelectedProject] = useState(null);
  const [isProjectLoading, setIsProjectLoading] = useState(false); // Chargement spécifique à la modale

  // 1. Récupération de tous les projets au montage
  useEffect(() => {
    const getProjects = async () => {
      try {
        setLoading(true);
        const data = await fetchProjects();
        setProjects(data);
      } catch (err) {
        console.error(err);
        setError("Impossible de charger les projets.");
      } finally {
        setLoading(false);
      }
    };
    getProjects();
  }, []);

  // 2. Ouvrir la modale et fetcher les détails
  const openModal = async (id) => {
    setIsModalOpen(true);
    setIsProjectLoading(true); // On affiche un loader DANS la modale ou on attend
    
    const API_URL = import.meta.env.VITE_API_URL;

    try {
      // Note : Si ton tableau 'projects' contient déjà tout, ce fetch est inutile.
      // Je le garde au cas où la liste est "allégée" et le détail "complet".
      const response = await fetch(`${API_URL}/api/projects/${id}`);
      
      if (!response.ok) {
        throw new Error('Projet introuvable');
      }
      
      const data = await response.json();
      setSelectedProject(data);
    } catch (err) {
      console.error('Erreur:', err.message);
      // Optionnel : Afficher l'erreur dans la modale ou fermer
      alert("Erreur lors du chargement du projet"); 
      closeModal();
    } finally {
      setIsProjectLoading(false);
    }
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedProject(null);
  };

  return (
    <section id='projects' className='projects'>
      <h2>Mes projets</h2>
      <div className='border-h2'></div>

      {loading && <div className="loader">Chargement du portfolio...</div>}
      
      {error && <p className='error-message'>{error}</p>}

      {!loading && !error && (
        <ul className='projects__container'>
          {projects.length > 0 ? (
            // On inverse l'ordre pour avoir les plus récents en premier
            [...projects].reverse().map((project) => (
              <GalleryItem
                key={project._id}
                // Attention : On passe bien project.imageUrl ici
                image={project.imageUrl} 
                title={project.title}
                skills={project.skills}
                onClick={() => openModal(project._id)}
              />
            ))
          ) : (
            <p>Aucun projet à afficher pour le moment.</p>
          )}
        </ul>
      )}

      {/* Affichage Conditionnel de TA modale ProjectModal.
        Plus besoin de react-modal.
      */}
      {isModalOpen && (selectedProject || isProjectLoading) && (
        <ProjectModal 
          // Si ça charge, on peut passer un objet vide ou null, ou gérer un loader interne
          project={selectedProject} 
          onClose={closeModal} 
          isLoading={isProjectLoading} // Tu peux ajouter cette prop si tu veux afficher un spinner dans la modale
        />
      )}
    </section>
  );
};

export default Gallery;