import React from 'react';
import styles from '../../styles/textbox.module.css';

const TextBox = (props) => {
  return <div className={styles.textbox}>{props.children}</div>;
};

export default TextBox;
