import { ApolloClient, InMemoryCache, HttpLink } from "@apollo/client";

const client = new ApolloClient({
  link: new HttpLink({
    uri: "https://rickandmortyapi.com/graphql",
  }),
  cache: new InMemoryCache({
    typePolicies: {
      Query: {
        fields: {
          characters: {
            keyArgs: false,

            merge(existing = { results: [], info: null }, incoming) {
              if (!incoming?.results) return existing; 
              return {
                info: incoming.info,
                results: [...(existing.results || []), ...incoming.results],
              };
            },
          },
        },
      },
    },
  }),
});

export default client;