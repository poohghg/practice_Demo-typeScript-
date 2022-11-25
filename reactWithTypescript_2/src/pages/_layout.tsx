import React, { Suspense } from "react";
import { Outlet } from "react-router-dom";

const Layout: React.FC = () => {
  return (
    <div>
      아울렛자리
      <Suspense fallback={"loading..."}>
        <Outlet />
      </Suspense>
    </div>
  );
};

export default Layout;
