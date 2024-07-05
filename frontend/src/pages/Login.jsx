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
  const setAuthData = useAuthStore((state) => state.setAuthData);
  const setIsAuth = useAuthStore((state) => state.setIsAuth);

  async function handleLogin() {
    try {
      setIsLoading(true);
      const res = await axios.post(import.meta.env.VITE_BACKEND_URL + '/users/login', {
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
      alert("Invalid username or password");
      setIsLoading(false);
    }
  }

  return (
    <div className="flex items-center justify-center min-h-screen py-12 px-4 sm:px-6 lg:px-8">
    <div className="space-y-8">
      <div className="space-y-2">
        <h1 className="text-3xl font-bold">Login</h1>
        <p className="text-gray-500 dark:text-gray-400">Enter your username below to login to your account</p>
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
        <Button onClick={handleLogin} className="w-full">Login</Button>
      </div>
      <div className="text-center text-sm">
        Don't have an account? 
        <Link className="underline" to="/signup">
          Sign up
        </Link>
      </div>
    </div>
  </div>
  );
}


