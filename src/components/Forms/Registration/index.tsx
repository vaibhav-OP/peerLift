import { Fragment } from "react";

import useMultistepForm from "@/hooks/multiStepForm";

export default function RegistrationForm() {
  const handleNext = () => next();

  const handleBack = () => previous();

  const { next, previous, step } = useMultistepForm([
    <Fragment key="userDetails">
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
      <button onClick={handleNext}>next</button>
    </Fragment>,
    <Fragment key="userInterests">
      <label htmlFor="interest"></label>
      <select name="interest" id="interest" multiple>
        <option value="ocd">OCD</option>
        <option value="work/career">Work/Career</option>
      </select>
      <button onClick={handleBack}>back</button>
    </Fragment>,
  ]);

  return step;
}
