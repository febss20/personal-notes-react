import React from 'react';
import NoteItem from './NoteItem';

function NotesList({ notes, emptyMessage = "Tidak ada catatan" }) {
  if (notes.length === 0) {
    return (
      <div className="notes-list-empty">
        <p>{emptyMessage}</p>
      </div>
    );
  }

  return (
    <div className="notes-list">
      {notes.map((note) => (
        <NoteItem
          key={note.id}
          note={note}
        />
      ))}
    </div>
  );
}

export default NotesList;