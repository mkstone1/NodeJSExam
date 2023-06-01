import { Router } from "express";
import db from "../database/connectionMongodb.js";
import bcrypt from "bcrypt";
import { sessionStore } from "../app.js";
import sendEmail from "../util/sendMail.js";

const router = Router();


router.post("/auth/login", async (req, res) => {
    const data = req.body.data;
    const options = {email: data.email}
    const user = await db.users.findOne(options )

    console.log(user)
  
  
    if (user) {

      const isSame = await bcrypt.compare(data.password, user.encryptedPassword);

      if (isSame) {
        req.session.username = data.username;
        req.session.email = data.email;
        req.session.isLoggedIn = true;
        if (user.role) {
          req.session.role = user.role;
          res.send({data: [{message:"success"},{role:user.role},{data:user.username}]});
        } else {
          res.send({data: [{message:"success"},{data:user.username}]});
        }
      }
    }
    else{
    res.send({data: [{message:"Failed"}]})};
  });


  router.post("/auth/logout",(req,res) =>{
    sessionStore.destroy(req.session.id, (err) => {
        if(err) {
            console.log(err);
            return res.sendStatus(500);
        }
        res.clearCookie("session");
        res.sendStatus(200);
    });
});

router.post("/auth/createUser", async (req, res) => {
  const data = req.body.data;
  let options = { email: data.email };
  let user = await db.users.findOne(options);

  if (user) {
    res.send({ data: { message: "Email in use" } });
  } else {
    options = { username: data.username };
    user = await db.users.findOne(options);

    if (user) {
      res.send({ data: { message: "Username in use" } });
    } else {
      const { password, ...rest } = data;
      const encryptedPassword = await bcrypt.hash(password, 12);
      const userData = { ...rest, encryptedPassword };
      console.log(userData);
      const updateDB = db.users.insertOne(userData);
      res.send({ data: { message: "success" } });
    }
  }
});

router.get("/auth/forgotPassword/:email", (req, res) =>{
  console.log(req.params.email)
  //sendEmail();
  res.send({})
})





  export default router;