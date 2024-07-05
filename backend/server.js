import 'dotenv/config'
import express from 'express'
import mysql from 'mysql2/promise'
import cors from 'cors'
const app = express()
const port = process.env.PORT || 5000
import { signUpUser , loginUser ,getUserDetails, authmiddleware } from './controllers/userControllers.js'
import { userBlogs,indBlog,userCollabBlogs } from './controllers/dashboardControllers.js'
import { createNewBlog ,getAllBlogs , getWritersBlogs } from './controllers/blogsController.js'
import { allTags,addOneTag } from './controllers/tagControllers.js'
import { getFollowerAndFollowingCount, getIsFollowing ,follow,unfollow} from './controllers/userControllers.js'
import { BlogsNoTags,BlogsWithTags,BlogsWithTagsAndFollowers,BlogsNoTagsWithFollows } from './controllers/searchBlogsControllers.js'
import { NewBlog } from './controllers/newBlogController.js'
import { checkVote,upvote,downvote,getVotes,undownvote,unupvote } from './controllers/votescontroller.js'
import { DeleteBlog, DeleteCollabBlog } from './controllers/deleteController.js'
import { AcceptRequest, FriendsData, OnlyMyFriendsData, RemoveRequest, SearchForFriend, SendRequest } from './controllers/friendsController.js'
import { NewCollabBlog } from './controllers/newCollabBlogController.js'
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// Middleware
app.use(cors(
    {
        origin: process.env.FRONTEND_URL,
        methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH'],
        allowedHeaders: ['Content-Type', 'Authorization'],
        credentials: true
    }
));

const connection = await mysql.createConnection({
    uri: process.env.DB_URI,
    ssl:{
        ca: process.env.DB_CA_CERT,
        rejectUnauthorized: false // Accept self-signed certificates
    }
})

/************** USER ROUTES *****************/ 
app.post('/users/signup', async (req, res) => {
    await signUpUser(connection, req, res)
})
app.post('/users/login', async (req, res) => {
    await loginUser(connection, req, res)
})
app.get('/users/authmiddleware', authmiddleware, (req, res) => {
    res.status(200).json({message : 'Authorized'})
})
app.get('/users/details', async (req, res) => {
    await getUserDetails(connection,req,res)
})
app.get('/users/socialstats', async (req,res) => {
    await getFollowerAndFollowingCount(connection , req , res)
})
app.get('/users/isfollowing', async (req,res) => {
    await getIsFollowing(connection,req,res);
})
app.post('/users/follow', async (req,res) => {
    await follow(connection,req,res)
})
app.post('/users/unfollow', async (req,res) => {
    await unfollow(connection,req,res)
})
/************** Dashboard *****************/
app.post('/dashboard', async (req,res)=>{
    await userBlogs(connection,req,res)
})
app.post('/dashboard/collabs', async (req,res)=>{
    await userCollabBlogs(connection,req,res)
})
app.post('/dashboard/blog', async (req,res)=>{
    await indBlog(connection,req,res)
})
/**************** Writers  *********************/
app.get('/writers/blogs', async (req,res)=>{
    await getWritersBlogs(connection,req,res)
})

/************** tags *********************/
app.post('/alltags', async (req,res)=>{
    await allTags(connection,req,res)
})
app.post('/addtag', async (req,res)=>{
    await addOneTag(connection,req,res)
})

/********************* Blogs **********************/
app.post('/blog/newblog', async (req, res) => {
    await createNewBlog(connection, req, res)
})
app.get('/blog/allblogs', async (req, res) => {
    await getAllBlogs(connection, req, res)
})

app.listen(port, () => {
    console.log(`Server is running on port ${port}`)
})

/****************Search*******************/
app.post('/noTags', async (req,res)=>{
    await BlogsNoTags(connection,req,res)
})
app.post('/withTags', async (req,res)=>{
    await BlogsWithTags(connection,req,res)
})

app.post('/NewBlog', async (req,res)=>{
    await NewBlog(connection,req,res)
})
/********************Delete Blogs***************************/
app.post('/DeleteBlog', async (req,res)=>{
    await DeleteBlog(connection,req,res)
})
app.post('/DeleteCollabBlog', async (req,res)=>{
    await DeleteCollabBlog(connection,req,res)
})
app.post('/withTagsAndFollows', async (req,res)=>{
    await BlogsWithTagsAndFollowers(connection,req,res)
})
app.post('/noTagsWithFollows', async (req,res)=>{
    await BlogsNoTagsWithFollows(connection,req,res)
})

/********************* VOTES ************************/ 
app.get('/votes/checkvote', async (req,res)=>{
    await checkVote(connection,req,res)
})
app.post('/votes/upvote', async (req,res)=>{
    await upvote(connection,req,res)
})
app.post('/votes/downvote', async (req,res)=>{
    await downvote(connection,req,res)
})
app.get('/votes/votecount', async (req,res)=>{
    await getVotes(connection,req,res)
})
app.post('/votes/unupvote', async (req,res)=>{
    await unupvote(connection,req,res)
})
app.post('/votes/undownvote', async (req,res)=>{
    await undownvote(connection,req,res)
})


/***********************Friends*************************/
app.post('/friends',async(req,res)=>{
    await FriendsData(connection,req,res);
})
app.post('/friends/search',async(req,res)=>{
    await SearchForFriend(connection,req,res);
})
app.post('/friends/addfriend',async(req,res)=>{
    await SendRequest(connection,req,res);
})
app.post("/friends/removeReq",async(req,res)=>{
    await RemoveRequest(connection,req,res);
})
app.post("/friends/acceptReq",async(req,res)=>{
    await AcceptRequest(connection,req,res);
})
app.post('/myfriends',async(req,res)=>{
    await OnlyMyFriendsData(connection,req,res);
})


/*******************Collab Blogs*********************/
app.post("/createcolab",async(req,res)=>{
    await NewCollabBlog(connection,req,res);
})