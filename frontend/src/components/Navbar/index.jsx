import './style.scss';
import { useState, useEffect } from 'react';
import Button from '../Button';
import CV from '../../assets/files/CV_Priscilla_RENAULT.pdf';

const Navbar = () => {
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

  return (
    <div className='navbar'>
      <div className='navbar__container'>
        {/* Mobile Navigation */}
        <button
          className={`burger-icon ${isOpen ? 'open' : ''}`}
          onClick={toggleMenu}
        >
          <span></span>
          <span></span>
          <span></span>
        </button>
        <nav className={`mobile-menu ${isOpen ? 'open' : ''}`}>
          <ul>{renderMenuItems()}</ul>
        </nav>

        {/* Desktop Navigation */}
        <nav className='desktop-menu'>
          <ul>{renderMenuItems()}</ul>
        </nav>
      </div>
    </div>
  );
};

export default Navbar;
