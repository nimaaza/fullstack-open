import React from 'react';

const NoteForm = ({
  handleOnSubmit,
  handleNoteChange,
  value,
}) => {
  return (
    <form onSubmit={handleOnSubmit}>
      <input value={value} onChange={handleNoteChange} />
      <button type='submit'>save</button>
    </form>
  );
};

export default NoteForm;
