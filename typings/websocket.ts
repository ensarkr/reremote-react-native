import type { allButtonsT, customButtonT } from "./button";

type portsT = {
  ip: "loading" | string;
  frontend: "loading" | number;
  settings: "loading" | number;
  actions: "loading" | number;
};

type requestWithConIDT = { con_id: string } & requestT;

type requestT =
  | { name: "run_button"; button_data: allButtonsT }
  | { name: "get_simplified_custom_buttons" };

type updateT = {
  type: "update";
  custom_buttons?: customButtonT[];
};

type responseT<T> = { type: "response"; con_id: string } & (
  | { status: false; error_message: string }
  | ({ status: true } & { value: T })
);

type allResponsesT = responseT<{
  custom_buttons_simplified?: customButtonT[];
}>;

type connectionStatusT =
  | { status: "error"; error_message: string }
  | { status: "loading" }
  | { status: "connected"; ip: string }
  | { status: "closed" }
  | { status: "notSet" };

type resolverItemT = {
  con_id: string;
  resolver: (value: allResponsesT | PromiseLike<allResponsesT>) => void;
};

export type {
  requestT,
  responseT,
  allResponsesT,
  updateT,
  portsT,
  requestWithConIDT,
  connectionStatusT,
  resolverItemT,
};
