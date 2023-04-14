import { useState } from 'react';

export default function Home() {
  const [sentence, setSentence] = useState('');
  const [before, setBefore] = useState('');
  const [after, setAfter] = useState('');

  const handleChangeSentence = (e) => {
    setSentence(e.target.value);
  };

  const handleSubmitSentence = async (e) => {
    e.preventDefault();

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
      <form onSubmit={handleSubmitSentence}>
        <textarea
          placeholder='Write something'
          value={sentence}
          onChange={handleChangeSentence}
        ></textarea>
        <button type='submit'>작성 완료</button>
      </form>

      {before && (
        <div>
          <p>Your Sentence: {before}</p>
          <p>Correct Sentence: {after}</p>
        </div>
      )}
    </>
  );
}
