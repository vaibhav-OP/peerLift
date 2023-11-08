"use client";
import {
  useState,
  useEffect,
  useContext,
  createContext,
  PropsWithChildren,
} from "react";
import { doc, onSnapshot } from "firebase/firestore";
import { onAuthStateChanged } from "firebase/auth";

import { auth, db } from "@/firebase/config";
import LoginForm from "@/components/Forms/Login";
import RegistrationForm from "@/components/Forms/Registration";

import { UserData } from "@/types/user";

interface AuthContextProps {
  user: UserData | null;
}

export const AuthContext = createContext<AuthContextProps>({
  user: null,
});
export const useAuthContext = () => useContext(AuthContext);

export const AuthContextProvider = ({ children }: PropsWithChildren<{}>) => {
  const [loading, setLoading] = useState(true);
  const [isUserRegistered, setIsUserRegistered] = useState(true);
  const [user, setUser] = useState<UserData | null>(null);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, authUser => {
      if (authUser) {
        const userRef = doc(db, "users", authUser.uid);
        const userSnapshot = onSnapshot(userRef, snapshot => {
          if (snapshot.exists()) {
            setUser({ ...snapshot.data(), uid: snapshot.id } as UserData);
            setLoading(false);
          } else {
            setUser(null);
            setIsUserRegistered(false);
            setLoading(false);
          }
        });
      } else {
        setLoading(false);
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
      ) : !user ? (
        <LoginForm />
      ) : !isUserRegistered ? (
        <RegistrationForm />
      ) : (
        <>{children}</>
      )}
    </AuthContext.Provider>
  );
};
