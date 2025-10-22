import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import HomeScreen from './screens/HomeScreen';
import DeviceListScreen from './screens/DeviceListScreen';

export type RootStackParamList = {
  Home: undefined;
  DeviceList: undefined;
};

const Stack = createStackNavigator<RootStackParamList>();

const App = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Home">
        <Stack.Screen name="Home" component={HomeScreen} options={{ title: 'Bluetooth Kontrol' }} />
        <Stack.Screen name="DeviceList" component={DeviceListScreen} options={{ title: 'Cihaz Listesi' }} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;
