// src/bluetooth/bluetooth.ts

import RNBluetoothClassic, {
  BluetoothDevice,
} from 'react-native-bluetooth-classic';

export const requestBluetoothPermissions = async () => {
  await RNBluetoothClassic.requestBluetoothConnectPermission();
  await RNBluetoothClassic.requestBluetoothScanPermission();
};

export const getPairedDevices = async () => {
  return await RNBluetoothClassic.getBondedDevices();
};

export const connectToDevice = async (device: BluetoothDevice) => {
  return await device.connect({ delimiter: '\n' });
};

export const sendMessage = async (device: BluetoothDevice, msg: string) => {
  await device.write(msg + '\n');
};

export const listenMessages = (
  device: BluetoothDevice,
  callback: (msg: string) => void
) => {
  const sub = device.onDataReceived((data) => callback(data.data));
  return () => sub.remove();
};
