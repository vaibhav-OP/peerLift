"use client";
import _ from "lodash";
import { motion } from "framer-motion";
import { FaXmark } from "react-icons/fa6";
import { ChangeEvent, useMemo, useState } from "react";

import Modal from "..";
import Avatar from "@/components/Avatar";
import { useAuthContext } from "@/context/authContext";
import { useUpdateProfileContext } from "@/context/updateProfileContext";

const varient = {
  show: {
    y: "0px",
  },
  hide: {
    y: "56px",
  },
};

export default function UpdateProfileModal() {
  const { user } = useAuthContext();
  const { isOpen, openThreadOptionModal, closeThreadOptionModal } =
    useUpdateProfileContext();

  const [updatedUserData, setUpdatedUserData] = useState<any>();

  const userDetails = useMemo(
    () => (
      <div className="flex gap-3 items-center">
        <Avatar
          width={96}
          height={96}
          src={user?.photoURL}
          name={user?.displayName as string}
          alt={`${user?.displayName}'s photo.`}
          className="rounded-full"
        />
        <div>
          <h4 className="font-bold text-2xl">{user?.displayName}</h4>
          <span>Date of birth: {user?.dob?.toDate().toLocaleDateString()}</span>
        </div>
      </div>
    ),
    [user]
  );

  const handleValueChange = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setUpdatedUserData((prevData: any) =>
      prevData
        ? {
            ...prevData,
            [e.target.name]: e.target.value,
          }
        : { [e.target.name]: e.target.value }
    );
  };

  const hasUpdated = !updatedUserData ? false : true;

  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={closeThreadOptionModal}
      contentClassName="p-5 flex flex-col gap-5">
      <button
        onClick={closeThreadOptionModal}
        className="absolute top-5 right-5">
        <FaXmark className="h-6 font-bold" />
      </button>
      {userDetails}
      <div className="h-full flex flex-col">
        <div className="flex items-center gap-3">
          <h1 className="font-medium text-xl">Your data</h1>
          <hr className="grow" />
        </div>
        <div className="flex flex-col flex-grow gap-4 mt-5">
          <div>
            <label htmlFor="displayName" className="text-sm font-bold">
              Display Name
            </label>
            <input
              type="text"
              id="displayName"
              name="displayName"
              className="p-2 w-full outline-none border-text/40 border-2 rounded-md"
              defaultValue={user?.displayName}
              onChange={handleValueChange}
            />
          </div>
          <div>
            <label htmlFor="Bio" className="text-sm font-bold">
              Bio
            </label>
            <textarea
              id="Bio"
              name="bio"
              className="p-2 w-full outline-none border-text/40 border-2 rounded-md resize-none"
              defaultValue={user?.bio}
              onChange={handleValueChange}
            />
          </div>
        </div>
        <motion.div
          className="absolute bottom-5 right-5"
          animate={hasUpdated ? "show" : "hide"}
          variants={varient}>
          <button className="bg-text py-1 px-4 rounded-lg font-semibold text-background text-lg">
            save
          </button>
        </motion.div>
      </div>
    </Modal>
  );
}
