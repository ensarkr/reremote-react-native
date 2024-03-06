import {
  TextProps,
  Text,
  ViewStyle,
  TextStyle,
  StyleProp,
  StyleSheet,
  TextInputProps,
  TextInput,
} from "react-native";

function WhiteText(props: TextProps & { style?: StyleProp<TextStyle> }) {
  return <Text {...props} style={[props.style, styles.text]}></Text>;
}

function WhiteTextInput(
  props: TextInputProps & { style?: StyleProp<TextStyle> }
) {
  return (
    <TextInput
      placeholderTextColor={"gray"}
      {...props}
      style={[props.style, styles.textInput]}
    ></TextInput>
  );
}

const styles = StyleSheet.create({
  text: {
    color: "white",
  },
  textInput: {
    color: "white",
  },
});

export { WhiteText, WhiteTextInput };
