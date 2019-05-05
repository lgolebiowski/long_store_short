import React from 'react';
import App, { Container } from 'next/app';
import Page from '../components/Page';
import { ApolloProvider } from 'react-apollo';
import withData from '../lib/withData'

class customApp extends App {
  // Next build-in func crawls for the props for the ssr
  static async getInitialProps({ Component, ctx}) {
    debugger;
    let pageProps = {};
    if (Component.getInitialProps) {
      pageProps = await Component.getInitialProps(ctx);
    }
    console.log(ctx);
    pageProps.query = ctx.query;
    return { pageProps };
  }

  render() {
    const { Component, apollo, pageProps } = this.props;
    return (
      <div>
        <Container>
          <ApolloProvider client={apollo}>
            <Page>
              <Component {...pageProps}/>
            </Page>
          </ApolloProvider>
        </Container>
      </div>
    );
  }
}

export default withData(customApp);