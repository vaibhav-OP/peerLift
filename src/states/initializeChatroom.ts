import { proxy } from "valtio";

type InitializeChatroomStore = {
  isOpen: boolean;
  selectedUser: {
    uid: string;
  };
};

export const initializeChatroomStore = proxy<InitializeChatroomStore>({
  isOpen: false,
  selectedUser: {
    uid: "",
  },
});
