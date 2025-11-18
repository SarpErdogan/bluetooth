// src/bluetooth/bluetooth.ts

import { PermissionsAndroid, Platform } from 'react-native';
import RNBluetoothClassic, {
  BluetoothDevice,
} from 'react-native-bluetooth-classic';

// İzinler
export const requestBluetoothPermissions = async () => {
  if (Platform.OS !== 'android') return true;

  const granted = await PermissionsAndroid.requestMultiple([
    PermissionsAndroid.PERMISSIONS.BLUETOOTH_SCAN,
    PermissionsAndroid.PERMISSIONS.BLUETOOTH_CONNECT,
    PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
  ]);

  return (
    granted['android.permission.BLUETOOTH_SCAN'] ===
      PermissionsAndroid.RESULTS.GRANTED &&
    granted['android.permission.BLUETOOTH_CONNECT'] ===
      PermissionsAndroid.RESULTS.GRANTED &&
    granted['android.permission.ACCESS_FINE_LOCATION'] ===
      PermissionsAndroid.RESULTS.GRANTED
  );
};

// Eşleşmiş cihazlar
export const getPairedDevices = async () => {
  return await RNBluetoothClassic.getBondedDevices();
};

// Bağlanma
export const connectToDevice = async (device: BluetoothDevice) => {
  return await device.connect({ delimiter: '\n' });
};

// Mesaj gönderme
export const sendMessage = async (device: BluetoothDevice, msg: string) => {
  await device.write(msg + '\n');
};

// Mesaj dinleme
export const listenMessages = (
  device: BluetoothDevice,
  callback: (msg: string) => void
) => {
  const sub = device.onDataReceived((data) => callback(data.data));
  return () => sub.remove();
};
