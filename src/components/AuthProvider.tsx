"use client";

import { SessionProvider } from "next-auth/react";
import Header from "./header";

type Props = {
  children: React.ReactNode;
};

export function AuthProvider({ children }: Props) {
  return (
    <SessionProvider>
      <div className="fixed w-full z-10 top-0">
        <Header />
      </div>
      {children}
    </SessionProvider>
  );
}
