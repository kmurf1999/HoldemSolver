import { ApolloClient, InMemoryCache } from '@apollo/client';

const client = new ApolloClient({
    uri: 'http://localhost:3535/graphql/query',
    cache: new InMemoryCache()
});

export default client;