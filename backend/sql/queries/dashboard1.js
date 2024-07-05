export async function getBlogs(connection, user_id) {
    return await connection.query(
        `SELECT id,title,isPublic,publishedAt,SUBSTRING(content,1,100) as content FROM blogs 
        WHERE user_id = '${user_id}' order by publishedAt desc`
    )
}

export async function getCollabBlogs(connection, user_id) {
    return await connection.query(
        `SELECT id,title,SUBSTRING(content,1,100) as content,cb.user_id  FROM collabblogs cb
        WHERE exists(select 1 from collabblog_users cbu where cb.id = cbu.blog_id and cbu.user_id = ${user_id})`
    )
}

export async function individualBlog(connection, blog_id) {
    return await connection.query(
        `with upvotes(u) as (select count(*) from upvotes where blog_id= ${blog_id}),
        downvotes(d) as (select count(*) from downvotes where blog_id= ${blog_id})
        SELECT *FROM blogs ,upvotes,downvotes  
        WHERE id = ${blog_id}`
    )
}