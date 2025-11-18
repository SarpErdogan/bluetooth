import React, { useEffect } from 'react';
import { View, Button, FlatList, Text } from 'react-native';
import { useBluetoothStore } from '../src/bluetooth/bluetooth';
import { useNavigation } from '@react-navigation/native';
import type { StackNavigationProp } from '@react-navigation/stack';
import type { RootStackParamList } from '../App';

type NavProp = StackNavigationProp<RootStackParamList, 'DeviceList'>;

const DeviceListScreen = () => {
  const navigation = useNavigation<NavProp>();
  const devices = useBluetoothStore((s) => s.devices);
  const listDevices = useBluetoothStore((s) => s.listDevices);
  const connectDevice = useBluetoothStore((s) => s.connectDevice);

  useEffect(() => {
    listDevices();
  }, []);

  const handleConnect = async (device: any) => {
    await connectDevice(device);
    navigation.goBack();
  };

  return (
    <View style={{ flex: 1, padding: 20 }}>
      <FlatList
        data={devices}
        keyExtractor={(item) => item.address}
        renderItem={({ item }) => (
          <Button
            title={item.name || item.address}
            onPress={() => handleConnect(item)}
          />
        )}
        ListEmptyComponent={<Text>Cihaz bulunamadı</Text>}
      />
    </View>
  );
};

export default DeviceListScreen;
