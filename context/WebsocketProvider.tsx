import { customButtonT } from "@/typings/button";
import React, {
  ReactNode,
  createContext,
  useCallback,
  useEffect,
  useRef,
  useState,
} from "react";
import { AppState, ToastAndroid } from "react-native";
import type {
  requestT,
  allResponsesT,
  updateT,
  requestWithConIDT,
  connectionStatusT,
  resolverItemT,
} from "@/typings/websocket";
import * as SecureStore from "expo-secure-store";
import { useRouter } from "expo-router";

const CustomButtonsContext = createContext<customButtonT[] | null>(null);
const ConnectionStatusContext = createContext<connectionStatusT>({
  status: "loading",
});
const SendMessageContext = createContext<
  (message: requestT) => Promise<allResponsesT>
>(null!);

const TryUntilConnectContext = createContext<
  (serverIp: string, startingPort?: string) => Promise<void>
>(null!);
const RefreshButtonsContext = createContext<() => Promise<void>>(null!);

export {
  CustomButtonsContext,
  SendMessageContext,
  ConnectionStatusContext,
  TryUntilConnectContext,
  RefreshButtonsContext,
};

export default function WebsocketProvider({
  children,
}: {
  children: ReactNode;
}) {
  const [connectionStatus, setConnectionStatus] = useState<connectionStatusT>({
    status: "loading",
  });
  const websocket = useRef<WebSocket | null>(null);
  const [customButtons, setCustomButtons] = useState<customButtonT[] | null>(
    null
  );
  const resolvers = useRef<resolverItemT[]>([]);
  const currentTryingID = useRef<string | null>(null);

  const tryUntilConnect = useCallback(
    async (serverIp: string, startingPort?: string) => {
      if (connectionStatus.status !== "loading")
        setConnectionStatus({ status: "loading" });

      let port = 7171;
      if (startingPort !== undefined) port = parseInt(startingPort);

      const tryingID = Math.random().toString();
      currentTryingID.current = tryingID;

      for (let i = 0; i < 30; i++) {
        if (currentTryingID.current !== tryingID) {
          return;
        }

        const socket = new WebSocket(`ws://${serverIp}:${port}/`);

        socket.onopen = () => {
          websocket.current = socket;
          setConnectionStatus({ status: "connected", ip: serverIp });
          SecureStore.setItemAsync("ip", serverIp);
          i = 30;
        };

        await new Promise((resolve) => {
          setTimeout(() => {
            resolve(1);
          }, 1000);
        });

        if (i > 10) port++;
      }
      setupWebsocket();
    },
    [connectionStatus]
  );

  const resetEverything = () => {
    setCustomButtons(null);
  };

  const setupWebsocket = async () => {
    if (websocket.current !== null) {
      websocket.current.onclose = () => {
        ToastAndroid.show("connection closed", 500);
        setConnectionStatus({ status: "closed" });
        resetEverything();
      };

      websocket.current.onerror = () => {
        ToastAndroid.show("connection error", 500);
        setConnectionStatus({
          status: "error",
          error_message: "connection error",
        });
        resetEverything();
      };

      websocket.current.onmessage = (ev: MessageEvent) => {
        const data: allResponsesT | updateT = JSON.parse(ev.data);

        if (data.type === "update") {
          if (data.custom_buttons !== undefined) {
            setCustomButtons(data.custom_buttons);
          }
        } else {
          const resolver = resolvers.current.find(
            (e) => e.con_id === data.con_id
          );
          if (resolver !== undefined) {
            resolver.resolver(data);
            resolvers.current = resolvers.current.filter(
              (e) => e.con_id !== data.con_id
            );
          }
        }
      };
      {
        const res = await sendMessage({
          name: "get_simplified_custom_buttons",
        });
        if (res.status && res.value.custom_buttons_simplified) {
          setCustomButtons(res.value.custom_buttons_simplified);
        }
      }
    } else {
      if (connectionStatus.status !== "error")
        setConnectionStatus({
          status: "error",
          error_message: "could not connect",
        });
      resetEverything();
    }
  };

  const sendMessage = useCallback(
    (message: requestT): Promise<allResponsesT> => {
      return new Promise((resolve) => {
        const conID = Math.random().toString();

        if (websocket.current === null || !websocket.current.OPEN)
          return resolve({
            status: false,
            con_id: conID,
            type: "response",
            error_message: "app is not connected",
          });

        const req: requestWithConIDT = { ...message, con_id: conID };
        try {
          websocket.current.send(JSON.stringify(req));
        } catch (error) {
          setConnectionStatus({
            status: "error",
            error_message: "error occurred while sending message",
          });
          resetEverything();
        }
        resolvers.current = [
          ...resolvers.current,
          { con_id: conID, resolver: resolve },
        ];
        setTimeout(() => {
          resolve({
            status: false,
            con_id: conID,
            type: "response",
            error_message: "5 second timeout exceeded",
          });
        }, 5000);
      });
    },
    []
  );

  const refreshButtons = useCallback(async () => {
    const res = await sendMessage({
      name: "get_simplified_custom_buttons",
    });
    if (res.status && res.value.custom_buttons_simplified) {
      setCustomButtons(res.value.custom_buttons_simplified);
    } else if (!res.status) {
      console.log(res.error_message);
    }
  }, []);

  const router = useRouter();

  useEffect(() => {
    const asyncOperation = async () => {
      const storedIp = await SecureStore.getItemAsync("ip");

      if (storedIp === null) {
        setConnectionStatus({ status: "notSet" });
        router.push("/settings");
      } else {
        setConnectionStatus({ status: "loading" });
        tryUntilConnect(storedIp);
      }
    };
    asyncOperation();
    AppState.addEventListener("change", (e) => {
      if (e === "active") asyncOperation();
    });
  }, []);

  return (
    <>
      <CustomButtonsContext.Provider value={customButtons}>
        <SendMessageContext.Provider value={sendMessage}>
          <TryUntilConnectContext.Provider value={tryUntilConnect}>
            <ConnectionStatusContext.Provider value={connectionStatus}>
              <RefreshButtonsContext.Provider value={refreshButtons}>
                {children}
              </RefreshButtonsContext.Provider>
            </ConnectionStatusContext.Provider>
          </TryUntilConnectContext.Provider>
        </SendMessageContext.Provider>
      </CustomButtonsContext.Provider>
    </>
  );
}
