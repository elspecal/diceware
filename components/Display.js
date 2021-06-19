import { useRef } from 'react';

import Status from '../lib/processStatusT';
import styles from '../styles/Display.module.scss';

export default function Display({
  onProcessStateChange,
  processState,
  phrase,
}) {
  const screenRef = useRef();
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
    [Status.COPIED]: 'Copied to clipboard!',
    [Status.FINISHED]: phrase,
  };

  function handleCopy() {
    if (Status.FINISHED === processState) {
      screenRef.current.select();
      document.execCommand('copy');
      screenRef.current.selectionStart = screenRef.current.selectionEnd;

      const initState = processState;
      onProcessStateChange(Status.COPIED);
      setTimeout(() => onProcessStateChange(initState), 2400);
    }
  }

  return (
    <div className={styles.display}>
      <textarea className={screenClass} ref={screenRef} readOnly>
        {deviceOutput[processState]}
      </textarea>
      <svg onClick={handleCopy} className={copyClass} viewBox='0 0 24 24'>
        <rect x='9' y='9' width='13' height='13' rx='2' ry='2'></rect>
        <path d='M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1'></path>
      </svg>
    </div>
  );
}
