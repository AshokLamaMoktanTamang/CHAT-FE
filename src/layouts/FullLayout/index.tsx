import { FC, PropsWithChildren } from "react";
import { Outlet } from "react-router-dom";

const FullLayout: FC<PropsWithChildren> = ({ children }) => {
  return (
    <>
      FullLayout
      {children ?? <Outlet />}
    </>
  );
};

export default FullLayout;
