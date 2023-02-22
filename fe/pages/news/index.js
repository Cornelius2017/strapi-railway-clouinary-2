import styles from '@/styles/Home.module.sass';

import client from 'apollo-client';
import { GET_ALL_NEWS  } from '@/graphql/queries';

import Card from '@/components/Card';
import Link from 'next/link';

const News = ({ news }) => {
    return (
        <div className={styles.container}>
            <article className={styles.section}>
                <h1 className="">
                    News
                </h1>
                <section className={styles.row}>
                    {news.map((post) => (
                        <Link href={`/news/${post.attributes.slug}`} className={styles.card__wrap}>
                            <Card post={post} key={post.attributes.slug} />
                        </Link>
                    ))}
                </section>
            </article>
        </div>
    );
}

export default News

export async function getStaticProps() {
    const { data } = await client.query({
        query: GET_ALL_NEWS 
    });

    return {
        props: {
            news: data.news.data,
        }
    };
}