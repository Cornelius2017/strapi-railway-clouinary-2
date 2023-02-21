import client from 'apollo-client'
import { ApolloClient, gql } from '@apollo/client'

export default function Post({ postData }) {
    return <div>{postData.attributes.content}</div>;
}

export async function getStaticPaths() {
    const { data } = await client.query({
      query: gql`
        query topNews {
          topNews(
            filters: { publishedAt: { notNull: true } }
          ) {
            data {
              attributes {
                slug
              }
            }
          }
        }
      `,
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
      query: gql`
        query topNews {
          topNews(
            sort: "publishedAt:desc"
            pagination: { limit: 1 }
            filters: { slug: { eq: "${params.slug}" } }
          ) {
            data {
              attributes {
                title
                slug
                content
              }
            }
          }
        }
      `
    });
  
    return {
      props: {
        postData: data.topNews.data[0],
      },
    };
  }


