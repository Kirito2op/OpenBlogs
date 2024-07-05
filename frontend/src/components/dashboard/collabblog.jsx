import axios from "axios";
import { useState, useEffect } from "react";
import useAuthStore from "../../zustand/authStore";
import ContentModal from "./modalcontent";
import DashBlogCard from "./DashBlogCard";
import Content from "../../pages/BlogPage";
import DashCollabBlogCard from "./DashCollabCard";
export function CollabBlogs({ setBlogCount}) {
  const authData = useAuthStore((state) => state.authdata);
  const [loading, setLoading] = useState(false);
  const [rows, setRows] = useState([]);
  const [open, setOpen] = useState(false);
  const [blogid, setBlogid] = useState(0);
  useEffect(() => {
    setLoading(true);
    const getBloggs = async () => {
      const res = await axios.post(
        import.meta.env.VITE_BACKEND_URL + "/dashboard/collabs",
        {
          user_id: authData.id,
        },
        {
          headers: {
            Authorization: `Bearer ${authData.token}`,
          },
        }
      );
      const data = res.data;
      const rows1 = data["rows"];
      const rows2 = [];
      const makeArray = async (rows1) => {
        for (let i = 0; i < rows1.length; i++) {
          rows2.push(rows1[i]);
        }
        setRows(rows2);
      };
      await makeArray(rows1);
      setBlogCount(rows1.length);
    };
    getBloggs();
    setLoading(false);
  }, []);
  if (loading) {
    return <>loading</>;
  } else {
    return (
      <>
        {
        rows.map((blog) => {
          return (
            <DashCollabBlogCard key={blog.id} blog={blog}/>
          );
        })}
      </>
    );
  }
}

/*

/**
 * v0 by Vercel.
 * @see https://v0.dev/t/UeAV6wyi8TD
 * Documentation: https://v0.dev/docs#integrating-generated-code-into-your-nextjs-app
 */
// import Link from "next/link"

// export default function Component() {
//   return (
//     <div className="px-4 py-6 md:px-6 md:py-12 lg:py-16">
//       <div className="space-y-2">
//         <h1 className="text-3xl font-bold tracking-tight sm:text-4xl xl:text-5xl">The Royal Jester</h1>
//         <div className="flex items-center space-x-3 text-gray-500 dark:text-gray-400">
//           <p className="font-semibold">23</p>
//           <p className="font-semibold">Followers</p>
//           <span className="h-6 w-px bg-gray-200 dark:bg-gray-800" />
//           <p className="font-semibold">12</p>
//           <p className="font-semibold">Blogs</p>
//         </div>
//       </div>
//       <div className="border-b border-gray-200 dark:border-gray-800" />
//       <div className="grid gap-6 pt-6 md:grid-cols-2">
//         {/* blogs go here */}
//         <div className="space-y-4">
//           <div className="space-y-2">
//             <h2 className="text-2xl font-bold tracking-tight">The Art of the Joke: A Masterclass in Mirth</h2>
//             <p className="text-gray-500 dark:text-gray-400">Posted on August 24, 2023</p>
//           </div>
//           <p>
//             Once upon a time, in a far-off land, there was a very lazy king who spent all day lounging on his throne.
//             One day, his advisors came to him with a problem: the kingdom was running out of money.
//           </p>
//           <div className="mt-4">
//             <Link className="text-base font-medium underline" href="#">
//               Read full article
//             </Link>
//           </div>
//         </div>
//         <div className="space-y-4">
//           <div className="space-y-2">
//             <h2 className="text-2xl font-bold tracking-tight">The Jester's Journal: Musings of a Mirthful Minstrel</h2>
//             <p className="text-gray-500 dark:text-gray-400">Posted on August 24, 2023</p>
//           </div>
//           <p>
//             Jokester began sneaking into the castle in the middle of the night and leaving jokes all over the place:
//             under the king's pillow, in his soup, even in the royal toilet. The king was furious, but he couldn't seem
//             to stop Jokester.
//           </p>
//           <div className="mt-4">
//             <Link className="text-base font-medium underline" href="#">
//               Read full article
//             </Link>
//           </div>
//         </div>
//       </div>
//     </div>
//   )
// }
