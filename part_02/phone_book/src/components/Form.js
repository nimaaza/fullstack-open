import React from 'react';

const Form = ({ formActionListeners, newName, newNumber }) => {
    const { addName, nameValueChange, numberValueChange } = formActionListeners;
  
    return (
      <form onSubmit={addName}>
        <div>
          name: <input value={newName} onChange={nameValueChange} />
        </div>
        <div>
          number: <input value={newNumber} onChange={numberValueChange} />
        </div>
        <div>
          <button type="submit">add</button>
        </div>
      </form>
    );
  };

  export default Form;