import {
  Pressable,
  StyleSheet,
  ToastAndroid,
  View,
  StyleProp,
  ViewStyle,
} from "react-native";
import React, { useContext, useState } from "react";
import { SendMessageContext } from "@/context/WebsocketProvider";
import { allKeyboardClicksT } from "@/typings/button";
import { Path, Svg } from "react-native-svg";
import { WhiteText, WhiteTextInput } from "@/components/Styled";

export default function TypeScreen() {
  const sendMessage = useContext(SendMessageContext);
  const [string, setString] = useState("");

  const handleSend = async () => {
    if (string.trim().length === 0) {
      ToastAndroid.show("please fill the input", 500);
      return;
    }

    const res = await sendMessage({
      name: "run_button",
      button_data: { button_name: "type_string", button_params: { string } },
    });
    if (!res.status) ToastAndroid.show(res.error_message, 200);
  };

  const handleClick = async (key: allKeyboardClicksT) => {
    const res = await sendMessage({
      name: "run_button",
      button_data: {
        button_name: "keyboard_click",
        button_params: { key: key as any },
      },
    });
    if (!res.status) ToastAndroid.show(res.error_message, 200);
  };

  return (
    <View style={styles.container}>
      <View style={styles.row}>
        <Pressable style={styles.extraButton} onPress={() => handleClick("PS")}>
          <WhiteText>PS</WhiteText>
        </Pressable>
        <Pressable style={styles.extraButton} onPress={() => handleClick("SL")}>
          <WhiteText>SL</WhiteText>
        </Pressable>
        <Pressable style={styles.extraButton} onPress={() => handleClick("PB")}>
          <WhiteText>PB</WhiteText>
        </Pressable>
      </View>
      <View style={styles.row}>
        <Pressable
          style={styles.extraButton}
          onPress={() => handleClick("insert")}
        >
          <WhiteText>Insert</WhiteText>
        </Pressable>
        <Pressable
          style={styles.extraButton}
          onPress={() => handleClick("home")}
        >
          <WhiteText>Home</WhiteText>
        </Pressable>
        <Pressable
          style={styles.extraButton}
          onPress={() => handleClick("page_up")}
        >
          <WhiteText>Page Up</WhiteText>
        </Pressable>
      </View>
      <View style={styles.row}>
        <Pressable
          style={styles.extraButton}
          onPress={() => handleClick("delete")}
        >
          <WhiteText>Delete</WhiteText>
        </Pressable>
        <Pressable
          style={styles.extraButton}
          onPress={() => handleClick("end")}
        >
          <WhiteText>End</WhiteText>
        </Pressable>
        <Pressable
          style={styles.extraButton}
          onPress={() => handleClick("page_down")}
        >
          <WhiteText>Page Down</WhiteText>
        </Pressable>
      </View>
      <View style={styles.row}>
        <Pressable
          style={styles.extraButton}
          onPress={() => handleClick("esc")}
        >
          <WhiteText>Esc</WhiteText>
        </Pressable>
        <Pressable
          style={styles.extraButton}
          onPress={() => handleClick("caps_lock")}
        >
          <WhiteText>Caps Lock</WhiteText>
        </Pressable>
        <Pressable
          style={styles.extraButtonIcon}
          onPress={() => handleClick("windows")}
        >
          <Svg
            width="65%"
            height="65%"
            viewBox="0 0 24 24"
            style={{ fill: "white" } as StyleProp<ViewStyle>}
          >
            <Path d="m3 5.557 7.357-1.002.004 7.097-7.354.042L3 5.557zm7.354 6.913.006 7.103-7.354-1.011v-6.14l7.348.048zm.892-8.046L21.001 3v8.562l-9.755.077V4.424zm9.758 8.113-.003 8.523-9.755-1.378-.014-7.161 9.772.016z"></Path>
          </Svg>
        </Pressable>
        <Pressable
          style={styles.extraButton}
          onPress={() => handleClick("num_lock")}
        >
          <WhiteText>Num Lock</WhiteText>
        </Pressable>
      </View>
      <View style={styles.row}>
        <Pressable
          style={styles.extraButton}
          onPress={() => handleClick("tab")}
        >
          <WhiteText>Tab</WhiteText>
        </Pressable>
        <Pressable
          style={styles.extraButton}
          onPress={() => handleClick("space")}
        >
          <WhiteText>Space</WhiteText>
        </Pressable>
        <Pressable
          style={styles.extraButton}
          onPress={() => handleClick("enter")}
        >
          <WhiteText>Enter</WhiteText>
        </Pressable>
        <Pressable
          style={styles.extraButton}
          onPress={() => handleClick("backspace")}
        >
          <WhiteText>Backspace</WhiteText>
        </Pressable>
      </View>
      <View style={styles.row}>
        <WhiteTextInput
          value={string}
          onChangeText={setString}
          style={styles.input}
          placeholder={"Type here"}
        ></WhiteTextInput>
        <Pressable style={styles.button} onPress={handleSend}>
          <Svg
            width="80%"
            height="80%"
            viewBox="0 0 24 24"
            style={{ fill: "white" } as StyleProp<ViewStyle>}
          >
            <Path d="m21.426 11.095-17-8A.999.999 0 0 0 3.03 4.242L4.969 12 3.03 19.758a.998.998 0 0 0 1.396 1.147l17-8a1 1 0 0 0 0-1.81zM5.481 18.197l.839-3.357L12 12 6.32 9.16l-.839-3.357L18.651 12l-13.17 6.197z"></Path>
          </Svg>
        </Pressable>
      </View>
      <View style={styles.row}>
        <Pressable
          style={styles.extraButtonIcon}
          onPress={() => handleClick("left_arrow")}
        >
          <Svg
            width="65%"
            height="65%"
            viewBox="0 0 24 24"
            style={{ fill: "white" } as StyleProp<ViewStyle>}
          >
            <Path d="M12.707 17.293 8.414 13H18v-2H8.414l4.293-4.293-1.414-1.414L4.586 12l6.707 6.707z"></Path>
          </Svg>
        </Pressable>
        <Pressable
          style={styles.extraButtonIcon}
          onPress={() => handleClick("down_arrow")}
        >
          <Svg
            width="65%"
            height="65%"
            viewBox="0 0 24 24"
            style={{ fill: "white" } as StyleProp<ViewStyle>}
          >
            <Path d="m18.707 12.707-1.414-1.414L13 15.586V6h-2v9.586l-4.293-4.293-1.414 1.414L12 19.414z"></Path>
          </Svg>
        </Pressable>

        <Pressable
          style={styles.extraButtonIcon}
          onPress={() => handleClick("up_arrow")}
        >
          <Svg
            width="65%"
            height="65%"
            viewBox="0 0 24 24"
            style={{ fill: "white" } as StyleProp<ViewStyle>}
          >
            <Path d="M11 8.414V18h2V8.414l4.293 4.293 1.414-1.414L12 4.586l-6.707 6.707 1.414 1.414z"></Path>
          </Svg>
        </Pressable>

        <Pressable
          style={styles.extraButtonIcon}
          onPress={() => handleClick("right_arrow")}
        >
          <Svg
            width="65%"
            height="65%"
            viewBox="0 0 24 24"
            style={{ fill: "white" } as StyleProp<ViewStyle>}
          >
            <Path d="m11.293 17.293 1.414 1.414L19.414 12l-6.707-6.707-1.414 1.414L15.586 11H6v2h9.586z"></Path>
          </Svg>
        </Pressable>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    padding: 15,
    gap: 15,
    backgroundColor: "black",
  },
  row: {
    flexDirection: "row",
    alignItems: "center",
    gap: 15,
    height: 50,
  },
  input: {
    fontSize: 30,
    borderRadius: 5,
    padding: 5,
    borderColor: "gray",
    borderWidth: 1,
    borderStyle: "solid",
    flex: 1,
    flexGrow: 1,
    paddingHorizontal: 8,
  },
  button: {
    height: "100%",
    aspectRatio: 1,
    color: "white",
    alignItems: "center",
    justifyContent: "center",
  },
  extraButtonIcon: {
    height: "100%",
    color: "white",
    alignItems: "center",
    justifyContent: "center",
    borderColor: "gray",
    borderWidth: 1,
    borderStyle: "solid",
    borderRadius: 5,
    aspectRatio: 1,
  },
  extraButton: {
    height: "100%",
    color: "white",
    alignItems: "center",
    justifyContent: "center",
    borderColor: "gray",
    borderWidth: 1,
    borderStyle: "solid",
    borderRadius: 5,
    paddingHorizontal: 8,
    flexGrow: 1,
  },
});
