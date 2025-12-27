import React from 'react';
import { Link } from 'react-router-dom';
import parser from 'html-react-parser';

function NoteItem({ note }) {
  const formatDate = (dateString) => {
    const options = {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    };
    return new Date(dateString).toLocaleDateString('id-ID', options);
  };

  return (
    <div className="note-item">
      <h3 className="note-item__title">
        <Link to={`/notes/${note.id}`}>{note.title}</Link>
      </h3>
      <p className="note-item__createdAt">{formatDate(note.createdAt)}</p>
      <div className="note-item__body">
        {parser(note.body)}
      </div>
    </div>
  );
}

export default NoteItem;