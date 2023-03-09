import styles from '../../styles/Home.module.sass';

import { useState } from 'react';


import client from 'apollo-client';
import { GET_ALL_TOP_NEWS } from "../../graphql/queries";


import Card from '../../components/Card';
import Link from 'next/link';

import Breadcrumbs from '../../components/Breadcrumbs';

import Pagination from '@/components/Pagination';
import Router, { useRouter } from 'next/router';

const paginate = (items, pageNumber, pageSize, paginationLimit) => {
    const startIndex = (pageNumber - 1) * pageSize;
    return items.slice(startIndex, startIndex + pageSize);
};


const TopNews = ({ top_news }) => {
    const router = useRouter();
    const rp = +(router.query.page) || 1;
    
    const [page, setPage] = useState(1);

    const pageSize = 2;
    const allPageItems = top_news.length;
    const paginationLimit = 2;
    const pageCount = Math.ceil(allPageItems / pageSize)

    const handlePageChange = (count) => {
        setPage(count);

        Router.push({
            pathname: '',
            query: { page: count }
        });

    }


    const paginatedPosts = paginate(top_news, rp > pageCount ? page : rp , pageSize);
    return (
        <>
            <Breadcrumbs />
            <div className={styles.inner}>
                <div className={styles.container}>

                    <article className={styles.section}>
                        <h1 className="">
                            TOP News
                        </h1>
                        <section className={styles.row}>
                            {paginatedPosts.map((post) => (
                                <Link href={`/top-news/${post.attributes.slug}`} className={styles.card__wrap}>
                                    <Card post={post} key={post.attributes.slug} />
                                </Link>
                            ))}
                        </section>
                        <Pagination current={rp > pageCount ? page : rp } pageSize={pageSize} pages={top_news.length} pgLimit={paginationLimit} onChange={handlePageChange} />
                    </article>

                </div>
            </div>
        </>
    );
}

export default TopNews

export async function getStaticProps() {

    const { data } = await client.query({
        query: GET_ALL_TOP_NEWS,
    });

    return {
        props: {
            top_news: data.topNews.data,
        }
    };
}