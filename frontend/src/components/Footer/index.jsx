import './style.scss';
function Footer() {
  return (
    <footer className='footer'>
      <section className='footer__contact' id='contact'>
        <h2 className='footer__contact'>Me contacter</h2>
        <p className='footer__title'>Priscilla RENAULT</p>
        <p className='footer__text'>Tel : 07.67.43.72.53</p>
        <p className='footer__text'>
          Email :{' '}
          <a href='mailto:priscilla.renault72460@gmail.com'>
            priscilla.renault72460@gmail.com
          </a>
        </p>
      </section>

      <section className='footer__legals'>
        © 2025 Priscilla Renault. Tous droits réservés.
      </section>
    </footer>
  );
}

export default Footer;
