import {
  ApolloClient,
  InMemoryCache,
  createHttpLink,
  type NormalizedCacheObject,
} from '@apollo/client';
import merge from 'deepmerge';
import isEqual from 'lodash-es/isEqual';
import { setContext } from '@apollo/client/link/context';
import { getCookie } from 'cookies-next';
const API = 'http://localhost/backend/graphql';
import { createUploadLink } from 'apollo-upload-client';
export const httpLink = createHttpLink({
  uri: API,
});

const authLink = setContext((_, { headers }) => {
  // get the authentication token from local storage if it exists
  let token = getCookie('userRefreshToken');

  // return the headers to the context so httpLink can read them
  return {
    headers: {
      ...headers,
      authorization: token ? `Bearer ${token}` : '',
    },
  };
});

export const APOLLO_STATE_PROP_NAME = '__APOLLO_STATE__';

let apolloClient: ApolloClient<NormalizedCacheObject> | null;

function createApolloClient() {
  return new ApolloClient({
    connectToDevTools: process.browser,
    credentials: 'include',
    ssrMode: true,
    uri: API,
    cache: new InMemoryCache({
      addTypename: false,
    }),
    link: authLink.concat(httpLink),
  });
}

export function initializeApollo(initialState?: any) {
  const _apolloClient = apolloClient ?? createApolloClient();

  if (initialState) {
    const existingCache = _apolloClient.cache.extract();

    const data = merge(initialState, existingCache, {
      arrayMerge: (destinationArray, sourceArray) => [
        ...sourceArray,
        ...destinationArray.filter((d) =>
          sourceArray.every((s) => !isEqual(d, s))
        ),
      ],
    });
    _apolloClient.cache.restore(data);
  }

  if (typeof window === 'undefined') {
    return _apolloClient;
  }

  if (!apolloClient) {
    apolloClient = _apolloClient;
  }

  return _apolloClient;
}

export function addApolloState(
  client: ApolloClient<NormalizedCacheObject>,
  pageProps: any
) {
  client.link = authLink.concat(httpLink);
  if (pageProps?.props) {
    pageProps.props[APOLLO_STATE_PROP_NAME] = client.cache.extract();
  }

  return pageProps;
}
