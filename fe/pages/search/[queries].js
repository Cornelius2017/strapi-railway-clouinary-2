import client from "apollo-client";
import { gql } from "@apollo/client";

import { GET_ALL_TAGS, GET_ALL_TAGS_SLUG } from "@/graphql/queries";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";

import Link from "next/link";
import Card from "@/components/Card";
import CardSkeleton from "@/components/CardSkeleton";

import styles from "@/styles/Home.module.sass";

export default function SearchResults() {
  const router = useRouter();
  const  { queries } = router.query;
  const [searchResults, setSearchResults] = useState(null);

  useEffect(() => {
    const getSearchResults = async () => {
      const search = client.query({
        query: gql`
          query {
            news(sort: "publishedAt:desc"
                filters: { content: { containsi: "${queries}" } }) {
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
      
      console.log('search: ', search.then(function(data){
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
        <Card post={post} key={post.attributes.slug} />
      ));
    } else {
      return (
        <h4 className="font-mono text-black text-lg sm:col-span-2 lg:col-span-3 text-center">
          No results
        </h4>
      );
    }
  };

  return (
    <section className="my-8 mx-4">
      <h2 className="font-mono text-black text-xl md:text-4xl text-center mb-8">
        Search results for: &quot;  
        { queries }
        &quot;
      </h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 ">
        {searchResults ? (
          preparePostPreviews()
        ) : (
          <>
            <CardSkeleton />
            <CardSkeleton />
            <CardSkeleton />
          </>
        )}
      </div>
    </section>
  );
}