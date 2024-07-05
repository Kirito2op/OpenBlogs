import axios from "axios";
import { useState,useEffect,createContext } from "react";
import Tags from "./Tags";
import { TabsTrigger, TabsList, TabsContent, Tabs } from "@/components/ui/tabs";
import useAuthStore from "@/zustand/authStore";
import FullScreenSpinner from "@/components/FullScreenSpinner";
import useLoadStateStore from "@/zustand/loadStateStore";
import BlogCard from "@/components/BlogCard";
export const searchTags = createContext();
export default function SearchForBlogs(){
    const [loading,setLoading] = useState(false)
    const [addingtag,setAddingTag] = useState([])
    const [sendingtags,setSendingTags] = useState([])
    const [search123,setSearch123] = useState([])
    const isAuth = useAuthStore((state) => state.isAuth);
    const authdata = useAuthStore((state) => state.authdata);
    const setIsLoading = useLoadStateStore((state) => state.setIsLoading);
    const [blogs, setBlogs] = useState([]);
    const [followerBlogs, setFollowerBlogs] = useState([]);
    useEffect(()=>{
        setSearch123(addingtag)
        // console.log(addingtag,"hello")
        setLoading(true)
        if(addingtag.length===0){
            getPublicBlogsWithNoTags(authdata , setIsLoading).then((blogs) => {
                setBlogs(blogs);
                console.log('amruth',blogs)
                setLoading(false)
            });
            getPublicBlogsWithNoTagsAndFollows(authdata,setIsLoading).then((blogs)=>{
                console.log('aahil',blogs);
                setFollowerBlogs(blogs)
                setLoading(false)
            });
        }
        else{
            console.log("hello",addingtag)
            getPublicBlogsWithTags(authdata,setIsLoading,addingtag).then((blogs)=>{
                setBlogs(blogs)
                setLoading(false)
                // console.log(addingtag)
            })
            getPublicBlogsWithTagsAndFollows(authdata,setIsLoading,addingtag).then((blogs)=>{
                // console.log(blogs);
                setFollowerBlogs(blogs)
                setLoading(false)
            })
        }
    },[addingtag,sendingtags])
    if(loading){
        return(
            <FullScreenSpinner/>
        )
    }
    return(<div className="flex p-8 md:flex-nowrap flex-wrap ">
        <div className="px-3 py-10 ">
            <searchTags.Provider value={{search123,setAddingTag}}>
                <Tags />
            </searchTags.Provider>
        </div>
        <div className="p-2 grow">
          <Tabs defaultValue="feed">
            <TabsList className="flex gap-4 overflow-auto pb-2 border-b-0">
              <TabsTrigger value="feed">Feed</TabsTrigger>
              <TabsTrigger value="for-you">For You</TabsTrigger>
            </TabsList>
                <div className="pb-3">
                    {addingtag.length===0?<h3 className="text-4xl font-bold pb-4 mt-4">Recently Added</h3>
                    :<div><h1 className="text-5xl font-bold pb-5">Search Based on Tags</h1>
                    <div className="flex flex-wrap gap-2">
                        {addingtag.map((tag)=>{
                            return(<h1 className="inline-block rounded-lg bg-gray-100 px-2 py-1 text-lg dark:bg-gray-800">{tag.tagname}</h1>)
                        })}
                    </div>
                    </div>}
                </div>
            <TabsContent value="feed">
                {/* ALL BLOGS */}
                {blogs.map((blog)=>{return<BlogCard key={blog.id} blog={blog} />})}    
            </TabsContent>
            <TabsContent value="for-you">
              {/* FOLLOWING ONLY BLOGS */}
              {followerBlogs.map((blog)=>{return<BlogCard key={blog.id} blog={blog} />})}   
            </TabsContent>
          </Tabs>
            
        </div>
    </div>)
}

async function getPublicBlogsWithNoTags(authdata,setLoading){
    const response = await axios.post(`${import.meta.env.VITE_BACKEND_URL}/noTags`,{});
    // console.log(response.rows);
    return response.data.rows;
}
async function getPublicBlogsWithTags(authdata,setLoading,addingtag){
    const tags1 = await Promise.all(addingtag.map(async (tag) => {
        return tag.id; 
    }));
    const response = await axios.post(`${import.meta.env.VITE_BACKEND_URL}/withTags`,{tags1});
    console.log(response.data.rows,tags1);
    return response.data.rows;
}

async function getPublicBlogsWithNoTagsAndFollows(authdata,setLoading){
    const response = await axios.post(`${import.meta.env.VITE_BACKEND_URL}/noTagsWithFollows`,{userId:authdata.id});
    // console.log(response.rows);
    return response.data.rows;
}

async function getPublicBlogsWithTagsAndFollows(authdata,setLoading,addingtag){
    const tags1 = await Promise.all(addingtag.map(async (tag) => {
        return tag.id; 
    }));
    const response = await axios.post(`${import.meta.env.VITE_BACKEND_URL}/withTagsAndFollows`,{tags1,userId:authdata.id});
    // console.log(response.data.rows,tags1);
    return response.data.rows;
}