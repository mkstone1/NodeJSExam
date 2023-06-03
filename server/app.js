import dotenv from "dotenv";
dotenv.config();
import express from "express";
import session from "express-session";
import MongoDBStoreInit from "connect-mongodb-session";
import db from "./database/connectionMongodb.js";
import cors from "cors";
import http from "http";
import { ObjectId } from "mongodb";
import { Server } from "socket.io";
import expressSocketIOSession from "express-socket.io-session";

const MongoDBStore = MongoDBStoreInit(session);
export const sessionStore = new MongoDBStore({
  uri: "mongodb://127.0.0.1:27017/node_js_exam",
  collection: "sessions",
});

sessionStore.on("error", function (error) {});

const app = express();

app.use(express.json());

const sessionMiddleware = session({
  secret: process.env.SESSION_SECRET,
  resave: false,
  saveUninitialized: false,
  store: sessionStore,
  cookie: { secure: false },
});

import authRouter from "./routers/authRouter.js";
import gameRouter from "./routers/gameRouter.js";

app.use(cors({ credentials: true, origin: true }));
app.use(sessionMiddleware);
app.use(authRouter);
app.use(gameRouter);

const server = http.createServer(app);

const io = new Server(server, {
  cors: {
    origin: "*",
    methods: ["*"],
  },
});

const wrap = (middleware) => (socket, next) =>
  middleware(socket.request, {}, next);
io.use(wrap(sessionMiddleware));

io.on("connection", (socket) => {
  socket.on("joinGame", async (data) => {
    socket.join(data.gameId);
    let game = {};
    try {
      game = await db.games.findOne({ _id: new ObjectId(data.gameId) });
   
      if (data.username) {
        game.players.push({ username: data.username });
        await db.games.updateOne(
          { _id: new ObjectId(data.gameId) },
          { $push: { players: { username: data.username } } }
        );
      }
   
      io.to(data.gameId).emit("gameJoined", {
        username: data.username,
        gameId: data.gameId,
      });
    } catch (error) {
      socket.emit("gameJoinedFailed");
    }

    
  });

  socket.on("startGame", (data)=>{
    socket.join(data.gameId);
    io.to(data.gameId).emit("startingGame")
  })

  socket.on("startRound", (data)=>{

      socket.join(data.gameId);
    io.to(data.gameId).emit("roundStarting")
    
  })

  socket.on("hasRoundStarted", (data)=>{
 
    socket.join(data.gameId)
    if(data.hasStarted && data.cardId){
      io.to(data.gameId).emit("RoundHasStarted", {cardId: data.cardId})
    }

  })
});

app.get("/categories", async (req, res) => {
  res.send(await db.categories.find().toArray());
});

app.get("/cards", async (req, res) => {
  res.send(await db.cards.find().toArray());
});

app.get("/cards/:id", async (req, res) => {
  const id = parseInt(req.params.id);
  let options = { _id: id };
  const categoryId = await db.categories.findOne(options);
  options = { categoryId: categoryId._id };
  res.send(await db.cards.find(options).toArray());
});

app.get("/card/:id", async (req, res) => {
  const id = parseInt(req.params.id);
  let options = { _id: id };
  res.send(await db.cards.findOne(options));
});

app.get("/api/user", async (req, res) => {
  if (req.session.email) {
    const options = { email: req.session.email };
    const userInfo = await db.users.findOne(options);
    if (userInfo) {
      res.send({ data: { username: userInfo.username }});
    } else {
      res.send({ data: { message: "Not Logged in" } });
    }
  }
});

const PORT = process.env.PORT;
server.listen(PORT, () => {
  console.log("server is running on port ", PORT);
});
