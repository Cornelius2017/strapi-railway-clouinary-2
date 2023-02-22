import Image from "next/image";
import Fallback_img from 'assets/img/news.jpg'

import React from "react";

import Date from 'components/_fn/date'
import styles from '@/styles/Home.module.sass'


import Link from 'next/link'



const BlogPostPreview = ({ post }) => {
  return (

    <div className={styles.card}>
      <Link href={`/post/${post.attributes.slug}`}>
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
            {post.attributes.title}
          </div>
          <div className={styles.card__meta}>
            <div className=""><Date dateString={post.attributes.date}/></div>
            <div className="">
              {post.attributes.authors.data.map((author) => (
                <span key={author.attributes.id} data-key={author.attributes.id}>
                  {author.attributes.username}
                </span>
              ))}
            </div>
          </div>

        </div>
      </Link>
    </div>
  );
};

export default BlogPostPreview;