import useAuthStore from "../zustand/authStore";
import React,{useEffect,useState} from "react";

export default function AddBlog() {
  const isAuth = useAuthStore((state) => state.isAuth);
  const authData = useAuthStore((state) => state.authdata);
  if(!isAuth){
    return (
        <>
            Not Logged In
        </>
    )
  }
  const [title,setTitle] = useState("")
  const [content,setContent] = useState("")
  
  return (
    <div>
      <h1>Welcome {authData.username}</h1>
    </div>
  );
}
