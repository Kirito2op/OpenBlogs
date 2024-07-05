import { getAllTags,addTag,getTag} from "../sql/queries/tags1.js";

export async function allTags(connection,req,res){
    try{
        const [rows , fields] = await getAllTags(connection)
        res.status(200).json({rows : rows})

    }catch(err){
        console.log(err);
        res.status(500).json({message : 'Internal Server Error'})
    }

}

export async function addOneTag(connection,req,res){
    const {tag_name} = req.body
    try{
        await addTag(connection,tag_name)
        const [rows , fields] = await getTag(connection,tag_name)
        res.status(200).json({rows : rows})
    }catch(err){
        console.log(err);
        res.status(500).json({message : 'Internal Server Error'})
    }

}