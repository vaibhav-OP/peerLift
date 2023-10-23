"use client";
import { useState, useRef } from "react";
import PhoneInput from "react-phone-input-2";
import {
  ConfirmationResult,
  RecaptchaVerifier,
  signInWithPhoneNumber,
} from "firebase/auth";

import { auth as FirebaseAuth } from "@/firebase/config";

import "react-phone-input-2/lib/style.css";

export default function LoginForm() {
  const [otp, setotp] = useState("");
  const [phone, setPhone] = useState("");
  const [final, setfinal] = useState<ConfirmationResult | null>(null);

  const verifyButtonRef = useRef<HTMLButtonElement>(null);

  const signin = () => {
    if (phone === "" || phone.length < 10) return;

    let verify = new RecaptchaVerifier(FirebaseAuth, "recaptcha-container");

    if (!verify || !verifyButtonRef.current) return;
    verifyButtonRef.current.disabled = true;

    signInWithPhoneNumber(FirebaseAuth, "+" + phone, verify)
      .then(result => {
        setfinal(result);
      })
      .catch(err => {
        alert(err);
        console.log(err);

        // window.location.reload();
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

  return (
    <div className="h-screen flex justify-center gap-6 items-center flex-col w-fit mx-auto">
      {!final ? (
        <>
          <div className="text-center max-w-xs">
            <h1 className="font-bold text-[32px]">OTP VERIFICATION</h1>
            <div className="text-text/80">
              we will send you an <b className="text-text">One Time Password</b>{" "}
              one this mobile number
            </div>
          </div>
          <div className="flex flex-col w-10/12 max-w-xs text-center text-text/80">
            <label htmlFor="phone" className="text-sm font-bold">
              Enter Mobile Number
            </label>
            <div className="text-text font-bold">
              <PhoneInput
                country={"in"}
                containerStyle={{
                  paddingTop: 12,
                  paddingBottom: 25,
                }}
                inputStyle={{
                  padding: 0,
                  fontSize: 20,
                  width: "auto",
                  border: "none",
                  fontWeight: "bold",
                  textAlign: "center",
                  background: "transparent",
                }}
                buttonStyle={{
                  background: "transparent",
                  border: "none",
                  display: "none",
                }}
                value={phone}
                onChange={e => setPhone(e)}
              />
            </div>
            <span className="h-1 w-10/12 border-text/80 border-0 border-t mx-auto" />
          </div>
          <div id="recaptcha-container"></div>
          <button
            type="button"
            onClick={signin}
            className="bg-primary/40 text-background rounded-max w-10/12 max-w-sm py-4 px-10 mx-auto font-medium disabled:cursor-not-allowed"
            ref={verifyButtonRef}>
            Verify
          </button>
        </>
      ) : (
        <>
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
        </>
      )}
    </div>
  );
}
