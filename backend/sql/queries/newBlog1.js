export async function createBlog(connection, user_id, title,content,isPublic) {
    return await connection.query(
        `INSERT INTO blogs 
        (user_id, title,content,isPublic) VALUES 
        (${user_id}, '${title}','${content}',${isPublic?1:0})`
    )
}

export async function getNewBlog(connection, user_id, title,content,isPublic) {
    return await connection.query(
        `select *from blogs where 
        user_id = ${user_id} and title = '${title}' and content = '${content}' and isPublic = ${isPublic?1:0} order by publishedAt desc limit 0,1`,
    )
}

export async function addTagsNewBlog(connection, blog_id,tag_id) {
    return await connection.query(
        `INSERT INTO blog_tags
        (blog_id, tag_id) VALUES 
        (${blog_id}, ${tag_id})`
    )
}