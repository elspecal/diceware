import S from 'sanctuary';
import styles from '/styles/Display.module.scss';

export default function Display({ words }) {
  const renderPassphrase = S.map(x => (
    <li key={x} className={styles.word}>
      {x}
    </li>
  ));

  return <ul className={styles.screen}>{renderPassphrase(words)}</ul>;
}
