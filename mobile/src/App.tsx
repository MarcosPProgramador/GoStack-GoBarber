import 'react-native-gesture-handler';
import { useFonts } from 'expo-font';
import React from 'react';
import { StatusBar, View } from 'react-native';
import AppRoutes from './routes/app.routes';


const App: React.FC = () => {
  const [loaded] = useFonts({
    'RobotoSlab-Medium': require('../assets/fonts/RobotoSlab-Medium.ttf'),
    'RobotoSlab-Regular': require('../assets/fonts/RobotoSlab-Regular.ttf'),
  });
  if (!loaded) return null

  return (
    <>
      <StatusBar backgroundColor={'#312e38'} barStyle={'light-content'} />
      <View style={{ flex: 1, backgroundColor: '#312e38' }}>
        <AppRoutes />
      </View>
    </>
  );
}

export default App;