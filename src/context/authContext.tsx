"use client";
import {
  useState,
  useEffect,
  useContext,
  createContext,
  PropsWithChildren,
} from "react";
import { onAuthStateChanged } from "firebase/auth";
import { doc, onSnapshot } from "firebase/firestore";

const LoginForm = dynamic(() => import("@/components/Forms/Login"));
const RegistrationForm = dynamic(
  () => import("@/components/Forms/Registration")
);

import { UserData } from "@/types/user";
import { auth, db } from "@/firebase/config";
import dynamic from "next/dynamic";

interface AuthContextProps {
  user: UserData | null;
}

export const AuthContext = createContext<AuthContextProps>({
  user: null,
});
export const useAuthContext = () => useContext(AuthContext);

export const AuthContextProvider = ({ children }: PropsWithChildren<{}>) => {
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState<UserData | null>(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isUserRegistered, setIsUserRegistered] = useState(true);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, authUser => {
      if (authUser) {
        setIsAuthenticated(true);

        const userRef = doc(db, "users", authUser.uid);

        const userSnapshot = onSnapshot(userRef, snapshot => {
          if (snapshot.exists()) {
            setUser({ ...snapshot.data(), uid: snapshot.id } as UserData);
            setLoading(false);
          } else {
            setUser(authUser as UserData);
            setLoading(false);
            setIsUserRegistered(false);
          }
        });
      } else {
        setUser(null);
        setLoading(false);
        setIsAuthenticated(false);
      }
    });

    return () => {
      unsubscribe();
    };
  }, []);

  return (
    <AuthContext.Provider value={{ user }}>
      {loading ? (
        <>loading</>
      ) : !isAuthenticated ? (
        <LoginForm />
      ) : !isUserRegistered ? (
        <RegistrationForm />
      ) : (
        <>{children}</>
      )}
    </AuthContext.Provider>
  );
};
