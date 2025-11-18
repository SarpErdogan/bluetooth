// src/screens/DeviceListScreen.tsx

import React, { useEffect, useState } from 'react';
import { View, Text, FlatList } from 'react-native';
import DeviceItem from '../components/DeviceItem';
import {
  requestBluetoothPermissions,
  getPairedDevices,
  connectToDevice,
} from '../bluetooth/bluetooth';
import { NavigationProp } from '@react-navigation/native';
import { BluetoothDevice } from 'react-native-bluetooth-classic';

interface Props {
  navigation: NavigationProp<any>;
}

const DeviceListScreen: React.FC<Props> = ({ navigation }) => {
  const [devices, setDevices] = useState<BluetoothDevice[]>([]);

  useEffect(() => {
    const load = async () => {
      await requestBluetoothPermissions();
      const paired = await getPairedDevices();
      setDevices(paired);
    };
    load();
  }, []);

  const handleSelect = async (device: BluetoothDevice) => {
    const connected = await connectToDevice(device);
    navigation.navigate('Chat', { device: connected });
  };

  return (
    <View style={{ padding: 20 }}>
      <Text style={{ fontWeight: 'bold', fontSize: 18, marginBottom: 10 }}>
        Eşleştirilmiş Cihazlar
      </Text>

      <FlatList
        data={devices}
        keyExtractor={(item) => item.address}
        renderItem={({ item }) => (
          <DeviceItem device={item} onPress={handleSelect} />
        )}
      />
    </View>
  );
};

export default DeviceListScreen;
