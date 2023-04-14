import React from 'react';
import styles from '../../styles/title.module.css';

const Title = ({ title }) => {
  return <h2 className={styles.title}>{title}</h2>;
};

export default Title;
