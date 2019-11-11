import React from 'react'
import { Switch, Route, Redirect } from 'react-router'
import { ApiPage } from '../page'

const Routes: React.FC = () => {
  // A <Switch> looks through its children <Route>s and
  // renders the first one that matches the current URL.
  return (
    <Switch>
      <Route path="/gui/api">
        <ApiPage />
      </Route>
      <Redirect exact from="/" to="/gui/api"></Redirect>
    </Switch>
  )
}

export { Routes }
