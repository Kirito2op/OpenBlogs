export async function blogsNoTags(connection) {
    return await connection.query(
        `
        SELECT b.*, u.username AS username,
        (SELECT COUNT(*) FROM upvotes WHERE blog_id = b.id) -
        (SELECT COUNT(*) FROM downvotes WHERE blog_id = b.id) AS net_votes
        FROM blogs b
        JOIN users u ON u.id = b.user_id
        WHERE b.isPublic = 1
        ORDER BY net_votes DESC, b.publishedAt DESC
        `
    );
}


export async function blogsWithTags(connection, tags) {
    return await connection.query(
        `WITH ids AS (
            SELECT DISTINCT b1.id
            FROM blogs b1, blog_tags t1
            WHERE t1.blog_id = b1.id
            AND t1.tag_id IN (?)
        )
        SELECT b.*, u.username AS username,
        (SELECT COUNT(*) FROM upvotes WHERE blog_id = b.id) -
        (SELECT COUNT(*) FROM downvotes WHERE blog_id = b.id) AS net_votes
        FROM blogs b
        JOIN users u ON u.id = b.user_id
        JOIN ids i ON i.id = b.id
        WHERE b.isPublic = 1
        ORDER BY net_votes DESC, b.publishedAt DESC
        `,
        [tags]
    );
}


export async function tagsWithTags(connection, id) {
    return await connection.query(
        `
        SELECT t2.*
        FROM tags t2, blog_tags t3
        WHERE t2.id = t3.tag_id
        AND t3.blog_id = ?
        ORDER BY t2.tagname
        `,
        [id]
    );
}

export async function blogsWithTagsAndFollowersSQL(connection, tags, userId) {
    return await connection.query(
        `WITH ids AS (
            SELECT DISTINCT b1.id
            FROM blogs b1, blog_tags t1
            WHERE t1.blog_id = b1.id
            AND t1.tag_id IN (?)
        )
        SELECT b.*, u.username AS username,
        (SELECT COUNT(*) FROM upvotes WHERE blog_id = b.id) -
        (SELECT COUNT(*) FROM downvotes WHERE blog_id = b.id) AS net_votes
        FROM blogs b
        JOIN users u ON u.id = b.user_id
        JOIN ids i ON i.id = b.id
        LEFT JOIN follows f ON f.user_id = ? AND f.follower_id = b.user_id
        WHERE isPublic = 1
        AND (f.user_id IS NOT NULL OR b.user_id = ?)
        ORDER BY net_votes DESC, b.publishedAt DESC
        `,
        [tags, userId, userId]
    );
}

export async function blogsNoTagsWithFollowsSQL(connection, userId) {
    return await connection.query(
        `
        SELECT b.*, u.username AS username,
        (SELECT COUNT(*) FROM upvotes WHERE blog_id = b.id) -
        (SELECT COUNT(*) FROM downvotes WHERE blog_id = b.id) AS net_votes
        FROM blogs b
        JOIN users u ON u.id = b.user_id
        LEFT JOIN follows f ON f.user_id = ? AND f.follower_id = b.user_id
        WHERE b.isPublic = 1
        AND (f.user_id IS NOT NULL OR b.user_id = ?)
        ORDER BY net_votes DESC, b.publishedAt DESC
        `,
        [userId, userId]
    );
}
