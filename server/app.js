import dotenv from "dotenv";
dotenv.config();
import express from "express";
import db from "./database/connectionMongodb.js";
import MongoDBStoreInit from "connect-mongodb-session";

import session from "express-session";
const MongoDBStore = MongoDBStoreInit(session);
export const sessionStore = new MongoDBStore({
  uri: "mongodb://127.0.0.1:27017/node_js_exam",
  collection: "sessions",
});

sessionStore.on('error', function(error) {
    console.log(error);
  });

const app = express();

app.use(express.json());

import cors from "cors";
app.use(
  cors({
    credentials: true,
    origin: true,
  })
);

app.use(
  session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: true,
    store: sessionStore,
    cookie: { secure: false },
  })
);

app.get("/", (req, res) => {
  res.send("Hello");
});

app.get("/categories", async (req, res) => {
  res.send(await db.categories.find().toArray());
});

app.get("/cards", async (req, res) => {
  res.send(await db.cards.find().toArray());
});

app.get("/api/user", async(req,res)=>{

    if(req.session.email){
    const options = {email: req.session.email}
    const userInfo = await db.users.findOne(options )
    if(userInfo){
    res.send({data: [{username: userInfo.username}, {email:userInfo.email}]})}
    else{
    res.send({data:{message:"Not Logged in"}})}}
})

import authRouter from "./routers/authRouter.js";
app.use(authRouter);

const PORT = process.env.PORT;
app.listen(PORT, () => {
  console.log("server is running on port ", PORT);
});