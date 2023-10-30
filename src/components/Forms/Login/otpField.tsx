import Image from "next/image";

import Wave from "../../../../public/wave-haikei.svg";
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
