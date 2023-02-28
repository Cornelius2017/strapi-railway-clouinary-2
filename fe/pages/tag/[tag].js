import client from "apollo-client";
import { GET_ALL_TAGS, GET_ALL_TAGS_SLUG } from "../../graphql/queries";

import Link from "next/link";
import Card from "../../components/Card";

import styles from "../../styles/Home.module.sass";

export default function Tag({ tagData, tags }) {
 
  return (
    <>
      <section className={styles.container}>
        <h2 className="">
          Новости с тегом: &quot;{tagData.attributes.title}&quot;
        </h2>

        <div className={styles.row}>
          {tagData.attributes.top_news.data.map((post) => (
            <Link
              href={`/top-news/${post.attributes.slug}`}
              className={styles.card__wrap}
            >
              <Card key={post.attributes.slug} post={post} />
            </Link>
          ))}

          {tagData.attributes.news.data.map((post) => (
            <Link
              href={`/news/${post.attributes.slug}`}
              className={styles.card__wrap}
            >
              <Card key={post.attributes.slug} post={post} />
            </Link>
          ))}

          {tagData.attributes.articles.data.map((post) => (
            <Link
              href={`/articles/${post.attributes.slug}`}
              className={styles.card__wrap}
            >
              <Card key={post.attributes.slug} post={post} />
            </Link>
          ))}

          {tagData.attributes.beginners.data.map((post) => (
            <Link
              href={`/beginners/${post.attributes.slug}`}
              className={styles.card__wrap}
            >
              <Card key={post.attributes.slug} post={post} />
            </Link>
          ))}

          {tagData.attributes.you_tubes.data.map((post) => (
            <Link
              href={`/you_tubes/${post.attributes.slug}`}
              className={styles.card__wrap}
            >
              <Card key={post.attributes.slug} post={post} />
            </Link>
          ))}
        </div>
      </section>

      <section className={styles.container}>
        <div className={styles.badge__wrap}>
          {tags.map((tag) => (
            <Link
              href={`/tag/${tag.attributes.tagId}`}
              className={styles.badge}
            >
              {tag.attributes.title}
            </Link>
          ))}
        </div>
      </section>
    </>
  );
}

export async function getStaticPaths() {
  const { data } = await client.query({
    query: GET_ALL_TAGS_SLUG,
  });
  return {
    paths: data.tags.data.map((item) => ({
      params: { tag: item.attributes.tagId },
    })),
    fallback: false,
  };
}

export async function getStaticProps({ params }) {
  const a = await client.query({
    query: GET_ALL_TAGS,
    variables: { params: params.tag },
  });

  const b = await client.query({
    query: GET_ALL_TAGS_SLUG,
  });
  
  return {
    props: {
      tagData: a.data.tags.data[0],
      tags: b.data.tags.data,
    },
  };
}
