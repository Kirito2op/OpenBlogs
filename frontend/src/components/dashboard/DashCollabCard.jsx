import { Link } from "react-router-dom";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import useAuthStore from "../../zustand/authStore";
import useLoadStateStore from "@/zustand/loadStateStore";
import RemoveMarkdown from "remove-markdown";

export default function DashCollabBlogCard({ blog }) {
  const navigate = useNavigate();
  const isAuth = useAuthStore((state) => state.isAuth);
  const setIsLoading = useLoadStateStore((state) => state.setIsLoading);
  const authData = useAuthStore((state) => state.authdata);
  async function DeleteCollabBlog(blog_id){
    const resp = await axios.post(`${import.meta.env.VITE_BACKEND_URL}/DeleteCollabBlog`,{blog_id:blog_id,user_id:authData.id});
    return resp
  }
  const handleSubmit = async (event,blog_id) => {
    try{

        const res = await DeleteCollabBlog(blog_id)
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
      </div>
      <p>{RemoveMarkdown(blog.content + '...')}</p>
      <div className="mt-4">
        <Link className="text-base font-medium underline" to={`/collabblog/${blog.id}`}>
          Open and Complete Work
        </Link>
      </div>
      {
        (window.location.pathname==='/dashboard' && blog.user_id===authData.id)?<button onClick={(event)=>{handleSubmit(event,blog.id)}} className="bg-slate-900 hover:bg-gray-700 text-white font-bold py-2 text-sm px-1 rounded mt-4">Delete</button>
        :<></>
      }
      </div>
  );
}


