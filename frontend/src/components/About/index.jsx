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
            développeuse au profil hybride & future Data Engineer.
          </span>{' '}
        </p>
        <p className='about__content--text'>
          J&apos;allie{' '}
          <span className='highlight'>
            15 ans d&apos;expérience commerciale
          </span>{' '}
          à une expertise technique centrée sur la performance. Spécialisée en{' '}
          <span className='highlight'>Python, Java et SQL</span>, je me
          passionne pour la transformation de données brutes en leviers de
          décision stratégiques.
          <br />
          <br />
          Le déclic pour l&apos;ingénierie des données est né de ma gestion de{' '}
          <span className='highlight'>migrations complexes (v16 vers v19)</span>
          , impliquant la restructuration et l&apos;intégrité de flux critiques.
          <br />
          <br />
          Aujourd&apos;hui, je prépare un{' '}
          <span className='highlight'>Mastère Data Engineer</span> en alternance
          avec un objectif clair : concevoir des pipelines de données scalables
          et modéliser des systèmes robustes capables de soutenir vos{' '}
          <span className='highlight'>enjeux business les plus ambitieux</span>.
        </p>
      </div>
    </section>
  );
};
export default about;
