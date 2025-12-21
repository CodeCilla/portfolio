import PropTypes from 'prop-types';
import ReactMarkdown from 'react-markdown';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faGithub } from '@fortawesome/free-brands-svg-icons';
import { faGlobe } from '@fortawesome/free-solid-svg-icons'; // Import de l'icône pour le site
import './style.scss';

const ProjectModal = ({ project, onClose }) => {
  if (!project) return null;

  const { title, imageUrl, description, skills, github, link } = project;

  return (
    <dialog className='modal' open>
      <div className='modal__content'>
        <button onClick={onClose} className='modal__content--close'>
          Fermer
        </button>

        <div className='info'>
          <h3 className='info__title'>{title}</h3>
          {imageUrl && (
            <img
              src={imageUrl}
              alt={`Aperçu de ${title}`}
              className='info__image'
            />
          )}
        </div>

        <div className='details'>
          <div>
            <h4 className='details__title'>Description</h4>
            <div className='details__content markdown-body'>
              <ReactMarkdown>{description}</ReactMarkdown>{' '}
            </div>
          </div>

          <div>
            <h4 className='details__title'>Technologies</h4>
            <ul className='details__content tags-group'>
              {skills.map((skill, index) => (
                <li key={index} className='tag'>
                  {skill}
                </li>
              ))}
            </ul>
          </div>
        </div>

        <footer className='modal-footer'>
          {/* Lien vers le site (Icône Globe) */}
          {link && (
            <a
              href={link}
              target='_blank'
              rel='noreferrer'
              aria-label='Voir le site en ligne' // Très important pour l'accessibilité car il n'y a plus de texte
              className='modal-footer__link'
            >
              <FontAwesomeIcon icon={faGlobe} className='modal-footer__icon' />
            </a>
          )}

          {/* Lien vers GitHub (Icône Github) */}
          {github && (
            <a
              href={github}
              target='_blank'
              rel='noreferrer'
              aria-label='Voir le code sur Github'
              className='modal-footer__link'
            >
              <FontAwesomeIcon icon={faGithub} className='modal-footer__icon' />
            </a>
          )}
        </footer>
      </div>
    </dialog>
  );
};

ProjectModal.propTypes = {
  project: PropTypes.shape({
    title: PropTypes.string.isRequired,
    imageUrl: PropTypes.string.isRequired,
    description: PropTypes.string.isRequired,
    skills: PropTypes.arrayOf(PropTypes.string).isRequired,
    github: PropTypes.string,
    link: PropTypes.string,
    userId: PropTypes.string,
  }),
  onClose: PropTypes.func.isRequired,
};

export default ProjectModal;
