import React from "react";

//  Components
import { SideMenu } from "../../components/SideMenu";

export const Home: React.FC<{}> = () => {
  return (
    <div className="page-home flex h-full">
      <SideMenu />
    </div>
  );
};
