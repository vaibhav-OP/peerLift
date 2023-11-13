"use client";
import Modal from "react-modal";
import { useSnapshot } from "valtio";

import { initializeChatroomStore } from "@/states/initializeChatroom";

if (Modal.defaultStyles.overlay && Modal.defaultStyles.content) {
  Modal.defaultStyles.overlay.zIndex = 100;
  Modal.defaultStyles.overlay.backdropFilter = "blur(8px)";
  Modal.defaultStyles.overlay.backgroundColor = "rgba(0, 0, 0, .4)";

  Modal.defaultStyles.content.border = "none";
  Modal.defaultStyles.content.maxWidth = "512px";
  Modal.defaultStyles.content.marginLeft = "auto";
  Modal.defaultStyles.content.marginRight = "auto";
  Modal.defaultStyles.content.borderRadius = "24px";
}

export default function InitializeChatroom() {
  const initializeChatroomSnap = useSnapshot(initializeChatroomStore);
  return (
    <Modal
      ariaHideApp={true}
      isOpen={initializeChatroomSnap.isOpen}
      appElement={document.getElementById("app") as HTMLElement}
      onRequestClose={() => (initializeChatroomStore.isOpen = false)}
      contentLabel="Create Thread Modal">
      <div className="grid gap-3">
        <div className="border-b border-text/40 pb-3">
          <h6 className="text-center font-semibold">Send message</h6>
        </div>
        <div className="grid gap-3">
          <input type="text" placeholder="User name" className="outline-none" />
          <textarea
            name="message"
            id="message"
            placeholder="Enter message"
            className="outline-none h-full"
          />
        </div>
      </div>
    </Modal>
  );
}

const customModalStyleSheet = {
  content: {
    zIndex: 10000,
  },
};
