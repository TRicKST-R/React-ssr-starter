import React from 'react'
import { hydrate } from 'react-dom'
import JssProvider from 'react-jss/lib/JssProvider'
import { createGenerateClassName, MuiThemeProvider } from '@material-ui/core/styles'
import theme from './theme'
import { BrowserRouter } from 'react-router-dom'
import { renderRoutes } from 'react-router-config'
import routes from './routes'
import { ApolloProvider, Query } from 'react-apollo'
import { ApolloClient } from 'apollo-client'
import { BatchHttpLink } from 'apollo-link-batch-http'
import { InMemoryCache } from 'apollo-cache-inmemory'

const generateClassName = createGenerateClassName()

const link = new BatchHttpLink({
  uri: 'YOUR_GRAPHQL_LINK',
  batchMax: 10,
  batchInterval: 10
})

const client = new ApolloClient({
  ssrMode: true,
  link,
  cache: new InMemoryCache().restore(window.__APOLLO_STATE__)
})

hydrate( // we use hydrate instead render for using server-side-rendered dom on the client-side
  <ApolloProvider client={client}>
    <JssProvider generateClassName={generateClassName}>
      <MuiThemeProvider theme={theme}>
        <BrowserRouter>
          {renderRoutes(routes)}
        </BrowserRouter>
      </MuiThemeProvider>
    </JssProvider>
  </ApolloProvider>,
  document.getElementById('root'),
  () => {
    document.getElementById('jss-styles').remove() // after client-side react rendered, we must delete server-side-rendered styles for using client dynamic styles
  }
)
