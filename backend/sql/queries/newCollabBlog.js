export async function createCollabBlog(connection, user_id, title) {
    return await connection.query(
        `INSERT INTO collabblogs 
        (user_id, title) VALUES 
        (${user_id}, '${title}')`
    )
}

export async function getNewCollabBlog(connection, user_id, title) {
    return await connection.query(
        `select *from collabblogs where 
        user_id = ${user_id} and title = '${title}'`
    )
}

export async function addTagsNewCollabBlog(connection, blog_id,tag_id) {
    return await connection.query(
        `INSERT INTO collabblog_tags
        (blog_id, tag_id) VALUES 
        (${blog_id}, ${tag_id})`
    )
}

export async function addUsersNewCollabBlog(connection, blog_id,tag_id) {
    return await connection.query(
        `INSERT INTO collabblog_users
        (blog_id, user_id) VALUES 
        (${blog_id}, ${tag_id})`
    )
}