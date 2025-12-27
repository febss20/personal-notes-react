import React from 'react';
import { useNavigate } from 'react-router-dom';
import { MdSave } from 'react-icons/md';
import { addNote } from '../utils/network-data';
import { useInput } from '../hooks/useInput';
import { useLoading } from '../hooks/useLoading';
import { useLanguage } from '../contexts/LanguageContext.jsx';

function AddNoteForm() {
  const [title, onTitleChange] = useInput('');
  const [body, onBodyChange] = useInput('');
  const [loading, startLoading, stopLoading] = useLoading();
  const { t } = useLanguage();
  const navigate = useNavigate();

  const onBodyInputHandler = (event) => {
    onBodyChange({ target: { value: event.target.innerHTML } });
  };

  const onSubmitHandler = async (event) => {
    event.preventDefault();

    const finalTitle = title.trim() || '(untitled)';
    const finalBody = body.trim() || '';

    startLoading();
    try {
      const { error } = await addNote({ title: finalTitle, body: finalBody });
      if (error) {
        alert(t('notes.error.create'));
      } else {
        navigate('/');
      }
    } catch (error) {
      console.error('Error adding note:', error);
      alert(t('notes.error.create'));
    } finally {
      stopLoading();
    }
  };

  return (
    <div className="add-new-page">
      <div className="add-new-page__input">
        <form onSubmit={onSubmitHandler}>
          <input
            className="add-new-page__input__title"
            type="text"
            placeholder="Catatan Rahasia"
            value={title}
            onChange={onTitleChange}
            disabled={loading}
          />
          <div
            className="add-new-page__input__body"
            data-placeholder="Tulis catatan di sini..."
            contentEditable
            onInput={onBodyInputHandler}
            suppressContentEditableWarning={true}
          />
          <div className="add-new-page__action">
            <button 
              type="submit" 
              className="action-button action-button--save"
              title={t('notes.save')}
              disabled={loading}
            >
              {loading ? (
                <div className="loading-spinner small"></div>
              ) : (
                <MdSave />
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default AddNoteForm;