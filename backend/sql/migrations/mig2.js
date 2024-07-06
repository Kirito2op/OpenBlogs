// RUN THIS INDEPENDENTLY
import mysql from 'mysql2/promise'
import dotenv from 'dotenv'
dotenv.config()

const connection = await mysql.createConnection({
    uri: process.env.MYSQL_URI
})

await connection.query(`
    ALTER TABLE follows
    ADD CONSTRAINT unique_user_follower UNIQUE (user_id, follower_id);
`)

await connection.end()