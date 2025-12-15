import { create } from "zustand";
import RNBluetoothClassic, {
  BluetoothDevice,
} from "react-native-bluetooth-classic";

interface BluetoothState {
  device: BluetoothDevice | null;
  connected: boolean;

  findPairedPi: () => Promise<BluetoothDevice | undefined>;
  connectToPi: () => Promise<void>;
  sendMessage: (message: string) => Promise<void>;
}

export const useBluetoothStore = create<BluetoothState>((set, get) => ({
  device: null,
  connected: false,

  findPairedPi: async () => {
    const paired = await RNBluetoothClassic.getBondedDevices();

    return paired.find(
      (d: BluetoothDevice) =>
        d.name === "raspberrypi" || d.name?.startsWith("RPi")
    );
  },

  connectToPi: async () => {
    const pi = await get().findPairedPi();

    if (!pi) {
      throw new Error("Eşleştirilmiş Raspberry Pi bulunamadı");
    }

    const connected = await pi.connect();
    if (!connected) {
      throw new Error("Raspberry Pi bağlantısı başarısız");
    }

    set({ device: pi, connected: true });
  },

  sendMessage: async (message: string) => {
    const { device, connected } = get();

    if (!device || !connected) {
      throw new Error("Raspberry Pi bağlı değil");
    }

    await device.write(`${message}\n`);
  },
}));
