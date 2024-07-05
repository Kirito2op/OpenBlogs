import { getNewBlog,addTagsNewBlog,createBlog } from "../sql/queries/newBlog1.js"; 

export async function NewBlog(connection,req,res){
    const {tags1,title,content,authData,public1} = req.body
    const user_id = authData.id 
    const isPublic = public1
    try{
        const [rows , fields] = await createBlog(connection, user_id, title,content,isPublic)
        const [rows1 , fields1] = await getNewBlog(connection, user_id, title,content,isPublic)
        await tagsAdder(connection,rows1[0],tags1)   
        res.status(200).json({result : "Done"})
    }catch(err){
        console.log(err);
        res.status(500).json({message : 'Internal Server Error'})
    }
}

async function tagsAdder(connection,row,tags1){
    const result = []
    for(const tag of tags1){
        const [rows123 , fields] = await addTagsNewBlog(connection, row.id,tag)
    }
}