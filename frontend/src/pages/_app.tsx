import type { AppProps } from 'next/app';
import { ApolloProvider } from '@apollo/client';

import useApollo from '../hooks/useApollo';
import Layout from './layouts/layout';
import '../styles/globals.css';
import { config } from '@fortawesome/fontawesome-svg-core';
import '@fortawesome/fontawesome-svg-core/styles.css';
import { createApolloClient } from '../apollo';
config.autoAddCss = false;

export default function MyApp({ Component, pageProps }: AppProps) {
  const client = createApolloClient();

  return (
    <>
      <ApolloProvider client={client}>
        <Layout>
          <Component {...pageProps} />
        </Layout>
      </ApolloProvider>
    </>
  );
}
