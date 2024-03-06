import { ReactNode } from "react";
import { Pressable, StyleSheet, Text, View } from "react-native";
import { LinearGradient } from "react-native-svg";
import LinearGradientView from "../../linearGradientWrapper/LinearGradientWrapper";

export default function CircleButton({
  onPress,
  title,
  children,
}: {
  onPress: () => void;
  title?: string;
  children?: ReactNode;
}) {
  return (
    <View style={[styles.main, styles.visible]}>
      <Pressable style={[styles.circleButton]} onPress={onPress}>
        {title !== undefined ? <Text style={styles.text}>{title}</Text> : <></>}
        {children}
      </Pressable>
    </View>
  );
}

export function InvisibleCircleButton() {
  return <View style={styles.main}></View>;
}

const styles = StyleSheet.create({
  visible: {
    borderColor: "gray",
  },
  main: {
    flex: 1,
    aspectRatio: 1,
    padding: 30,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 1000,
    borderWidth: 1,
    borderStyle: "solid",
  },
  circleButton: {
    flex: 1,
    aspectRatio: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  text: {
    textAlign: "center",
  },
});
