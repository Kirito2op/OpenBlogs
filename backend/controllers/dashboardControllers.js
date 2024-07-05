import { getBlogs,getCollabBlogs,individualBlog } from "../sql/queries/dashboard1.js"; 

export async function userBlogs(connection , req , res){
    const { user_id } = req.body
    try{
        const [rows , fields] = await getBlogs(connection, user_id)
        res.status(200).json({rows : rows})

    }catch(err){
        console.log(err);
        res.status(500).json({message : 'Internal Server Error'})
    }
}


export async function userCollabBlogs(connection , req , res){
    const { user_id } = req.body
    try{
        const [rows , fields] = await getCollabBlogs(connection, user_id)
        res.status(200).json({rows : rows})

    }catch(err){
        console.log(err);
        res.status(500).json({message : 'Internal Server Error'})
    }
}

export async function indBlog(connection,req,res){
    const {blog_id} = req.body
    try{
        const [rows , fields] = await individualBlog(connection, blog_id)
        res.status(200).json({rows : rows})

    }catch(err){
        console.log(err);
        res.status(500).json({message : 'Internal Server Error'})
    }

}