"use client";
import {
  PropsWithChildren,
  createContext,
  useContext,
  useEffect,
  useState,
} from "react";
import { collection, doc, getDoc } from "firebase/firestore";
import { User, onAuthStateChanged } from "firebase/auth";

import { auth, db } from "@/firebase/config";
import RegistrationForm from "@/components/Forms/Registration";

interface AuthContextProps {
  user: User | null;
}

export const AuthContext = createContext<AuthContextProps>({
  user: null,
});
export const useAuthContext = () => useContext(AuthContext);

export const AuthContextProvider = ({ children }: PropsWithChildren) => {
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState<User | null>(null);
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

        setUser(newUser);
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
      ) : (
        !loading && !isUserRegistered && <RegistrationForm />
      )}
    </AuthContext.Provider>
  );
};
