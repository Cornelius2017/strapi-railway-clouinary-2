import client from 'apollo-client'
import { ApolloClient, gql } from '@apollo/client'

export default function Post({ postData }) {
    return (
        <ReactMarkdown className="">
            <h1>Single Page</h1>
            {postData.attributes.content}
        </ReactMarkdown>
    );
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
              id
              attributes {
                title
                slug
                content
                author {
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
              }
            }
          }
        }
      `,
    });

    return {
        props: {
            postData: data.topNews.data[0],
        },
    };
}

