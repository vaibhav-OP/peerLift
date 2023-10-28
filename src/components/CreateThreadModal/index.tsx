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
    <div className="py-3">
      <Modal
        ariaHideApp={false}
        isOpen={modalIsOpen}
        style={customStyleSheet}
        onRequestClose={closeModal}
        contentLabel="Create Thread Modal">
        <CreateThreadForm threadType={threadtype} />
      </Modal>
      <button
        className="sticky w-11/12 top-6 left-1/2 -translate-x-1/2 rounded-full py-4 text-center bg-secondary text-background"
        onClick={openModal}>
        <span className="text-xl">Create a Thread</span>
      </button>
    </div>
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
