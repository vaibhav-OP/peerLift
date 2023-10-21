"use client";
import { ReactElement } from "react";
import useMultistepForm from "@/hooks/multiStepForm";

export default function LoginForm() {
  const { next, previous, step, currentStepIndex, steps } =
    useMultistepForm(elements);

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

const elements: ReactElement[] = [
  <>
    <label htmlFor="phone">Enter your phone number:</label>
    <input type="number" placeholder="+91" id="phone" name="phone" />
    <div id="recaptcha-container"></div>
  </>,
  <>
    <h4>OTP Verification</h4>
    <label htmlFor="otp">Enter your phone number:</label>
    <button type="button">Resend otp X seconds...</button>
    <input type="number" id="otp" name="otp" />
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
];
