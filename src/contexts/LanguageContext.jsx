import React, { createContext, useContext, useState, useEffect } from 'react';

const LanguageContext = createContext();

export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
};

const translations = {
  id: {
    // Navigation
    'nav.home': 'Beranda',
    'nav.archive': 'Arsip',
    'nav.add': 'Tambah',
    'nav.logout': 'Keluar',
    'nav.appTitle': 'Aplikasi Catatan Pribadi',
    'common.hello': 'Halo',
    'theme.darkMode': 'Mode Gelap',
    'theme.lightMode': 'Mode Terang',
    'language.english': 'English',
    'language.indonesia': 'Indonesia',
    
    // Auth
    'auth.email': 'Email',
    'auth.password': 'Password',
    'auth.name': 'Nama',
    'auth.confirmPassword': 'Konfirmasi Password',
    'auth.loginButton': 'Masuk',
    'auth.registerButton': 'Daftar',
    'auth.noAccount': 'Belum punya akun?',
    'auth.hasAccount': 'Sudah punya akun?',
    'auth.registerHere': 'Daftar di sini',
    'auth.loginHere': 'Masuk di sini',
    'auth.loginWelcome': 'Yuk, login untuk menggunakan aplikasi.',
    'auth.registerWelcome': 'Isi form untuk mendaftar akun.',
    'auth.emailPlaceholder': 'Masukkan email anda',
    'auth.passwordPlaceholder': 'Masukkan password anda',
    'auth.namePlaceholder': 'Masukkan nama anda',
    'auth.passwordMinPlaceholder': 'Masukkan password (min. 6 karakter)',
    'auth.confirmPasswordPlaceholder': 'Konfirmasi password anda',
    
    // Notes
    'notes.active': 'Catatan Aktif',
    'notes.archived': 'Catatan Terarsip',
    'notes.empty': 'Tidak ada catatan',
    'notes.add': 'Tambah Catatan',
    'notes.create': 'Buat Catatan',
    'notes.delete': 'Hapus',
    'notes.archive': 'Arsipkan',
    'notes.unarchive': 'Pindahkan',
    'notes.save': 'Simpan',
    'notes.validation.required': 'Judul dan isi catatan harus diisi!',
    'notes.error.create': 'Gagal membuat catatan. Silakan coba lagi.',
    'notes.error.delete': 'Gagal menghapus catatan. Silakan coba lagi.',
    'notes.error.archive': 'Gagal mengarsipkan catatan. Silakan coba lagi.',
    'search.placeholder': 'Cari catatan...',
    
    'common.loading': 'Memuat...',
  },
  en: {
    // Navigation
    'nav.home': 'Home',
    'nav.archive': 'Archive',
    'nav.add': 'Add',
    'nav.logout': 'Logout',
    'nav.appTitle': 'Notes Personal App',
    'common.hello': 'Hello',
    'theme.darkMode': 'Dark Mode',
    'theme.lightMode': 'Light Mode',
    'language.english': 'English',
    'language.indonesia': 'Indonesia',
    
    // Auth
    'auth.email': 'Email',
    'auth.password': 'Password',
    'auth.name': 'Name',
    'auth.confirmPassword': 'Confirm Password',
    'auth.loginButton': 'Login',
    'auth.registerButton': 'Register',
    'auth.noAccount': "Don't have an account?",
    'auth.hasAccount': 'Already have an account?',
    'auth.registerHere': 'Register here',
    'auth.loginHere': 'Login here',
    'auth.loginWelcome': 'Login to use app, please.',
    'auth.registerWelcome': 'Fill the form to register account.',
    'auth.emailPlaceholder': 'Enter your email',
    'auth.passwordPlaceholder': 'Enter your password',
    'auth.namePlaceholder': 'Enter your name',
    'auth.passwordMinPlaceholder': 'Enter password (min. 6 characters)',
    'auth.confirmPasswordPlaceholder': 'Confirm password',
    
    // Notes
    'notes.active': 'Active Notes',
    'notes.archived': 'Archived Notes',
    'notes.empty': 'No notes available',
    'notes.add': 'Add Note',
    'notes.create': 'Create Note',
    'notes.delete': 'Delete',
    'notes.archive': 'Archive',
    'notes.unarchive': 'Unarchive',
    'notes.save': 'Save',
    'notes.validation.required': 'Title and note content are required!',
    'notes.error.create': 'Failed to create note. Please try again.',
    'notes.error.delete': 'Failed to delete note. Please try again.',
    'notes.error.archive': 'Failed to archive note. Please try again.',
    'search.placeholder': 'Search notes...',
    
    // Common
    'common.loading': 'Loading...',
  },
};

export const LanguageProvider = ({ children }) => {
  const [language, setLanguage] = useState(() => {
    const savedLanguage = localStorage.getItem('language');
    return savedLanguage || 'id';
  });

  useEffect(() => {
    localStorage.setItem('language', language);
  }, [language]);

  const toggleLanguage = () => {
    setLanguage(prevLang => prevLang === 'id' ? 'en' : 'id');
  };

  const t = (key) => {
    return translations[language][key] || key;
  };

  const value = {
    language,
    toggleLanguage,
    t,
    isEnglish: language === 'en',
  };

  return (
    <LanguageContext.Provider value={value}>
      {children}
    </LanguageContext.Provider>
  );
};