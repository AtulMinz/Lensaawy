import { ApolloClient, InMemoryCache } from "@apollo/client";

const APIURL = "https://api-v2-amoy.lens.dev/";

export const apolloClient = new ApolloClient({
  uri: process.env.LENS_API_URL || APIURL,
  cache: new InMemoryCache(),
});
