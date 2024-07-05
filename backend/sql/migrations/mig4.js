// RUN THIS INDEPENDENTLY
import mysql from 'mysql2/promise'
import dotenv from 'dotenv'
dotenv.config()

const connection = await mysql.createConnection({
    uri: process.env.DB_URI
})


await connection.query(`
    CREATE TABLE collabblogs (
        id INT AUTO_INCREMENT PRIMARY KEY,
        user_id INT NOT NULL,
        title VARCHAR(100) NOT NULL,
        content LONGTEXT,
        FOREIGN KEY (user_id) REFERENCES users(id),
        unique(user_id,title)
    )
`)

await connection.query(`
    CREATE TABLE collabblog_tags (
        id INT AUTO_INCREMENT PRIMARY KEY,
        blog_id INT NOT NULL,
        tag_id INT NOT NULL,
        FOREIGN KEY (blog_id) REFERENCES collabblogs(id),
        FOREIGN KEY (tag_id) REFERENCES tags(id)
    )
`)

await connection.query(`
    CREATE TABLE collabblog_users (
        blog_id INT NOT NULL,
        user_id INT NOT NULL,
        FOREIGN KEY (blog_id) REFERENCES collabblogs(id),
        FOREIGN KEY (user_id) REFERENCES users(id),
	  primary key(blog_id,user_id)
    )

`)

await connection.end()