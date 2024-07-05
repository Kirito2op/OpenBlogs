import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import useAuthStore from "@/zustand/authStore";
import Markdown from "react-markdown";
import useLoadStateStore from "@/zustand/loadStateStore";
import { ArrowUpIcon ,ArrowDownIcon } from "lucide-react";
import axios from "axios";

export default function BlogPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const bid = id;
  const isAuth = useAuthStore((state) => state.isAuth);
  const setIsLoading = useLoadStateStore((state) => state.setIsLoading);
  const [upvoted, setUpvoted] = useState(false);
  const [downvoted, setDownvoted] = useState(false);
  const authData = useAuthStore((state) => state.authdata);
  const [votecount,setVoteCount] = useState(0);
  const [rows, setRows] = useState([]);
  useEffect(() => {
    setIsLoading(true);
    const getContent = async () => {
      const res = await axios.post(
        import.meta.env.VITE_BACKEND_URL + "/dashboard/blog",
        {
          blog_id: bid,
        }
      );
      // console.log(res);
      const data = res.data;
      const rows1 = data["rows"];
      setRows(rows1[0]);
      setVoteCount(rows1[0]["u"] - rows1[0]["d"]);
    };
    getContent();

    // check if upvoted or downvoted
    getVoteStats(bid, authData).then((res) => {
      if (res["checkupvote"] === 1) {
        setUpvoted(true);
      }
      if (res["checkdownvote"] === 1) {
        setDownvoted(true);
      }
    });    
    setIsLoading(false);
  }, [bid]);

  async function handleUpvote() {
    if (isAuth) {
      await upvoteBlog(bid, authData, downvoted );
      setUpvoted(true);
      if(downvoted) setDownvoted(false)
      else setUpvoted(true)
      setVoteCount(votecount + 1);
    } else {
      navigate("/login");
    }
  }

  async function handleDownvote() {
    if (isAuth) {
      await downvoteBlog(bid, authData, upvoted);
      setDownvoted(true);
      if(upvoted) setUpvoted(false)
      else setDownvoted(true)
      setVoteCount(votecount - 1);
    }
  } 

  const date = new Date(rows["publishedAt"]);

  return (
    <>
      <div className="px-4 py-6 md:px-6 md:py-12 lg:py-16 lg:w-3/5 mx-auto">
        <Button onClick={()=>navigate(-1)} className=" my-6">{"< Go Back "}</Button>
        <div className="space-y-2">
          <h1 className="text-3xl font-extrabold tracking-tight lg:text-4xl">
            {rows["title"]}
          </h1>
          <p className="text-gray-500 dark:text-gray-400">
            Posted on {date.toDateString()}
          </p>
        </div>
        <div className=" mx-auto py-6">
          <Markdown className="prose flex-grow min-w-full">{rows["content"]}</Markdown>
        </div>
        <div className="flex flex-row gap-2 place-items-center">
          <span className="text-sm font-semibold">{votecount} upvotes</span>
            <div className="flex items-center space-x-2">
              <Button onClick={() => !upvoted &&handleUpvote() } className={`h-10 ${upvoted && 'bg-gray-200 hover:bg-gray-200'}`} variant="outline">
                <ArrowUpIcon size={16} />
              </Button>
              
            </div>
            <div className="flex items-center space-x-2 justify-self-end">
              <Button onClick={() => !downvoted &&handleDownvote() } className={`h-10 ${downvoted && 'bg-gray-200 hover:bg-gray-200'}`} variant="outline">
                <ArrowDownIcon size={16} />
              </Button>
            </div>
        </div>
      </div>
    </>
  );
}

/**************** HELPER FUNCTION ***********************/

// check if upvoted or downvoted
export async function getVoteStats(blog_id,authData) {
  try {
    const res = await axios.get(import.meta.env.VITE_BACKEND_URL + "/votes/checkvote", {
      params: {
        user_id: authData.id,
        blog_id: blog_id,
      },
    });
    return res.data;
  } catch (err) {
    console.log(err);
  }
}

// upvote a blog
export async function upvoteBlog(blog_id, authData , isDownvoted) {
  try {
    if(isDownvoted) {
      // delete downvote
      await axios.post(import.meta.env.VITE_BACKEND_URL + "/votes/undownvote", {
        user_id: authData.id,
        blog_id: blog_id,
      });
    } else {
      // upvote
      await axios.post(import.meta.env.VITE_BACKEND_URL + "/votes/upvote", {
        user_id: authData.id,
        blog_id: blog_id,
      });
    }
  } catch (err) {
    console.log(err);
  }
}

// downvote a blog
export async function downvoteBlog(blog_id, authData , isUpvoted) {
  try {
    if(isUpvoted) {
      // delete upvote
      await axios.post(import.meta.env.VITE_BACKEND_URL + "/votes/unupvote", {
        user_id: authData.id,
        blog_id: blog_id,
      });
    } else {
      // downvote
      await axios.post(import.meta.env.VITE_BACKEND_URL + "/votes/downvote", {
        user_id: authData.id,
        blog_id: blog_id,
      });
    }
  } catch (err) {
    console.log(err);
  }
}