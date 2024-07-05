export async function createNewUserSQL(connection, username, password) {
    return await connection.query(
        `INSERT INTO users 
        (username, password) VALUES 
        ('${username}', '${password}')`,
    )
}

export async function getUserSQL(connection, username, password) {
    return await connection.query(
        `SELECT * FROM users 
        WHERE username = '${username}' AND password = '${password}'`
    )
}

// get userdetials and follower count and following count in one query
export async function getUserDetailsSQL(connection, userId) {
    return await connection.query(
        `SELECT u.id AS user_id,u.username,u.bio,
            (
                SELECT COUNT(*) 
                FROM follows 
                WHERE follower_id = u.id
            ) AS followers_count,
            (
                SELECT COUNT(*) 
                FROM follows 
                WHERE user_id = u.id
            ) AS following_count
        FROM users u
        WHERE u.id = ${userId}`
    )
}

// get followers count of a user
export async function getFollowerCountSQL(connection , userId) {
    return await connection.query(
        `select count(*) as follower_count from follows
        where follower_id = ${userId};`
    )
}

// get following count of a user
export async function getFollowingCountSQL(connection , userId) {
    return await connection.query(
        `select count(*) as following_count from follows
        where user_id = ${userId};`
    )
}

// user follows another user , do nothing if already following
export async function followSQL(connection , userId , follower_id) {
    return await connection.query(
        `INSERT IGNORE INTO follows (user_id, follower_id)
        VALUES (${userId}, ${follower_id});`
    )
}

// user unfollows another user , do nothing if not following
export async function unfollowSQL(connection , userId,  follower_id) {
    return await connection.query(
        `DELETE FROM follows 
        WHERE user_id = ${userId} AND follower_id = ${follower_id};`
    )
}

// check if follows or not
export async function isfollowingSQL(connection , userId , follower_id) {
    return await connection.query(
        `SELECT count(*) as isFollowing FROM follows 
        WHERE user_id = ${userId} AND follower_id = ${follower_id};`
    )
}