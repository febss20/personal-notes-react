import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { MdAdd, MdLogout, MdDarkMode, MdLightMode, MdLanguage } from 'react-icons/md';
import { useAuth } from '../contexts/AuthContext.jsx';
import { useTheme } from '../contexts/ThemeContext.jsx';
import { useLanguage } from '../contexts/LanguageContext.jsx';

function Header() {
  const { user, logout, isAuthenticated } = useAuth();
  const { theme, toggleTheme } = useTheme();
  const { language, toggleLanguage, t } = useLanguage();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  if (!isAuthenticated) {
    return (
      <header>
        <h1>
          <Link to="/login">{t('nav.appTitle')}</Link>
        </h1>
        <div className="header-controls">
          <button 
            onClick={toggleTheme} 
            className="control-button"
            title={theme === 'light' ? t('theme.darkMode') : t('theme.lightMode')}
          >
            {theme === 'light' ? <MdDarkMode /> : <MdLightMode />}
          </button>
          <button 
            onClick={toggleLanguage} 
            className="control-button"
            title={language === 'id' ? t('language.english') : t('language.indonesia')}
          >
            <MdLanguage />
          </button>
        </div>
      </header>
    );
  }

  return (
    <>
      <header>
        <h1>
          <Link to="/">{t('nav.appTitle')}</Link>
        </h1>
        <div className="header-info">
          <span className="user-info">{t('common.hello')}, {user?.name}</span>
        </div>
        <nav className="navigation">
          <ul>
            <li>
              <Link to="/">{t('nav.home')}</Link>
            </li>
            <li>
              <Link to="/archive">{t('nav.archive')}</Link>
            </li>
          </ul>
        </nav>
        <div className="header-controls">
          <button 
            onClick={toggleTheme} 
            className="control-button"
            title={theme === 'light' ? t('theme.darkMode') : t('theme.lightMode')}
          >
            {theme === 'light' ? <MdDarkMode /> : <MdLightMode />}
          </button>
          <button 
            onClick={toggleLanguage} 
            className="control-button"
            title={language === 'id' ? t('language.english') : t('language.indonesia')}
          >
            <MdLanguage />
          </button>
          <button 
            onClick={handleLogout} 
            className="control-button logout-button"
            title={t('nav.logout')}
          >
            <MdLogout />
          </button>
        </div>
      </header>
      <div className="homepage__action">
        <Link 
          to="/notes/new" 
          className="action-button action-button--add"
          title={t('notes.add')}
        >
          <MdAdd />
        </Link>
      </div>
    </>
  );
}

export default Header;