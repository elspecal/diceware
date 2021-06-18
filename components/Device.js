import { useState, useRef } from 'react';

import styles from '../styles/Device.module.scss';

const Status = Object.freeze({
  IDLE: Symbol('idle'),
  LOADING: Symbol('loading'),
  COPIED: Symbol('copied'),
  FINISHED: Symbol('finished'),
});

export default function Device() {
  const [words, setWords] = useState('');
  const [length, setLength] = useState(4);
  const screenRef = useRef();
  const [processState, setProcessState] = useState(Status.IDLE);
  const screenClass =
    Status.FINISHED === processState
      ? `${styles.screen} ${styles.finished}`
      : styles.screen;
  const copyClass =
    Status.FINISHED === processState || Status.COPIED === processState
      ? `${styles.copy} ${styles.finished}`
      : styles.copy;
  const deviceOutput = {
    [Status.IDLE]: 'Set the length, generate, copy -->',
    [Status.LOADING]: 'Generating your new passphrase...',
    [Status.COPIED]: 'Copied!',
    [Status.FINISHED]: words,
  };

  function increment(prevLength) {
    return 9 > prevLength ? prevLength + 1 : prevLength;
  }

  function decrement(prevLength) {
    return 1 < prevLength ? prevLength - 1 : prevLength;
  }

  async function handleGenerate(event) {
    event.preventDefault();
    setProcessState(Status.LOADING);

    const response = await fetch(`/api/generate/${length}`);
    const data = await response.json();

    setWords(data);
    setProcessState(Status.FINISHED);
  }

  function handleCopy() {
    if (Status.FINISHED === processState) {
      screenRef.current.select();
      document.execCommand('copy');
      screenRef.current.selectionStart = screenRef.current.selectionEnd;

      const initState = processState;
      setProcessState(Status.COPIED);
      setTimeout(() => setProcessState(initState), 2500);
    }
  }

  return (
    <main className={styles.main}>
      <div className={styles.display}>
        <textarea className={screenClass} ref={screenRef} readOnly>
          {deviceOutput[processState]}
        </textarea>
        <svg onClick={handleCopy} className={copyClass} viewBox='0 0 24 24'>
          <rect x='9' y='9' width='13' height='13' rx='2' ry='2'></rect>
          <path d='M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1'></path>
        </svg>
      </div>
      <form onSubmit={handleGenerate} className={styles.control}>
        <div className={styles['length-controller']}>
          <span onClick={() => setLength(decrement)}>-</span>
          <input
            type='number'
            name='length'
            id='length'
            min='1'
            max='9'
            required
            value={length}
            onChange={event => setLength(+event.target.value)}
          />
          <span onClick={() => setLength(increment)}>+</span>
        </div>
        <label htmlFor='length'>words</label>
        <button className={styles['btn-main']}>Generate</button>
      </form>
    </main>
  );
}
