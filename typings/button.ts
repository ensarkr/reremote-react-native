type customButtonT = {
  button_name: "custom_button";
  custom_button_name: string;
  custom_button_id: string;
};

type allKeyboardClicksT =
  | "tab"
  | "caps_lock"
  | "backspace"
  | "esc"
  | "windows"
  | "num_lock"
  | "PS"
  | "SL"
  | "PB"
  | "insert"
  | "home"
  | "page_up"
  | "delete"
  | "end"
  | "page_down"
  | "enter"
  | "space"
  | "left_arrow"
  | "down_arrow"
  | "up_arrow"
  | "right_arrow"
  | "divide"
  | "multiply"
  | "subtract"
  | "add"
  | "decimal"
  | "numpad_0"
  | "numpad_1"
  | "numpad_2"
  | "numpad_3"
  | "numpad_4"
  | "numpad_5"
  | "numpad_6"
  | "numpad_7"
  | "numpad_8"
  | "numpad_9";

type allButtonsT =
  | customButtonT
  | {
      button_name: "move_mouse";
      button_params: {
        x: number;
        y: number;
      };
    }
  | {
      button_name: "mouse_click";
      button_params: {
        button: "left" | "right" | "middle";
      };
    }
  | {
      button_name: "mouse_hold";
      button_params: {
        button: "left" | "right";
      };
    }
  | {
      button_name: "increase_volume";
    }
  | {
      button_name: "decrease_volume";
    }
  | {
      button_name: "mute_volume";
    }
  | {
      button_name: "next_track";
    }
  | {
      button_name: "previous_track";
    }
  | {
      button_name: "stop_track";
    }
  | {
      button_name: "play_pause_track";
    }
  | {
      button_name: "type_string";
      button_params: {
        string: string;
      };
    }
  | {
      button_name: "keyboard_click";
      button_params: {
        key: allKeyboardClicksT;
      };
    };

export type { customButtonT, allButtonsT, allKeyboardClicksT };
