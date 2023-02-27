import client from "apollo-client";

import styles from "@/styles/Home.module.sass";
import ReactMarkdown from "react-markdown";

import Image from "next/image";
import Link from "next/link";

import GoBack from "@/components/_fn/go-back";
import { GET_ALL_TOP_NEWS_SLUGS, GET_SINGLE_TOP_NEWS } from "@/graphql/queries";

import Breadcrumbs from "@/components/Breadcrumbs";


export default function Post({ postData }) {

  return (
    <>
      <Breadcrumbs title={postData.attributes.title} />

      <div className={styles.inner}>
        <div className={styles.container} key={postData.attributes.slug}>
          <div className={styles.single_page}>
            <h1>{postData.attributes.title}</h1>
            <div className={styles.single_page__meta}>
              <span>
                {new Date(postData.attributes.date).toLocaleString([], { dateStyle: 'short', timeStyle: 'short' })}
              </span>
              &nbsp;|&nbsp;
              <span>
                {postData.attributes.authors.data.map((author) => (
                  <span key={author.attributes.username}>
                    {author.attributes.username}
                  </span>
                ))}
              </span>
            </div>
            {postData.attributes.img.data ? (
              <div style={{ width: "100%", height: "400px", position: "relative" }}>
                <Image
                  src={postData.attributes.img.data?.attributes.url}
                  alt={postData.attributes.title}
                  layout="fill"
                  objectFit="cover"
                />
              </div>
            ) : null}
            <ReactMarkdown className={styles.single_page__content}>
              {postData.attributes.content}
            </ReactMarkdown>

            <GoBack></GoBack>

            <div className={styles.single_page__info}>
              {postData.attributes.tags.data.length ? (
                <span>
                  <b data-key={postData.attributes.tags.data}>Теги: </b>
                  {postData.attributes.tags.data.map((tag) => (
                    <Link href={`/tag/${tag.attributes.tagId}`} key={tag.attributes.tagId} className={styles.badge}>
                      {tag.attributes.title}
                    </Link>
                  ))}
                </span>
              ) : null}

              <span>
                <b>Категории: </b>
                {postData.attributes.categories.data.map((cat) => (
                  <span key={cat.attributes.title} className={styles.badge}>
                    {cat.attributes.title}
                  </span>
                ))}
              </span>
            </div>
          </div>
        </div>
      </div>
    </>
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
    query: GET_SINGLE_TOP_NEWS,
    variables: { slug: params.slug },
  });

  return {
    props: {
      postData: data.topNews.data[0],
    },
  };
}
