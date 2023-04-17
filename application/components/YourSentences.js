import React, { useState } from 'react';
import styles from '../styles/yourSentences.module.css';
import Title from '../components/layouts/Title';
import TextBox from '@/components/layouts/TextBox';
import Form from '@/components/layouts/Form';
import Error from '@/components/layouts/Error';

const YourSentences = ({ onSubmit }) => {
  const [sentence, setSentence] = useState('');
  const [languageError, setLanguageError] = useState('');
  const includesKorean = (text) => /[ㄱ-ㅎ|ㅏ-ㅣ|가-힣]/i.test(text);

  const handleChangeSentence = (e) => {
    const userSentence = e.target.value;
    setSentence(userSentence);
    setLanguageError('');

    if (includesKorean(userSentence)) {
      setLanguageError('한글은 입력할 수 없습니다.');
    }
  };

  const handleEnterPress = (e) => {
    if (e.keyCode == 13 && e.shiftKey == false && !includesKorean(sentence)) {
      e.preventDefault();
      onSubmit(sentence);
    }
  };

  return (
    <div className={styles.wrapper}>
      <Title title='Your Sentences' />
      <TextBox>
        <Form
          value={sentence}
          onChange={handleChangeSentence}
          onKeyDown={handleEnterPress}
        />
      </TextBox>
      {languageError && <Error message={languageError} />}
    </div>
  );
};

export default YourSentences;
