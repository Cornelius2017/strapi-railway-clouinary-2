
import React from "react";
import { useState, useEffect } from "react";
import styles from '../styles/Home.module.sass';
import { useRouter } from 'next/router';

const SITE_URL = "https://strapi-production-3c24.up.railway.app/api/";

export default function LangSwitcher() {
    const router = useRouter();
    const { pathname, asPath, query } = router;
    //const { locale, locales, push } = useRouter();

    const handleClick = l => () => {
        router.push({pathname, query}, asPath, { locale: l })
        //push('/', undefined, {locale: l})
    }

    const [state, setState] = useState([]);

    useEffect(() => {
        const dataFetch = async () => {
            const data = await (
                await fetch(
                    `${SITE_URL}i18n/locales`
                )
            ).json();

            setState(data);
        };

        dataFetch();
    }, []);

    return (
       <>
        <ul className={styles.lang}>
            {state.map(val => (
                <li key={val.id} id={val.code} onClick={handleClick(val.code)}>{val.code}</li>
            ))}
        </ul>
       </>
    );
}

