import { deleteBlog1,deleteBlog2,deleteBlog3,deleteBlog4,deleteCollabBlog1,deleteCollabBlog2,deleteCollabBlog4 } from "../sql/queries/deleteBlog.js";

export async function DeleteBlog(connection,req,res){
    const blog_id = req.body.blog_id
    try{
        await deleteBlog1(connection,blog_id)
        await deleteBlog2(connection,blog_id)
        await deleteBlog3(connection,blog_id)
        await deleteBlog4(connection,blog_id)
        res.status(200).json({result : "Done"})
    }catch(err){
        console.log(err);
        res.status(500).json({message : 'Internal Server Error'})
    }
}

export async function DeleteCollabBlog(connection,req,res){
    const blog_id = req.body.blog_id
    try{
        await deleteCollabBlog1(connection,blog_id)
        await deleteCollabBlog2(connection,blog_id)
        //await deleteBlog3(connection,blog_id)
        await deleteCollabBlog4(connection,blog_id)
        res.status(200).json({result : "Done"})
    }catch(err){
        console.log(err);
        res.status(500).json({message : 'Internal Server Error'})
    }
}
