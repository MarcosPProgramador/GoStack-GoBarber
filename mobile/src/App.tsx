import 'react-native-gesture-handler';
import React from 'react';
import { StatusBar, View } from 'react-native';
import AppRoutes from './routes/app.routes';
import useFonts from './hooks/useFonts';

const App: React.FC = () => {
  const { loaded, loading: Loading } = useFonts();

  if (!loaded) return <Loading />;

  return (
    <>
      <StatusBar backgroundColor="#312e38" barStyle="light-content" />
      <View style={{ flex: 1, backgroundColor: '#312e38' }}>
        <AppRoutes />
      </View>
    </>
  );
};

export default App;
