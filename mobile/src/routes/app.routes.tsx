import { NavigationContainer } from '@react-navigation/native'
import { createStackNavigator } from '@react-navigation/stack'
import React from 'react'
import SignIn from '../pages/SignIn'
import SignUp from '../pages/SignUp'

const Stack = createStackNavigator()

const AppRoutes: React.FC = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{
        headerShown: false,
        cardStyle: { backgroundColor: '#312e38' }
      }} initialRouteName="SignUp">
        <Stack.Screen name="SignIn" component={SignIn} />
        <Stack.Screen name="SignUp" component={SignUp} />
      </Stack.Navigator>
    </NavigationContainer>

  )
}

export default AppRoutes