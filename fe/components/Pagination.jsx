import styles from '@/styles/Home.module.sass';
import { useState } from 'react';

export default function Pagination({ pages, current, pageSize, pgLimit, onChange }) {

    const [pg, setPg] = useState(1);

    const pageCount = Math.ceil(pages / pageSize);
    const paginationLimit = pgLimit || 2;

    const incremtnt = () => onChange(current + 1, setPg(Number(current + 1)));
    const decrement = () => onChange(current - 1, setPg(Number(current - 1)));
    const goToCurrentPage = (event) => onChange(Number(event.target.id), setPg(Number(event.target.id)));
    const last = () => onChange(pageCount, setPg(Number(pageCount)));
    const first = () => onChange(1, setPg(1));

    function ShowPaginationNumbers(pageCount) {
        let paginationNumbers = [];

        if (pageCount) {
            let showMax = paginationLimit;
            let endPage;
            let startPage;

            if (pageCount <= showMax) {
                startPage = 1;
                endPage = pageCount;
            }
            else {
                startPage = current || pg;
                if (startPage != pageCount && (startPage + 1) <= pageCount) {
                    endPage = current + showMax - 1;
                }
                else {
                    endPage = pageCount;
                }
            }

            for (let i = startPage; i <= endPage; i++) {
                paginationNumbers.push(i);
            }

            if (paginationNumbers) {
                let result = paginationNumbers.map(number => {
                    return (

                        <div className={(current === number ? `${styles.active}` : '')} key={number} id={number} onClick={goToCurrentPage}>{number}</div>

                    );
                });
                return result;
            }

        }

    };

    return (

        <div className={styles.pagination}>


            {current > 1 && (
                <>
                    <div onClick={first}> first </div>
                    <div onClick={decrement}> prev </div>
                </>
            )}

            {ShowPaginationNumbers(pageCount)}

            {current < pageCount && (
                <>
                    <div onClick={incremtnt}> next </div>
                    <div onClick={last}> last </div>
                </>
            )}


        </div>

    );
};