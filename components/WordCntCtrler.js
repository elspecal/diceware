import styles from '../styles/WordCntCtrler.module.scss';

export default function WordCntCtrler({ onWordCntChange, wordCnt }) {
  function increment(prevLength) {
    return 9 > prevLength ? prevLength + 1 : prevLength;
  }

  function decrement(prevLength) {
    return 1 < prevLength ? prevLength - 1 : prevLength;
  }

  const inputOpt = {
    className: styles['cntr-display'],
    type: 'number',
    name: 'length',
    id: 'length',
    min: '1',
    max: '9',
    required: true,
    value: wordCnt,
    onChange: event => onWordCntChange(+event.target.value),
  };

  return (
    <div className={styles['word-cnt-ctrler']}>
      <div className={styles.input}>
        <span
          className={styles['cntr-btn']}
          onClick={() => onWordCntChange(decrement)}
        >
          -
        </span>
        <input {...inputOpt} />
        <span
          className={styles['cntr-btn']}
          onClick={() => onWordCntChange(increment)}
        >
          +
        </span>
      </div>
      <label htmlFor='length'>words</label>
    </div>
  );
}
