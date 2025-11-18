// src/screens/ChatScreen.tsx

import React, { useEffect, useState } from 'react';
import { View, TextInput, Button, Text, FlatList } from 'react-native';
import { BluetoothDevice } from 'react-native-bluetooth-classic';
import { sendMessage, listenMessages } from '../bluetooth/bluetooth';

interface Props {
  route: any;
}

const ChatScreen: React.FC<Props> = ({ route }) => {
  const device: BluetoothDevice = route.params.device;

  const [input, setInput] = useState('');
  const [messages, setMessages] = useState<string[]>([]);

  useEffect(() => {
    const stop = listenMessages(device, (msg) =>
      setMessages((prev) => [...prev, 'Arduino: ' + msg]),
    );
    return stop;
  }, []);

  const handleSend = async () => {
    await sendMessage(device, input);
    setMessages((prev) => [...prev, 'Ben: ' + input]);
    setInput('');
  };

  return (
    <View style={{ flex: 1, padding: 20 }}>
      <Text style={{ fontWeight: 'bold', fontSize: 18 }}>
        Bağlı: {device.name}
      </Text>

      <FlatList
        data={messages}
        style={{ flex: 1, marginVertical: 15 }}
        renderItem={({ item }) => <Text>{item}</Text>}
      />

      <TextInput
        value={input}
        onChangeText={setInput}
        placeholder="Mesaj yaz"
        style={{
          borderWidth: 1,
          padding: 10,
          borderRadius: 8,
          marginBottom: 10,
        }}
      />

      <Button title="Gönder" onPress={handleSend} />
    </View>
  );
};

export default ChatScreen;
