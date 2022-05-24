import { ApolloClient, InMemoryCache } from "@apollo/client";

const client = new ApolloClient({
  uri: "https://api.thegraph.com/subgraphs/name/sarahschwartz/web3-rsvp-mumbai",
  cache: new InMemoryCache(),
});

export default client;
