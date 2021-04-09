import React, { useContext } from 'react'
import { BrowserRouter, Route, Switch } from 'react-router-dom'
import { ThemeProvider } from 'styled-components'
import { ToggleThemeContext } from '../contexts/ToggleThemeProvider'
import Home from '../pages/Home'
import SignIn from '../pages/SignIn'
import GlobalStyle from '../styles/globalStyle'

const Routes = () => {
  const { theme } = useContext(ToggleThemeContext)
  return (
    <ThemeProvider theme={theme}>
      <GlobalStyle />
      <BrowserRouter>
        <Switch>
          <Route path={'/'} exact component={Home} />
          <Route path={'/signin'} component={SignIn} />
        </Switch>
      </BrowserRouter>
    </ThemeProvider>
  )
}

export default Routes
