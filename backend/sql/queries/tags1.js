export async function getAllTags(connection) {
    return await connection.query(
        `SELECT * FROM tags order by tagname`
    )
}

export async function addTag(connection, tag_name) {
    return await connection.query(
        `insert into tags(tagname) values('${tag_name}');`
    )
}

export async function getTag(connection, tag_name) {
    return await connection.query(
        `select *from tags where tagname like '${tag_name}';`
    )
}