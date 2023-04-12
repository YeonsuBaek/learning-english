import { useState } from 'react';

export default function Home() {
  const [sentence, setSentence] = useState('');
  const [before, setBefore] = useState('');

  const handleChangeSentence = (e) => {
    setSentence(e.target.value);
  };

  const handleSubmitSentence = (e) => {
    e.preventDefault();
    setBefore(sentence);
    setSentence('');
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
        </div>
      )}
    </>
  );
}
