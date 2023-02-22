import { gql } from '@apollo/client'

const GET_ALL_TOP_NEWS_SLUGS = gql`
query {
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
`;

const GET_ALL_TOP_NEWS = gql`
query {
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
`;

const GET_ALL_NEWS = gql`
query {
  news(
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
`;

const GET_SINGLE_TOP_NEWS = gql`
query ($slug: String!) {
  topNews(
    sort: "publishedAt:desc"
    pagination: { limit: 1 }
    filters: { slug: { eq: $slug } }
  ) {
    data {
      attributes {
        title
        slug
        date
        img {
          data {
            attributes {
              url
            }
          }
        }
        authors {
          data {
            attributes {
              username
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
        tags {
          data {
            attributes {
              title
            }
          }
        }
                content
              }
            }
          }
        }
`;




export { GET_ALL_TOP_NEWS, GET_SINGLE_TOP_NEWS, GET_ALL_TOP_NEWS_SLUGS }
