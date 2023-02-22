import styles from '@/styles/Home.module.sass';

import client from 'apollo-client';
import { GET_ALL_TOP_NEWS } from '@/graphql/queries';

import Card from '@/components/Card';

export default function Home({ top_news }) {
  return (
    <div className={styles.container}>
      <article className={styles.section}>
      <h1 className="">
        TOP News
      </h1>
      <section className={styles.row}>
        {top_news.map((post, i) => (
          <Card post={post} key={`${i}-${post.attributes.slug}`} />
        ))}
      </section>
      </article>
    </div>
  );
}

export async function getStaticProps() {
  const { data } = await client.query({
    query: GET_ALL_TOP_NEWS
  });

  return {
    props: {
      top_news: data.topNews.data,
    }
  };
}