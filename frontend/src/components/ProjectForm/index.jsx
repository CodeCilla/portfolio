import { useForm } from 'react-hook-form';
import { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import useProjectSubmit from '../../utils/hooks/useProjectSubmit';
import { fetchProjects } from '../../api';
import Button from '../Button';
import './style.scss';

// Ajout des props pour l'édition
const ProjectForm = ({ setProjects, projectToEdit, setProjectToEdit }) => {
  const { register, handleSubmit, reset, setValue } = useForm();

  const { handleProjectSubmit, isLoading, error } = useProjectSubmit();

  const [skills, setSkills] = useState([]);
  const [skillInput, setSkillInput] = useState('');

  // --- EFFET : PRÉ-REMPLISSAGE DU FORMULAIRE EN CAS D'ÉDITION ---
  useEffect(() => {
    if (projectToEdit) {
      // On remplit les champs texte
      setValue('title', projectToEdit.title);
      setValue('description', projectToEdit.description);
      setValue('github', projectToEdit.github || '');
      setValue('link', projectToEdit.link || '');

      // On remplit les skills
      setSkills(projectToEdit.skills || []);
    }
  }, [projectToEdit, setValue]);

  // --- GESTION DES SKILLS ---
  const handleAddSkill = () => {
    if (skillInput.trim() && !skills.includes(skillInput.trim())) {
      setSkills([...skills, skillInput.trim()]);
      setSkillInput('');
    }
  };

  const handleRemoveSkill = (index) => {
    setSkills(skills.filter((_, i) => i !== index));
  };

  // --- ANNULATION DE L'ÉDITION ---
  const handleCancelEdit = () => {
    if (setProjectToEdit) {
      setProjectToEdit(null);
    }
    reset();
    setSkills([]);
  };

  // --- SOUMISSION ---
  const onFormSubmit = async (data) => {
    const formData = new FormData();

    // Si on est en édition, on envoie probablement l'ID
    if (projectToEdit) {
      formData.append('id', projectToEdit._id);
    }

    const projectData = {
      title: data.title,
      description: data.description,
      github: data.github || '',
      link: data.link || '',
      skills: skills,
    };

    formData.append('project', JSON.stringify(projectData));

    // L'image est optionnelle en mode édition (si on ne change pas l'image)
    if (data.image && data.image[0]) {
      formData.append('image', data.image[0]);
    }

    await handleProjectSubmit(formData);

    const updatedProjects = await fetchProjects();
    setProjects(updatedProjects);

    // Reset complet
    handleCancelEdit();
  };

  return (
    <form className='project-form' onSubmit={handleSubmit(onFormSubmit)}>
      <div
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
        }}
      >
        <h2 className='project-form__title'>
          {projectToEdit
            ? `Modifier : ${projectToEdit.title}`
            : 'Nouveau projet'}
        </h2>
        {projectToEdit && (
          <button
            type='button'
            onClick={handleCancelEdit}
            style={{ fontSize: '0.8rem', cursor: 'pointer' }}
          >
            Annuler modif
          </button>
        )}
      </div>

      {/* --- TITRE --- */}
      <div className='project-form__group'>
        <label htmlFor='title'>Titre du projet</label>
        <input
          id='title'
          {...register('title', { required: true })}
          placeholder='Ex: Module Odoo QualiRepar'
          className='project-form__input'
        />
      </div>

      {/* --- IMAGE --- */}
      <div className='project-form__group'>
        <label htmlFor='image'>Image de couverture</label>
        {projectToEdit && (
          <small>(Laisser vide pour conserver l&apos;image actuelle)</small>
        )}
        <input
          id='image'
          type='file'
          accept='image/*'
          // L'image est requise SEULEMENT si ce n'est pas une édition
          {...register('image', { required: !projectToEdit })}
          className='project-form__input'
        />
      </div>

      {/* --- DESCRIPTION --- */}
      <div className='project-form__group'>
        <label htmlFor='description'>Description (Markdown accepté)</label>
        <textarea
          id='description'
          {...register('description', { required: true })}
          className='project-form__textarea'
          rows={10}
        />
      </div>

      {/* --- SKILLS --- */}
      <div className='project-form__group'>
        <label htmlFor='skills'>Technologies & Outils</label>
        <div className='project-form__skills-issues'>
          <input
            id='skills'
            value={skillInput}
            onChange={(e) => setSkillInput(e.target.value)}
            onKeyDown={(e) =>
              e.key === 'Enter' && (e.preventDefault(), handleAddSkill())
            }
            placeholder='Ex: React, Python...'
            className='project-form__input'
          />
          <button
            type='button'
            onClick={handleAddSkill}
            className='project-form__add-button'
          >
            Ajouter
          </button>
        </div>
      </div>

      <ul className='project-form__skills-issues--list'>
        {skills.map((skill, index) => (
          <li key={index} className='project-form__skills-issues--item'>
            {skill}
            <Button Text='X' onClick={() => handleRemoveSkill(index)} />
          </li>
        ))}
      </ul>

      <hr />

      {/* --- LIENS (Toujours visibles maintenant) --- */}
      <div className='project-form__group'>
        <label htmlFor='github'>Lien Github (Optionnel)</label>
        <input
          id='github'
          {...register('github')}
          placeholder='https://github.com/...'
          className='project-form__input'
        />
      </div>

      <div className='project-form__group'>
        <label htmlFor='link'>Lien vers le site (Optionnel)</label>
        <input
          id='link'
          {...register('link')}
          placeholder='https://www.mobilitix.fr'
          className='project-form__input'
        />
      </div>

      <Button
        Text={
          isLoading
            ? 'Envoi...'
            : projectToEdit
            ? 'Mettre à jour'
            : 'Créer le projet'
        }
        type='submit'
        disabled={isLoading}
      />

      {error && <p className='project-form__error'>{error}</p>}
    </form>
  );
};

ProjectForm.propTypes = {
  setProjects: PropTypes.func.isRequired,
  projectToEdit: PropTypes.object,
  setProjectToEdit: PropTypes.func,
};

export default ProjectForm;
