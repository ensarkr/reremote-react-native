import { ReactNode } from "react";
import { Pressable, StyleSheet, Text, View } from "react-native";
import { WhiteText } from "../../Styled";

export default function NumpadButton({
  onPress,
  title,
  children,
}: {
  onPress: () => void;
  title?: string;
  children?: ReactNode;
}) {
  return (
    <>
      <Pressable style={[styles.main]} onPress={onPress}>
        {title !== undefined ? (
          <WhiteText style={styles.text}>{title}</WhiteText>
        ) : (
          <></>
        )}
        {children}
      </Pressable>
    </>
  );
}

const styles = StyleSheet.create({
  main: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    borderColor: "gray",
    borderWidth: 1,
    borderStyle: "solid",
  },
  text: {
    textAlign: "center",
    fontSize: 40,
  },
});
