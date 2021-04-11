import React from 'react';
import AppProvider from './contexts';
import Routes from './routes/app.routes';

const App = () => {
  return (

    <AppProvider>
      <Routes />
    </AppProvider>

  );
}

export default App
