import PropTypes from 'prop-types';
import './style.scss';

const GalleryItem = ({ image, title, skills, onClick }) => {
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
      tabIndex="0" 
      role="button" 
      aria-label={`Voir les détails du projet ${title}`}
    >
      <div
        className='project__item--cover'
        style={{ backgroundImage: `url(${image})` }}
      ></div>
      
      <div className='project__item--content'>
        <h3 className='project__item--title'>{title}</h3>
        
        {skills && skills.length > 0 && (
          <ul className='project__item--skills'>
            {skills.map((skill, index) => (
              <li key={index} className='project__item--skill-badge'>
                {skill}
              </li>
            ))}
          </ul>
        )}
      </div>
    </li>
  );
};

GalleryItem.propTypes = {
  image: PropTypes.string.isRequired, 
  title: PropTypes.string.isRequired,
  skills: PropTypes.arrayOf(PropTypes.string),
  onClick: PropTypes.func.isRequired,
};

export default GalleryItem;