import { useState } from 'react';

import Display from './Display';
import WordCntCtrler from './WordCntCtrler';
import Status from '../lib/processStatusT';
import styles from '../styles/Device.module.scss';

export default function Device() {
  const [phrase, setPhrase] = useState('');
  const [wordCnt, setWordCnt] = useState(4);
  const [processState, setProcessState] = useState(Status.IDLE);

  async function handleGenerate(event) {
    event.preventDefault();
    setProcessState(Status.LOADING);

    const response = await fetch(`/api/generate/${wordCnt}`);
    const data = await response.json();

    setPhrase(data);
    setProcessState(Status.FINISHED);
  }

  return (
    <main className={styles.main}>
      <Display
        onProcessStateChange={setProcessState}
        processState={processState}
        phrase={phrase}
      />
      <WordCntCtrler onWordCntChange={setWordCnt} wordCnt={wordCnt} />
      <button className={styles['btn-main']} onClick={handleGenerate}>
        Generate
      </button>
    </main>
  );
}
