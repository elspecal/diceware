import Device from '/components/Device';
import Head from 'next/head';
import styles from '../styles/Home.module.scss';

export default function Home() {
  return (
    <div className={styles.container}>
      <Head>
        <title>Secure Passphrase</title>
        <meta name='description' content='Generate a secure passphrase' />
        <link rel='icon' href='/favicon.ico' />
      </Head>
      <Device />
      <footer className={styles.footer}>
        <a
          href='https://csepella.com'
          target='_blank'
          rel='noopener noreferrer'
        >
          Powered by Miki Csepella
        </a>
      </footer>
    </div>
  );
}
