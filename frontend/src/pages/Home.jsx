/**
 * v0 by Vercel.
 * @see https://v0.dev/t/HpKb1yKv21G
 * Documentation: https://v0.dev/docs#integrating-generated-code-into-your-nextjs-app
 */
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { TabsTrigger, TabsList, TabsContent, Tabs } from "@/components/ui/tabs";
import useAuthStore from "../zustand/authStore";
import { useState, useEffect } from "react";
import axios from "axios";
import useLoadStateStore from "../zustand/loadStateStore";
import BlogCard from "@/components/BlogCard";

export default function Component() {
  const isAuth = useAuthStore((state) => state.isAuth);
  const authdata = useAuthStore((state) => state.authdata);
  const setIsLoading = useLoadStateStore((state) => state.setIsLoading);
  const [blogs, setBlogs] = useState([]);

  // Fetching blogs from the server
  useEffect(() => {
    if (isAuth) {
      fetchAllBlogs(authdata , setIsLoading).then((blogs) => {
        setBlogs(blogs);
      });
    }
  }, [isAuth]);
  return (
    <>
      {/* SIDE BAR */}
      <div className="grid gap-6 lg:grid-cols-[300px_1fr] p-4">
        <div className="space-y-4">
          <h1 className="text-3xl font-bold tracking-tight">
            Welcome to the Blog
          </h1>
          <p className="text-gray-500 dark:text-gray-400">
            Your daily source of knowledge. Click on a blog to read more.
          </p>
          <div className="grid gap-4">
            <div className="flex gap-2">
              <Checkbox />
              <Label htmlFor="science">Science</Label>
            </div>
            <div className="flex gap-2">
              <Checkbox id="technology" />
              <Label htmlFor="technology">Technology</Label>
            </div>
            <div className="flex gap-2">
              <Checkbox id="music" />
              <Label htmlFor="music">Music</Label>
            </div>
          </div>
        </div>

        {/* MAIN CONTENT */}
        <div className="space-y-6">
          <Tabs defaultValue="feed">
            <TabsList className="flex gap-4 overflow-auto pb-2 border-b-0">
              <TabsTrigger value="feed">Feed</TabsTrigger>
              <TabsTrigger value="for-you">For You</TabsTrigger>
            </TabsList>
            <TabsContent value="feed">
              {/* ALL BLOGS */}
              <div className="grid gap-6">
                {blogs.map((blog) => (
                  <BlogCard key={blog.id} blog={blog} />
                ))}
              </div>
            </TabsContent>
            <TabsContent value="for-you">
              {/* FOLLOWING ONLY BLOGS */}
              <div className="grid gap-6">
                for now nothing
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </>
  );
}

/*********** Helper functions ****************/
// Fetching blogs from the server
async function fetchAllBlogs(authdata , setIsLoading) {
  setIsLoading(true)
  try {
    const response = await axios.get(`${import.meta.env.VITE_BACKEND_URL}/blog/allblogs`, {
      params: {
        userId: authdata.id,
      },
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    });
    console.log(response.data.blogs);
    setIsLoading(false)
    return response.data.blogs;
  } catch (err) {
    setIsLoading(false)
    alert("Error fetching blogs");
    console.log(err);
  }
}

