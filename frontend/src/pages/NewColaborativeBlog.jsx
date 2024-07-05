import useAuthStore from "../zustand/authStore";
import { useState , useEffect,createContext,useRef } from "react";
import axios from "axios";
import useLoadStateStore from "@/zustand/loadStateStore";
import { useNavigate,Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import Tags from "./Tags2";
export const searchTags = createContext();
export default function NewColaborativeBLog(){
    const navigate = useNavigate();
    const [loading,setLoading] = useState(false)
    const [search123,setSearch123] = useState([])
    const [addingtag,setAddingTag] = useState([])
    const [title,setTitle] = useState("")
    const usernameref = useRef()
    const [possible,setPossible] = useState(true)
    const isAuth = useAuthStore((state) => state.isAuth);
    const setIsLoading = useLoadStateStore((state) => state.setIsLoading);
    const authData = useAuthStore((state) => state.authdata);
    const [allfriends,setAllFriends] =useState([])
    const [friendsSet,setFriendsSet] = useState(new Set())
    const [searchVal,setSearchVal] = useState("")
    
    const handleChange = (event) => {
        const str = (event.target.value).trim();
        setTitle(str)
        
    };
    const handelSearch = async()=>{
        setLoading(true)
        setSearchVal(usernameref.current.value)
        setLoading(false)
    }
    const handleAdd = (e) => {
        setLoading(true)
        setFriendsSet(prevSet => new Set(prevSet).add(e));
        
        setLoading(false)
      };
      const handleRemove = (item) => {
        setFriendsSet(prevSet => {
          const newSet = new Set(prevSet);
          newSet.delete(item);
          return newSet;
        });
      };
    const handelCreate = async()=>{
        if(title.length<5){
            alert("Title should be atleast 5 characters");
            return
        }
        console.log({
            user_id: authData.id,
            title: title,
            cofriends:[...friendsSet,{username:authData.username,id:authData.id}],
            tags:addingtag
          })
          try {
            const res = await axios.post(
                import.meta.env.VITE_BACKEND_URL + "/createcolab",
                {
                  user_id: authData.id,
                  title: title,
                  cofriends:[...friendsSet,{username:authData.username,id:authData.id}],
                  tags:addingtag
                }
            );
            alert('Done')
            navigate('/dashboard')
          } catch (error) {
            console.log(error)
          }
        
    }  
    useEffect(()=>{
        setIsLoading(true);
        setLoading(true)
        const getMyFriends = async()=>{
            const res = await axios.post(
                import.meta.env.VITE_BACKEND_URL + "/myfriends",
                {
                  user_id: authData.id,
                }
            );
            const data = res.data;
            setAllFriends(data.friends)
            setLoading(false)
        }
        try {
            getMyFriends()
        } catch (error) {
            console.log(error)
        }
        finally{
            setIsLoading(false)
        }
    },[])
    useEffect(()=>{
        if(addingtag.length===0){
            setPossible(false)
        }
        else{
            setPossible(true)
        }
    },[addingtag])
    if(loading)
        return(<>Loading</>)
    return(
        <div className="flex flex-row justify-items-start flex-wrap">
            <div className="px-4 py-6 md:px-6 md:py-12 lg:py-32 mx-auto lg:p-16">
                <searchTags.Provider value={{search123,setAddingTag}}>
                    <Tags />
                </searchTags.Provider>
            </div>
        
        <div className="px-4 py-6 md:px-6 md:py-12 lg:py-16 lg:w-3/5 mx-auto flex-grow">
            <Button onClick={()=>navigate(-1)} className=" my-6">{"< Go Back "}</Button>
            
        <div className="flex flex-col h-screen">
            <header className="sticky top-0 z-10 bg-white border-b">
                <div className="px-4 py-2 md:px-6">
                    <h1 className="text-2xl font-semibold">Create a New Colaborative blog post</h1>
                </div>
            </header>
            <div className="flex-1 overflow-y-auto">
                <div className="px-4 py-6 md:px-6">
                    <div className="mx-auto prose max-w-4xl">
                        <div id="NewBlog">
                            <div className="space-y-6"><div>
                            <label forhtml="title" className="sr-only">
                            Title
                            </label>
                            <input type="text" onChange={handleChange} className="flex w-full rounded-md border-input bg-background px-3 py-2 ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 text-4xl font-bold tracking-tight border-0 box-shadow-none h-auto" id="title" placeholder="Title will not be able to change later" required=""/>
                            </div>
                            </div>
                            <div className="m-5 flex w-full">
                                <div className="grow m-3">
                                    Search for Friends
                                    <input type="text" ref={usernameref} className="flex w-full rounded-md 
                                    border-input bg-background px-3 py-2 ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium 
                                    placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 
                                    disabled:cursor-not-allowed disabled:opacity-50 text-lg 
                                    font-normal tracking-tight border-0 box-shadow-none h-auto" id="title" placeholder="Friends Username"/>
                                    <Button onClick={(er)=>{er.preventdefault;handelSearch()}}>Search</Button>
                                    <div>
                                    {   
                                        allfriends.length!==0?
                                        allfriends.map((e,i)=>{
                                            if(friendsSet.has(e) || !e.username.includes(searchVal))
                                                return(<></>)
                                            
                                            return(
                                                
                                                <div key={i}><Link to={`/writers/${e.id}`} key={e.id} className=" no-underline">{e.username}</Link>
                                                <Button onClick={(er)=>{er.preventdefault;handleAdd(e)}}>Add</Button>
                                                </div>
                                            )
                                        }):"No Results"
                                    }
                                    </div>
                                </div>
                                <div className="grow m-3">
                                    Added Friends
                                    <div>
                                        {
                                            Array.from(friendsSet).map((e,i)=>{
                                                return(
                                                    <div key={`Added${i}`}><Link to={`/writers/${e.id}`} key={e.id} className=" no-underline">{e.username}</Link>
                                                    <Button onClick={(er)=>{er.preventdefault;handleRemove(e)}}>Remove</Button>
                                                    </div>
                                                )
                                            })
                                        }
                                    </div>
                                </div>
                            </div>
                            <div className="flex flex-wrap p-2 gap-2 place-items-center">
                                Added Tags May not be changed later:
                                {addingtag.length===0?"  None":addingtag.map((tag)=>{
                                    return(<span className="inline-block font-bold rounded-lg bg-gray-100 px-2 py-1 text-m dark:bg-gray-800">{tag.tagname}</span>)
                                })}
                            </div>
                            <div className="border-t">
                                <div className="px-4 py-4 md:px-6 md:py-6">
                                    <div className="flex items-center justify-between">
                                        {
                                            possible?<button type ='submit' onClick={handelCreate} className="inline-flex items-center justify-center whitespace-nowrap text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 bg-primary text-primary-foreground hover:bg-primary/90 h-9 rounded-md px-3">Create</button>
                                            :'Atleast one tag needs to be added'
                                        }      
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            
        </div>
        </div>
        </div>
    )

}
