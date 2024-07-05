// RUN THIS INDEPENDENTLY
import mysql from 'mysql2/promise';
import dotenv from 'dotenv'
dotenv.config()

const connection = await mysql.createConnection({
    uri: process.env.DB_URI,
    ssl:{
        ca: process.env.DB_CA_CERT,
        rejectUnauthorized: false // Accept self-signed certificates
    }
})

await connection.query(`
    CREATE TABLE users (
        id INT AUTO_INCREMENT PRIMARY KEY,
        username VARCHAR(100) NOT NULL,
        password VARCHAR(100) NOT NULL,
        bio MEDIUMTEXT
    )
`)


await connection.query(`
    CREATE TABLE follows (
        id INT AUTO_INCREMENT PRIMARY KEY,
        user_id INT NOT NULL,
        follower_id INT NOT NULL,
        FOREIGN KEY (user_id) REFERENCES users(id),
        FOREIGN KEY (follower_id) REFERENCES users(id)
    )
`)

await connection.query(`
    CREATE TABLE blogs (
        id INT AUTO_INCREMENT PRIMARY KEY,
        user_id INT NOT NULL,
        title VARCHAR(100) NOT NULL,
        content LONGTEXT,
        isPublic BOOLEAN DEFAULT 1,
        publishedAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        FOREIGN KEY (user_id) REFERENCES users(id)
    )
`)

await connection.query(`
    CREATE TABLE upvotes (
        id INT AUTO_INCREMENT PRIMARY KEY,
        user_id INT NOT NULL,
        blog_id INT NOT NULL,
        FOREIGN KEY (user_id) REFERENCES users(id),
        FOREIGN KEY (blog_id) REFERENCES blogs(id)
    )
`)

await connection.query(`
    CREATE TABLE downvotes (
        id INT AUTO_INCREMENT PRIMARY KEY,
        user_id INT NOT NULL,
        blog_id INT NOT NULL,
        FOREIGN KEY (user_id) REFERENCES users(id),
        FOREIGN KEY (blog_id) REFERENCES blogs(id)
    )
`)

await connection.query(`
    CREATE TABLE tags (
        id INT AUTO_INCREMENT PRIMARY KEY,
        tagname VARCHAR(100) NOT NULL
    )
`)

await connection.query(`
    CREATE TABLE blog_tags (
        id INT AUTO_INCREMENT PRIMARY KEY,
        blog_id INT NOT NULL,
        tag_id INT NOT NULL,
        FOREIGN KEY (blog_id) REFERENCES blogs(id),
        FOREIGN KEY (tag_id) REFERENCES tags(id)
    )
`)

await connection.end()