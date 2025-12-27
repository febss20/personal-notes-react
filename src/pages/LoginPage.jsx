import React from 'react';
import { Link } from 'react-router-dom';
import LoginForm from '../components/LoginForm';
import { useLanguage } from '../contexts/LanguageContext.jsx';

function LoginPage() {
  const { t } = useLanguage();

  return (
    <div className="auth-page">
      <h2>{t('auth.loginWelcome')}</h2>
      <LoginForm />
      <div className="auth-link">
        <p>
          {t('auth.noAccount')} <Link to="/register">{t('auth.registerHere')}</Link>
        </p>
      </div>
    </div>
  );
}

export default LoginPage;