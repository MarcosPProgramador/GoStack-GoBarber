import React from 'react';
import { Button, View } from 'react-native';
import useAuth from '../../hooks/useAuth';

const Dashboard: React.FC = () => {
  const { signOut } = useAuth();

  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <Button title="Sair" onPress={signOut}>
        Sair
      </Button>
    </View>
  );
};

export default Dashboard;
