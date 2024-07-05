/**
 * v0 by Vercel.
 * @see https://v0.dev/t/jxWLyLdy7P6
 * Documentation: https://v0.dev/docs#integrating-generated-code-into-your-nextjs-app
 */
import { Link } from "react-router-dom";
import { Avatar } from "@/components/ui/avatar";
import { Book, UserCircleIcon } from "lucide-react";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { MenuIcon, XIcon } from "lucide-react";
import Logout from "./auth/Logout";
import useAuthStore from "../zustand/authStore";
import {
  DropdownMenuTrigger,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuContent,
  DropdownMenu,
} from "@/components/ui/dropdown-menu";

export default function Component() {
  const isAuth = useAuthStore((state) => state.isAuth);
  const [menuOpen, setMenuOpen] = useState(false);
  return (
    <nav className="flex items-center gap-4 text-sm font-medium py-3 px-2">
      <div className="flex items-center gap-2">
        <Link className="flex items-center gap-2 font-bold" to="/">
          <Book className="h-8 w-8" />
          <span className="text-xl">OpenBlogs</span>
        </Link>
      </div>
      <div className="ml-auto flex items-center gap-8 font-bold relative">
        <button className="sm:hidden" onClick={() => setMenuOpen(!menuOpen)}>
          {menuOpen ? (
            <XIcon className="h-6 w-6" />
          ) : (
            <MenuIcon className="h-6 w-6" />
          )}
        </button>
        <div
          className={`sm:flex ${
            menuOpen
              ? "flex flex-col gap-4 absolute top-full right-0 bg-white p-4 rounded-lg shadow-md"
              : "hidden"
          }`}
        >
          <div className="flex gap-4 flex-wrap">
          <Link to="/blogs" className="hover:text-blue-500 duration-150">
            Blogs
          </Link>
          <Link to="/dashboard" className="hover:text-blue-500 duration-150">
            Dashboard
          </Link>
          <Link to="/newblog" className="hover:text-blue-500 duration-150">
            New Blog
          </Link>
          <Link to="/friends" className="hover:text-blue-500 duration-150">
            Friends
          </Link>
          </div>
        </div>
        {isAuth ? (
          <PopoverComponent />
        ) : (
          <Link to="/login">
            <Button>Login</Button>
          </Link>
        )}
      </div>
    </nav>
  );
}

function PopoverComponent() {
  const auth = useAuthStore((state) => state.authdata);
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          className="rounded-full border-gray-900 w-10 h-10"
          variant="ghost"
        >
          <Avatar className="w-8 h-8">
            <UserCircleIcon className="mx-auto my-auto" />
          </Avatar>
          <span className="sr-only">Toggle user menu</span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        <DropdownMenuItem className="">
          <strong>{auth?.username}</strong>
        </DropdownMenuItem>
        <DropdownMenuSeparator />
        <DropdownMenuItem>
          {" "}
          <Logout />
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
