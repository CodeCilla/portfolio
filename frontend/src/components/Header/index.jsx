import '../../scss/base/base.scss';
import './style.scss';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faLocationDot } from '@fortawesome/free-solid-svg-icons';
import { faLinkedinIn, faGithub } from '@fortawesome/free-brands-svg-icons';
import photoDeMoi from '../../assets/images/moi.jpg';
import { useTranslation } from 'react-i18next';

const Header = () => {
  const { t } = useTranslation();
  return (
    <section className='header' id='about'>
      <header className='header__content'>
        <div className='header__photo-container'>
          <img
            className='header__photo-container--photo'
            src={photoDeMoi}
            alt='Ma photo'
          />
        </div>
        <div>
<<<<<<< HEAD
          <h1 className='header__title'>{t('header.title')} </h1>
          <p className='header__job'>{t('header.job')} </p>
=======
          <h1 className='header__title'>Priscilla RENAULT</h1>
          <p className='header__job'>Développeuse Informatique</p>
>>>>>>> main

          <div className='header__details'>
            <span>
              <FontAwesomeIcon
                icon={faLocationDot}
                className='header__icon--Location'
              />
              <span className='header__details--text'>
                {t('header.location')}
              </span>
            </span>
<<<<<<< HEAD
            <p className='header__details--text'>{t('header.collaboration')}</p>
=======
            <p className='header__details--text'>
              Recherche Apprentissage Bac+5 <br />
            </p>
>>>>>>> main
          </div>
          <div className='header__socials'>
            <a
              href='https://www.linkedin.com/in/priscillarenault/'
              target='_blank'
              aria-label={t('header.socials.linkedin')}
            >
              <FontAwesomeIcon
                icon={faLinkedinIn}
                className='header__socials--icons'
              />
            </a>

            <a
              href='https://github.com/PriscillaRenault'
              target='_blank'
              aria-label={t('header.socials.github')}
            >
              <FontAwesomeIcon
                icon={faGithub}
                className='header__socials--icons'
              />
            </a>
          </div>
        </div>
      </header>
    </section>
  );
};

export default Header;
