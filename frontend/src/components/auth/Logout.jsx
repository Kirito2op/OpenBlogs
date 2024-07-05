import React from "react";
import { redirect } from "react-router-dom";
import Cookies from "js-cookie";
import useAuthStore from "../../zustand/authStore";
import { Button } from "../ui/button";

export default function Logout() {
  const setIsAuth = useAuthStore((state) => state.setIsAuth);
  const setAuthData = useAuthStore((state) => state.setAuthData);

  function handleLogout() {
    Cookies.remove("auth");
    setIsAuth(false);
    setAuthData(null, null, null);
    redirect("/");
  }

  return <Button onClick={handleLogout} color="primary" variant="flat">Logout</Button>;
}