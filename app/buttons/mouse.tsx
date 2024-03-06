import {
  GestureResponderEvent,
  StyleSheet,
  ToastAndroid,
  View,
  Text,
  Pressable,
  StyleProp,
  ViewStyle,
} from "react-native";

import { useContext, useEffect, useRef, useState } from "react";
import { SendMessageContext } from "@/context/WebsocketProvider";
import { allButtonsT } from "@/typings/button";
import * as SecureStore from "expo-secure-store";
import { Path, Svg } from "react-native-svg";
import { WhiteText } from "@/components/Styled";

export default function MouseControls() {
  const sendMessage = useContext(SendMessageContext);
  const [sensitivity, setSensitivity] = useState<null | number>(null);

  useEffect(() => {
    const asyncOperation = async () => {
      const sens = await SecureStore.getItemAsync("sens");

      if (sens !== null) {
        setSensitivity(parseFloat(sens));
      } else {
        setSensitivity(4);
      }
    };

    asyncOperation();
  }, []);

  const increaseSens = () => {
    if (sensitivity === null) return;
    setSensitivity(sensitivity + 0.5);
    SecureStore.setItemAsync("sens", (sensitivity + 0.5).toString());
  };
  const decreaseSens = () => {
    if (sensitivity === null || sensitivity === 0.5) return;
    setSensitivity(sensitivity - 0.5);
    SecureStore.setItemAsync("sens", (sensitivity - 0.5).toString());
  };

  const doAction = async (
    buttonData: allButtonsT,
    doShowError: boolean = true
  ) => {
    const res = await sendMessage({
      name: "run_button",
      button_data: buttonData,
    });
    if (!res.status && doShowError) {
      ToastAndroid.show(res.error_message, 200);
      return false;
    }

    return true;
  };

  const lastPressCoordinates = useRef<null | { x: number; y: number }>(null);
  let lasTouchTime = useRef<number>(0);
  const clickTimeOut = 200;

  const moveMouse = (ev: GestureResponderEvent) => {
    const sens = sensitivity === null ? 4 : sensitivity;

    if (lastPressCoordinates.current !== null) {
      doAction(
        {
          button_name: "move_mouse",
          button_params: {
            x: sens * (ev.nativeEvent.pageX - lastPressCoordinates.current.x),
            y: sens * (ev.nativeEvent.pageY - lastPressCoordinates.current.y),
          },
        },
        false
      );
    }

    lastPressCoordinates.current = {
      x: ev.nativeEvent.pageX,
      y: ev.nativeEvent.pageY,
    };
  };

  const handleStart = (ev: GestureResponderEvent) => {
    lasTouchTime.current = Date.now();
  };
  const handleMove = (ev: GestureResponderEvent) => {
    moveMouse(ev);
  };
  const handleRelease = (ev: GestureResponderEvent) => {
    lastPressCoordinates.current = null;

    if (Date.now() - lasTouchTime.current < clickTimeOut) clickLeft();
  };

  const clickMiddle = () => {
    doAction({
      button_name: "mouse_click",
      button_params: { button: "middle" },
    });
  };
  const clickLeft = () => {
    doAction({
      button_name: "mouse_click",
      button_params: { button: "left" },
    });
  };
  const holdLeft = async () => {
    doAction({
      button_name: "mouse_hold",
      button_params: { button: "left" },
    });
  };

  const clickRight = async () => {
    doAction({
      button_name: "mouse_click",
      button_params: { button: "right" },
    });
  };

  return (
    <View style={styles.container}>
      <View style={styles.sens}>
        <WhiteText>
          Sensitivity: {sensitivity !== null ? sensitivity : "..."}
        </WhiteText>
        <View style={styles.sensButtons}>
          <Pressable onPress={decreaseSens}>
            <Svg
              width="32"
              height="32"
              style={{ fill: "white" } as StyleProp<ViewStyle>}
              viewBox="0 0 24 24"
            >
              <Path d="M5 11h14v2H5z"></Path>
            </Svg>
          </Pressable>
          <Pressable onPress={increaseSens}>
            <Svg
              width="32"
              height="32"
              style={{ fill: "white" } as StyleProp<ViewStyle>}
              viewBox="0 0 24 24"
            >
              <Path d="M19 11h-6V5h-2v6H5v2h6v6h2v-6h6z"></Path>
            </Svg>
          </Pressable>
        </View>
      </View>
      <View
        style={styles.mouse}
        onStartShouldSetResponder={() => true}
        onResponderStart={handleStart}
        onResponderMove={handleMove}
        onResponderRelease={handleRelease}
      >
        <Svg
          width="64"
          height="64"
          viewBox="0 0 24 24"
          style={{ fill: "rgba(255, 255, 255, 0.2)" } as StyleProp<ViewStyle>}
        >
          <Path d="M11.975 22H12c3.859 0 7-3.14 7-7V9c0-3.841-3.127-6.974-6.981-7h-.06C8.119 2.022 5 5.157 5 9v6c0 3.86 3.129 7 6.975 7zM7 9a5.007 5.007 0 0 1 4.985-5C14.75 4.006 17 6.249 17 9v6c0 2.757-2.243 5-5 5h-.025C9.186 20 7 17.804 7 15V9z"></Path>
          <Path d="M11 6h2v6h-2z"></Path>
        </Svg>
      </View>
      <View style={styles.mouseButtons}>
        <Pressable style={[styles.hold]} onPress={holdLeft}>
          <Text style={styles.text}>L HOLD</Text>
        </Pressable>
        <Pressable style={styles.middle} onPress={clickMiddle}>
          <Text style={styles.text}>M3</Text>
        </Pressable>
        <Pressable style={[styles.hold]} onPress={clickRight}>
          <Text style={styles.text}>R CLICK</Text>
        </Pressable>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "flex-end",
    padding: 15,
    gap: 10,
    backgroundColor: "black",
  },
  row: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    gap: 15,
  },
  mouse: {
    flexGrow: 1,
    borderRadius: 2,
    alignItems: "center",
    justifyContent: "center",
    borderColor: "gray",
    borderWidth: 1,
    borderStyle: "solid",
  },
  sens: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  sensButtons: {
    flexDirection: "row",
  },
  mouseButtons: {
    flexDirection: "row",
    height: 80,
    gap: 5,
  },
  main: {
    flex: 5,
    gap: 4,
  },
  middle: {
    flex: 3,
    borderColor: "gray",
    borderWidth: 1,
    borderStyle: "solid",
    borderRadius: 2,
    justifyContent: "center",
    alignItems: "center",
  },
  hold: {
    flex: 9,
    borderColor: "gray",
    borderWidth: 1,
    borderStyle: "solid",
    borderRadius: 2,
    justifyContent: "center",
    alignItems: "center",
  },
  text: {
    color: "gray",
    opacity: 0.5,
  },
});
