import React from 'react';
import { ThemeProvider } from 'styled-components';
import { useToggleTheme } from '../hooks/useTheme';
import AuthProvider from './AuthProvider';
import ToastProvider from './ToastProvider';

const Providers: React.FC = ({ children }) => {
  const { theme } = useToggleTheme();
  return (
    <ThemeProvider theme={theme}>
      <AuthProvider>
        <ToastProvider>{children}</ToastProvider>
      </AuthProvider>
    </ThemeProvider>
  );
};

export default Providers;
