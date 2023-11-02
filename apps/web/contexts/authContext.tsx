/* eslint-disable react-hooks/exhaustive-deps */
import React, { createContext, useState, useEffect, useMemo } from "react";
import { useRouter } from "next/router";
import { Child, User } from "@app/types";
import { auth, db } from "@app/api";
import { useSignInWithGithub, useSignOut } from "react-firebase-hooks/auth";
import { useDocument } from "react-firebase-hooks/firestore";
import { doc } from "firebase/firestore";

interface Prop {
  user: User | null;
  login: () => Promise<void>;
  logout: () => Promise<void>;
  isProfileComplete: boolean;
  isUserLoading: boolean;
}

export const AuthContext = createContext({} as Prop);

export const AuthProvider = ({ children }: Child) => {
  const router = useRouter();
  const [user] = useDocument(
    doc(db, "users", auth.currentUser ? auth.currentUser.uid : "xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx"),
  );

  const [signInWithGithub] = useSignInWithGithub(auth);
  const [signOut, isUserLoading] = useSignOut(auth);

  const isProfileComplete = useMemo(() => {
    if (!user) return false;
    return user.data()?.phno;
  }, [user]);

  const login = async () => {
    try {
      signInWithGithub(["user:email"]);
    } catch (err: any) {
      router.push("/error");
    }
  };

  const logout = async () => {
    await signOut();
  };

  const value = useMemo(
    () => ({
      user: user?.data() as User | null,
      isProfileComplete,
      login,
      isUserLoading,
      logout,
    }),
    [user, isProfileComplete, isUserLoading],
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
