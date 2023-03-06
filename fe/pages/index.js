import styles from '../styles/Home.module.sass';

import client from 'apollo-client';
import { GET_ALL_TOP_NEWS, GET_ALL_NEWS } from '../graphql/queries';

import Link from  'next/link';

import Card from '../components/Card';

export default function Home({ top_news, news }) {
  return (
    <div className={styles.inner}>
    <div className={styles.container}>
      <article className={styles.article}>
      <h1 className="">
        TOP News
      </h1>
      <section className={styles.row}>
        {top_news.map((post) => (
          <Link href={`/top-news/${post.attributes.slug}`} className={styles.card__wrap}>
            <Card post={post} key={post.attributes.slug} />
          </Link>
        ))}
      </section>
      </article>

      <article className={styles.article}>
      <h1 className="">
        News
      </h1>
      <section className={styles.row}>
        {news.map((post) => (
          <Link href={`/news/${post.attributes.slug}`} className={styles.card__wrap}>
            <Card post={post} key={post.attributes.slug} />
          </Link>
        ))}
      </section>
      </article>
    </div>
    </div>
  );
}

export async function getStaticProps() {
  
  const a = await client.query({
    query: GET_ALL_TOP_NEWS
  });

  const b = await client.query({
    query: GET_ALL_NEWS
  });

  return {
    props: {
      top_news: a.data.topNews.data,
      news: b.data.news.data
    }
  };
}