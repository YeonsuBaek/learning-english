import React from 'react';

const Form = ({ onSubmit, value, onChange, onKeyDown }) => {
  return (
    <form onSubmit={onSubmit}>
      <textarea
        placeholder='Write something'
        value={value}
        onChange={onChange}
        onKeyDown={onKeyDown}
      ></textarea>
    </form>
  );
};

export default Form;
