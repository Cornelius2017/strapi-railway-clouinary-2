import { useRouter } from "next/router";
import styles from "../../styles/Home.module.sass";


export default function GoBack(){
    const router = useRouter();
    return (
        <button
          onClick={() => router.back()}
          className={styles.single_page__btn_back}
        >
          Назад
        </button>
    );
}