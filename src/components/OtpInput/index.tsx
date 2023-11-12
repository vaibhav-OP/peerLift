import { ChangeEvent, Dispatch, SetStateAction, useRef } from "react";

import SingleInput from "./SingleInput";

export default function OtpInput({
  length,
  otpValue,
  setOtpValue,
}: {
  length: number;
  otpValue: string[];
  setOtpValue: Dispatch<SetStateAction<string[]>>;
}) {
  const otpInputWrapper = useRef<HTMLDivElement>(null);

  const handleChangeValue = (
    e: ChangeEvent<HTMLInputElement>,
    position: number
  ) => {
    if (position > 6) return;
    const value = e.target.value;

    setOtpValue(currentOtpValue => {
      let tempOtpValue = [...currentOtpValue];
      tempOtpValue[position] = value;

      return tempOtpValue;
    });
  };

  const handleKeyUp = (
    e: React.KeyboardEvent<HTMLInputElement>,
    index: number
  ) => {
    const key = e.key;

    if (key === "ArrowLeft") {
      const prevInputField = otpInputWrapper.current?.children[index - 1] as
        | HTMLInputElement
        | undefined;

      prevInputField?.focus();
    } else if ((key >= "0" && key < "9") || key === "ArrowRight") {
      const nextInputField = otpInputWrapper.current?.children[index + 1] as
        | HTMLInputElement
        | undefined;

      nextInputField?.focus();
    }
  };

  return (
    <div className="flex gap-1 sm:gap-4 text-lg" ref={otpInputWrapper}>
      {[...Array(length)].map((x, i) => (
        <SingleInput
          key={`${i}_field`}
          value={otpValue[i]}
          onKeyUp={e => handleKeyUp(e, i)}
          onChange={e => handleChangeValue(e, i)}
        />
      ))}
    </div>
  );
}
