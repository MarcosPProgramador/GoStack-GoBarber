import React, { createContext, Dispatch, SetStateAction } from 'react'
import { DefaultTheme } from 'styled-components'
import usePersistedState from '../hooks/usePersistedState'
import dark from '../themes/dark'

interface IToggleThemeContext<T = any> {
  theme: T
  setTheme: Dispatch<SetStateAction<T>>
}

export const ToggleThemeContext = createContext<IToggleThemeContext<DefaultTheme>>({} as IToggleThemeContext)
const ToggleThemeProvider: React.FC = ({ children }): JSX.Element => {
  const [theme, setTheme] = usePersistedState('theme', dark)
  return (
    <ToggleThemeContext.Provider value={{ theme, setTheme }}>
      {children}
    </ToggleThemeContext.Provider>
  )
}

export default ToggleThemeProvider
