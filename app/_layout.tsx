import { SplashScreen, Stack } from "expo-router";
import WebsocketProvider from "@/context/WebsocketProvider";
import { StatusBar } from "expo-status-bar";
import { useEffect } from "react";
import { AppState } from "react-native";
import { SafeAreaProvider } from "react-native-safe-area-context";

SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  useEffect(() => {
    SplashScreen.hideAsync();
  }, []);

  return (
    <SafeAreaProvider>
      <WebsocketProvider>
        <StatusBar
          style="light"
          backgroundColor="white"
          translucent={false}
          hidden={false}
        ></StatusBar>
        <Stack screenOptions={{ animation: "fade_from_bottom" }}>
          <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
          <Stack.Screen
            name="buttons/media"
            options={{
              presentation: "modal",
              title: "Media Controls",
              headerStyle: { backgroundColor: "black" },
              headerTitleStyle: { color: "white" },
              headerTintColor: "white",
            }}
          />
          <Stack.Screen
            name="buttons/mouse"
            options={{
              presentation: "modal",
              title: "Mouse Controls",
              headerStyle: { backgroundColor: "black" },
              headerTitleStyle: { color: "white" },
              headerTintColor: "white",
            }}
          />
          <Stack.Screen
            name="buttons/type"
            options={{
              presentation: "modal",
              title: "Type Controls",
              headerStyle: { backgroundColor: "black" },
              headerTitleStyle: { color: "white" },
              headerTintColor: "white",
            }}
          />
          <Stack.Screen
            name="buttons/numpad"
            options={{
              presentation: "modal",
              title: "Numpad Controls",
              headerStyle: { backgroundColor: "black" },
              headerTitleStyle: { color: "white" },
              headerTintColor: "white",
            }}
          />
        </Stack>
      </WebsocketProvider>
    </SafeAreaProvider>
  );
}
