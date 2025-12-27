import React from 'react';
import { Link } from 'react-router-dom';
import RegisterForm from '../components/RegisterForm';
import { useLanguage } from '../contexts/LanguageContext.jsx';

function RegisterPage() {
  const { t } = useLanguage();

  return (
    <div className="auth-page">
      <h2>{t('auth.registerWelcome')}</h2>
      <RegisterForm />
      <div className="auth-link">
        <p>
          {t('auth.hasAccount')} <Link to="/login">{t('auth.loginHere')}</Link>
        </p>
      </div>
    </div>
  );
}

export default RegisterPage;