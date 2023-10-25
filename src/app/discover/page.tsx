import Link from "next/link";

import { InAppLinks } from "@/types/links";
import InterestList from "@/components/Forms/Registration/interestList";

export default function DiscoverPage() {
  return (
    <ul>
      {InterestList.map(interest => (
        <li key={interest}>
          <Link href={`${InAppLinks.discover}/${interest}`}>{interest}</Link>
        </li>
      ))}
    </ul>
  );
}
