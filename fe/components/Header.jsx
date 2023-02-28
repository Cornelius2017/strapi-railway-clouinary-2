import styles from '../styles/Home.module.sass';
import { useRouter } from "next/router";

const Header = () => {
    const router = useRouter();

    const handleSearch = (e) => {
        e.preventDefault();
        router.push(`/search/${e.target[0].value}`);
    };

    return (
        <>
            <header className={styles.header}>
                <div className={styles.container}>
                    Header

                    <form onSubmit={handleSearch}>
                        <div>
                            <div className={styles.search}>
                                <input
                                    type="search"
                                    id='location-search"'
                                    className=""
                                    placeholder="Search..."
                                    required=""
                                />
                                <button
                                    type="submit"
                                    className=""
                                >
                                    <svg
                                        aria-hidden="true"
                                        className=""
                                        fill="none"
                                        stroke="currentColor"
                                        viewBox="0 0 24 24"
                                        xmlns="http://www.w3.org/2000/svg"
                                    >
                                        <path
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            strokeWidth="2"
                                            d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                                        ></path>
                                    </svg>
                                   
                                </button>
                            </div>
                        </div>
                    </form>

                </div>
            </header>
        </>
    );
}
export default Header