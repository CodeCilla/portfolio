import PropTypes from 'prop-types';
import './style.scss';

const GalleryItem = ({ image, title, onClick }) => {
  // Gestion de la touche "Entrée" pour l'accessibilité
  const handleKeyDown = (e) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      onClick();
    }
  };

  return (
    <li 
      className='project__item'
      onClick={onClick}
      onKeyDown={handleKeyDown}
      tabIndex="0" // Rend l'élément focusable avec la touche Tab
      role="button" // Indique aux lecteurs d'écran que c'est un bouton
      aria-label={`Voir les détails du projet ${title}`}
    >
      <div
        className='project__item--cover'
        style={{ backgroundImage: `url(${image})` }}
        // Accessibilité : si l'image est purement déco ici (car en background), c'est ok.
      ></div>
      <h3 className='project__item--title'>{title}</h3>
    </li>
  );
};

GalleryItem.propTypes = {
  image: PropTypes.string.isRequired, 
  title: PropTypes.string.isRequired,
  onClick: PropTypes.func.isRequired,
};

export default GalleryItem;