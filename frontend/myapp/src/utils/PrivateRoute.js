import React from "react";
import { useSelector } from "react-redux";
import { Outlet, Navigate } from "react-router-dom";
const PrivateRoutes = () => {
  let {user} = useSelector(state=>state.auth);
  return user ? <Outlet /> : <Navigate to="/" />;
};

export default PrivateRoutes;
