"use client";
import Modal from "react-modal";
import { useState } from "react";
import { BsPlusCircleFill } from "react-icons/bs";
import CreateThreadForm from "./createThreadForm";

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
        ariaHideApp={false}
        isOpen={modalIsOpen}
        style={customStyleSheet}
        onRequestClose={closeModal}
        contentLabel="Create Thread Modal">
        <CreateThreadForm threadType={threadtype} />
      </Modal>
      <button className="fixed bottom-6 right-6" onClick={openModal}>
        <BsPlusCircleFill className="h-10 w-10" />
      </button>
    </>
  );
}

const customStyleSheet = {
  content: {
    margin: "auto",
    border: "none",
    width: "fit-content",
    height: "fit-content",
    boxShadow: "0 19px 38px rgba(0,0,0,0.30), 0 15px 12px rgba(0,0,0,0.22)",
  },
};
