import Head from 'next/head'
import Image from 'next/image'
import styles from '@/styles/Home.module.sass'

import client from 'apollo-client'
import { ApolloClient, gql } from '@apollo/client'
import BlogPostPreview from 'components/BlogPostPreview'


export async function getStaticProps() {
  const { data } = await client.query({
    query: gql`
      query topNews {
        topNews(
          sort: "publishedAt:desc"
          pagination: { limit: 5 }
          filters: { publishedAt: { notNull: true } }
        ) {
          data {
            attributes {
              title
              slug
              date
              position
              authors {
                data {
                  attributes {
                    username
                  }
                }
              }
              tags {
                data {
                  attributes {
                    title
                  
                    
                  }
                }
              }
              categories {
                data {
                  attributes {
                    title
                  }
                }
              }
              img {
                data {
                  attributes {
                    url
                  }
                }
              }
            }
          }
        }
      }
    `,
  });

  return {
    props: {
      posts: data.topNews.data,
    },
  };
}


export default function Home({ posts }) {
  return (
    <div className={styles.container}>
      <h1 className="">
        My personal blog
      </h1>
      <section className={styles.row}>
        {posts.map((post) => (
          <BlogPostPreview post={post} key={post.attributes.slug} />
        ))}
      </section>
    </div>
  );
}

