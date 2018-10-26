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
import { createHttpLink } from 'apollo-link-http'
import { InMemoryCache } from 'apollo-cache-inmemory'

import ggl from 'graphql-tag'

const generateClassName = createGenerateClassName()

const client = new ApolloClient({
  link: createHttpLink({
    uri: 'https://api-euwest.graphcms.com/v1/cjnojq5g23yy201ijugba5zfq/master',
  }),
  cache: new InMemoryCache(),
})

// const test = ggl`
//   {
//     posts {
//       id
//       title
//       body
//     }
//   }
// `

// client.query({
//   query: test
// }).then(res => console.log(res))

hydrate(
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
    document.getElementById('jss-styles').remove()
  }
)
