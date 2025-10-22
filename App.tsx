import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  TextInput,
  Button,
  FlatList,
  PermissionsAndroid,
  Platform,
} from 'react-native';
import { useBluetoothStore } from './store/bluetoothStore';

const App: React.FC = () => {
  const [message, setMessage] = useState('');
  const devices = useBluetoothStore((state) => state.devices);
  const connectedDevice = useBluetoothStore((state) => state.connectedDevice);
  const received = useBluetoothStore((state) => state.received);
  const listDevices = useBluetoothStore((state) => state.listDevices);
  const connectDevice = useBluetoothStore((state) => state.connectDevice);
  const sendMessage = useBluetoothStore((state) => state.sendMessage);

  useEffect(() => {
    if (Platform.OS === 'android') requestPermissions();
  }, []);

  const requestPermissions = async () => {
    await PermissionsAndroid.requestMultiple([
      PermissionsAndroid.PERMISSIONS.BLUETOOTH_CONNECT,
      PermissionsAndroid.PERMISSIONS.BLUETOOTH_SCAN,
      PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
    ]);
  };

  const handleSend = async () => {
    await sendMessage(message);
    setMessage('');
  };

  return (
    <View style={{ flex: 1, padding: 20 }}>
      <Button title="Cihazları Listele" onPress={listDevices} />

      <FlatList
        data={devices}
        keyExtractor={(item) => item.address}
        renderItem={({ item }) => (
          <Button title={item.name || item.address} onPress={() => connectDevice(item)} />
        )}
      />

      {connectedDevice && (
        <>
          <Text style={{ marginTop: 20, fontWeight: 'bold' }}>
            Bağlı: {connectedDevice.name}
          </Text>

          <TextInput
            value={message}
            onChangeText={setMessage}
            placeholder="Mesaj yaz"
            style={{ borderWidth: 1, padding: 8, marginVertical: 10 }}
          />

          <Button title="Gönder" onPress={handleSend} />

          <Text style={{ marginTop: 20, fontWeight: 'bold' }}>Gelen Veriler:</Text>
          <FlatList
            data={received}
            keyExtractor={(_, i) => i.toString()}
            renderItem={({ item }) => <Text>{item}</Text>}
          />
        </>
      )}
    </View>
  );
};

export default App;
