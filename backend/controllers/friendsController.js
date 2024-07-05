import { getFriends,getRequests,getMyRequests, getSearchResults, sendRequest, removeRequest, acceptRequest } from "../sql/queries/friends.js";

export async function FriendsData(connection,req,res){
    const user_id = req.body.user_id;
    try {
        const [rows,fields] = await getFriends(connection,user_id)
        const [rows1,fields1] = await getRequests(connection,user_id)
        const [rows2,fields2] = await getMyRequests(connection,user_id)
        res.status(200).json({friends:rows,requests:rows1,myRequests:rows2})
    } catch (err) {
        console.log(err);
        res.status(500).json({message : 'Internal Server Error'})
    }
}

export async function OnlyMyFriendsData(connection,req,res){
    const user_id = req.body.user_id;
    try {
        const [rows,fields] = await getFriends(connection,user_id)
        res.status(200).json({friends:rows})
    } catch (err) {
        console.log(err);
        res.status(500).json({message : 'Internal Server Error'})
    }
}

export async function SearchForFriend(connection,req,res){
    const user_id = req.body.user_id,text = req.body.text;
    try {
        const [rows,fields] = await getSearchResults(connection,user_id,text)
        res.status(200).json({results:rows})
        
    } catch (error) {
        console.log(err);
        res.status(500).json({message : 'Internal Server Error'})
    }

}

export async function SendRequest(connection,req,res){
    const user_id = req.body.user_id,to_user_id = req.body.to_user_id;
    try {
        await sendRequest(connection,user_id,to_user_id)
        res.status(200).json({result:true})
        
    } catch (err) {
        console.log(err);
        res.status(500).json({message : 'Internal Server Error'})
    }
}

export async function RemoveRequest(connection,req,res){
    const user_id = req.body.user_id,to_user_id = req.body.to_user_id;
    try {
        await removeRequest(connection,user_id,to_user_id)
        res.status(200).json({result:true})
        
    } catch (err) {
        console.log(err);
        res.status(500).json({message : 'Internal Server Error'})
    }
}

export async function AcceptRequest(connection,req,res){
    const user_id = req.body.user_id,to_user_id = req.body.to_user_id;
    try {
        
        await acceptRequest(connection,user_id,to_user_id)
        await removeRequest(connection,user_id,to_user_id)
        
        res.status(200).json({result:true})
        
    } catch (err) {
        console.log(err);
        res.status(500).json({message : 'Internal Server Error'})
    }
}