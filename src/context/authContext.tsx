"use client";
import { usePathname, useRouter } from "next/navigation";
import {
  useEffect,
  useState,
  createContext,
  PropsWithChildren,
  useContext,
} from "react";
import { onAuthStateChanged } from "firebase/auth";
import { doc, getDoc, onSnapshot } from "firebase/firestore";
import { auth, db } from "@/firebase/config";
import LoadingSkeleton from "@/components/LoadingScreen";
import { UserData, mapUserToUserData } from "@/types/user";
import { InAppLinks } from "@/types/links";

interface AuthContextProps {
  user: UserData | null;
}

export const AuthContext = createContext<AuthContextProps>({
  user: null,
});
export const useAuthContext = () => useContext(AuthContext);

export const AuthContextProvider = ({ children }: PropsWithChildren<{}>) => {
  const router = useRouter();
  const pathname = usePathname();

  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState<UserData | null>(null);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async firebaseUser => {
      try {
        if (firebaseUser) {
          const userData = mapUserToUserData(firebaseUser);
          const userRef = doc(db, "users", userData.uid);
          const snapshot = await getDoc(userRef);

          if (snapshot.exists()) {
            setUser({
              ...snapshot.data(),
              uid: snapshot.id,
              registered: true,
            } as UserData);

            const userSnapshot = onSnapshot(userRef, docSnapshot => {
              if (docSnapshot.exists()) {
                setUser({
                  ...docSnapshot.data(),
                  uid: docSnapshot.id,
                  registered: true,
                } as UserData);
              } else {
                setUser(userData as UserData);
              }
            });

            setLoading(false);

            return () => {
              userSnapshot();
            };
          } else {
            setUser(userData as UserData);
            setLoading(false);
          }
        } else {
          setUser(null);
          setLoading(false);
        }
      } catch (error) {
        console.error("Error fetching user data:", error);
        setLoading(false);
      }
    });

    return () => {
      unsubscribe();
    };
  }, []);

  useEffect(() => {
    if (!loading) {
      if (!user && pathname !== InAppLinks.login) {
        router.push(InAppLinks.login);
      } else if (
        user &&
        !user.registered &&
        pathname !== InAppLinks.registration
      ) {
        router.push(InAppLinks.registration);
      } else if (
        user &&
        user.registered &&
        (pathname === InAppLinks.login || pathname === InAppLinks.registration)
      ) {
        router.push(InAppLinks.home);
      }
    }
  }, [loading, user, pathname, router]);

  return (
    <AuthContext.Provider value={{ user }}>
      {loading ? <LoadingSkeleton /> : children}
    </AuthContext.Provider>
  );
};
