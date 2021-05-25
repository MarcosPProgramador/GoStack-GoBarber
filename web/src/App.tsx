import React from 'react';
import AppProvider from './contexts';
import Routes from './routes/app.routes';
import GlobalStyle from './styles/globalStyle';

const App: React.FC = () => {
  return (
    <AppProvider>
      <GlobalStyle />
      <Routes />
    </AppProvider>
  );
};

export default App;
