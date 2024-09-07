import React from "react";
import { cn } from "@/lib/utils";

type LayoutProps = {
  children: React.ReactNode;
};

const Layout: React.FC<LayoutProps> = ({ children }) => {
  return (
    <div>
      <main
        className={cn("min-h-screen bg-background font-sans antialiased pt-20")}
      >
        {children}
      </main>
    </div>
  );
};

export default Layout;
