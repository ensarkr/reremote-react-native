import { Href, Link, Route, useRouter } from "expo-router";
import React, { ReactNode } from "react";
import { Image, Pressable, Text, StyleSheet, View } from "react-native";
import Svg, { Path } from "react-native-svg";
import { LinearGradient } from "expo-linear-gradient";
import LinearGradientView from "../../linearGradientWrapper/LinearGradientWrapper";

export default function WideButton({
  href,
  onPress,
  title,
  leftSVG,
}: {
  href?: string;
  onPress?: () => void;
  title: string;
  leftSVG?: ReactNode;
}) {
  const router = useRouter();

  return (
    <Pressable
      onPress={() => {
        if (href !== undefined) router.push(href as Route<string>);
        else if (onPress !== undefined) onPress();
      }}
    >
      <LinearGradientView style={styles.wideButton}>
        {leftSVG !== undefined && (
          <View style={styles.svgContainer}>{leftSVG}</View>
        )}
        <Text style={styles.text}>{title}</Text>
      </LinearGradientView>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  wideButton: {
    padding: 20,
    borderRadius: 5,
    flexDirection: "row",
    gap: 15,
    alignItems: "center",
    justifyContent: "flex-start",
    height: 75,
  },
  text: {
    fontSize: 24,
    color: "white",
  },
  svgContainer: {
    height: "100%",
    aspectRatio: 1,
  },
});
