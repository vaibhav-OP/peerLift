"use client";
import clsx from "clsx";
import Image from "next/image";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";
import { ChangeEvent, useState } from "react";
import { doc, setDoc } from "firebase/firestore";

import { db } from "@/firebase/config";
import { InAppLinks } from "@/types/links";
import useMultistepForm from "@/hooks/multiStepForm";
import { useAuthContext } from "@/context/authContext";
import BackgroundImage from "@/../public/background-shape.svg";

import interestList from "./interestList";
import { Interests, UserDetails } from "./types";

const genderOptiopns: UserDetails["gender"][] = ["male", "female"];

export default function RegistrationForm() {
  const route = useRouter();
  const { user } = useAuthContext();

  const [selectedInterest, setSelectedInterest] = useState<Interests[]>([]);
  const [userDetails, setUserDetails] = useState({
    bio: "",
    gender: "male",
    displayName: "",
  });
  const [userDOB, setUserDOB] = useState(new Date());

  const handleNext = () => next();
  const handleBack = () => previous();

  const handleUpdateUserDetails = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setUserDetails(prevState => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleUpdateInterest = (interest: Interests) => {
    setSelectedInterest(prevInterests => {
      if (prevInterests.find(oldInterest => oldInterest == interest))
        return prevInterests.filter(oldInterest => oldInterest != interest);

      if (prevInterests.length >= 3) return prevInterests;
      return [...new Set([...prevInterests, interest])];
    });
  };

  const handleSubmit = async () => {
    if (!user) return;

    try {
      const userRef = doc(db, "users", user.uid);

      await setDoc(userRef, {
        ...userDetails,
        dob: userDOB,
        interests: selectedInterest,
      });

      toast.success("Registered successfull");
    } catch (err) {
      alert("something went wrong");
    }
  };

  const { next, previous, step } = useMultistepForm([
    <div
      key="userDetails"
      className="flex flex-col gap-7 h-full px-6 py-20 w-full max-w-xl m-auto">
      <h1 className="font-bold text-5xl text-center mb-6">Hello there!</h1>
      <input
        type="text"
        id="displayName"
        name="displayName"
        placeholder="Enter an anonymous name!"
        value={userDetails.displayName}
        onChange={handleUpdateUserDetails}
        className="bg-secondary rounded-2xl outline-none p-3 shadow-lg w-full"
      />

      <select
        id="gender"
        name="gender"
        onChange={handleUpdateUserDetails}
        className="bg-secondary rounded-2xl outline-none p-3 shadow-lg w-full appearance-none relative">
        {genderOptiopns.map(value => (
          <option value={value} key={value}>
            {value}
          </option>
        ))}
      </select>

      <input
        id="age"
        name="age"
        type="date"
        placeholder="Enter your age"
        onKeyDown={e => e.preventDefault()}
        value={userDOB.toISOString().slice(0, 10)}
        max={new Date().toISOString().slice(0, 10)}
        onClick={e => e.currentTarget.showPicker()}
        onChange={e => setUserDOB(new Date(e.target.value))}
        className="bg-secondary rounded-2xl outline-none p-3 shadow-lg w-full select-none"
      />

      <textarea
        id="bio"
        name="bio"
        placeholder="Write a bio... (Optional)"
        value={userDetails.bio}
        onChange={handleUpdateUserDetails}
        className="bg-secondary rounded-2xl outline-none p-3 shadow-lg w-full flex-grow"
      />

      <button
        onClick={handleNext}
        className="bg-text text-background w-full p-4 text-center rounded-full mt-12">
        Get Started
      </button>
    </div>,
    <>
      <Image
        alt=""
        src={BackgroundImage}
        className="w-fit h-[300%] bottom-[22%] object-cover object-top absolute -z-10 rotate-180"
      />
      <div
        key="userInterests"
        className="flex flex-col gap-7 h-full px-6 py-20 w-full max-w-xl m-auto">
        <h1 className="font-bold text-3xl text-left text-background">
          Choose Your Interests
          <span className="text-sm ml-7">Maximum 3!</span>
        </h1>
        <div className="flex gap-6 flex-wrap flex-row text-base font-semibold overflow-y-auto scrollbar-none">
          {interestList.map(interest => (
            <button
              key={interest}
              onClick={e => handleUpdateInterest(interest)}
              className={clsx(
                `bg-secondary py-2 px-3 rounded-full w-fit h-fit transition-all cursor-pointer hover:bg-transparent hover:border`,
                selectedInterest.includes(interest)
                  ? "bg-transparent border text-secondary hover:border-none hover:text-secondary hover:bg-secondary"
                  : "hover:text-secondary"
              )}>
              {interest}
            </button>
          ))}
        </div>
        <div className="mt-auto">
          <button
            onClick={handleBack}
            className="bg-text text-background py-2 text-center rounded-full w-full">
            Back
          </button>
          <button
            onClick={handleSubmit}
            className="bg-text text-background py-2 text-center rounded-full w-full mt-3">
            Submit
          </button>
        </div>
      </div>
    </>,
  ]);

  return <main className="h-full flex overflow-hidden">{step}</main>;
}
