import client from "apollo-client";
import { gql } from "@apollo/client";

import { GET_ALL_TAGS, GET_ALL_TAGS_SLUG } from "../../graphql/queries";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";

import Link from "next/link";
import Card from "../../components/Card";
import CardSkeleton from "../../components/CardSkeleton";

import styles from "../../styles/Home.module.sass";

export default function SearchResults() {
  const router = useRouter();
  const  { queries } = router.query;
  const [searchResults, setSearchResults] = useState(null);

  useEffect(() => {
    const getSearchResults = async () => {
      const search = await client.query({
        query: gql`
          query {
            news(sort: "publishedAt:desc"
                filters: { title: { containsi: "${queries}" } }) {
              data {
                attributes {
                  title
                  slug
                }
              }
            }
          }
        `,
      });
      
      console.log('search: ', search?.then(function(data){
         console.log('data: ', data);
      }));

      return setSearchResults(search?.data?.news.data);
    
    };
    getSearchResults();
        return () => {
      setSearchResults(null);
    };
  }, [queries]);

  

  const preparePostPreviews = () => {
    if (searchResults.length > 0) {
      return searchResults.map((post) => (
        <div post={post} key={post.attributes.slug}>
          {post.attributes.title}
        </div>
      ));
    } else {
      return (
        <h4 className="">
          No results
        </h4>
      );
    }
  };

  return (
    <section className={styles.container}>
     <div className={styles.inner}>
     <h2 className="">
        Search results for: &quot;  
        { queries }
        &quot;
      </h2>
      <div className="">
        {searchResults ? (
          preparePostPreviews()
        ) : (
          <div className={styles.card_skeleton__wrap}>
            <CardSkeleton />
            <CardSkeleton />
            <CardSkeleton />
          </div>
        )}
      </div>
     </div>
    </section>
  );
}