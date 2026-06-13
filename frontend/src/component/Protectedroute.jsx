import React from "react";
import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";

const Protectedroute = ({ children, role }) => {
  const user = useSelector((state) => state.auth.user);

  const loading = useSelector((state) => state.auth.loading);

  if (loading) return <h1>loading....</h1>;

  if (!user) return <Navigate to={"/login"} />;

  //check role
  if (role && user.role !== role) return <Navigate to={"/"} />;

  return children;
};

export default Protectedroute;
