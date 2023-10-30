import Image from "next/image";
import { RefObject } from "react";

import SadGirlSvg from "../../../../public/Group.svg";
import SadBoySvg from "../../../../public/Group (1).svg";

export default function PhoneField({
  phone,
  signin,
  setPhone,
  verifyButtonRef,
}: {
  phone: string;
  signin: () => void;
  setPhone: (value: string) => void;
  verifyButtonRef: RefObject<HTMLButtonElement>;
}) {
  return (
    <>
      <div className="flex flex-col gap-3">
        <div className="flex">
          <Image
            src={SadGirlSvg}
            alt=""
            width={138}
            height={152}
            className="h-[152px] w-[138px] object-cover"
          />
          <Image
            src={SadBoySvg}
            alt=""
            width={138}
            height={152}
            className="h-[152px] w-[138px] object-cover"
          />
        </div>
        <h1 className="font-semibold text-2xl">
          Welcome to <br />
          <span className="text-[44px]">PeerLift</span>
        </h1>
      </div>
      <div className="flex flex-col gap-3">
        <h6 className="font-bold text-base mb-2">
          You are not alone: <br />
          Discover a Community that cares!
        </h6>
        <div>
          <input
            type="number"
            name="phone"
            id="phone"
            value={phone}
            onChange={e => setPhone(e.target.value.trim())}
            placeholder="Enter mobile number"
            className="border rounded-[20px] outline-none py-2 px-8 w-full bg-accent appearance-none"
          />
        </div>
        <div>
          <button
            type="button"
            onClick={signin}
            className="bg-black rounded-[20px] text-white w-full py-2 text-2xl disabled:bg-slate-800 disabled:cursor-not-allowed"
            ref={verifyButtonRef}>
            Get OTP
          </button>
        </div>
        <div id="recaptcha-container" />
      </div>
      <div className="font-bold">
        <span>By signing up,you are agree to our</span>
        <br />
        <span className="text-primary">Terms of Service & privacy </span>
      </div>
    </>
  );
}
