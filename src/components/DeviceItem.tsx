// src/components/DeviceItem.tsx

import React from 'react';
import { TouchableOpacity, Text } from 'react-native';
import { BluetoothDevice } from 'react-native-bluetooth-classic';

interface Props {
  device: BluetoothDevice;
  onPress: (device: BluetoothDevice) => void;
}

const DeviceItem: React.FC<Props> = ({ device, onPress }) => (
  <TouchableOpacity
    onPress={() => onPress(device)}
    style={{
      padding: 14,
      backgroundColor: '#eee',
      borderRadius: 8,
      marginBottom: 8,
    }}
  >
    <Text style={{ fontWeight: 'bold' }}>{device.name}</Text>
    <Text style={{ fontSize: 12 }}>{device.address}</Text>
  </TouchableOpacity>
);

export default DeviceItem;
