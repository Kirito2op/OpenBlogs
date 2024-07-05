/**
 * v0 by Vercel.
 * @see https://v0.dev/t/tIfz8vvTn5S
 * Documentation: https://v0.dev/docs#integrating-generated-code-into-your-nextjs-app
 */
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Link } from "react-router-dom";
import axios from "axios";
import Cookies from "js-cookie";
import React, { useState } from "react";
import useAuthStore from "../zustand/authStore";
import { useNavigate } from "react-router-dom";
import useLoadStateStore from "../zustand/loadStateStore";

export default function Login() {
  const router = useNavigate();
  const setIsLoading = useLoadStateStore((state) => state.setIsLoading);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [confirmpassword, setConfirmpassword] = useState("");
  const setAuthData = useAuthStore((state) => state.setAuthData);
  const setIsAuth = useAuthStore((state) => state.setIsAuth);


  async function handleSignUp() {
    if(username.length < 5 ) {
      alert("Username too small")
      return
    }
    if(confirmpassword !== password) {
      alert("Passwords dont match!")
      return
    }
    try {
      setIsLoading(true);
      const res = await axios.post(import.meta.env.VITE_BACKEND_URL + "/users/signup", {
        username: username,
        password: password,
      });
      const data = res.data;
      setAuthData(data.id, data.username, data.token);
      setIsAuth(true);
      Cookies.set("auth", JSON.stringify(data), { expires: 9 });
      router("/dashboard");
      setIsLoading(false);
    } catch (err) {
      setIsLoading(false);
      alert("Invalid username or password");
    }
  }

  return (
    <div className="flex items-center justify-center min-h-screen py-12 px-4 sm:px-6 lg:px-8">
    <div className="space-y-8">
      <div className="space-y-2">
        <h1 className="text-3xl font-bold">Sign Up</h1>
        <p className="text-gray-500 dark:text-gray-400">Create username and password below to sign up</p>
      </div>
      <div className="space-y-4">
        <div className="space-y-2">
          <Label htmlFor="username">username</Label>
          <Input onChange={(e) => setUsername(e.target.value)}  placeholder="username" required type="text" />
        </div>
        <div className="space-y-2">
          <Label htmlFor="password">Password</Label>
          <Input onChange={(e) => setPassword(e.target.value)}  id="password" required type="password" />
        </div>
        <div className="space-y-2">
          <Label htmlFor="password">Confirm password</Label>
          <Input onChange={(e) => setConfirmpassword(e.target.value)}  id="password" required type="password" />
        </div>
        <Button onClick={handleSignUp} className="w-full">Login</Button>
      </div>
      <div className="text-center text-sm">
        Already have account? 
        <Link className="underline" to="/login">
          Login 
        </Link>
      </div>
    </div>
  </div>
  );
}


