import React from 'react';
import { useNavigate } from 'react-router-dom';
import { register as registerAPI } from '../utils/network-data';
import { useInput } from '../hooks/useInput';
import { useLoading } from '../hooks/useLoading';
import { useLanguage } from '../contexts/LanguageContext.jsx';

function RegisterForm() {
  const [name, onNameChange] = useInput('');
  const [email, onEmailChange] = useInput('');
  const [password, onPasswordChange] = useInput('');
  const [confirmPassword, onConfirmPasswordChange] = useInput('');
  const [loading, startLoading, stopLoading] = useLoading();
  const { t } = useLanguage();
  const navigate = useNavigate();

  const onSubmitHandler = async (event) => {
    event.preventDefault();
    
    // Validasi berurutan: name, email, password, confirm password
    if (!name.trim()) {
      alert('"name" is not allowed to be empty');
      return;
    }

    if (!email.trim()) {
      alert('"email" is not allowed to be empty');
      return;
    }

    if (!password.trim()) {
      alert('"password" is not allowed to be empty');
      return;
    }

    if (password.length < 6) {
      alert('Password must be at least 6 characters long!');
      return;
    }

    if (!confirmPassword.trim()) {
      alert('"confirmPassword" is not allowed to be empty');
      return;
    }

    if (password !== confirmPassword) {
      alert('Password and confirm password do not match!');
      return;
    }

    startLoading();
    try {
      const { error } = await registerAPI({ name, email, password });
      
      if (!error) {
        alert('Registration successful! Please login.');
        navigate('/login');
      } else {
        alert('Registration failed. Please try again.');
      }
    } catch (error) {
      alert('An error occurred during registration.');
    } finally {
      stopLoading();
    }
  };

  return (
    <form onSubmit={onSubmitHandler} className="auth-form">
      <div className="form-group">
        <label htmlFor="name">{t('auth.name')}</label>
        <input
          type="text"
          id="name"
          value={name}
          onChange={onNameChange}
          placeholder={t('auth.namePlaceholder')}
          disabled={loading}
        />
      </div>
      <div className="form-group">
        <label htmlFor="email">{t('auth.email')}</label>
        <input
          type="email"
          id="email"
          value={email}
          onChange={onEmailChange}
          placeholder={t('auth.emailPlaceholder')}
          disabled={loading}
        />
      </div>
      <div className="form-group">
        <label htmlFor="password">{t('auth.password')}</label>
        <input
          type="password"
          id="password"
          value={password}
          onChange={onPasswordChange}
          placeholder={t('auth.passwordMinPlaceholder')}
          disabled={loading}
        />
      </div>
      <div className="form-group">
        <label htmlFor="confirmPassword">{t('auth.confirmPassword')}</label>
        <input
          type="password"
          id="confirmPassword"
          value={confirmPassword}
          onChange={onConfirmPasswordChange}
          placeholder={t('auth.confirmPasswordPlaceholder')}
          disabled={loading}
        />
      </div>
      <button type="submit" className="auth-button" disabled={loading}>
        {loading ? t('common.loading') : t('auth.registerButton')}
      </button>
    </form>
  );
}

export default RegisterForm;