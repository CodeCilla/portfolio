import skillsData from '../../data/skills.js';

const Skills = () => {
  return (
    <section id='skills' className='skills'>
      <h2>Mes compétences</h2>
      <div className='border-h2'></div>
      <div className='skills__container'>
        {skillsData.map((category, index) => (
          <div key={index} className='skills__list'>
            <h3 className='skills__list--title'>{category.title}</h3>
            <ul>
              {Object.entries(category.skills).map(([skill, value], idx) => (
                <li key={idx} className='skills__item'>
                  <div className='skills__item--label'>
                    <span>{skill}</span>
                    <span>{value}%</span>
                  </div>
                  <div className='skills__item--progress'>
                    <div
                      className='skills__item--bar'
                      style={{ width: `${value}%` }}
                    ></div>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Skills;