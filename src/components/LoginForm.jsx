import React from 'react';
import { useNavigate } from 'react-router-dom';
import { login as loginAPI } from '../utils/network-data';
import { useAuth } from '../contexts/AuthContext.jsx';
import { useInput } from '../hooks/useInput';
import { useLoading } from '../hooks/useLoading';
import { useLanguage } from '../contexts/LanguageContext.jsx';

function LoginForm() {
  const [email, onEmailChange] = useInput('');
  const [password, onPasswordChange] = useInput('');
  const [loading, startLoading, stopLoading] = useLoading();
  const { login } = useAuth();
  const { t } = useLanguage();
  const navigate = useNavigate();

  const onSubmitHandler = async (event) => {
    event.preventDefault();
    
    // Validasi berurutan: email, password
    if (!email.trim()) {
      alert('"email" is not allowed to be empty');
      return;
    }

    if (!password.trim()) {
      alert('"password" is not allowed to be empty');
      return;
    }
    
    startLoading();
    try {
      const { error, data } = await loginAPI({ email, password });
      
      if (!error) {
        await login(data.accessToken);
        navigate('/');
      } else {
        alert('Login failed. Please check your credentials.');
      }
    } catch (error) {
      console.error('Login error:', error);
      alert('An error occurred during login.');
    } finally {
      stopLoading();
    }
  };

  return (
    <form onSubmit={onSubmitHandler} className="auth-form">
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
          placeholder={t('auth.passwordPlaceholder')}
          disabled={loading}
        />
      </div>
      <button type="submit" className="auth-button" disabled={loading}>
        {loading ? t('common.loading') : t('auth.loginButton')}
      </button>
    </form>
  );
}

export default LoginForm;