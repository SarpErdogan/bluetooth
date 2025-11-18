// src/screens/HomeScreen.tsx

import React from 'react';
import { View, Button } from 'react-native';
import { NavigationProp } from '@react-navigation/native';

interface Props {
  navigation: NavigationProp<any>;
}

const HomeScreen: React.FC<Props> = ({ navigation }) => (
  <View style={{ flex: 1, justifyContent: 'center', padding: 20 }}>
    <Button
      title="Cihazlara Bağlan"
      onPress={() => navigation.navigate('DeviceList')}
    />
  </View>
);

export default HomeScreen;
