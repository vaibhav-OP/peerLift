"use client";
import {
  PropsWithChildren,
  createContext,
  useContext,
  useEffect,
  useState,
} from "react";
import { doc, getDoc } from "firebase/firestore";
import { User, onAuthStateChanged } from "firebase/auth";

import { auth, db } from "@/firebase/config";
import LoginForm from "@/components/Forms/Login";
import RegistrationForm from "@/components/Forms/Registration";

import { UserData } from "@/types/user";

type UserInter = UserData & User;

interface AuthContextProps {
  user: UserInter | null;
}

export const AuthContext = createContext<AuthContextProps>({
  user: null,
});
export const useAuthContext = () => useContext(AuthContext);

export const AuthContextProvider = ({ children }: PropsWithChildren<{}>) => {
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState<UserInter | null>(null);
  const [isUserRegistered, setIsUserRegistered] = useState(true);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async newUser => {
      if (newUser) {
        const userRef = doc(db, "users", newUser.uid);
        const userSnap = await getDoc(userRef);

        if (!userSnap.exists()) {
          setIsUserRegistered(false);
        } else {
          newUser = Object.assign(newUser, userSnap.data());
        }

        setUser(newUser as UserInter);
        setLoading(false);
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
