import { LinearGradient } from "expo-linear-gradient";
import { ReactNode } from "react";
import { ViewProps } from "react-native-svg/lib/typescript/fabric/utils";

export default function LinearGradientView(props: ViewProps) {
  return (
    <LinearGradient
      start={{ x: 0, y: -1.5 }}
      end={{ x: 6, y: 0 }}
      colors={["rgba(2,0,36,1)", "rgba(103,20,130,1)", "rgba(43,111,125,1)"]}
      {...props}
    ></LinearGradient>
  );
}
