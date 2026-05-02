import React, { useState, useRef } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Alert,
} from "react-native";
import TcpSocket from "react-native-tcp-socket";

export default function App() {
  const socketRef = useRef<any>(null);

  const ip:any= "192.168.4.1";
  const port:any = "5000";
  const [status, setStatus] = useState("Bağlı değil");

  const connect = () => {
    if (socketRef.current) {
      socketRef.current.destroy();
      socketRef.current = null;
    }

    const client = TcpSocket.createConnection(
      {
        host: ip,
        port: parseInt(port),
      },
      () => {
        setStatus("Bağlandı");
        console.log("Bağlandı");
      }
    );

    client.on("data", (data) => {
      console.log("Server:", data.toString());
    });

    client.on("error", (err) => {
      console.log("Hata:", err);
      setStatus("Hata");
      Alert.alert("Bağlantı Hatası", err.message);
    });

    client.on("close", () => {
      Alert.alert("Bağlantı kapandı");
      setStatus("Kapalı");
    });

    socketRef.current = client;
  };

  const send = (msg: string) => {
    if (!socketRef.current) {
      Alert.alert("Hata", "Önce bağlan");
      return;
    }

    socketRef.current.write(msg + "\n");
  };

  const sendTime = () => {
    const now = new Date();

    const formatted =
      now.getFullYear() +
      "-" +
      String(now.getMonth() + 1).padStart(2, "0") +
      "-" +
      String(now.getDate()).padStart(2, "0") +
      " " +
      String(now.getHours()).padStart(2, "0") +
      ":" +
      String(now.getMinutes()).padStart(2, "0") +
      ":" +
      String(now.getSeconds()).padStart(2, "0");

    send("SET_TIME:" + formatted);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Raspberry Pi Kontrol</Text>

      <Text style={styles.status}>Durum: {status}</Text>

      <TextInput
        style={styles.input}
        value={ip}
        placeholder="IP (örn: 192.168.4.1)"
      />

      <TextInput
        style={styles.input}
        value={port}
        placeholder="Port (örn: 5000)"
        keyboardType="numeric"
      />

      <TouchableOpacity style={styles.button} onPress={connect}>
        <Text style={styles.buttonText}>Bağlan</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.button} onPress={() => send("basla")}>
        <Text style={styles.buttonText}>Kamerayı Başlat</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.button} onPress={() => send("dur")}>
        <Text style={styles.buttonText}>Kamerayı Durdur</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.button} onPress={sendTime}>
        <Text style={styles.buttonText}>Saati Gönder</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    padding: 20,
    gap: 12,
    backgroundColor: "#111",
  },
  title: {
    fontSize: 22,
    fontWeight: "bold",
    color: "white",
    marginBottom: 10,
  },
  status: {
    color: "#aaa",
    marginBottom: 10,
  },
  input: {
    borderWidth: 1,
    borderColor: "#444",
    padding: 10,
    borderRadius: 8,
    color: "white",
  },
  button: {
    backgroundColor: "#2f80ed",
    padding: 12,
    borderRadius: 10,
    alignItems: "center",
  },
  buttonText: {
    color: "white",
    fontWeight: "bold",
  },
});