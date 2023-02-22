import Head from 'next/head'
import styles from '@/styles/Home.module.sass'

import client from 'apollo-client'
import { GET_ALL_TOP_NEWS } from '@/graphql/queries'

import BlogPostPreview from 'components/BlogPostPreview'

export default function Home({ posts }) {
  return (
    <div className={styles.container}>
      <h1 className="">
        TOP News
      </h1>
      <section className={styles.row}>
        {posts.map((post) => (
          <BlogPostPreview post={post} key={post.attributes.slug} />
        ))}
      </section>
    </div>
  );
}

export async function getStaticProps() {
  const { data } = await client.query({
    query: GET_ALL_TOP_NEWS,
  });

  return {
    props: {
      posts: data.topNews.data,
    },
  };
}




