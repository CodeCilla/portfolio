import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Button from '../Button';
import './style.scss';

const LoginForm = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    const API_URL = import.meta.env.VITE_API_URL;
    try {
      const response = await fetch(`${API_URL}/api/auth/login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || 'Login failed');
      }

      // Save token in localStorage
      localStorage.setItem('authToken', data.token);

      alert('Connexion réussie !');
      setEmail('');
      setPassword('');
      navigate('/dashboard'); // Redirect to dashboard
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className='login'>
      <Button
        Text="Retour à l'accueil"
        onClick={() => navigate('/')}
        className='login__back-home'
      />
      <h2 className='login__title'>Connexion</h2>
      <form onSubmit={handleLogin}>
        <div className='login__input'>
          <label>Email</label>
          <input
            type='email'
            placeholder='Votre email'
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>
        <div className='login__input'>
          <label>Mot de passe</label>
          <input
            type='password'
            placeholder='Votre mot de passe'
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        {error && <p className='error-message'>{error}</p>}
        <button type='submit' disabled={loading}>
          {loading ? 'Connexion...' : 'Se connecter'}
        </button>
      </form>
    </div>
  );
};

export default LoginForm;
