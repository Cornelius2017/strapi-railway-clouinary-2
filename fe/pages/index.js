import styles from '../styles/Home.module.sass';

import client from 'apollo-client';
import { GET_ALL_TOP_NEWS, GET_ALL_NEWS } from '../graphql/queries';

import Link from  'next/link';

import Card from '../components/Card';
import { useRouter } from 'next/router';

export default function Home({ top_news, news }) {
  const { locale } = useRouter();
  return (
    <div className={styles.inner}>
    <div className={styles.container}>
      <article className={styles.article}>
      aaa
      </article>
    </div>
    </div>
  );
}

export async function getStaticProps({ locale }) {
  
  // const a = await client.query({
  //   query: GET_ALL_TOP_NEWS,
  //   variables: { "limit": 10, locale: locale }
  // });

  // const b = await client.query({
  //   query: GET_ALL_NEWS
  // });

  return {
    props: {
      // top_news: a.data.topNews.data,
      // news: b.data.news.data,
      prop1: "aa"
    }
  };
}