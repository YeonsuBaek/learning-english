import { useState } from 'react';
import styles from '../styles/index.module.css';
import Header from '../components/Header';
import Title from '../components/layouts/Title';
import TextBox from '@/components/layouts/TextBox';
import Form from '@/components/layouts/Form';
import { SpeakerSimpleHigh } from '@phosphor-icons/react';
import Error from '@/components/layouts/Error';

export default function Home() {
  const [sentence, setSentence] = useState('');
  const [after, setAfter] = useState('');
  const [languageError, setLanguageError] = useState('');
  const [voiceError, setVoiceError] = useState('');
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
        setAfter(data.after.trim());
      }
    } catch (error) {
      console.error(error);
    }
  };

  const speakEnglish = (text) => {
    const speechMsg = new SpeechSynthesisUtterance();

    if (
      typeof SpeechSynthesisUtterance === 'undefined' ||
      typeof window.speechSynthesis === 'undefined'
    ) {
      setVoiceError('이 브라우저는 음성 합성을 지원하지 않습니다.');
      return;
    }

    window.speechSynthesis.cancel(); // 현재 읽고있다면 초기화

    speechMsg.rate = 1; // 속도: 0.1 ~ 10
    speechMsg.pitch = 1; // 음높이: 0 ~ 2
    speechMsg.lang = 'en-US';
    speechMsg.text = text;

    // SpeechSynthesisUtterance에 저장된 내용을 바탕으로 음성합성 실행
    window.speechSynthesis.speak(speechMsg);
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
      {languageError && <Error message={languageError} />}

      <Title title='Correct Sentences' />
      <TextBox>{after}</TextBox>
      {voiceError && <Error message={voiceError} />}
      <button
        className={styles.voice}
        onClick={() => speakEnglish(after)}
        type='button'
      >
        <SpeakerSimpleHigh size={28} color='#0f2b46' weight='fill' />
      </button>
    </>
  );
}
