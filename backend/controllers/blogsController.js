import { createNewBlogSQL,getAllBlogsSQL , getAllWriterBlogs } from "../sql/queries/blog.js";

// Post /blog/newblog
export async function createNewBlog(connection , req , res) {
    const { user_id,title, content, isPublic } = req.body
    try{
        await createNewBlogSQL(connection, user_id, title, content, isPublic)
        res.status(201).json({message : 'Blog Created Successfully'})
       
    } catch(err) {
        console.log(err);
        res.status(500).json({message : 'Internal Server Error'})
    }
}


// GET /blog/allblogs
export async function getAllBlogs(connection , req , res) {
    try{
        const user_id = req.query.userId
        const [rows,fields] = await getAllBlogsSQL(connection, user_id)
        res.status(200).json({blogs : rows})
    } catch(err) {
        console.log(err);
        res.status(500).json({message : 'Internal Server Error'})
    }
}

// GET /blog/writerblogs
export async function getWritersBlogs(connection , req , res) {
    try{
        const writerId = req.query.writerId
        const [rows,fields] = await getAllWriterBlogs(connection, writerId)
        res.status(200).json({blogs : rows})
    } catch(err) {
        console.log(err);
        res.status(500).json({message : 'Internal Server Error'})
    }
}