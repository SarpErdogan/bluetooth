import { create } from 'zustand';
import RNBluetoothClassic, { BluetoothDevice } from 'react-native-bluetooth-classic';

interface BluetoothState {
  devices: BluetoothDevice[];
  connectedDevice: BluetoothDevice | null;
  received: string[];
  setDevices: (d: BluetoothDevice[]) => void;
  setConnectedDevice: (d: BluetoothDevice | null) => void;
  addReceived: (msg: string) => void;
  listDevices: () => Promise<void>;
  connectDevice: (device: BluetoothDevice) => Promise<void>;
  sendMessage: (msg: string) => Promise<void>;
}

export const useBluetoothStore = create<BluetoothState>((set, get) => ({
  devices: [],
  connectedDevice: null,
  received: [],

  setDevices: (d) => set({ devices: d }),
  setConnectedDevice: (d) => set({ connectedDevice: d }),
  addReceived: (msg) => set({ received: [...get().received, msg] }),

  listDevices: async () => {
    try {
      const paired = await RNBluetoothClassic.getBondedDevices();
      set({ devices: paired });
    } catch (err) {
      console.log('Cihazları listeleme hatası:', err);
    }
  },

  connectDevice: async (device) => {
    try {
      const connection = await RNBluetoothClassic.connectToDevice(device.address);
      set({ connectedDevice: connection });

      connection.onDataReceived((data) => {
        get().addReceived(data.data);
      });
    } catch (err) {
      console.log('Bağlantı hatası:', err);
    }
  },

  sendMessage: async (msg) => {
    const device = get().connectedDevice;
    if (!device) return;
    try {
      await device.write(msg + '\n');
    } catch (err) {
      console.log('Gönderme hatası:', err);
    }
  },
}));
