import React from 'react';
import Providers from './Providers';
import ToggleThemeProvider from './ToggleThemeProvider';

const AppProvider: React.FC = ({ children }) => {
  return (
    <ToggleThemeProvider>
      <Providers>{children}</Providers>
    </ToggleThemeProvider>
  );
};

export default AppProvider;
