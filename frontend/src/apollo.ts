import { ApolloClient, createHttpLink, InMemoryCache } from '@apollo/client';
import { setContext } from '@apollo/client/link/context';

const httpLink = createHttpLink({
    uri: `http://localhost:3535/graphql/query${localStorage.getItem('csrf') ? '?csrf=' + localStorage.getItem('csrf') : ''}`
});
  
  
const authLink = setContext((_, { headers }) => {
    // get the authentication token from local storage if it exists
    const token = localStorage.getItem('jwt');
    if (token) {
        return {
            headers: {
                ...headers,
                authorization: token
            }
        };
    }
    return headers;
});
  

const client = new ApolloClient({
    link: authLink.concat(httpLink),
    cache: new InMemoryCache()
});

export default client;