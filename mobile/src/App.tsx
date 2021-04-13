import React from 'react';
import { StatusBar, View } from 'react-native';
import 'react-native-gesture-handler';
import AppRoutes from './routes/app.routes';


const App: React.FC = () => {
  return (
    <>
      <StatusBar translucent barStyle={'light-content'} />
      <View style={{ flex: 1, backgroundColor: '#312e38' }}>
        <AppRoutes />
      </View>
    </>
  );
}

export default App;