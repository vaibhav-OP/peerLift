"use client";
import { doc, setDoc } from "firebase/firestore";
import { ChangeEvent, Fragment, useState } from "react";

import { db } from "@/firebase/config";
import useMultistepForm from "@/hooks/multiStepForm";
import { useAuthContext } from "@/context/authContext";

import interestList from "./interestList";
import { Interests, UserDetails } from "./types";

const genderOptiopns: UserDetails["gender"][] = ["male", "female"];

export default function RegistrationForm() {
  const { user } = useAuthContext();
  const [selectedInterest, setSelectedInterest] = useState<Interests[]>([]);
  const [userDetails, setUserDetails] = useState<UserDetails>({
    age: 0,
    bio: "",
    displayName: "",
    gender: "male",
  });

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
      return [...new Set([...prevInterests, interest])];
    });
  };

  const handleSubmit = async () => {
    if (!user) return;

    try {
      const userRef = doc(db, "users", user.uid);

      await setDoc(userRef, {
        ...userDetails,
        interests: selectedInterest,
      });

      window.location.reload();
    } catch (err) {
      alert("something went wrong");
    }
  };

  const { next, previous, step } = useMultistepForm([
    <Fragment key="userDetails">
      <div>
        <label htmlFor="displayName">Setup your username:</label>
        <label htmlFor="displayName">(Don&apos;t use your real name)</label>
        <input
          type="text"
          id="displayName"
          name="displayName"
          value={userDetails.displayName}
          onChange={handleUpdateUserDetails}
        />
      </div>
      <div>
        <label htmlFor="gender">Enter your gender:</label>
        <select name="gender" id="gender" onChange={handleUpdateUserDetails}>
          {genderOptiopns.map(value => (
            <option value={value} key={value}>
              {value}
            </option>
          ))}
        </select>
      </div>
      <div>
        <label htmlFor="age">Enter your age</label>
        <input
          id="age"
          name="age"
          type="number"
          value={userDetails.age}
          onChange={handleUpdateUserDetails}
        />
      </div>
      <div>
        <label htmlFor="bio">Choose a bio (optional):</label>
        <textarea
          id="bio"
          name="bio"
          value={userDetails.bio}
          onChange={handleUpdateUserDetails}
        />
      </div>
      <button onClick={handleNext}>next</button>
    </Fragment>,
    <Fragment key="userInterests">
      <section>
        {interestList.map(interest => (
          <button key={interest} onClick={() => handleUpdateInterest(interest)}>
            {interest}
          </button>
        ))}
      </section>
      <button onClick={handleBack}>back</button>
      <button onClick={handleSubmit}>submit</button>
    </Fragment>,
  ]);

  return step;
}
