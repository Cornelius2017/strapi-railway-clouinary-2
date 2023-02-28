import Image from "next/image";
import Fallback_img from "assets/img/news.jpg";

import React from "react";

import styles from "../styles/Home.module.sass";

import truncateStr from "./_fn/truncate";

const BlogPostPreview = ({ post }) => {
  return (
    <div className={styles.card}>
      <Image
        className={styles.card__img}
        src={post.attributes.img.data?.attributes.url || Fallback_img}
        alt={post.attributes.title}
        width={300}
        height={200}
        objectFit="cover"
      />

      <div className={styles.card__content}>
        <div className={styles.card__title}>
          {truncateStr(post.attributes.title, 75)}
        </div>

        { post.attributes.date || post.attributes.author ? (
          <div className={styles.card__meta}>
            {post.attributes.date ? (
              <div className="">
              {new Date(post.attributes.date).toLocaleString([], {dateStyle: 'short', timeStyle: 'short'})} 
              </div>
            ) : null}

            {post.attributes.authors ? (
              <div className="">
                {post.attributes.authors.data.map((author) => (
                  <span
                    key={author.attributes.username}
                    data-key={author.attributes.username}
                  >
                    {author.attributes.username}
                  </span>
                ))}
              </div>
            ) : null }
          </div>
        ) : null }
      </div>
    </div>
  );
};

export default BlogPostPreview;
