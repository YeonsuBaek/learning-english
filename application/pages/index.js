import { useState } from 'react';
import Header from '../components/Header';
import Title from '../components/layouts/Title';
import TextBox from '@/components/layouts/TextBox';
import Form from '@/components/layouts/Form';

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

      <Title title='Correct Sentences' />
      <TextBox>{after}</TextBox>
    </>
  );
}
