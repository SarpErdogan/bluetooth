import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, Button, FlatList, PermissionsAndroid, Platform } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { useBluetoothStore } from '../src/bluetooth/bluetooth';
import type { StackNavigationProp } from '@react-navigation/stack';
import type { RootStackParamList } from '../App';

type HomeScreenNavProp = StackNavigationProp<RootStackParamList, 'Home'>;

const HomeScreen = () => {
  const navigation = useNavigation<HomeScreenNavProp>();
  const [message, setMessage] = useState('');

  const connectedDevice = useBluetoothStore((s) => s.connectedDevice);
  const received = useBluetoothStore((s) => s.received);
  const sendMessage = useBluetoothStore((s) => s.sendMessage);

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
      <Button title="Cihazları Listele" onPress={() => navigation.navigate('DeviceList')} />

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

export default HomeScreen;
