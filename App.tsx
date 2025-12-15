import React, { useState } from "react";
import {
  View,
  Text,
  Button,
  TextInput,
  StyleSheet,
} from "react-native";
import { useBluetoothStore } from "./src/bluetoothStore";

const App: React.FC = () => {
  const { connected, connectToPi, sendMessage } = useBluetoothStore();
  const [text, setText] = useState<string>("");

  const handleConnect = async () => {
    try {
      await connectToPi();
    } catch (err: any) {
      alert(err.message);
    }
  };

  const handleSend = async () => {
    try {
      await sendMessage(text);
      setText("");
    } catch (err: any) {
      alert(err.message);
    }
  };

  return (
    <View style={styles.container}>
      <Button title="Raspberry Pi'ye Bağlan" onPress={handleConnect} />

      <Text style={styles.status}>
        Durum: {connected ? "Bağlı" : "Bağlı değil"}
      </Text>

      <TextInput
        value={text}
        onChangeText={setText}
        placeholder="Gönderilecek mesaj"
        style={styles.input}
      />

      <Button
        title="Mesaj Gönder"
        onPress={handleSend}
        disabled={!connected || !text}
      />
    </View>
  );
};

export default App;

const styles = StyleSheet.create({
  container: {
    padding: 20,
    marginTop: 50,
  },
  status: {
    marginVertical: 15,
    fontSize: 16,
  },
  input: {
    borderWidth: 1,
    borderColor: "#333",
    padding: 10,
    marginBottom: 10,
  },
});
