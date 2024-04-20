import React from "react";
import HeaderNav from "../header";

type LayoutProps = {
  children: React.ReactNode;
};

const Layout: React.FC<LayoutProps> = ({ children }) => {
  return (
    <div>
      {/* Add your header component here */}
      <HeaderNav />
      <main>{children}</main>

      {/* Add your footer component here */}
    </div>
  );
};

export default Layout;
