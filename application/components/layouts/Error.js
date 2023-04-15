import React from 'react';
import styles from '../../styles/error.module.css';

const Error = ({ message }) => {
  return <strong className={styles.error}>{message}</strong>;
};

export default Error;
