import { useState } from 'react';
import styles from '../styles/index.module.css';
import Header from '../components/Header';
import Title from '../components/layouts/Title';
import TextBox from '@/components/layouts/TextBox';
import Form from '@/components/layouts/Form';

export default function Home() {
  const [sentence, setSentence] = useState('');
  const [after, setAfter] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const includesKorean = (text) => /[ㄱ-ㅎ|ㅏ-ㅣ|가-힣]/i.test(text);

  const handleChangeSentence = (e) => {
    const userSentence = e.target.value;
    setSentence(userSentence);
    setErrorMessage('');

    if (includesKorean(userSentence)) {
      setErrorMessage('한글은 입력할 수 없습니다.');
    }
  };

  const handleEnterPress = (e) => {
    if (e.keyCode == 13 && e.shiftKey == false && !includesKorean(sentence)) {
      e.preventDefault();
      handleSubmitSentence();
    }
  };

  const handleSubmitSentence = async (e) => {
    try {
      const response = await fetch('./api/generate', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ before: sentence }),
      });

      const data = await response.json();
      if (response.status !== 200) {
        throw (
          data.error ||
          new Error(`request failed with status ${response.status}`)
        );
      }

      if (data.after.trim() == 'Not Found') {
        setAfter('올바른 표현을 찾을 수 없습니다.');
      } else {
        setAfter(data.after);
      }
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <>
      <Header />
      <Title title='Your Sentences' />
      <TextBox>
        <Form
          onSubmit={handleSubmitSentence}
          value={sentence}
          onChange={handleChangeSentence}
          onKeyDown={handleEnterPress}
        />
      </TextBox>
      {errorMessage && <p className={styles.error}>{errorMessage}</p>}

      <Title title='Correct Sentences' />
      <TextBox>{after}</TextBox>
    </>
  );
}
