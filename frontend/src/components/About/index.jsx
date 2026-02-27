import './style.scss';
const about = () => {
  return (
    <section id='about' className='about'>
      <h2>À propos de moi</h2>
      <div className='border-h2'></div>
      <div className='about__content'>
        <p className='about__content--text'>
          Hello, moi c&apos;est Priscilla,{' '}
          <span className='highlight'>
            développeuse Full Stack au profil hybride & stratégique.
          </span>{' '}
        </p>
        <p className='about__content--text'>
          J&apos;allie{' '}
          <span className='highlight'>
            15 ans d&apos;expertise commerciale
          </span>{' '}
          à une maîtrise technique orientée vers la performance logicielle. 
          Spécialisée dans les écosystèmes <span className='highlight'>JavaScript (Node.js/React), Python et Java</span>, 
          je conçois des architectures robustes et scalables capables de répondre à des besoins métiers complexes.
          <br />
          <br />
          Mon expertise s&apos;est consolidée à travers la gestion de{' '}
          <span className='highlight'>migrations d&apos;infrastructures critiques</span> et l&apos;intégration de flux d&apos;API, 
          garantissant la continuité et l&apos;intégrité des systèmes en production.
          <br />
          <br />
          Aujourd&apos;hui, je prépare un{' '}
          <span className='highlight'>Mastère Expert en Développement Full Stack</span> en alternance. 
          Mon objectif : piloter vos projets de la conception de l&apos;interface à l&apos;optimisation serveur, 
          pour transformer vos{' '}
          <span className='highlight'>enjeux business en solutions digitales pérennes</span>.
        </p>
      </div>
    </section>
  );
};
export default about;
