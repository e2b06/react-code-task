import React from "react";
import { Outlet, Link } from "react-router-dom";

export const SideMenu: React.FC<{}> = () => {
  return (
    <div>
      <h1>Side Menu Header</h1>
      <Link to="/contact"> contact </Link>
      <Outlet />
    </div>
  );
};
