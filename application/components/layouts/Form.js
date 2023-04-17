import React from 'react';
import styles from '../../styles/form.module.css';
import TextareaAutosize from 'react-textarea-autosize';

const Form = ({ onSubmit, value, onChange, onKeyDown }) => {
  return (
    <form onSubmit={onSubmit}>
      <TextareaAutosize
        cacheMeasurements
        value={value}
        className={styles.textarea}
        placeholder='Write something'
        onChange={onChange}
        onKeyDown={onKeyDown}
      />
      <button className={styles.send} type='submit'>
        SEND
      </button>
    </form>
  );
};

export default Form;
