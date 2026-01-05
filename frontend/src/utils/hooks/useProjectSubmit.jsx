import { useState } from 'react';

const useProjectSubmit = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleProjectSubmit = async (formData) => {
    setIsLoading(true);
    setError(null);

<<<<<<< HEAD
    const formData = new FormData();

    // Ajouter les titres et descriptions en français et en anglais
    formData.append(
      'project',
      JSON.stringify({
        title: {
          fr: data.titleFr, // Assurez-vous que votre formulaire a les champs titleFr et titleEn
          en: data.titleEn,
        },
        description: {
          fr: data.descriptionFr, // Assurez-vous que votre formulaire a les champs descriptionFr et descriptionEn
          en: data.descriptionEn,
        },
        github: data.github,
        skills: data.skills,
      }),
    );

    formData.append('image', data.image[0]);

=======
>>>>>>> main
    const API_URL = import.meta.env.VITE_API_URL;

    try {
      const response = await fetch(`${API_URL}/api/projects`, {
        method: 'POST',
        headers: {

          Authorization: `Bearer ${localStorage.getItem('authToken')}`,
        },
        body: formData,
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || errorData.error || "Erreur lors de l'envoi du projet");
      }

      alert('Projet enregistré avec succès !');
      return true; 

    } catch (error) {
      console.error(error);
      setError(error.message);
      return false; // Ça a échoué
    } finally {
      setIsLoading(false);
    }
  };

  return { handleProjectSubmit, isLoading, error };
};

export default useProjectSubmit;