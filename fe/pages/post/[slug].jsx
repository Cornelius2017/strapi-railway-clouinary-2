import client from 'apollo-client'

import styles from '@/styles/Home.module.sass'
import ReactMarkdown from 'react-markdown'
import Date from 'components/_fn/date'

import Link from 'next/link'

import { GET_ALL_TOP_NEWS_SLUGS, GET_SINGLE_TOP_NEWS } from '@/graphql/queries'

export default function Post({ postData }) {
  return (
    <div className={styles.container} key={postData.attributes.slug}>
      <div className={styles.single_page}>
        <h1>{postData.attributes.title}</h1>
        <div className={styles.single_page__meta}>
          <span>
            <Date dateString={postData.attributes.date} />
          </span> &nbsp;|&nbsp;
          <span>
            {postData.attributes.authors.data.map((author) => (
              <span key={author.attributes.username}>
                {author.attributes.username}
              </span>
            ))}
          </span>
        </div>
        {
          postData.attributes.img.data ?

            <img src={postData.attributes.img.data?.attributes.url} alt={postData.attributes.title} width="100%" />
            : null

        }
        <ReactMarkdown className={styles.single_page__content}>
          {postData.attributes.content}
        </ReactMarkdown>
        <Link href={`/`}>
          Назад
        </Link>
        <div className={styles.single_page__info}>
          <span>
            {postData.attributes.tags.data.map((tag) => (
              <span key={tag.attributes.id}>
                {tag.attributes.username}
              </span>
            ))}
          </span>
          <span>
            {postData.attributes.categories.data.map((cat) => (
              <span key={cat.attributes.id}>
                {cat.attributes.username}
              </span>
            ))}
          </span>
        </div>
      </div>
    </div>
  );
}

export async function getStaticPaths() {
  const { data } = await client.query({
    query: GET_ALL_TOP_NEWS_SLUGS,
  });
  return {
    paths: data.topNews.data.map((item) => ({
      params: { slug: item.attributes.slug },
    })),
    fallback: false,
  };
}


export async function getStaticProps({ params }) {
  const { data } = await client.query({
    query: GET_SINGLE_TOP_NEWS ,
    variables: { slug: params.slug }
  });

  return {
    props: {
      postData: data.topNews.data[0],
    },
  };
}