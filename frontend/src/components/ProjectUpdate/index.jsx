import { fetchProjects } from '../../api';
import { useState, useEffect } from 'react';
import useDeleteProject from '../../utils/hooks/useDeleteProject';
import ProjectForm from '../ProjectForm';
import './style.scss';

const ProjectUpdate = () => {
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [projectToEdit, setProjectToEdit] = useState(null);

  const {
    deleteProject,
    isLoading: isDeleting,
    error: deleteError,
  } = useDeleteProject();

  useEffect(() => {
    const getProjects = async () => {
      setLoading(true);
      try {
        const data = await fetchProjects();
        setProjects(data);
      } catch (err) {
        console.error(
          'Erreur lors de la récupération des projets:',
          err.message,
        );
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };
    getProjects();
  }, []);

  const handleDelete = async (projectId) => {
    if (window.confirm('Êtes-vous sûr de vouloir supprimer ce projet ?')) {
      await deleteProject(projectId);
      setProjects((prevProjects) =>
        prevProjects.filter((project) => project._id !== projectId),
      );
    }
  };

  const handleEdit = (project) => {
    setProjectToEdit(project);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className='project-update-container'>
      <ProjectForm
        setProjects={setProjects}
        projectToEdit={projectToEdit}
        setProjectToEdit={setProjectToEdit}
      />

      <h2>Mise à jour des Projets</h2>

      {loading && <p>Chargement des projets...</p>}
      {error && <p className='error-message'>Erreur : {error}</p>}
      {deleteError && (
        <p className='error-message'>Erreur suppression : {deleteError}</p>
      )}

      {!loading && projects.length === 0 && <p>Aucun projet à afficher</p>}

      {!loading && projects.length > 0 && (
        <div className='table-responsive'>
          <table className='project-table'>
            <thead className='project-table__header'>
              <tr>
                <th className='project-table__header-cell'>#</th>
                <th className='project-table__header-cell'>Nom</th>
                <th className='project-table__header-cell'>Image</th>
                <th className='project-table__header-cell'>Description</th>
                <th className='project-table__header-cell'>Compétences</th>

                {/* Github et Lien regroupés ou séparés selon ton choix */}
                <th className='project-table__header-cell'>Liens</th>
                <th className='project-table__header-cell'>Actions</th>
              </tr>
            </thead>
            <tbody className='project-table__body'>
              {projects.map((project, index) => (
                <tr key={project._id} className='project-table__body-row'>
                  <td className='project-table__body-row-cell'>{index + 1}</td>

                  <td className='project-table__body-row-cell'>
                    {project.title}
                  </td>

                  {/* CORRECTION : usage de imageUrl au lieu de image */}
                  <td className='project-table__body-row-cell project-table__body-row-cell--image'>
                    <img src={project.imageUrl} alt={project.title} />
                  </td>

                  <td className='project-table__body-row-cell'>
                    {project.description}
                  </td>

                  <td className='project-table__body-row-cell'>
                    {project.skills ? project.skills.join(', ') : ''}
                  </td>

                  {/* NOUVEAU : Colonne Liens (Github + Link) */}
                  <td className='project-table__body-row-cell'>
                    <div
                      style={{
                        display: 'flex',
                        flexDirection: 'column',
                        gap: '5px',
                      }}
                    >
                      {project.github && (
                        <a
                          href={project.github}
                          target='_blank'
                          rel='noopener noreferrer'
                        >
                          Github
                        </a>
                      )}
                      {project.link && (
                        <a
                          href={project.link}
                          target='_blank'
                          rel='noopener noreferrer'
                        >
                          Site Web
                        </a>
                      )}
                    </div>
                  </td>

                  <td className='project-table__body-row-cell project-table__body-row-cell--actions'>
                    <button
                      className='project-table__button project-table__button--edit'
                      onClick={() => handleEdit(project)}
                      disabled={isDeleting}
                    >
                      Modifier
                    </button>
                    <button
                      className='project-table__button project-table__button--delete'
                      onClick={() => handleDelete(project._id)}
                      disabled={isDeleting}
                    >
                      {isDeleting ? '...' : 'Supprimer'}
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default ProjectUpdate;
