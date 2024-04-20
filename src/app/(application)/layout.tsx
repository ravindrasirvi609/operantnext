import React from "react";
import HeaderNav from "../header";

type LayoutProps = {
  children: React.ReactNode;
};

const Layout: React.FC<LayoutProps> = ({ children }) => {
  return (
    <div>
      <HeaderNav />
      <main className="mt-8">{children}</main>
    </div>
  );
};

export default Layout;
