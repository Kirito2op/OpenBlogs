export async function upvoteSQL(connection, user_id,  blog_id) {
    return await connection.query(
        `insert ignore into upvotes values (${user_id},${blog_id});`
    )
}

export async function downvoteSQL(connection, user_id,  blog_id) {
    return await connection.query(
        `insert ignore into downvotes values (${user_id},${blog_id});`
    )
}

export async function unupvoteSQL(connection, user_id,  blog_id) {
    return await connection.query(
        `delete from upvotes where user_id = ${user_id} and blog_id = ${blog_id};`
    )
}

export async function undownvoteSQL(connection, user_id,  blog_id) {
    return await connection.query(
        `delete from downvotes where user_id = ${user_id} and blog_id = ${blog_id};`
    )
}

export async function checkUpvoteSQL(connection, user_id, blog_id) {
    return await connection.query(
        `select count(*) as checkupvote from upvotes where user_id = ${user_id} and blog_id = ${blog_id};`
    )
}

export async function checkDownvoteSQL(connection, user_id, blog_id) {
    return await connection.query(
        `select count(*) as checkdownvote from downvotes where user_id = ${user_id} and blog_id = ${blog_id};`
    )
}

export async function getUpvotesSQL(connection, blog_id) {
    return await connection.query(
        `select count(*) as upvotes from upvotes where blog_id = ${blog_id};`
    )
}

export async function getDownvotesSQL(connection, blog_id) {
    return await connection.query(
        `select count(*) as downvotes from downvotes where blog_id = ${blog_id};`
    )
}