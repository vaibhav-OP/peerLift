"use client";
import {
  useState,
  useEffect,
  useContext,
  createContext,
  PropsWithChildren,
} from "react";
import { doc, onSnapshot } from "firebase/firestore";
import { User as FirebaseUser, onAuthStateChanged } from "firebase/auth";

import { auth, db } from "@/firebase/config";
import LoginForm from "@/components/Forms/Login";
import RegistrationForm from "@/components/Forms/Registration";

import { UserData } from "@/types/user";

interface AuthContextProps {
  user: FirebaseUser | null;
  userData: UserData | null;
}

export const AuthContext = createContext<AuthContextProps>({
  user: null,
  userData: null,
});
export const useAuthContext = () => useContext(AuthContext);

export const AuthContextProvider = ({ children }: PropsWithChildren<{}>) => {
  const [loading, setLoading] = useState(true);
  const [isUserRegistered, setIsUserRegistered] = useState(true);
  const [user, setUser] = useState<FirebaseUser | null>(null);
  const [userData, setUserData] = useState<UserData | null>(null);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, authUser => {
      if (authUser) {
        setUser(authUser);

        const userRef = doc(db, "users", authUser.uid);
        const userSnapshot = onSnapshot(userRef, snapshot => {
          if (snapshot.exists()) {
            setUserData({ ...snapshot.data(), uid: snapshot.id } as UserData);
            setLoading(false);
          } else {
            setUserData(null);
            setIsUserRegistered(false);
            setLoading(false);
          }
        });
      } else {
        setUser(null);
        setLoading(false);
      }
    });

    return () => {
      unsubscribe();
    };
  }, []);

  return (
    <AuthContext.Provider value={{ user, userData }}>
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
