import Link from "next/link";

import { InAppLinks } from "@/types/links";
import { IoMdSettings } from "react-icons/io";

export default function ProfileHeader() {
  return (
    <header className="py-3 flex justify-between px-5 sm:px-8 text-background w-full absolute top-0 left-0">
      <Link href={InAppLinks.home}>
        <h3 className="font-bold text-2xl">PeerLift</h3>
      </Link>
      <button>
        <IoMdSettings className="text-4xl" />
      </button>
    </header>
  );
}
