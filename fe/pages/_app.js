import '@/styles/globals.css';

import styles from '@/styles/Home.module.sass';

function MyApp({ Component, pageProps }) {
  return (
    <div className={styles.page}>
      <header className={styles.header}>
        <div className={styles.container}>
        Header 
        </div>
      </header>
      <main className={styles.main}>
      <Component {...pageProps} />
      </main>
      <footer className={styles.footer}>
        <div className={styles.container}>
        Footer
        </div>
      </footer>
    </div>
  );
}

export default MyApp;