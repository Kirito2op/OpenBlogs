import axios from "axios";
import { searchTags } from "./SearchAllBlogs";
import { useState,useEffect,useContext } from "react";
export default function Tags(){
    
    const { search123, setAddingTag } = useContext(searchTags);
    const [loading,setLoading] = useState(false)
    const [alltags,setAllTags] = useState([])
    const [search,setSearch] = useState("")
    const [resulttags,setResultTags] = useState([])
    const [addingtags,setAddingTags] = useState(new Set(search123))
    const [perfectMatch,setPerfectMatch] =useState(false)
    const handleChange = (event) => {
        const str = (event.target.value).trim();
        if(str.length>=3){
            setSearch(str)
        }
        else{
            setSearch("")
        }
    };
    function handleRemove(tag){
        setLoading(true)
        const newset = new Set(addingtags)
        newset.delete(tag)
        setAddingTags(newset)
        setLoading(false)
    };
    function handleAdding(id){
        setLoading(true)
        setAddingTags(previousState => new Set([...previousState, id]))
        setLoading(false)
    };
    const createTag = async() => {
        setLoading(true);
        const res = await axios.post(import.meta.env.VITE_BACKEND_URL + '/addtag', {tag_name:search})
        const data = res.data
        const rows1 = data["rows"][0]
        handleAdding(rows1)
        setAllTags([...alltags,rows1])
        setSearch("")
        setLoading(false)
    };

    useEffect(()=>{
        setLoading(true)
        const getBloggs = async()=>{
            const res = await axios.post(import.meta.env.VITE_BACKEND_URL + '/alltags');
            const data = res.data
            const rows1 = data["rows"]
            const rows2 = [];
            const makeArray = async(rows1)=>{
                for(let i=0;i<rows1.length;i++){
                    rows2.push(rows1[i])
                }
                setAllTags(rows2)
            }
            await makeArray(rows1)
        }
        getBloggs()
        setLoading(false)
    },[]);
    useEffect(()=>{
        setAddingTags(new Set(search123))
    },[search123])
    useEffect(()=>{
        setLoading(true)
        setPerfectMatch(false)
        if(search === ""){
            setResultTags([])
        }
        else{
            const flag = 0;
            const results = alltags.filter((s)=> s["tagname"].includes(search))
            setResultTags(results)
            results.map((tag)=>{
                if(tag.tagname===search){
                    setPerfectMatch(true)
                }
            })
        }
        setLoading(false)
    },[search])
    if(loading){
        return(
            <>Loading</>
        )
    }
    return(<>
        <button onClick={() => { console.log(addingtags, "hi"); setAddingTag(Array.from(addingtags)); }} className="bg-slate-900 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded mt-4">Apply Tags</button>
        
        <div className="py-4">
            <h1 className="text-lg font-semibold mt-4">Adding</h1>
            {[...addingtags].map((tag) => {
                return (
                    <div key={tag.id} className="flex justify-between items-center border-b border-gray-300 py-2">
                        <h1 className="text-m">{tag.tagname}</h1>
                        <button onClick={() => handleRemove(tag)} className="bg-gray-300 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded text-m">-</button>
                    </div>
                );
            })}
        </div>
        
        <input type="text" placeholder="Search tag..." onChange={handleChange} className="border border-gray-300 rounded-md p-2 mb-4" />
        {
            perfectMatch ?
            <h1 className="text-gray-500">Can't create tag, already exists</h1> :
            search.length > 3 ?
            <button onClick={createTag} className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">Create New Tag</button> :
            <h1 className="text-gray-500">Tag too small</h1>
        }
        {resulttags.length>0 && <h1 className="text-lg font-semibold mt-4">Results</h1>}
        {resulttags.map((tag) => {
            if (!addingtags.has(tag)) {
                return (
                    <div key={tag.id} className="flex justify-between items-center border-b border-gray-300 py-2">
                        <h1 className="text-m">{tag.tagname}</h1>
                        <button onClick={() => handleAdding(tag)} className="border-1px hover:bg-gray-700 text-black py-2 px-4 rounded text-m">+</button>
                    </div>
                )
            }
            return null;
        })}
    
        
    </>
    )
}
