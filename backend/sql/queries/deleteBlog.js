export async function deleteBlog1(connection, blog_id) {
    return await connection.query(
        `
        delete from blog_tags where blog_id = ${blog_id};
        `
    )
}

export async function deleteCollabBlog1(connection, blog_id) {
    return await connection.query(
        `
        delete from collabblog_tags where blog_id = ${blog_id};
        `
    )
}
export async function deleteBlog2(connection, blog_id) {
    return await connection.query(
        `
        
        delete from upvotes where blog_id = ${blog_id};
        
        `
    )
}
export async function deleteCollabBlog2(connection, blog_id) {
    return await connection.query(
        `
        delete from collabblog_users where blog_id = ${blog_id};
        `
    )
}
export async function deleteBlog3(connection, blog_id) {
    return await connection.query(
        `
        
        delete from downvotes where blog_id = ${blog_id};
        
        `
    )
}
export async function deleteBlog4(connection, blog_id) {
    return await connection.query(
        `
        
        delete from blogs where id = ${blog_id};
        `
    )
}
export async function deleteCollabBlog4(connection, blog_id) {
    return await connection.query(
        `
        
        delete from collabblogs where id = ${blog_id};
        `
    )
}