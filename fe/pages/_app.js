import '../styles/globals.css';
import Header from 'components/Header';
import styles from '../styles/Home.module.sass';

function MyApp({ Component, pageProps }) {
  return (
    <div className={styles.page}>
      <Header/>
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