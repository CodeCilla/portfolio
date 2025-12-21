import './style.scss';
const about = () => {
  return (
    <section id='about' className='about'>
      <h2>À propos de moi</h2>
      <div className='border-h2'></div>
      <div className='about__content'>
        <p className='about__content--text'>
          <span className='highlight'>Hello, moi c&apos;est Priscilla, future Archtecte Logicielle.</span>{' '}
        </p>
        <p className='about__content--text'>
          Développeuse au{' '}
          <span className='highlight'>profil hybride</span> j&apos;allie 15 ans d&apos;expérience commerciale à une solide expertise technique {' '}
          <span className='highlight'>JavaScript, React, Python/Odoo, Java</span>. Après avoir piloté l&apos;intégration des modules complexes et d&apos;API en entreprise, je souhaite aujourd&apos;hui dépasser l&apos;exécution pour penser la {' '} 
          <span className='highlight'> la conception globale </span> des systèmes.{' '}
          <br />
          <br />
          Convaincue qu&apos;une bonne architecture doit servir à la rentabilité et à la stratégie, je prépare un 
          <span className='highlight'> {' '}Bac+5 en architecture logicielle</span>{' '}
          en alternance. Mon objectif est de concevoir des solutions scalables, valoriser vos données et aligner la technique sur vos{' '}
          <span className='highlight'>enjeux business</span>. 
        </p>
      </div>
    </section>
  );
};
export default about;
