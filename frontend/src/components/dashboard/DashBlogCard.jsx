import { Link } from "react-router-dom";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import useAuthStore from "../../zustand/authStore";
import useLoadStateStore from "@/zustand/loadStateStore";
import RemoveMarkdown from "remove-markdown";

export default function DashBlogCard({ blog }) {
  const date = new Date(blog.publishedAt);
  const navigate = useNavigate();
  const isAuth = useAuthStore((state) => state.isAuth);
  const setIsLoading = useLoadStateStore((state) => state.setIsLoading);
  const authData = useAuthStore((state) => state.authdata);
  const handleSubmit = async (event,blog_id) => {
    try{

        const res = await DeleteBlog(blog_id)
        alert('Blog Deleted');
        window.location.reload()

    }catch(err){
            console.log(err)
    }

  };

  return (
    <div className=" space-y-4 p-3">
      <div className="space-y-2">
        <h2 className="text-2xl font-bold tracking-tight">{blog.title}</h2>
        <p className="text-gray-500 dark:text-gray-400">
          {date.toDateString()}
        </p>
      </div>
      <p>{RemoveMarkdown(blog.content + '...')}</p>
      <div className="mt-4">
        <Link className="text-base font-medium underline" to={`/blog/${blog.id}`}>
          Read full article
        </Link>
      </div>
      {
        (window.location.pathname==='/dashboard')?<button onClick={(event)=>{handleSubmit(event,blog.id,blog.user_id)}} className="bg-slate-900 hover:bg-gray-700 text-white font-bold py-2 text-sm px-1 rounded mt-4">Delete</button>
        :<></>
      }
      </div>
  );
}


async function DeleteBlog(blog_id){
  const resp = await axios.post(`${import.meta.env.VITE_BACKEND_URL}/DeleteBlog`,{blog_id});
  return resp
}