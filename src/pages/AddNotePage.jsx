import React from 'react';
import AddNoteForm from '../components/AddNoteForm';
import { useLanguage } from '../contexts/LanguageContext.jsx';

function AddNotePage() {
  const { t } = useLanguage();

  return (
    <div className="add-note-page">
      <h2>{t('notes.create')}</h2>
      <AddNoteForm />
    </div>
  );
}

export default AddNotePage;