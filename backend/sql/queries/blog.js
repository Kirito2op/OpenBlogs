export async function createNewBlogSQL(connection, user_id, title, content, isPublic) {
    return await connection.query(
        `INSERT INTO blogs(user_id,title, content, isPublic )
        VALUES 
        ('${user_id}','${title}', '${content}','${isPublic}')`,
    )
}

export async function getAllBlogsSQL(connection, user_id) {
    return await connection.query(`
        SELECT b.id,b.title,b.content , b.user_id ,b.publishedAt, u.username
        FROM blogs b INNER JOIN users u
        ON b.user_id = u.id AND u.id != ${user_id}
    `)
}

export async function getAllWriterBlogs(connection, writerId) {
    return await connection.query(`
        SELECT b.id,b.title,SUBSTR(b.content,1,100) as content , b.user_id ,b.publishedAt, u.username
        FROM blogs b INNER JOIN users u
        ON b.user_id = u.id AND u.id = ${writerId}
    `)
}