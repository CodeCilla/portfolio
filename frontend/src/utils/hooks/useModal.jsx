import { useState } from 'react';

export const useModal = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedProject, setSelectedProject] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // Open modal and fetch project data
  const openModal = async (id) => {
    setLoading(true);
    const API_URL = import.meta.env.VITE_API_URL;
    try {
      const response = await fetch(`${API_URL}/api/projects/${id}`);
      if (!response.ok) {
        throw new Error(`Erreur lors de la récupération: ${response.status}`);
      }
      const data = await response.json();
      setSelectedProject(data);
      setIsOpen(true);
    } catch (err) {
      console.error('Erreur lors de la récupération des données:', err);
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  // Close modal
  const closeModal = () => {
    setSelectedProject(null);
    setError(null);
    setIsOpen(false);
  };

  return { isOpen, selectedProject, loading, error, openModal, closeModal };
};
