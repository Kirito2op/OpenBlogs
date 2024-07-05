import {blogsNoTags} from "../sql/queries/searchBlogs12.js"
import { blogsWithTags,tagsWithTags,blogsWithTagsAndFollowersSQL , blogsNoTagsWithFollowsSQL} from "../sql/queries/searchBlogs12.js";

export async function BlogsNoTags(connection , req , res){
    try{
        const [rows , fields] = await blogsNoTags(connection)
        const rows12 = await tagsAdder(connection,rows)
        res.status(200).json({rows : rows12})

    }catch(err){
        console.log(err);
        res.status(500).json({message : 'Internal Server Error'})
    }
}

export async function BlogsWithTags(connection,req,res){
    const tags = req.body.tags1
    try{
        const [rows , fields] = await blogsWithTags(connection,tags)
        const rows12 = await tagsAdder(connection,rows)
        res.status(200).json({rows : rows12})
    }catch(err){
        console.log(err);
        res.status(500).json({message : 'Internal Server Error'})
    }
}

async function tagsAdder(connection,rows){
    const result = []
    for(const row of rows){
        const [rows123 , fields] = await tagsWithTags(connection,row.id)
        const x = row
        x.tags = rows123
        result.push(x)
    }
    //console.log(result)
    return result
}

// POST /withTagsAndFollows
export async function BlogsWithTagsAndFollowers(connection,req,res) {
    const tags = req.body.tags1
    const userId = req.body.userId
    try{
        const [rows , fields] = await blogsWithTagsAndFollowersSQL(connection,tags,userId)
        const rows12 = await tagsAdder(connection,rows)
        res.status(200).json({rows : rows12})
    }catch(err){
        console.log(err);
        res.status(500).json({message : 'Internal Server Error'})
    }
}

// POST /noTagsWithFollows
export async function BlogsNoTagsWithFollows(connection,req,res){
    const userId = req.body.userId
    try{
        const [rows , fields] = await blogsNoTagsWithFollowsSQL(connection,userId)
        const rows12 = await tagsAdder(connection,rows)
        res.status(200).json({rows : rows12})
    }catch(err){
        console.log(err);
        res.status(500).json({message : 'Internal Server Error'})
    }
}