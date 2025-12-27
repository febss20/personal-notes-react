import React, { useState, useEffect } from 'react';
import { useParams, Navigate } from 'react-router-dom';
import NoteDetail from '../components/NoteDetail';
import { getNote } from '../utils/network-data';
import { useLoading } from '../hooks/useLoading';
import { useLanguage } from '../contexts/LanguageContext.jsx';

function DetailPage() {
  const { id } = useParams();
  const [note, setNote] = useState(null);
  const [notFound, setNotFound] = useState(false);
  const [loading, startLoading, stopLoading] = useLoading();
  const { t } = useLanguage();

  useEffect(() => {
    const fetchNote = async () => {
      startLoading();
      try {
        const { error, data } = await getNote(id);
        if (error) {
          setNotFound(true);
        } else {
          setNote(data);
        }
      } catch (error) {
        console.error('Error fetching note:', error);
        setNotFound(true);
      } finally {
        stopLoading();
      }
    };

    fetchNote();
  }, [id]);

  if (loading) {
    return (
      <div className="loading-container">
        <div className="loading-spinner"></div>
        <p>{t('common.loading')}</p>
      </div>
    );
  }

  if (notFound) {
    return <Navigate to="/404" replace />;
  }

  return <NoteDetail note={note} />;
}

export default DetailPage;