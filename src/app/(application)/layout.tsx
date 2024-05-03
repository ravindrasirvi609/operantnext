import React from "react";
import HeaderNav from "../header";
import { cn } from "@/lib/utils";

type LayoutProps = {
  children: React.ReactNode;
};

const Layout: React.FC<LayoutProps> = ({ children }) => {
  return (
    <div>
      <div>
        <HeaderNav />
      </div>
      <main
        className={cn("min-h-screen bg-background font-sans antialiased pt-24")}
      >
        {children}
      </main>
    </div>
  );
};

export default Layout;
