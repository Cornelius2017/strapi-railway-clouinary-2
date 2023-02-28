import styles from '../styles/Home.module.sass';
import { useRouter } from 'next/router';
import Link from 'next/link';
import React, { useEffect, useState } from 'react';
import truncateStr from './_fn/truncate';

const convertBreadcrumb = string => {
    return string
        .replace(/-/g, ' ')
        .replace(/%20/g, ' ')
        .toUpperCase();
};

const Breadcrumbs = ({ title }) => {
    const router = useRouter();
    const [breadcrumbs, setBreadcrumbs] = useState(null);

    useEffect(() => {
        if (router) {
            const linkPath = router.asPath.split('/');
            linkPath.shift();

            const pathArray = linkPath.map((path, i) => {
                return { breadcrumb: path, title: title, href: '/' + linkPath.slice(0, i + 1).join('/') };
            });

            setBreadcrumbs(pathArray);
        }
    }, [router]);

    if (!breadcrumbs) {
        return null;
    }

    return (
        <div className={styles.breadcrumbs}>
            <nav aria-label="breadcrumbs">
                <ol className={styles.container}>
                    <li>
                        <Link href="/">
                            HOME
                        </Link>
                    </li>
                    {breadcrumbs.map((breadcrumb, i) => {
                        return (
                            <li key={breadcrumb.href}>
                                <Link href={breadcrumb.href}>
                                    { i == breadcrumbs.length - 1 ? breadcrumb.title && truncateStr(breadcrumb.title, 100) || convertBreadcrumb(breadcrumb.breadcrumb) : convertBreadcrumb(breadcrumb.breadcrumb) }
                                </Link>
                            </li>
                        )
                    }
                    )}

                </ol>
            </nav>
        </div>
    );
};

export default Breadcrumbs;