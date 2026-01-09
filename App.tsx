import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  Button,
  Alert,
  StyleSheet,
} from 'react-native';

import BluetoothClassic from 'react-native-bluetooth-classic';

export default function App() {
  const [device, setDevice] = useState<any>(null);
  const [text, setText] = useState('');

  // 📌 Daha önce eşleştirilmiş cihaza bağlan
  const connect = async () => {
    try {
      const bonded = await BluetoothClassic.getBondedDevices();

      // Raspberry Pi adını birebir yaz
      const pi = bonded.find(d => d.name === 'raspberrypi');

      if (!pi) {
        Alert.alert('Hata', 'Raspberry Pi bulunamadı');
        return;
      }

      const connected = await pi.connect();
      setDevice(pi);

      Alert.alert('Bağlandı', 'Raspberry Pi ile bağlantı kuruldu');
    } catch (e) {
      Alert.alert('Bağlantı hatası', String(e));
    }
  };

  // 📤 Metni gönder
  const sendText = async () => {
    if (!device) {
      Alert.alert('Hata', 'Önce bağlan');
      return;
    }

    try {
      await device.write(text + '\n'); // 🔴 satır sonu önemli
      setText('');
    } catch (e) {
      Alert.alert('Gönderme hatası', String(e));
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Bluetooth Test</Text>

      <Button title="Cihaza Bağlan" onPress={connect} />

      <TextInput
        style={styles.input}
        placeholder="Gönderilecek metin"
        value={text}
        onChangeText={setText}
      />

      <Button title="Gönder" onPress={sendText} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 24,
    justifyContent: 'center',
  },
  title: {
    fontSize: 22,
    textAlign: 'center',
    marginBottom: 20,
  },
  input: {
    borderWidth: 1,
    padding: 10,
    marginVertical: 20,
  },
});
