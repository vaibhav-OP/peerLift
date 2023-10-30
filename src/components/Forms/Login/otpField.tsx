import Image from "next/image";

import Vector from "../../../../public/Vector.svg";
import LockVector from "../../../../public/Lock Vector.svg";

export default function OtpField({
  otp,
  setOtp,
  ValidateOtp,
}: {
  otp: string;
  setOtp: (value: string) => void;
  ValidateOtp: () => void;
}) {
  return (
    <>
      <div className="fixed top-0 -z-10 overflow-hidden">
        <div className="relative">
          <Image
            src={LockVector}
            alt=""
            width={89}
            height={104}
            className="h-[104px] w-[89px] absolute left-0 right-0 top-36 mx-auto"
          />
          <Image
            src={Vector}
            width={691}
            height={738}
            alt=""
            className="h-[738px] w-[691px] sm:-translate-y-80"
          />
        </div>
      </div>
      <div className="flex flex-col gap-10 mt-52">
        <input
          type="number"
          name="phone"
          id="phone"
          value={otp}
          onChange={e => setOtp(e.target.value.trim())}
          placeholder="Enter OTP"
          className="border rounded-[20px] outline-none py-2 px-8 w-full bg-accent appearance-none"
        />
        <div>
          <h6 className="font-bold mix-blend-difference text-white">
            Enter Your OTP
          </h6>
          <div>
            <span className="mix-blend- text-white">
              Kindly wait a few seconds for your
            </span>
            <br />
            <span className="mix-blend-difference text-white">
              OTP in the given mobile number
            </span>
          </div>
        </div>
        <button
          type="button"
          onClick={ValidateOtp}
          className="bg-black rounded-[20px] text-white w-full py-2 text-2xl disabled:bg-slate-800 disabled:cursor-not-allowed">
          Next
        </button>
      </div>
    </>
  );
}
