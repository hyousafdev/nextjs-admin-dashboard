"use client";

import { createContext, useContext } from "react";
import type { SessionUser } from "@/lib/auth-types";

const CurrentUserContext = createContext<SessionUser | null>(null);

type CurrentUserProviderProps = {
  user: SessionUser;
  children: React.ReactNode;
};

export function CurrentUserProvider({
  user,
  children,
}: CurrentUserProviderProps) {
  return (
    <CurrentUserContext.Provider value={user}>
      {children}
    </CurrentUserContext.Provider>
  );
}

export function useCurrentUser(): SessionUser {
  const user = useContext(CurrentUserContext);

  if (!user) {
    throw new Error("useCurrentUser must be used inside the dashboard layout.");
  }

  return user;
}