import useAuthStore from "../zustand/authStore";
import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import DashBlogCard from "@/components/dashboard/DashBlogCard";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import useLoadStateStore from "@/zustand/loadStateStore";
import axios from "axios";

export default function WriterDashboard() {
  const setIsLoading = useLoadStateStore((state) => state.setIsLoading);
  const navigate = useNavigate()
  const isAuth = useAuthStore((state) => state.isAuth);
  const authData = useAuthStore((state) => state.authdata);
  const [writerDetails, setWriterDetails] = useState({});
  const [blogCount, setBlogCount] = useState(0);
  const [blogs, setBlogs] = useState([]);
  const { writerId } = useParams();
  const [isFollowing, setIsFollowing] = useState(false);

  useEffect(() => {
    (async () => {
      setIsLoading(true);
      const res1 = await getWriterDetails(writerId, authData);
      if (res1) {
        setWriterDetails(res1);
      }
      const res2 = await getWritersBlogs(writerId, authData);
      if (res2) {
        setBlogs(res2);
        setBlogCount(res2.length);
      }
      const res3 = await getFollowersFollowingCount(writerId, authData);
      if (res3) {
        setWriterDetails((prev) => ({
          ...prev,
          followers_count: res3.follower_count,
          following_count: res3.following_count,
        }));
      }
      const res4 = await checkIfFollowing(writerId, authData);
      if (res4) {
        setIsFollowing((res4 === 1 ? true : false));
      }
      setIsLoading(false);
    })();
  }, []);

  async function handleFollowUnfollow() {
    try {
      setIsLoading(true);
      if(isFollowing) {
        await unfollowWriter(writerId, authData);
        setIsFollowing(false);
        setWriterDetails((prev) => ({
          ...prev,
          followers_count: prev.followers_count - 1,
        }));
      } else {
        await followWriter(writerId, authData);
        setIsFollowing(true);
        setWriterDetails((prev) => ({
          ...prev,
          followers_count: prev.followers_count + 1,
        }));
      }
      setIsLoading(false);
    } catch(err) {
      alert("Error following/unfollowing writer")
      console.log(err);
      setIsLoading(false);
    }
  }


  return (
    <div className="px-4 py-6 md:px-6 md:py-12 lg:py-16">
      <Button onClick={()=> navigate(-1)} className="my-4">{"< Go back"}</Button>
      <div className="space-y-2">
        <h1 className="text-3xl font-bold tracking-tight sm:text-4xl xl:text-5xl">
          {writerDetails?.username}
        </h1>
        <div className="flex items-center space-x-3 text-blue-500 dark:text-gray-400">
          <p className="font-semibold">{writerDetails?.followers_count}</p>
          <p className="font-semibold">Followers</p>
          <span className="h-6 w-px bg-gray-200 dark:bg-gray-800" />
          <p className="font-semibold">{writerDetails?.following_count}</p>
          <p className="font-semibold">Following</p>
          <span className="h-6 w-px bg-gray-200 dark:bg-gray-800" />
          <p className="font-semibold">{blogCount}</p>
          <p className="font-semibold">Blogs</p>
          {writerDetails?.user_id !== authData.id && 
            <Button onClick={handleFollowUnfollow} >{!isFollowing ? 'Follow' : 'Unfollow'}</Button>}
        </div>
      </div>
      <div className="border-b border-gray-200 dark:border-gray-800" />
      <div className="grid gap-6 pt-6 md:grid-cols-2">
        {blogs.map((blog) => (
          <DashBlogCard key={blog.id} blog={blog} />
        ))}
      </div>
    </div>
  );
}


/*************************** HELPER FUNCTIONS ******************************/ 
// get writer's details from the server
export async function getWriterDetails(writerId, authData) {
  try {
    const res = await axios.get(
      import.meta.env.VITE_BACKEND_URL + "/users/details",
      {
        params: {
          userId: writerId,
        },
      },
      {
        headers: {
          Authorization: `Bearer ${authData.token}`,
        },
      }
    );
    return res.data.userdetails[0];
  } catch (error) {
    console.log(error);
    alert("Error fetching data");
    return null;
  }
}

//  get writer's blog and data from the server
export async function getWritersBlogs(writerId, authData) {
  try {
    const res = await axios.get(
      import.meta.env.VITE_BACKEND_URL + "/writers/blogs",
      {
        params: {
          writerId: writerId,
        },
      },
      {
        headers: {
          Authorization: `Bearer ${authData.token}`,
        },
      }
    );
    return res.data.blogs;
  } catch (error) {
    console.log(error);
    alert("Error fetching data");
    return null;
  }
}

// get follwers and following count
export async function getFollowersFollowingCount(writerId, authData) {
  try {
    const res = await axios.get(
      import.meta.env.VITE_BACKEND_URL + "/users/socialstats",
      {
        params: {
          userId: writerId,
        },
      },
      {
        headers: {
          Authorization: `Bearer ${authData.token}`,
        },
      }
    );
    return res.data;
  } catch (error) {
    console.log(error);
    alert("Error fetching data");
    return null;
  }
}

// see if already following the writer
export async function checkIfFollowing(writerId, authData) {
  try {
    const res = await axios.get(
      import.meta.env.VITE_BACKEND_URL + "/users/isfollowing",
      {
        params: {
          follower_id: writerId,
          userId: authData.id,
        },
      },
      {
        headers: {
          Authorization: `Bearer ${authData.token}`,
        },
      }
    );
    return res.data.isFollowing;
  } catch (error) {
    console.log(error);
    alert("Error fetching data");
    return null;
  }
}


// follow writer
export async function followWriter(writerId, authData) {
  try {
    const res = await axios.post(
      import.meta.env.VITE_BACKEND_URL + "/users/follow",
      {
        userId: authData.id,
        follower_id: writerId,
      },
      {
        headers: {
          Authorization: `Bearer ${authData.token}`,
        },
      }
    );
    return res.data;
  } catch (error) {
    console.log(error);
    alert("Error fetching data");
    return null;
  }
}

// unfollow writer
export async function unfollowWriter(writerId, authData) {
  try {
    const res = await axios.post(
      import.meta.env.VITE_BACKEND_URL + "/users/unfollow",
      {
        userId: authData.id,
        follower_id: writerId,
      },
      {
        headers: {
          Authorization: `Bearer ${authData.token}`,
        },
      }
    );
    return res.data;
  } catch (error) {
    console.log(error);
    alert("Error fetching data");
    return null;
  }
}