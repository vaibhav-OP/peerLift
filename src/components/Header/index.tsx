import { BiSolidBell } from "react-icons/bi";
export default function Header() {
  return (
    <header className="flex gap-3 px-4 sm:px-12 py-3 h-20 items-center border-b shadow-md">
      <div className="text-primary font-bold text-2xl">PeerLift</div>
      <div className="grow">
        <input
          type="text"
          placeholder="search"
          className="w-full outline-none py-2 px-6 bg-text/25 rounded-3xl placeholder:text-white"
        />
      </div>
      <div>
        <BiSolidBell className="h-7 w-7" />
      </div>
    </header>
  );
}
