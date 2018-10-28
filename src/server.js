import React from 'react'
import { SheetsRegistry } from 'react-jss/lib/jss'
import JssProvider from 'react-jss/lib/JssProvider'
import { MuiThemeProvider, createGenerateClassName } from '@material-ui/core/styles'
import express from 'express'
import reload from 'reload' // for hot-reloading in DEV
import theme from './theme'
import { renderRoutes } from 'react-router-config'
import Routes from './routes'

import { ApolloProvider, renderToStringWithData } from 'react-apollo'
import { ApolloClient } from 'apollo-client'
import 'isomorphic-unfetch' // polyfill for fix node global fetch bug
import { createHttpLink } from 'apollo-link-http'
import { StaticRouter } from 'react-router'
import { InMemoryCache } from 'apollo-cache-inmemory'

const app = express()
const dev = process.env.NODE_ENV === 'development'

app.use(express.static('public'))

if (dev) { // enable hot-reloading id DEV
  reload(app)
}

app.use((req, res) => {

  const client = new ApolloClient({
    ssrMode: true,
    link: createHttpLink({
      uri: 'YOUR_GRAPHQL_LINK'
    }),
    cache: new InMemoryCache()
  })

  const context = {} // this object for router will contain result of the render after rendering

  const sheetsRegistry = new SheetsRegistry() 

  const generateClassName = createGenerateClassName()

  const sheetsManager = new Map()

  renderToStringWithData( // apollo render to string current route with data from graphql
    <ApolloProvider client={client}>
      <StaticRouter location={req.url} context={context}>
        <JssProvider registry={sheetsRegistry} generateClassName={generateClassName}>
          <MuiThemeProvider theme={theme} sheetsManager={sheetsManager}>
            {renderRoutes(Routes)}
          </MuiThemeProvider>
        </JssProvider>
      </StaticRouter>
    </ApolloProvider>
  )
  .then(html => {
    const css = sheetsRegistry.toString() // after render we have completly css string
    res.status(200)
    res.send(`
      <!DOCTYPE html>
      <html lang='en'>
        <head>
          <meta charset='utf-8'>
          <meta name='viewport' content='width=device-width, initial-scale=1, shrink-to-fit=no'>
          <title>React App</title>
          <style id='jss-styles'>${css}</style>
        </head>
        <body>
          <div id='root'>${html}</div>
          <script>
            window.__APOLLO_STATE__=${JSON.stringify(client.cache.extract())}
          </script>
          <script src='main.js' async></script>
          ${dev ? `<script src='/reload/reload.js' async></script>` : ''}
        </body>
      </html>
    `)
    res.end()
  })
})

app.listen(3000, () => console.log('http://localhost:3000'))
