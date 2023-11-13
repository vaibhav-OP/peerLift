"use client";
import {
  useState,
  useEffect,
  useContext,
  createContext,
  PropsWithChildren,
} from "react";
import { onAuthStateChanged } from "firebase/auth";
import { doc, getDoc, collection, getFirestore } from "firebase/firestore";

const LoginForm = dynamic(() => import("@/components/Forms/Login"));
const RegistrationForm = dynamic(
  () => import("@/components/Forms/Registration")
);

import { UserData } from "@/types/user";
import { auth } from "@/firebase/config";
import dynamic from "next/dynamic";

interface AuthContextProps {
  user: UserData | null;
}

export const AuthContext = createContext<AuthContextProps>({
  user: null,
});

export const useAuthContext = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuthContext must be used within an AuthProvider");
  }
  return context;
};

const AuthContent = ({ children, loading, user, isUserRegistered }: any) => {
  if (loading) {
    return <>Loading...</>;
  }

  if (!user) {
    return <LoginForm />;
  }

  if (!isUserRegistered) {
    return <RegistrationForm />;
  }

  return <>{children}</>;
};

export const AuthContextProvider = ({ children }: PropsWithChildren<{}>) => {
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState<UserData | null>(null);
  const [isUserRegistered, setIsUserRegistered] = useState(true);

  useEffect(() => {
    const db = getFirestore();

    const unsubscribe = onAuthStateChanged(auth, async authUser => {
      if (authUser) {
        const userRef = doc(collection(db, "users"), authUser.uid);

        try {
          const userSnapshot = await getDoc(userRef);

          if (userSnapshot.exists()) {
            setUser({
              ...userSnapshot.data(),
              uid: userSnapshot.id,
            } as UserData);
          } else {
            setUser(null);
            setIsUserRegistered(false);
          }
        } catch (error) {
          console.error("Error fetching user data:", error);
          setUser(null);
        } finally {
          setLoading(false);
        }
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
      <AuthContent
        loading={loading}
        user={user}
        isUserRegistered={isUserRegistered}>
        {children}
      </AuthContent>
    </AuthContext.Provider>
  );
};
