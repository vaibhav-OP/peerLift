"use client";
import Modal from "react-modal";
import { useState } from "react";
import CreateThreadForm from "./createThreadForm";

import { AiOutlineClose } from "react-icons/ai";
import { BsPlusCircleFill } from "react-icons/bs";

export default function CreateThreadModal({
  threadtype,
}: {
  threadtype: string;
}) {
  const [modalIsOpen, setIsOpen] = useState(false);

  function openModal() {
    setIsOpen(true);
  }

  function closeModal() {
    setIsOpen(false);
  }

  return (
    <>
      <Modal
        ariaHideApp={true}
        isOpen={modalIsOpen}
        style={customStyleSheet}
        onRequestClose={closeModal}
        contentLabel="Create Thread Modal">
        <div className="flex justify-between text-2xl z-50 font-bold mb-12">
          <h1>What’s on your mind?</h1>
          <button onClick={closeModal}>
            <AiOutlineClose />
          </button>
        </div>
        <CreateThreadForm threadType={threadtype} />
      </Modal>
      <button
        className="fixed shadow-2xl right-8 bottom-24 bg-background rounded-full text-center text-text"
        onClick={openModal}>
        <span className="text-5xl">
          <BsPlusCircleFill />
        </span>
      </button>
    </>
  );
}

const customStyleSheet = {
  content: {
    padding: "26px",
    margin: "auto",
    border: "none",
    width: "100%",
    maxWidth: 672,
    overflow: "hidden",
    height: "100vh",
    inset: "unset",
    zIndex: 9999,
    boxShadow: "0 19px 38px rgba(0,0,0,0.30), 0 15px 12px rgba(0,0,0,0.22)",
  },
};
