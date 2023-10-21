"use client";
import { useState } from "react";
import useMultistepForm from "@/hooks/multiStepForm";
import {
  ConfirmationResult,
  RecaptchaVerifier,
  signInWithPhoneNumber,
} from "firebase/auth";

import { auth as FirebaseAuth } from "@/firebase/config";

export default function LoginForm() {
  const [phone, setPhone] = useState("");
  const [otp, setotp] = useState("");
  const [final, setfinal] = useState<ConfirmationResult | null>(null);

  const signin = () => {
    if (phone === "" || phone.length < 10) return;

    let verify = new RecaptchaVerifier(FirebaseAuth, "recaptcha-container");
    signInWithPhoneNumber(FirebaseAuth, "+91" + phone, verify)
      .then(result => {
        alert("code sent");
        setfinal(result);
      })
      .catch(err => {
        alert(err);
        window.location.reload();
      });
  };

  const ValidateOtp = () => {
    if (otp === null || final === null) return;
    console.log(otp);
    final
      .confirm(otp)
      .then(result => {
        // success
        alert("done");
      })
      .catch(err => {
        console.log(err);
        alert("Wrong code");
      });
  };

  const handleNext = () => next;

  const { next, previous, step, currentStepIndex, steps } = useMultistepForm([
    <>
      <div>
        <label htmlFor="phone">Enter your phone number:</label>
        <input
          type="number"
          placeholder="+91"
          id="phone"
          name="phone"
          value={phone}
          onChange={e => setPhone(e.target.value)}
        />
        <div id="recaptcha-container"></div>
        <button onClick={signin} type="button">
          next
        </button>
      </div>
      <div>
        <h4>OTP Verification</h4>
        <label htmlFor="otp">Enter your phone number:</label>
        <button type="button">Resend otp X seconds...</button>
        <input
          type="number"
          id="otp"
          name="otp"
          value={otp}
          onChange={e => setotp(e.target.value)}
        />
        <button onClick={ValidateOtp} type="button">
          verify
        </button>
      </div>
    </>,
    <>
      <div>
        <label htmlFor="username">Setup your username:</label>
        <label htmlFor="username">(Don't use your real name)</label>
        <input type="text" id="username" name="username" />
      </div>
      <div>
        <label htmlFor="gender">Enter your gender:</label>
        <input type="text" id="gender" name="gender" />
      </div>
      <div>
        <label htmlFor="age">Enter your age</label>
        <input type="number" id="age" name="age" />
      </div>
      <div>
        <label htmlFor="bio">Choose a bio (optional):</label>
        <textarea id="bio" name="bio" />
      </div>
    </>,
    <>
      <label htmlFor="interest"></label>
      <select name="interest" id="interest" multiple>
        <option value="ocd">OCD</option>
        <option value="work/career">Work/Career</option>
      </select>
    </>,
  ]);

  return (
    <form className="flex flex-col">
      {step}
      <div>
        {currentStepIndex > 0 && (
          <button type="button" onClick={previous}>
            Back
          </button>
        )}
        {currentStepIndex < steps.length - 1 && (
          <button type="button" onClick={next}>
            Next
          </button>
        )}
      </div>
    </form>
  );
}
