import { useContext } from 'react';
import { DefaultTheme, ThemeContext } from 'styled-components';
import {
  IToggleThemeContext,
  ToggleThemeContext,
} from '../contexts/ToggleThemeProvider';

function useTheme(): DefaultTheme {
  const context = useContext(ThemeContext);

  if (!context) throw new Error('useTheme must be used within a ThemeProvider');

  return context;
}

function useToggleTheme(): IToggleThemeContext<DefaultTheme> {
  const context = useContext(ToggleThemeContext);

  if (!context)
    throw new Error('useToggleTheme must be used within a ToggleThemeProvider');

  return context;
}

export { useTheme, useToggleTheme };
