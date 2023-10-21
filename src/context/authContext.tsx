"use client";
import {
  PropsWithChildren,
  createContext,
  useContext,
  useEffect,
  useState,
} from "react";
import { User, onAuthStateChanged } from "firebase/auth";

import { auth } from "@/firebase/config";

interface AuthContextProps {
  user: User | null;
}

export const AuthContext = createContext<AuthContextProps>({
  user: null,
});
export const useAuthContext = () => useContext(AuthContext);

export const AuthContextProvider = ({ children }: PropsWithChildren) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, newUser => {
      if (newUser) {
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
      {loading ? <>loading</> : children}
    </AuthContext.Provider>
  );
};
