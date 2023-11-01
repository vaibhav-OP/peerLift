import Link from "next/link";

import { InAppLinks } from "@/types/links";

export default function LogoHeader() {
  return (
    <header className="py-3 px-5 sm:px-8 sticky top-0 left-0 bg-background">
      <Link href={InAppLinks.home}>
        <h3 className="text-text font-bold text-2xl">PeerLift</h3>
      </Link>
    </header>
  );
}
