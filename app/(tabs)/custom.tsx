import { FlatList, StyleSheet, ToastAndroid, View } from "react-native";
import { useContext, useState } from "react";
import {
  CustomButtonsContext,
  RefreshButtonsContext,
  SendMessageContext,
} from "@/context/WebsocketProvider";
import WideButton from "@/components/buttons/wideButton/WideButton";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { allButtonsT } from "@/typings/button";
import { WhiteText } from "@/components/Styled";

export default function CustomButtons() {
  const safeArea = useSafeAreaInsets();
  const customButtons = useContext(CustomButtonsContext);
  const sendMessage = useContext(SendMessageContext);
  const refreshButtons = useContext(RefreshButtonsContext);
  const [loading, setLoading] = useState(false);

  const doAction = async (
    buttonData: allButtonsT,
    doShowError: boolean = true
  ) => {
    const res = await sendMessage({
      name: "run_button",
      button_data: buttonData,
    });
    if (!res.status && doShowError) {
      ToastAndroid.show(res.error_message, 200);
      return false;
    }

    return true;
  };

  const refresh = async () => {
    if (loading) return;
    setLoading(true);
    await refreshButtons();
    setLoading(false);
  };

  return (
    <View style={[{ paddingTop: safeArea.top }, styles.container]}>
      {customButtons === null ? (
        <View style={styles.center}>
          <WhiteText style={styles.title}>Not connected to app</WhiteText>
        </View>
      ) : (
        <FlatList
          refreshing={loading}
          onRefresh={refresh}
          contentContainerStyle={styles.list}
          data={customButtons}
          renderItem={(e) => (
            <WideButton
              title={e.item.custom_button_name}
              onPress={() => {
                doAction({
                  ...e.item,
                });
              }}
            ></WideButton>
          )}
          ListEmptyComponent={
            <View style={styles.center}>
              <WhiteText style={styles.title}>No custom button found</WhiteText>
              <WhiteText> Add it using windows app</WhiteText>
            </View>
          }
        ></FlatList>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
    backgroundColor: "black",
    justifyContent: "center",
  },
  center: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  list: {
    padding: 8,
    gap: 10,
    flex: 1,
  },
  title: {
    fontSize: 17,
    fontWeight: "bold",
    marginTop: 40,
    marginBottom: 10,
  },
});
