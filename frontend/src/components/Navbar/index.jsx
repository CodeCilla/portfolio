import './style.scss';
import { useState, useEffect } from 'react';
import Button from '../Button';
import CV from '../../assets/files/CV_Priscilla_RENAULT.pdf';
import { useTranslation } from 'react-i18next';
import i18n from '../../i18n'; // Import de i18n pour changer la langue

const Navbar = () => {
  const { t } = useTranslation(); // Utilisation de t pour traduire les textes
  const [isOpen, setIsOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('');

  const handleScroll = () => {
    const sections = document.querySelectorAll('section');
    let currentSection = '';

    sections.forEach((section) => {
      const sectionTop = section.offsetTop;
      const sectionHeight = section.offsetHeight;

      if (window.scrollY >= sectionTop - sectionHeight / 3) {
        currentSection = section.id;
      }
    });

    setActiveSection(currentSection);
  };

  useEffect(() => {
    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

<<<<<<< HEAD
  const changeLanguage = (lang) => {
    i18n.changeLanguage(lang);
  };

  const homeMenuItems = [
    { id: 'about', label: t('about'), type: 'link' },
    { id: 'skills', label: t('skills'), type: 'link' },
    { id: 'projects', label: t('projects'), type: 'link' },
    { id: 'contact', label: t('contact'), type: 'link' },
    { id: 'cv', label: t('cv'), type: 'button' },
  ];
=======
  // Menu items with CV button included
  const homeMenuItems = [
    { id: 'about', label: 'Présentation', type: 'link' },
    { id: 'projects', label: 'Projets', type: 'link' },
    { id: 'contact', label: 'Contact', type: 'link' },
    { id: 'cv', label: 'CV', type: 'button' }, // CV as a button
  ];

  const renderMenuItems = () =>
    homeMenuItems.map((item) => (
      <li key={item.id}>
        {item.type === 'link' ? (
          <a
            href={`#${item.id}`}
            onClick={() => setIsOpen(false)} // For mobile menu
            className={activeSection === item.id ? 'active' : ''}
          >
            {item.label}
          </a>
        ) : item.id === 'cv' ? ( // CV button with link to PDF
          <a href={CV} target='_blank' rel='noreferrer'>
            <Button Text={item.label} />
          </a>
        ) : null}
      </li>
    ));
>>>>>>> main

  return (
    <div className='navbar'>
      <div className='navbar__container'>
        {/* Sélecteur de langue */}
        <div className='language-switcher'>
          <button onClick={() => changeLanguage('fr')}>🇫🇷</button>
          <button onClick={() => changeLanguage('en')}>🇬🇧</button>
        </div>

        {/* Navigation mobile */}
        <button
          className={`burger-icon ${isOpen ? 'open' : ''}`}
          onClick={toggleMenu}
        >
          <span></span>
          <span></span>
          <span></span>
          <span></span>
          <span></span>
        </button>
        <nav className={`mobile-menu ${isOpen ? 'open' : ''}`}>
          <ul>
            {homeMenuItems.map((item) => (
              <li key={item.id}>
                {item.type === 'link' ? (
                  <a
                    href={`#${item.id}`}
                    onClick={() => setIsOpen(false)}
                    className={activeSection === item.id ? 'active' : ''}
                  >
                    {item.label}
                  </a>
                ) : (
                  <a href={CV} target='_blank' rel='noreferrer'>
                    <Button Text={item.label} />
                  </a>
                )}
              </li>
            ))}
          </ul>
        </nav>

        {/* Navigation Desktop */}
        <nav className='desktop-menu'>
          <ul>
            {homeMenuItems.map((item) => (
              <li key={item.id}>
                {item.type === 'link' ? (
                  <a
                    href={`#${item.id}`}
                    className={activeSection === item.id ? 'active' : ''}
                  >
                    {item.label}
                  </a>
                ) : (
                  <a href={CV} target='_blank' rel='noreferrer'>
                    <Button Text={item.label} />
                  </a>
                )}
              </li>
            ))}
          </ul>
        </nav>
      </div>
    </div>
  );
};

export default Navbar;
