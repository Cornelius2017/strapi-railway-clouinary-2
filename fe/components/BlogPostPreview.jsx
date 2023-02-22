import Image from "next/image";
import Fallback_img from 'assets/img/news.jpg'

import React from "react";

import { parseISO, format } from 'date-fns'
import styles from '@/styles/Home.module.sass'

import Link from 'next/link'

export function Date({ dateString }) {
  const date = parseISO(dateString);
  return <time dateTime={dateString}>{format(date, 'LL-d-yyyy | HH:mm')}</time>;
}

const BlogPostPreview = ({ post }) => {
  return (
    <div className={styles.card} key={post.id}>
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
            <div className="">By &nbsp;
              {post.attributes.authors.data.map((author) => (
                <span key={author.attributes.id}>
                  {author.attributes.username}
                </span>
              ))}
            </div>
          </div>

          <div className={styles.card__cat}>
            {post.attributes.categories.data.map((cat) => (
              <span key={cat.attributes.id}>
                {cat.attributes.title}
              </span>
            ))}
          </div>

          <div className={styles.card__tags}>
            {post.attributes.tags.data.map((tag) => (
              <span key={tag.attributes.id}>
                {tag.attributes.title}
              </span>
            ))}
          </div>



        </div>
     
      </Link>
    </div>
  );
};

export default BlogPostPreview;