import { Router } from "express";
import db from "../database/connectionMongodb.js";
import bcrypt from "bcrypt";
import { sessionStore } from "../app.js";

const router = Router();


router.post("/auth/login", async (req, res) => {
    const data = req.body.data;
    const options = {email: data.email}
    const user = await db.users.findOne(options )

    console.log(user)
  
  
    if (user) {

      const isSame = await bcrypt.compare(data.password, user.password);
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




  export default router;