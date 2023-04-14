import { useState } from 'react';
import Header from '../components/Header';
import Title from '../components/layouts/Title';
import TextBox from '@/components/layouts/TextBox';

export default function Home() {
  const [sentence, setSentence] = useState('');
  const [before, setBefore] = useState('');
  const [after, setAfter] = useState('');

  const handleChangeSentence = (e) => {
    setSentence(e.target.value);
  };

  const handleEnterPress = (e) => {
    if (e.keyCode == 13 && e.shiftKey == false) {
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

      setBefore(sentence);
      setAfter(data.after);
      setSentence('');
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <>
      <Header />
      <Title title='Your Sentences' />
      <TextBox>
        <form onSubmit={handleSubmitSentence}>
          <textarea
            placeholder='Write something'
            value={sentence}
            onChange={handleChangeSentence}
            onKeyDown={handleEnterPress}
          ></textarea>
        </form>
      </TextBox>

      <Title title='Correct Sentences' />
      {before && (
        <div>
          <p>Your Sentence: {before}</p>
          <p>Correct Sentence: {after}</p>
        </div>
      )}
    </>
  );
}
