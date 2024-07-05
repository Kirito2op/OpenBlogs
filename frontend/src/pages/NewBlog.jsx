import useAuthStore from "../zustand/authStore";
import { useState , useEffect,createContext } from "react";
import axios from "axios";
import useLoadStateStore from "@/zustand/loadStateStore";
import { TabsTrigger, TabsList, TabsContent, Tabs } from "@/components/ui/tabs";
import { Link } from "react-router-dom";
import Markdown from "react-markdown";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import Tags from "./Tags1";
export const searchTags = createContext();
export default function NewBLog(){
    const navigate = useNavigate();
    const [loading,setLoading] = useState(false)
    const [search123,setSearch123] = useState([])
    const [addingtag,setAddingTag] = useState([])
    const [title,setTitle] = useState("")
    const [content,setContent] = useState("")
    const [public1,setPublic] = useState(true)
    const [possible,setPossible] = useState(true)
    const isAuth = useAuthStore((state) => state.isAuth);
    const setIsLoading = useLoadStateStore((state) => state.setIsLoading);
    const authData = useAuthStore((state) => state.authdata);
    const handleChange = (event) => {
        const str = (event.target.value).trim();
        setTitle(str)
    };
    const handleChange1 = (event) => {
        const str = (event.target.value).trim();
        setContent(str)
    };
    const handleSubmit = async (event) => {
        setLoading(true)
        event.preventDefault(); 
        const escapedContent = content.replace(/'/g, "''");
        console.log('Form submitted with data:', title,content,authData);
        try{
            await InsertBlog(authData,addingtag,title,escapedContent,public1)
            alert('Blog Published');
            navigate(`/dashboard`)

        }catch(err){
                console.log(err)
        }

    };
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
                    <h1 className="text-2xl font-semibold">Create a new blog post</h1>
                </div>
            </header>
            <div className="flex-1 overflow-y-auto">
                <div className="px-4 py-6 md:px-6">
                    <div className="mx-auto prose max-w-4xl">
                        <form id="NewBlog">
                            <div className="space-y-6"><div>
                            <label forhtml="title" className="sr-only">
                            Title
                            </label>
                            <input type="text" onChange={handleChange} className="flex w-full rounded-md border-input bg-background px-3 py-2 ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 text-4xl font-bold tracking-tight border-0 box-shadow-none h-auto" id="title" placeholder="Title" required=""/>
                            </div>
                            <div>
                            <label forhtml="content" className="sr-only">
                            Content
                            </label>
                            {/* The markdown area */}
                            <Tabs defaultValue="feed">
                                <TabsList className="flex gap-4 overflow-auto pb-2 border-b-0">
                                    <TabsTrigger value="feed">Write</TabsTrigger>
                                    <TabsTrigger value="for-you">Preview</TabsTrigger>
                                </TabsList>
                                <TabsContent value="feed">
                                    {/* Raw markdown */}
                                    <textarea onChange={(e) => setContent(e.target.value)} value={content} className="flex w-full rounded-md border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 min-h-[200px] border-0 box-shadow-none" id="content" placeholder="Write your blog post here..."></textarea>
                                </TabsContent>
                                <TabsContent value="for-you">
                                    {/* Preview */}
                                    <Markdown className="prose min-h-60">{content}</Markdown>
                                </TabsContent>
                            </Tabs>
                            

                            </div>
                            </div>
                            <div className="flex flex-wrap p-2 gap-2 place-items-center">
                                Added Tags  
                                {addingtag.length===0?"  None":addingtag.map((tag)=>{
                                    return(<span className="inline-block font-bold rounded-lg bg-gray-100 px-2 py-1 text-m dark:bg-gray-800">{tag.tagname}</span>)
                                })}
                            </div>
                            <div className="flex space-x-6 p-2 place-items-center">
                                <div>{public1?'This Blog is Public':'This Blog is Private'}</div>
                                <button onClick={(event)=>{event.preventDefault();setPublic(!public1)}} className="inline-flex items-center justify-center whitespace-nowrap text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 bg-primary text-primary-foreground hover:bg-primary/90 h-9 rounded-md px-3">Change</button>
                            </div>
                            <div className="border-t">
                                <div className="px-4 py-4 md:px-6 md:py-6">
                                    <div className="flex items-center justify-between">
                                        {
                                            possible?<button type ='submit' onClick={handleSubmit} className="inline-flex items-center justify-center whitespace-nowrap text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 bg-primary text-primary-foreground hover:bg-primary/90 h-9 rounded-md px-3">Publish</button>
                                            :'Atleast one tag needs to be added'
                                        }      
                                    </div>
                                </div>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
            
        </div>
        </div>
        </div>
    )

}


async function InsertBlog(authData,addingtag,title,content,public1){
    const tags1 = await Promise.all(addingtag.map(async (tag) => {
        return tag.id; 
    }));
    const response = await axios.post(`${import.meta.env.VITE_BACKEND_URL}/NewBlog`,{tags1,title,content,authData,public1});
    return response.data.rows;
}

<Tabs defaultValue="feed">
    <TabsList className="flex gap-4 overflow-auto pb-2 border-b-0">
        <TabsTrigger value="feed">Write</TabsTrigger>
        <TabsTrigger value="for-you">Preview</TabsTrigger>
    </TabsList>
    <TabsContent value="feed">
        {/* Raw markdown */}
    </TabsContent>
    <TabsContent value="for-you">
        {/* Preview */}
    </TabsContent>
</Tabs>