import React from 'react'
import { BrowserRouter, Switch } from 'react-router-dom'
import Dashboard from '../pages/Dashboard'
import SignIn from '../pages/SignIn'
import SignUp from '../pages/SignUp'
import Route from './redirect.routes'

const Routes = () => {
  return (
    <>
      <BrowserRouter>
        <Switch>
          <Route path={'/'} exact component={SignIn} />
          <Route path={'/signup'} component={SignUp} />
          <Route path={'/dashboard'} component={Dashboard} isPrivate />
        </Switch>
      </BrowserRouter>
    </>
  )
}

export default Routes
