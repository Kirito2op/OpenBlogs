import { createCollabBlog, getNewCollabBlog,addTagsNewCollabBlog,addUsersNewCollabBlog } from "../sql/queries/newCollabBlog.js";

export async function NewCollabBlog(connection,req,res){
    const {user_id,title,cofriends,tags} = req.body;
    try {
        await createCollabBlog(connection,user_id,title)
        const [rows,feilds] = await getNewCollabBlog(connection,user_id,title)
        const id = rows[0].id;
        await collabTagsAdder(connection,id,tags)
        await collabUsersAdder(connection,id,cofriends)
        res.status(200).json({result : "Done"})
    } catch (error) {
        console.log(error)
        res.status(500).json({message : 'Internal Server Error'})
    }
}

async function collabTagsAdder(connection,id,tags){
    const result = []
    for(const tag of tags){
        const [rows123 , fields] = await addTagsNewCollabBlog(connection,id,tag.id)
    }
}

async function collabUsersAdder(connection,id,cofriends){
    const result = []
    for(const tag of cofriends){
        const [rows123 , fields] = await addUsersNewCollabBlog(connection,id,tag.id)
    }
}