import { MongoClient } from "mongodb";

const URL = "mongodb://127.0.0.1:27017";

const client = new MongoClient(URL);

const db = client.db("node_js_exam");



export default {
    cards: db.collection("cards"),
    categories: db.collection("categories"),
    users: db.collection("users"),
    sessions: db.collection("sessions"),
    games: db.collection("games")
};