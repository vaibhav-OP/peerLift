import Image from "next/image";
import { Dispatch, SetStateAction } from "react";

import OtpInput from "@/components/OtpInput";

import Wave from "../../../../public/wave-haikei.svg";
import LockVector from "../../../../public/Lock Vector.svg";

export default function OtpField({
  otp,
  setOtp,
  ValidateOtp,
}: {
  otp: string[];
  setOtp: Dispatch<SetStateAction<string[]>>;
  ValidateOtp: () => void;
}) {
  return (
    <>
      <div className="absolute top-0 left-0 -z-10 w-full overflow-hidden">
        <Image
          src={Wave}
          alt=""
          className="w-full h-[750px] sm:h-[600px] object-cover"
        />
      </div>
      <div className="flex flex-col gap-10 mt-52">
        <Image
          src={LockVector}
          alt=""
          width={89}
          height={104}
          className="h-[104px] w-[89px] absolute left-0 right-0 top-36 mx-auto"
        />
        <OtpInput length={6} setOtpValue={setOtp} otpValue={otp} />
        <div>
          <h6 className="font-bold mix-blend-difference text-background">
            Enter Your OTP
          </h6>
          <div>
            <span>Kindly wait a few seconds for your</span>
            <br />
            <span>OTP in the given mobile number</span>
          </div>
        </div>
        <button
          type="button"
          onClick={ValidateOtp}
          className="bg-text rounded-[20px] text-background w-full py-2 text-2xl disabled:bg-slate-800 disabled:cursor-not-allowed">
          Next
        </button>
      </div>
    </>
  );
}
