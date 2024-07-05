import React,{useEffect,useState,useRef} from "react";
import axios from "axios";
import useAuthStore from "@/zustand/authStore";
import useLoadStateStore from "@/zustand/loadStateStore";
import { useNavigate,Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

export default function Friends(){
    const navigate = useNavigate()
    const usernameRef = useRef()
    const [reload,setReload] = useState(true);
    const [friends,setFriends] = useState([])
    const [requests,setRequests] = useState([])
    const [myRequests,setMyRequests] = useState([])
    const isAuth = useAuthStore((state) => state.isAuth);
    const authData = useAuthStore((state)=>state.authdata)
    const setIsLoading = useLoadStateStore((state) => state.setIsLoading);
    const [searchResults,setSearchResults] = useState([])
    useEffect(()=>{
        setIsLoading(true);
        const getFriendsData = async() =>{
            const res = await axios.post(
                import.meta.env.VITE_BACKEND_URL + "/friends",
                {
                  user_id: authData.id,
                }
              );
              const data = res.data;
              setFriends(data.friends)
              setRequests(data.requests)
              setMyRequests(data.myRequests)
        }
        try {
            getFriendsData();
        } catch (error) {
            console.log(error)
        }
        finally{
            setIsLoading(false)
        }
    },[reload])
    
    const handelSearch = async() =>{
        if(usernameRef.current.value.length < 5){
            alert('Too small usename')
            return 
        }
        setIsLoading(true)
        try {
            const res = await axios.post(
                import.meta.env.VITE_BACKEND_URL + "/friends/search",
                {
                  user_id: authData.id,
                  text: usernameRef.current.value
                }
            );
            setSearchResults(res.data.results);

        } catch (error) {
            console.log(error)
        }
        finally{
            setIsLoading(false)
        }
    }

    const handelAdd = async(uid) =>{
        setIsLoading(true)
        try {
            const res = await axios.post(
                import.meta.env.VITE_BACKEND_URL + "/friends/addfriend",
                {
                  user_id: authData.id,
                  to_user_id: uid
                }
            );
            alert("Added")
            usernameRef.current.value=''
            setSearchResults([])
            setReload(prev=>!prev)
        } catch (error) {
            console.log(error)
            alert("Error")
        }
        finally{
            setIsLoading(false)
        }
    }

    const handelRemove=async(uid1,uid2)=>{
        setIsLoading(true)
        try {
            const res = await axios.post(
                import.meta.env.VITE_BACKEND_URL + "/friends/removeReq",
                {
                  user_id: uid1,
                  to_user_id: uid2
                }
            );
            alert("Removed")
            usernameRef.current.value=''
            setSearchResults([])
            setReload(prev=>!prev)
        } catch (error) {
            console.log(error)
            alert("Error")
        }
        finally{
            setIsLoading(false)
        }

    }

    const handelAccept = async(uid1,uid2)=>{
        setIsLoading(true)
        try {
            const res = await axios.post(
                import.meta.env.VITE_BACKEND_URL + "/friends/acceptReq",
                {
                  user_id: uid1,
                  to_user_id: uid2
                }
            );
            alert("Accepted")
            setReload(prev=>!prev)
        } catch (error) {
            console.log(error)
            alert("Error")
        }
        finally{
            setIsLoading(false)
        }

    }

    return(
        <>
            <div className="px-4 py-6 w-full flex">
                <div className="grow">
                    <div>My Friends</div>
                    <div className="flex-col">
                        {   friends.length!==0?
                            friends.map((e,i)=>{
                                return(
                                    <div><Link to={`/writers/${e.id}`} key={e.id}>{e.username}</Link></div>
                                )
                            }):"You Dont Have Any Friends"
                        }
                    </div>
                </div>
                <div className="grow flex-col">
                    <div className="">
                        <div>My Requests</div>
                        <div className="flex-col">
                        {   
                            myRequests.length!==0?
                            myRequests.map((e,i)=>{
                                return(
                                    <div><Link to={`/writers/${e.id}`} key={e.id}>{e.username}</Link>
                                    <Button onClick={(er)=>{er.preventdefault;handelRemove(authData.id,e.id)}}>Remove</Button>
                                    </div>
                                )
                            }):"You Have Not Sent Anyone a Requested"
                        }
                        </div>
                    </div>
                    <div className="">
                        <div>Requests</div>
                        <div className="flex-col">
                        {   
                            requests.length!==0?
                            requests.map((e,i)=>{
                                return(
                                    <div><Link to={`/writers/${e.id}`} key={e.id}>{e.username}</Link>
                                    <Button onClick={(er)=>{er.preventdefault;handelRemove(e.id,authData.id)}}>Reject</Button>
                                    <Button onClick={(er)=>{er.preventdefault;handelAccept(e.id,authData.id)}}>Accept</Button>
                                    </div>
                                )
                            }):"You Dont Have Any Friend Requests"
                        }
                        </div>
                    </div>
                    <div>
                        <div>Add New Friends</div>
                        <Input ref={usernameRef} placeholder="username" required type="text" />
                        <Button onClick={(e)=>{e.preventdefault;handelSearch()}} >Search</Button>
                        <div>
                            {   
                                searchResults.length!==0?
                                searchResults.map((e,i)=>{
                                    return(
                                        <div><Link to={`/writers/${e.id}`} key={e.id}>{e.username}</Link>
                                        <Button onClick={(err)=>{err.preventdefault;handelAdd(e.id)}}>Send</Button>
                                        </div>
                                    )
                                }):"No Matches Found"
                            }
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}