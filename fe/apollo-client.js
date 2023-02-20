import { ApolloClient, InMemoryCache } from "@apollo/client";

const client = new ApolloClient({
    uri: "https://strapi-production-3c24.up.railway.app/graphql",
    cache: new InMemoryCache(),
});

export default client;
