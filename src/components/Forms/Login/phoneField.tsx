import Image from "next/image";
import { RefObject } from "react";

import SadGirlSvg from "../../../../public/Group.svg";
import SadBoySvg from "../../../../public/Group (1).svg";

import countries from "@/helper/countries.json";

export default function PhoneField({
  phone,
  dialCode,
  verifyButtonRef,
  signin,
  setPhone,
  setDialCode,
}: {
  phone: string;
  dialCode: string;
  verifyButtonRef: RefObject<HTMLButtonElement>;
  signin: () => void;
  setPhone: (value: string) => void;
  setDialCode: (value: string) => void;
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
      <div className="flex flex-col gap-3 w-72">
        <h6 className="font-bold text-base mb-2">
          You are not alone: <br />
          Discover a Community that cares!
        </h6>
        <div className="border rounded-[20px] py-2 px-2 gap-3 bg-secondary flex">
          <select
            className="bg-transparent appearance-none outline-none w-9 text-center border-r border-text"
            value={dialCode}
            onChange={e => setDialCode(e.target.value)}>
            {countries.map((country, index) => (
              <option
                key={`${index}_${country.dial_code}`}
                value={country.dial_code}
                title={`${country.dial_code} ${country.name}`}>
                {country.flag}
              </option>
            ))}
          </select>
          <input
            id="phone"
            name="phone"
            type="number"
            autoComplete="off"
            placeholder="Mobile Number"
            className="outline-none w-full appearance-none bg-transparent"
            value={phone}
            onChange={e => setPhone(e.target.value.trim())}
          />
        </div>
        <div>
          <button
            type="button"
            onClick={signin}
            className="bg-text rounded-[20px] text-background w-full py-2 text-2xl disabled:bg-text/40 disabled:cursor-not-allowed"
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
