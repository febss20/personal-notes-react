import React from 'react';
import { useNavigate } from 'react-router-dom';
import parser from 'html-react-parser';
import { MdDelete, MdArchive, MdUnarchive } from 'react-icons/md';
import { deleteNote, archiveNote, unarchiveNote } from '../utils/network-data';
import { useLoading } from '../hooks/useLoading';
import { useLanguage } from '../contexts/LanguageContext.jsx';

function NoteDetail({ note }) {
  const navigate = useNavigate();
  const [loading, startLoading, stopLoading] = useLoading();
  const { isEnglish, t } = useLanguage();

  const onDeleteHandler = async () => {
    startLoading(); 
    try {
      const { error } = await deleteNote(note.id);
      if (error) {
        alert(t('notes.error.delete'));
      } else {
        navigate('/');
      }
    } catch (error) {
      console.error('Error deleting note:', error);
      alert(t('notes.error.delete'));
    } finally {
      stopLoading();
    }
  };

  const onArchiveHandler = async () => {
    startLoading();
    try {
      let result;
      if (note.archived) {
        result = await unarchiveNote(note.id);
      } else {
        result = await archiveNote(note.id);
      }
      
      if (result.error) {
        alert(t('notes.error.archive'));
      } else {
        navigate('/');
      }
    } catch (error) {
      console.error('Error archiving note:', error);
      alert(t('notes.error.archive'));
    } finally {
      stopLoading();
    }
  };

  const formatDate = (dateString) => {
    const options = {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    };
    const locale = isEnglish ? 'en-US' : 'id-ID';
    return new Date(dateString).toLocaleDateString(locale, options);
  };

  if (!note) {
    return (
      <div className="loading-container">
        <div className="loading-spinner"></div>
        <p>{t('common.loading')}</p>
      </div>
    );
  }

  return (
    <div className="detail-page">
      <h2 className="detail-page__title">{note.title}</h2>
      <p className="detail-page__createdAt">{formatDate(note.createdAt)}</p>
      <div className="detail-page__body">
        {parser(note.body)}
      </div>
      <div className="detail-page__action">
        <button 
          type="button" 
          className="action-button action-button--archive"
          onClick={onArchiveHandler}
          title={note.archived ? t('notes.unarchive') : t('notes.archive')}
          disabled={loading}
        >
          {loading ? (
            <div className="loading-spinner small"></div>
          ) : (
            note.archived ? <MdUnarchive /> : <MdArchive />
          )}
        </button>
        <button 
          type="button" 
          className="action-button action-button--delete"
          onClick={onDeleteHandler}
          title={t('notes.delete')}
          disabled={loading}
        >
          {loading ? (
            <div className="loading-spinner small"></div>
          ) : (
            <MdDelete />
          )}
        </button>
      </div>
    </div>
  );
}

export default NoteDetail;