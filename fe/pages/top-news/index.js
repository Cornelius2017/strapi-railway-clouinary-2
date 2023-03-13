import styles from '../../styles/Home.module.sass';

import { useState } from 'react';


import client from 'apollo-client';
import { GET_ALL_TOP_NEWS } from "../../graphql/queries";


import Card from '../../components/Card';
import Link from 'next/link';

import Breadcrumbs from '../../components/Breadcrumbs';

import Pagination from '@/components/Pagination';
import { useRouter } from 'next/router';

const paginate = (items, pageNumber, pageSize) => {
    const startIndex = (pageNumber - 1) * pageSize;
    return items.slice(startIndex, startIndex + pageSize);
};


const TopNews = ({ top_news, lang, language }) => {
    const router = useRouter();
    const { locale } = useRouter();

    const pg = +(router.query.page) || 1;

    const [page, setPage] = useState(1);

    const pageSize = 100;
    const allPageItems = top_news.length;
    const paginationLimit = 2;
    const pageCount = Math.ceil(allPageItems / pageSize)

    const handlePageChange = (count) => {
        setPage(count);

        router.push({
            pathname: '',
            query: { page: count }
        });

    }

    const paginatedPosts = paginate(top_news, pg > pageCount ? page : pg, pageSize);
    
    return (
        <>
            <Breadcrumbs />
            <div className={styles.inner}>
                <div className={styles.container}>

                    <article className={styles.section}>
                        <h1 className="">
                          TOP News | {locale}
                        </h1>
                        <section className={styles.row}>
                            {paginatedPosts.map((post) => (
                               
                                        <Link href={`/top-news/${post.attributes.slug}`} 
                                        className={styles.card__wrap}>
                                            <Card post={post} key={post.attributes.slug} />
                                        </Link>
                                  
                            ))}
                        </section>
                        <Pagination current={pg > pageCount ? page : pg} pageSize={pageSize} pages={top_news.length} pgLimit={paginationLimit} onChange={handlePageChange} />
                    </article>

                </div>
            </div>
        </>
    );
}

export default TopNews


export async function getStaticProps({locale}) {

    const { data } = await client.query({
        query: GET_ALL_TOP_NEWS,
        variables: { locale: locale }
    });

    return {
        props: {
            top_news: data.topNews.data,
        }
    };
}