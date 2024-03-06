import { Pressable, StyleSheet, ToastAndroid, View } from "react-native";
import { useContext, useEffect, useState } from "react";
import {
  ConnectionStatusContext,
  TryUntilConnectContext,
} from "@/context/WebsocketProvider";
import { connectionStatusT } from "@/typings/websocket";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { WhiteText, WhiteTextInput } from "@/components/Styled";
import LinearGradientView from "@/components/linearGradientWrapper/LinearGradientWrapper";

export default function Settings() {
  const safeArea = useSafeAreaInsets();
  const connectionStatus = useContext(ConnectionStatusContext);
  const tryUntilConnect = useContext(TryUntilConnectContext);
  const [ip, setIp] = useState("");
  const [port, setPort] = useState("7171");

  const getTitle = (connectionStatus: connectionStatusT) => {
    switch (connectionStatus.status) {
      case "error":
        return "Error Occurred";
      case "loading":
        return "Connecting...";
      case "connected":
        return "Connected";
      case "closed":
        return "Connection Closed";
      case "notSet":
        return "Not Connected";
    }
  };

  const handlePress = () => {
    if (ip.trim().length === 0) {
      ToastAndroid.show("please fill ip", 500);
      return;
    }
    if (port.trim().length === 0) {
      ToastAndroid.show("please fill port", 500);
      return;
    }

    tryUntilConnect(ip.trim(), port.trim());
  };

  useEffect(() => {
    if (
      connectionStatus.status === "connected" &&
      ip.trim() !== connectionStatus.ip
    ) {
      setIp(connectionStatus.ip);
    }
  }, [connectionStatus]);

  return (
    <View style={[{ paddingTop: safeArea.top }, styles.container]}>
      <WhiteText style={styles.title}>
        Status: {getTitle(connectionStatus)}
      </WhiteText>
      {connectionStatus.status === "error" ? (
        <WhiteText style={styles.title}>
          {connectionStatus.error_message}
        </WhiteText>
      ) : (
        <></>
      )}
      <View style={styles.inputs}>
        <WhiteTextInput
          value={ip}
          onChangeText={(e) => setIp(e)}
          style={[styles.ip, styles.input]}
          placeholder="192.168.1.1"
        ></WhiteTextInput>
        <WhiteText style={styles.colon}>:</WhiteText>
        <WhiteTextInput
          value={port}
          onChangeText={(e) => setPort(e)}
          style={[styles.port, styles.input]}
          placeholder="7171"
        ></WhiteTextInput>
      </View>
      <Pressable onPress={handlePress}>
        <LinearGradientView style={styles.button}>
          <WhiteText>CONNECT</WhiteText>
        </LinearGradientView>
      </Pressable>

      <WhiteText style={[styles.bigTitle]}>How to Connect?</WhiteText>
      <View>
        <WhiteText>
          1. Connect to same local network with your windows pc
        </WhiteText>
        <WhiteText>2. Start the windows app</WhiteText>
        <WhiteText>
          3. Open settings by right clicking to the tray icon
        </WhiteText>
        <WhiteText>4. See bottom right corner for address</WhiteText>
        <WhiteText>5. Write that above and click connect</WhiteText>
      </View>
      <WhiteText style={[styles.smallTitle]}>That's it!</WhiteText>
      <WhiteText>
        On the next sessions, app will automatically connect
      </WhiteText>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "black",
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
  },
  inputs: {
    flexDirection: "row",
    paddingHorizontal: 30,
    paddingVertical: 10,
    fontSize: 30,
    gap: 5,
  },
  colon: { fontSize: 30 },
  input: {
    fontSize: 30,
    borderRadius: 5,
    padding: 5,
    borderColor: "gray",
    borderWidth: 1,
    borderStyle: "solid",
  },
  ip: {
    flex: 8,
  },
  port: {
    flex: 4,
  },
  button: {
    paddingHorizontal: 40,
    paddingVertical: 15,
    color: "white",
    borderRadius: 5,
  },
  bigTitle: {
    fontSize: 18,
    fontWeight: "bold",
    marginTop: 40,
    marginBottom: 10,
  },
  smallTitle: {
    fontSize: 17,
    marginTop: 20,
  },
});
