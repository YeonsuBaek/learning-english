import React, { useState } from 'react';
import styles from '../styles/correctSentences.module.css';
import Title from '../components/layouts/Title';
import TextBox from '@/components/layouts/TextBox';
import Error from '@/components/layouts/Error';
import Tooltip from '../components/layouts/Tooltip';
import { SpeakerSimpleHigh, CopySimple } from '@phosphor-icons/react';
import { CopyToClipboard } from 'react-copy-to-clipboard';

const CorrectSentences = ({ after }) => {
  const [voiceError, setVoiceError] = useState('');
  const [copyButton, setCopyButton] = useState(false);
  const [copyMessage, setCopyMessage] = useState('Copy to clipboard');

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

  const handleEnterCopyButton = () => {
    setCopyButton(true);
  };

  const handleLeaveCopyButton = () => {
    setCopyButton(false);
    setCopyMessage('Copy to clipboard');
  };

  const handleClickCopyButton = () => {
    setCopyMessage('Copied!');
    speakEnglish(after);
  };

  return (
    <div className={styles.wrapper}>
      <Title title='Correct Sentences' />
      <TextBox>{after}</TextBox>
      {voiceError && <Error message={voiceError} />}
      {after && (
        <div className={styles.buttons}>
          <button
            className={styles.button}
            onClick={() => speakEnglish(after)}
            type='button'
          >
            <SpeakerSimpleHigh
              size={28}
              weight='fill'
              className={styles.icon}
            />
          </button>
          <div className={styles.copy}>
            <CopyToClipboard text={after}>
              <button
                className={styles.button}
                onClick={handleClickCopyButton}
                onMouseEnter={handleEnterCopyButton}
                onMouseLeave={handleLeaveCopyButton}
                type='button'
              >
                <CopySimple size={28} weight='fill' className={styles.icon} />
              </button>
            </CopyToClipboard>
            {copyButton && <Tooltip text={copyMessage} />}
          </div>
        </div>
      )}
    </div>
  );
};

export default CorrectSentences;
