"use client";
import { useState, useRef } from "react";
import {
  ConfirmationResult,
  RecaptchaVerifier,
  signInWithPhoneNumber,
} from "firebase/auth";

import { useRouter } from "next/navigation";

import { InAppLinks } from "@/types/links";
import { auth as FirebaseAuth } from "@/firebase/config";

import OtpField from "./otpField";
import PhoneField from "./phoneField";
import toast from "react-hot-toast";

export default function LoginForm() {
  const route = useRouter();
  const [otp, setotp] = useState<string[]>(["", "", "", "", "", ""]);
  const [phone, setPhone] = useState("");
  const [dialCode, setDialCode] = useState("+91");
  const [final, setfinal] = useState<ConfirmationResult | null>(null);

  const verifyButtonRef = useRef<HTMLButtonElement>(null);

  const signin = () => {
    if (phone === "" || phone.length < 10) return;

    let verify = new RecaptchaVerifier(FirebaseAuth, "recaptcha-container");

    if (!verify || !verifyButtonRef.current) return;
    verifyButtonRef.current.disabled = true;

    signInWithPhoneNumber(FirebaseAuth, dialCode + phone, verify)
      .then(result => {
        setfinal(result);
      })
      .catch(err => {
        alert(err);
        console.log(err);
      });
  };

  const ValidateOtp = () => {
    if (otp === null || otp.length < 6 || final === null) return;
    final
      .confirm(otp.join(""))
      .then(() => {
        toast.success("Login successfull");
      })
      .catch(err => {
        console.log(err);
        alert("Wrong code");
      });
  };

  return (
    <div className="flex flex-col gap-4 justify-center items-center h-screen w-screen text-center">
      {final ? (
        <OtpField ValidateOtp={ValidateOtp} setOtp={setotp} otp={otp} />
      ) : (
        <PhoneField
          phone={phone}
          dialCode={dialCode}
          signin={signin}
          setPhone={setPhone}
          setDialCode={setDialCode}
          verifyButtonRef={verifyButtonRef}
        />
      )}
    </div>
  );
}
