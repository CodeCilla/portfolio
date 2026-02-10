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
            développeuse & future experte en ingénierie full-stack ou data.
          </span>{' '}
        </p>
        <p className='about__content--text'>
          Développeuse au <span className='highlight'>profil hybride,</span>{' '}
          j&apos;allie 15 ans d&apos;expérience commerciale à une solide
          expertise technique{' '}
          <span className='highlight'>
            JavaScript, React, Python/Odoo, Java.
          </span>{' '}
          Après avoir piloté l&apos;intégration de modules complexes et
          d&apos;API en entreprise, je souhaite aujourd&apos;hui évoluer vers{' '}
          <span className='highlight'>la conception globale</span> de solutions
          performantes. <br />
          <br />
          Convaincue que la technique doit servir la stratégie, je souhaite
          préparer un{' '}
          <span className='highlight'>
            Bac+5 en Ingénierie logicielle ou Data Engineer
          </span>{' '}
          en alternance. Mon objectif est de bâtir des systèmes scalables, de{' '}
          <span className='highlight'>valoriser vos données</span> et
          d&apos;aligner chaque brique logicielle sur vos{' '}
          <span className='highlight'>enjeux business.</span>
        </p>
      </div>
    </section>
  );
};
export default about;
