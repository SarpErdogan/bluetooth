import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

import HomeScreen from './src/screens/HomeScreen';
import DeviceListScreen from './src/screens/DeviceListScreen';
import ChatScreen from './src/screens/ChatScreen';

const Stack = createStackNavigator();

const App = () => (
  <NavigationContainer>
    <Stack.Navigator screenOptions={{ headerShown: true }}>
      <Stack.Screen name="Home" component={HomeScreen} options={{ title: 'Ana Sayfa' }} />
      <Stack.Screen name="DeviceList" component={DeviceListScreen} options={{ title: 'Cihaz Seç' }} />
      <Stack.Screen name="Chat" component={ChatScreen} options={{ title: 'Terminal' }} />
    </Stack.Navigator>
  </NavigationContainer>
);

export default App;
