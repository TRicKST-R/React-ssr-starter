import React from 'react'
import { CssBaseline } from '@material-ui/core'
import { renderRoutes } from 'react-router-config'

const App = ({ route }) => {
  return (
    <React.Fragment>
      <CssBaseline />
        {renderRoutes(route.routes)}
      <div>footer</div>
    </React.Fragment>
  )
}

export default App