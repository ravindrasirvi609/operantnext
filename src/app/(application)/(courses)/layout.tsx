import React from "react";
import HeaderNav from "../../header";
import CourseSidemenu from "@/components/courseSidemenu";
import { cn } from "@/lib/utils";

type LayoutProps = {
  children: React.ReactNode;
};

const Layout: React.FC<LayoutProps> = ({ children }) => {
  return (
    <div className="flex flex-col min-h-screen">
      <div className="flex flex-1 pt-16">
        <aside className="w-64 hidden md:block fixed top-20 left-0 h-full">
          <CourseSidemenu />
        </aside>
        <main className={cn("flex-1 ml-64 px-3 bg-gray-100 dark:bg-gray-900")}>
          {children}
        </main>
      </div>
    </div>
  );
};

export default Layout;
