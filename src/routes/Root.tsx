import React from "react";
import { Outlet } from "react-router-dom";
function Root() {
  return (
    <>
      Root header
      <Outlet />
      Root footer
    </>
  );
}

export default Root;
