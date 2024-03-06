import { Pressable, StyleSheet, ToastAndroid, View } from "react-native";
import React, { useContext } from "react";
import { SendMessageContext } from "@/context/WebsocketProvider";
import { allKeyboardClicksT } from "@/typings/button";
import { WhiteText } from "@/components/Styled";
import NumpadButton from "@/components/buttons/numpadButton/NumpadButton";
export default function NumpadControls() {
  const sendMessage = useContext(SendMessageContext);

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
      <View style={styles.calc}>
        <View style={styles.firstRow}>
          <View style={styles.left3row}>
            <NumpadButton onPress={() => handleClick("num_lock")}>
              <WhiteText style={styles.smallText}>NL</WhiteText>
            </NumpadButton>
            <NumpadButton
              onPress={() => handleClick("divide")}
              title="/"
            ></NumpadButton>
            <NumpadButton
              onPress={() => handleClick("multiply")}
              title="*"
            ></NumpadButton>
          </View>
          <NumpadButton
            onPress={() => handleClick("subtract")}
            title="-"
          ></NumpadButton>
        </View>
        <View style={styles.secondRow}>
          <View style={styles.left3}>
            <View style={styles.firstRow}>
              <NumpadButton
                onPress={() => handleClick("numpad_7")}
                title="7"
              ></NumpadButton>
              <NumpadButton
                onPress={() => handleClick("numpad_8")}
                title="8"
              ></NumpadButton>
              <NumpadButton
                onPress={() => handleClick("numpad_9")}
                title="9"
              ></NumpadButton>
            </View>
            <View style={styles.firstRow}>
              <NumpadButton
                onPress={() => handleClick("numpad_4")}
                title="4"
              ></NumpadButton>
              <NumpadButton
                onPress={() => handleClick("numpad_5")}
                title="5"
              ></NumpadButton>
              <NumpadButton
                onPress={() => handleClick("numpad_6")}
                title="6"
              ></NumpadButton>
            </View>
          </View>
          <Pressable
            style={styles.rightLongV}
            onPress={() => handleClick("add")}
          >
            <WhiteText style={styles.text}>+</WhiteText>
          </Pressable>
        </View>
        <View style={styles.secondRow}>
          <View style={styles.left3}>
            <View style={styles.firstRow}>
              <NumpadButton
                onPress={() => handleClick("numpad_1")}
                title="1"
              ></NumpadButton>
              <NumpadButton
                onPress={() => handleClick("numpad_2")}
                title="2"
              ></NumpadButton>
              <NumpadButton
                onPress={() => handleClick("numpad_3")}
                title="3"
              ></NumpadButton>
            </View>
            <View style={styles.firstRow}>
              <Pressable
                style={styles.leftLongH}
                onPress={() => handleClick("numpad_0")}
              >
                <WhiteText style={styles.text}>0</WhiteText>
              </Pressable>
              <NumpadButton
                onPress={() => handleClick("decimal")}
                title="."
              ></NumpadButton>
            </View>
          </View>
          <Pressable
            style={styles.rightLongV}
            onPress={() => handleClick("enter")}
          >
            <WhiteText style={styles.smallText}>Ent</WhiteText>
          </Pressable>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "black",
    justifyContent: "flex-end",
  },
  calc: {
    aspectRatio: 4 / 5,
    backgroundColor: "black",
    justifyContent: "flex-end",
  },
  firstRow: { flexDirection: "row", flex: 1 },
  secondRow: { flexDirection: "row", flex: 2 },
  left3: { flex: 3, flexDirection: "column" },
  left3row: { flex: 3, flexDirection: "row", height: "100%" },
  rightLongV: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    borderColor: "gray",
    borderWidth: 1,
    borderStyle: "solid",
  },
  leftLongH: {
    flex: 2,
    justifyContent: "center",
    alignItems: "center",
    borderColor: "gray",
    borderWidth: 1,
    borderStyle: "solid",
  },
  flexSquare: { flex: 1 },
  text: {
    fontSize: 40,
  },
  smallText: {
    fontSize: 25,
  },
});
