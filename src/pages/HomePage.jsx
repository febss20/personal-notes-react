import React, { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import SearchBar from '../components/SearchBar';
import NotesList from '../components/NotesList';
import { getActiveNotes } from '../utils/network-data';
import { useLanguage } from '../contexts/LanguageContext.jsx';
import { useLoading } from '../hooks/useLoading';

function HomePage() {
  const [notes, setNotes] = useState([]);
  const [searchParams] = useSearchParams();
  const [loading, startLoading, stopLoading] = useLoading();
  const { t } = useLanguage();
  const keyword = searchParams.get('keyword') || '';

  useEffect(() => {
    const fetchNotes = async () => {
      startLoading();
      const { error, data } = await getActiveNotes();
      if (!error) {
        setNotes(data);
      }
      stopLoading();
    };

    fetchNotes();
  }, []);

  const filteredNotes = notes.filter((note) =>
    note.title.toLowerCase().includes(keyword.toLowerCase())
  );

  if (loading) {
    return (
      <div className="loading-container">
        <div className="loading-spinner">{t('common.loading')}</div>
      </div>
    );
  }

  return (
    <div className="homepage">
      <h2>{t('notes.active')}</h2>
      <SearchBar />
      <NotesList
        notes={filteredNotes}
        emptyMessage={t('notes.empty')}
      />
    </div>
  );
}

export default HomePage;