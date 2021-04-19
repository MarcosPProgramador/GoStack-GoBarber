import React from 'react';
import { ActivityIndicator, View } from 'react-native';

const Loading: React.FC = () => {
  return (
    <View
      style={{ flex: 1, alignItems: 'center', justifyContent: 'center', backgroundColor: '#fff' }}>
      <ActivityIndicator size="large" color="#999" />
    </View>
  );
};
export default Loading;
