import {
  StyleProp,
  StyleSheet,
  ToastAndroid,
  View,
  ViewStyle,
} from "react-native";
import React, { useContext } from "react";
import { SendMessageContext } from "@/context/WebsocketProvider";
import { allButtonsT } from "@/typings/button";
import { Path, Svg } from "react-native-svg";
import CircleButton, {
  InvisibleCircleButton,
} from "@/components/buttons/circleButton/CircleButton";

export default function MediaControls() {
  const sendMessage = useContext(SendMessageContext);

  const doAction = async (buttonData: allButtonsT) => {
    const res = await sendMessage({
      name: "run_button",
      button_data: buttonData,
    });
    if (!res.status) ToastAndroid.show(res.error_message, 200);
  };

  const increaseVolume = () => {
    doAction({ button_name: "increase_volume" });
  };
  const decreaseVolume = () => {
    doAction({ button_name: "decrease_volume" });
  };
  const muteVolume = () => {
    doAction({ button_name: "mute_volume" });
  };
  const playPause = () => {
    doAction({ button_name: "play_pause_track" });
  };
  const stop = () => {
    doAction({ button_name: "stop_track" });
  };
  const nextTrack = () => {
    doAction({ button_name: "next_track" });
  };
  const previousTrack = () => {
    doAction({ button_name: "previous_track" });
  };

  return (
    <View style={styles.container}>
      <View style={styles.row}>
        <InvisibleCircleButton></InvisibleCircleButton>
        <InvisibleCircleButton></InvisibleCircleButton>
        <CircleButton onPress={increaseVolume}>
          <Svg
            width="70%"
            height="70%"
            style={{ fill: "white" } as StyleProp<ViewStyle>}
            viewBox="0 0 24 24"
          >
            <Path d="M16 21c3.527-1.547 5.999-4.909 5.999-9S19.527 4.547 16 3v2c2.387 1.386 3.999 4.047 3.999 7S18.387 17.614 16 19v2z"></Path>
            <Path d="M16 7v10c1.225-1.1 2-3.229 2-5s-.775-3.9-2-5zM4 17h2.697L14 21.868V2.132L6.697 7H4c-1.103 0-2 .897-2 2v6c0 1.103.897 2 2 2z"></Path>
          </Svg>
        </CircleButton>
      </View>
      <View style={styles.row}>
        <CircleButton onPress={muteVolume}>
          <Svg
            width="70%"
            height="70%"
            style={{ fill: "white" } as StyleProp<ViewStyle>}
            viewBox="0 0 24 24"
          >
            <Path d="m7.727 6.313-4.02-4.02-1.414 1.414 18 18 1.414-1.414-2.02-2.02A9.578 9.578 0 0 0 21.999 12c0-4.091-2.472-7.453-5.999-9v2c2.387 1.386 3.999 4.047 3.999 7a8.13 8.13 0 0 1-1.671 4.914l-1.286-1.286C17.644 14.536 18 13.19 18 12c0-1.771-.775-3.9-2-5v7.586l-2-2V2.132L7.727 6.313zM4 17h2.697L14 21.868v-3.747L3.102 7.223A1.995 1.995 0 0 0 2 9v6c0 1.103.897 2 2 2z"></Path>
          </Svg>
        </CircleButton>
        <CircleButton onPress={stop}>
          <Svg
            width="100%"
            height="100%"
            style={{ fill: "white" } as StyleProp<ViewStyle>}
            viewBox="0 0 24 24"
          >
            <Path d="M7 7h10v10H7z"></Path>
          </Svg>
        </CircleButton>
        <CircleButton onPress={decreaseVolume}>
          <Svg
            width="70%"
            height="70%"
            style={{ fill: "white" } as StyleProp<ViewStyle>}
            viewBox="0 0 24 24"
          >
            <Path d="M4 17h2.697L14 21.868V2.132L6.697 7H4c-1.103 0-2 .897-2 2v6c0 1.103.897 2 2 2z"></Path>
          </Svg>
        </CircleButton>
      </View>
      <View style={styles.row}>
        <CircleButton onPress={previousTrack}>
          <Svg
            width="100%"
            height="100%"
            style={{ fill: "white" } as StyleProp<ViewStyle>}
            viewBox="0 0 24 24"
          >
            <Path d="m16 7-7 5 7 5zm-7 5V7H7v10h2z"></Path>
          </Svg>
        </CircleButton>
        <CircleButton onPress={playPause}>
          <Svg
            width="100%"
            height="100%"
            style={{ fill: "white" } as StyleProp<ViewStyle>}
            viewBox="0 0 24 24"
          >
            <Path d="M7 6v12l10-6z" />
          </Svg>
        </CircleButton>
        <CircleButton onPress={nextTrack}>
          <Svg
            width="100%"
            height="100%"
            style={{ fill: "white" } as StyleProp<ViewStyle>}
            viewBox="0 0 24 24"
          >
            <Path d="M7 7v10l7-5zm9 10V7h-2v10z"></Path>
          </Svg>
        </CircleButton>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "flex-end",
    padding: 15,
    gap: 15,
    backgroundColor: "black",
  },
  row: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    gap: 15,
  },
});
