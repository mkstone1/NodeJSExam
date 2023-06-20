import db from "./connectionMongodb.js";
import bcrypt from "bcrypt";

await db.categories.deleteMany()
db.categories.insertOne({_id:1, title:"Nynne"})
db.categories.insertOne({_id:2, title:"Mime"})
db.categories.insertOne({_id:3, title:"Tale"})


await db.cards.deleteMany()
db.cards.insertOne( {_id: 1, categoryId:1, title:"Beatles", wrong:"let it be", answers:[{id:1, answer: "here comes the sun"}, {id:2 , answer: "Hey jude"}] })
db.cards.insertOne( {_id: 2, categoryId:1, title:"Queen", wrong:"Bohemian", answers:[{id:1, answer:"Another one bites the dust"}, {id:2 , answer: "We will rock you"}] },)
db.cards.insertOne(  {_id: 3, categoryId:2, title:"Dyr", wrong:"Cat", answers:[{id:1, answer:"Tiger"}, {id:2 , answer: "kylling"}]})
db.cards.insertOne(  {_id: 4, categoryId: 2, title:"Kendte danske skuespillere", wrong:"Mads Mikkelsen", answers:[{id:1, answer:"Nikolaj Lie Kaas"}, {id:2 , answer: "Lars Mikkelsen"}]})


await db.users.deleteMany()
const encryptedPassword = await bcrypt.hash("test", 12);
db.users.insertOne({email: "bobsemail@email.dk", username: "bob", encryptedPassword:encryptedPassword})
db.users.insertOne({email: "alice@email.dk", username: "alice", encryptedPassword:encryptedPassword})
db.users.insertOne({email: "s@s", username: "test", encryptedPassword:encryptedPassword})
await db.sessions.deleteMany();
await db.games.deleteMany();