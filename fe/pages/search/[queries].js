import client from "apollo-client";
import { gql } from "@apollo/client";

import { useRouter } from "next/router";
import { useEffect, useState } from "react";

import Link from "next/link";

import styles from "../../styles/Home.module.sass";

import { QueryClientProvider, QueryClient } from "react-query";

const queryClient = new QueryClient()

export async function getSearchResults(){
  const search = await client.query({
    query: gql`
      query {
        news(sort: "publishedAt:desc") {
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
  
  console.log('search: ', search);

  return search;

};

getSearchResults();


export default function SearchResults() {
  const router = useRouter();
  const  { queries } = router.query;
  const [searchResults, setSearchResults] = useState(null);

 

  return (
    <QueryClientProvider client={queryClient}>
    <section className={styles.container}>
     <div className={styles.inner}>
     <h2 className="">
        Search results for: &quot;  
        { queries }
        &quot;
      </h2>
      
     </div>
    </section>
    </QueryClientProvider>
   
  );
}