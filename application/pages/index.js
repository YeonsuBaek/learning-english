import { useState } from 'react';

export default function Home() {
  const [sentence, setSentence] = useState('');

  const handleChangeSentence = (e) => {
    setSentence(e.target.value);
  };

  const handleSubmitSentence = (e) => {
    e.preventDefault();
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
    </>
  );
}
