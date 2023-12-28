import ThreadOptions from "@/components/Modals/ThreadOptions";
import UpdateProfileModal from "@/components/Modals/UpdateProfile";
import { ThreadOptionsContextProvider } from "@/context/threadOptionContext";
import { UpdateProfileContextProvider } from "@/context/updateProfileContext";

export default function ProfileLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <ThreadOptionsContextProvider>
      <ThreadOptions />
      <UpdateProfileContextProvider>
        <UpdateProfileModal />
        {children}
      </UpdateProfileContextProvider>
    </ThreadOptionsContextProvider>
  );
}
