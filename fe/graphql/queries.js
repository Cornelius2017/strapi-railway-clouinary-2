import { gql } from "@apollo/client";

const GET_ALL_TAGS_SLUG = gql`
  query {
    tags {
      data {
        attributes {
          tagId
          title
        }
      }
    }
  }
`;

const GET_ALL_TAGS = gql`
  query ($params: String!) {
    tags(filters: { tagId: { eq: $params } }) {
      data {
        id
        attributes {
          title
          tagId
          
          top_news {
            data {
              attributes {
                title
                slug
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

          news {
            data {
              attributes {
                title
                slug
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

          articles {
            data {
              attributes {
                title
                slug
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

          beginners {
            data {
              attributes {
                title
                slug
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

          you_tubes {
            data {
              attributes {
                title
                slug
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
      }
    }
  }
`;

const GET_ALL_TOP_NEWS_SLUGS = gql`
  query($locale: I18NLocaleCode) {
    topNews(locale: $locale, filters: { publishedAt: { notNull: true } }) {
      data {
        attributes {
          slug
          uuid
        }
      }
    }
  }
`;

const GET_ALL_NEWS_SLUGS = gql`
  query {
    news(filters: { publishedAt: { notNull: true } }) {
      data {
        attributes {
          slug
         
        }
      }
    }
  }
`;

const GET_ALL_TOP_NEWS = gql`
  query($limit: Int, $locale: I18NLocaleCode) {
    topNews(
      locale: $locale
      sort: "publishedAt:desc"
      pagination: { limit: $limit }
      filters: { publishedAt: { notNull: true } }
    ) {
      data {
        attributes {
          locale
          title
          slug
          uuid
          date
          position
          authors {
            data {
              attributes {
                username
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
  query ($slug: String!, $locale: I18NLocaleCode) {
    topNews(
      locale: $locale
      sort: "publishedAt:desc"
      pagination: { limit: 1 }
      filters: { slug: { eq: $slug } }
    ) {
      data {
        attributes {
          locale
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
                tagId
              }
            }
          }
          content
        }
      }
    }
  }
`;

const GET_SINGLE_NEWS = gql`
  query ($slug: String!, $locale: I18NLocaleCode) {
    news(
      locale: $locale
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

export {
  GET_ALL_TOP_NEWS,
  GET_ALL_NEWS,
  GET_SINGLE_TOP_NEWS,
  GET_SINGLE_NEWS,
  GET_ALL_TOP_NEWS_SLUGS,
  GET_ALL_NEWS_SLUGS,
  GET_ALL_TAGS,
  GET_ALL_TAGS_SLUG,
};
