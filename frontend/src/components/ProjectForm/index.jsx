import { useForm } from 'react-hook-form';
import { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import useProjectSubmit from '../../utils/hooks/useProjectSubmit';
import { fetchProjects } from '../../api';
import Button from '../Button';
import { useTranslation } from 'react-i18next';
import './style.scss';

<<<<<<< HEAD
const ProjectForm = () => {
  const { t } = useTranslation(); // Importation de la fonction de traduction
  const { register, handleSubmit, reset } = useForm();
=======
// Ajout des props pour l'édition
const ProjectForm = ({ setProjects, projectToEdit, setProjectToEdit }) => {
  const { register, handleSubmit, reset, setValue } = useForm();

>>>>>>> main
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

<<<<<<< HEAD
  const onFormSubmit = (data) => {
    // Vérifier si une image a été sélectionnée
    if (!data.image || data.image.length === 0) {
      console.error('Erreur : Aucune image sélectionnée.');
      return; // Si aucune image n'est sélectionnée, on arrête
    }

    // Créer un objet FormData pour envoyer les données
    const formData = new FormData();

    // Ajouter les autres informations dans FormData
    formData.append(
      'project',
      JSON.stringify({
        title: {
          fr: data.titleFr,
          en: data.titleEn,
        },
        description: {
          fr: data.descriptionFr,
          en: data.descriptionEn,
        },
        github: data.github,
        skills: skills, // Compétences sous forme de tableau
      }),
    );

    // Ajouter l'image à FormData (data.image[0] est le fichier)
    formData.append('image', data.image[0]);

    // Debugging - Voir les données envoyées
    console.log('Données envoyées au backend :', formData);

    // Appeler la fonction pour envoyer les données
    handleProjectSubmit(formData);

    // Réinitialiser le formulaire et les compétences
=======
  // --- ANNULATION DE L'ÉDITION ---
  const handleCancelEdit = () => {
    if (setProjectToEdit) {
      setProjectToEdit(null);
    }
>>>>>>> main
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
<<<<<<< HEAD
      <h2 className='project-form__title'>Nouveau projet</h2>

=======
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
>>>>>>> main
      <div className='project-form__group'>
        <label htmlFor='title.fr'>Titre</label>
        <input
<<<<<<< HEAD
          id='title.fr'
          name='title.fr'
          {...register('title.fr', { required: true })}
          placeholder='Titre du projet'
=======
          id='title'
          {...register('title', { required: true })}
          placeholder='Ex: Module Odoo QualiRepar'
>>>>>>> main
          className='project-form__input'
        />
      </div>

      {/* --- IMAGE --- */}
      <div className='project-form__group'>
<<<<<<< HEAD
        <label htmlFor='title.en'>Titre en Anglais</label>
        <input
          id='title.en'
          name='title.en'
          {...register('title.en', { required: true })}
          placeholder='title of the project'
          className='project-form__input'
        />
      </div>

      <div className='project-form__group'>
        <label htmlFor='image'>Image</label>
=======
        <label htmlFor='image'>Image de couverture</label>
        {projectToEdit && (
          <small>(Laisser vide pour conserver l&apos;image actuelle)</small>
        )}
>>>>>>> main
        <input
          id='image'
          name='image'
          type='file'
          accept='image/*'
          // L'image est requise SEULEMENT si ce n'est pas une édition
          {...register('image', { required: !projectToEdit })}
          className='project-form__input'
        />
      </div>

      {/* --- DESCRIPTION --- */}
      <div className='project-form__group'>
<<<<<<< HEAD
        <label htmlFor='description.fr'>Description en français</label>
        <textarea
          id='description.fr'
          name='description.fr'
          {...register('description.fr', { required: true })}
          placeholder='description en français'
=======
        <label htmlFor='description'>Description (Markdown accepté)</label>
        <textarea
          id='description'
          {...register('description', { required: true })}
>>>>>>> main
          className='project-form__textarea'
          rows={10}
        />
      </div>

      {/* --- SKILLS --- */}
      <div className='project-form__group'>
<<<<<<< HEAD
        <label htmlFor='description.en'>Description en anglais</label>
        <textarea
          id='description.en'
          name='description.en'
          {...register('description.en', { required: true })}
          placeholder='description in english'
          className='project-form__textarea'
        />
      </div>

      <div className='project-form__group'>
        <label htmlFor='github'>{t('githubLink')}</label>
        <input
          id='github'
          name='github'
          {...register('github', { required: true })}
          placeholder='lien vers github'
        />
      </div>

      <div className='project-form__group'>
        <label htmlFor='skills'>{t('addSkills')}</label>
        <div className='project-form__skills'>
=======
        <label htmlFor='skills'>Technologies & Outils</label>
        <div className='project-form__skills-issues'>
>>>>>>> main
          <input
            id='skills'
            name='skills'
            value={skillInput}
            onChange={(e) => setSkillInput(e.target.value)}
<<<<<<< HEAD
            placeholder='Entrez une compétence'
=======
            onKeyDown={(e) =>
              e.key === 'Enter' && (e.preventDefault(), handleAddSkill())
            }
            placeholder='Ex: React, Python...'
>>>>>>> main
            className='project-form__input'
          />
          <button
            type='button'
            onClick={handleAddSkill}
            className='project-form__add-button'
          >
            ajouter
          </button>
        </div>
      </div>

      <ul className='project-form__skills-issues--list'>
        {skills.map((skill, index) => (
          <li key={index} className='project-form__skills-issues--item'>
            {skill}
<<<<<<< HEAD
            <Button Text='supprimer' onClick={() => handleRemoveSkill(index)} />
=======
            <Button Text='X' onClick={() => handleRemoveSkill(index)} />
>>>>>>> main
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
<<<<<<< HEAD
        Text={isLoading ? t('sending') : t('submit')}
=======
        Text={
          isLoading
            ? 'Envoi...'
            : projectToEdit
            ? 'Mettre à jour'
            : 'Créer le projet'
        }
>>>>>>> main
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
