import { FlatList, StyleProp, StyleSheet, View, ViewStyle } from "react-native";
import WideButton from "@/components/buttons/wideButton/WideButton";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import Svg, { Path } from "react-native-svg";

const controlButtons = [
  {
    title: "Mouse",
    href: "buttons/mouse",
    leftSVG: (
      <Svg
        width="100%"
        height="100%"
        viewBox="0 0 24 24"
        style={{ fill: "gray" } as StyleProp<ViewStyle>}
      >
        <Path d="M11.975 22H12c3.859 0 7-3.14 7-7V9c0-3.841-3.127-6.974-6.981-7h-.06C8.119 2.022 5 5.157 5 9v6c0 3.86 3.129 7 6.975 7zM11 6h2v6h-2V6z"></Path>
      </Svg>
    ),
  },
  {
    title: "Media",
    href: "buttons/media",
    leftSVG: (
      <Svg
        width="100%"
        height="100%"
        viewBox="0 0 24 24"
        style={{ fill: "gray" } as StyleProp<ViewStyle>}
      >
        <Path d="M16 21c3.527-1.547 5.999-4.909 5.999-9S19.527 4.547 16 3v2c2.387 1.386 3.999 4.047 3.999 7S18.387 17.614 16 19v2z"></Path>
        <Path d="M16 7v10c1.225-1.1 2-3.229 2-5s-.775-3.9-2-5zM4 17h2.697L14 21.868V2.132L6.697 7H4c-1.103 0-2 .897-2 2v6c0 1.103.897 2 2 2z"></Path>
      </Svg>
    ),
  },
  {
    title: "Type",
    href: "buttons/type",
    leftSVG: (
      <Svg
        width="100%"
        height="100%"
        viewBox="0 0 24 24"
        style={{ fill: "gray" } as StyleProp<ViewStyle>}
      >
        <Path d="M21 5H3a2 2 0 0 0-2 2v10a2 2 0 0 0 2 2h18a2 2 0 0 0 2-2V7a2 2 0 0 0-2-2zm-8 2h2v2h-2V7zm0 4h2v2h-2v-2zM9 7h2v2H9V7zm0 4h2v2H9v-2zM5 7h2v2H5V7zm0 4h2v2H5v-2zm12 6H7v-2h10v2zm2-4h-2v-2h2v2zm0-4h-2V7h2v2z"></Path>
      </Svg>
    ),
  },
  {
    title: "Numpad",
    href: "buttons/numpad",
    leftSVG: (
      <Svg
        width="100%"
        height="100%"
        viewBox="0 0 24 24"
        style={{ fill: "gray" } as StyleProp<ViewStyle>}
      >
        <Path d="M6 22h12a2 2 0 0 0 2-2V4a2 2 0 0 0-2-2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2zm3-3H7v-2h2v2zm0-4H7v-2h2v2zm0-4H7V9h2v2zm4 8h-2v-2h2v2zm0-4h-2v-2h2v2zm0-4h-2V9h2v2zm4 8h-2v-6h2v6zm0-8h-2V9h2v2zM6 4h12v3H6V4z"></Path>
      </Svg>
    ),
  },
];

export default function MainButtons() {
  const safeArea = useSafeAreaInsets();

  return (
    <View style={[{ paddingTop: safeArea.top }, styles.container]}>
      <FlatList
        contentContainerStyle={styles.list}
        data={controlButtons}
        renderItem={(e) => <WideButton {...e.item}></WideButton>}
      ></FlatList>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
    backgroundColor: "black",
  },
  list: {
    padding: 8,
    gap: 10,
  },
});
