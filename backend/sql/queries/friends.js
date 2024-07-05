export async function getFriends(connection,user_id){
    return await connection.query(
        `
            select users.username,users.id from users,friends where users.id = friends.user2 and friends.user1 = ${user_id} order by users.username;
        `
    ) 
}

export async function getRequests(connection,user_id){
    return await connection.query(
        `
            select users.id,users.username from requests,users where requests.touser=${user_id} and users.id=requests.fromuser;
        `
    ) 
}

export async function getMyRequests(connection,user_id){
    return await connection.query(
        `
            select users.id,users.username from requests,users where requests.fromuser=${user_id} and users.id=requests.touser;
        `
    ) 
}

export async function getSearchResults(connection,user_id,text){
    return await connection.query(
        `
        select u.id,u.username from users u where u.id != ${user_id} and u.username like '${text}%' 
        and not exists(select 1 from requests r where r.fromuser = u.id and r.touser = ${user_id} ) 
        and not exists(select 1 from requests r where r.fromuser = ${user_id}  and r.touser = u.id) 
        and not exists(select 1 from friends f where f.user1 = ${user_id}  and f.user2 = u.id) 
        order by u.username limit 0,10;
        `
    )
}

export async function sendRequest(connection,user_id,to_user_id){
    return await connection.query(
        `
            insert into requests value(${user_id},${to_user_id});
        `
    )
}

export async function removeRequest(connection,user_id,to_user_id){
    return await connection.query(
        `
            delete from requests where fromuser = ${user_id} and touser = ${to_user_id};
        `
    )
}


export async function acceptRequest(connection, user_id, to_user_id) {
    const values = [[user_id, to_user_id], [to_user_id, user_id]];

    const sql = `
        INSERT INTO friends (user1,user2) VALUES ?;
    `;

    return await connection.query(sql,[values]);
}