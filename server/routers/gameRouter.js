import { Router } from "express";
import db from "../database/connectionMongodb.js";
import { ObjectId } from "mongodb";

const router = Router();

router.post("/initGame", async (req, res) => {
  const data = { ...req.body.data, currentRound: 1 };
  const amountOfTeams = data.amountOfTeams;

  let teamScores = [];
  let players = [];

  for (let i = 1; i <= amountOfTeams; i++) {
    teamScores.push({
      name: `team${i}`,
      score: 0,
      roundsPlayed: 0,
    });
  }

  data.teamScores = teamScores;
  let keys = Object.keys(teamScores);
  let currentTeam = keys[0];
  data.currentTeam = currentTeam;

  if(req.session.email){
    const user = await db.users.findOne({email: req.session.email})
    players.push({username: user.username})
  }
  else{
    players.push({username: "John Doe"})
  }

  
  data.players = players
  

  const result = await db.games.insertOne(data);
  res.send({ data: [{ gameid: result.insertedId }, {isMultiDevice: data.isMultiDevice} ]});
});

router.get("/getRoundLength", async (req, res) => {
  const gameid = req.query.gameid;
  const gameInfo = await db.games.findOne({ _id: new ObjectId(gameid) });

  res.send({ data: { roundLength: gameInfo.roundLength } });
});

router.get("/getCurrentTeam", async (req, res) => {
  const gameid = req.query.gameid;
  const gameInfo = await db.games.findOne({ _id: new ObjectId(gameid) });
  const currentTeamIndex = gameInfo.currentTeam;
  const team = gameInfo.teamScores[currentTeamIndex];
  res.send({ data: { currentTeam: team.name } });
});

router.get("/getScore", async (req, res) => {
  const gameid = req.query.gameid;
  const gameInfo = await db.games.findOne({ _id: new ObjectId(gameid) });

  res.send({ data: { teamScores: gameInfo.teamScores } });
});

router.post("/endRound", async (req, res) => {
  const gameid = req.query.gameid;
  const deleteGame = await db.games.deleteOne({_id: new ObjectId(gameid)})
});

router.post("/updateScore", async (req, res) => {
  const gameid = req.query.gameid;
  const gameInfo = await db.games.findOne({ _id: new ObjectId(gameid) });
  const currentTeamIndex = gameInfo.currentTeam;
  const teams = gameInfo.teamScores;
  const scoreUpdateData = req.body.data;

  let score = 0;
  score = scoreUpdateData[0].correctAnswers;
  if (scoreUpdateData[1].isWrongChecked) {
    score = score - 2;
  }

  let nextRound = false;
  let nextTeamToPlay = 0;

  if(currentTeamIndex == teams.length-1){
    nextTeamToPlay= 0
    nextRound = true;

  }
  else{
    nextTeamToPlay= parseInt(currentTeamIndex)+1;
  }


 
  let newScore = teams[currentTeamIndex].score + score;


  if(!nextRound){

    await db.games.updateOne(
        {
          _id: new ObjectId(gameid),
          "teamScores.name": teams[currentTeamIndex].name,
        },
        {
            $set: { "teamScores.$.score": newScore }
        })
  await db.games.updateOne(
    {
      _id: new ObjectId(gameid),
      "teamScores.name": teams[currentTeamIndex].name,
    },
    {
      $inc: { "teamScores.$.roundsPlayed": 1 },
      $set: { "currentTeam": nextTeamToPlay.toString()}
    }
  );}
  else{
    await db.games.updateOne(
        {
          _id: new ObjectId(gameid),
          "teamScores.name": teams[currentTeamIndex].name,
        },
        {
            $set: { "teamScores.$.score": newScore }
        })

    await db.games.updateOne(
        {
          _id: new ObjectId(gameid),
          "teamScores.name": teams[currentTeamIndex].name,
        },
        {
          $inc: { "teamScores.$.roundsPlayed": 1 },
          $set: { "currentTeam": nextTeamToPlay.toString()},
       
        }
      );
      await db.games.updateOne(
        {
          _id: new ObjectId(gameid),
          "teamScores.name": teams[currentTeamIndex].name,
        },
        {
          $inc: {"currentRound": 1}
        })

  }


  const totalRoundsPlayed = gameInfo.teamScores.reduce((total, team) => total + team.roundsPlayed, 1);
  if(totalRoundsPlayed == gameInfo.amountOfTeams * gameInfo.currentRound){
    res.send({data:"false"})
  }
  else{
    res.send({data:"true"})
  }
  


})


router.get("/getRemaningRounds", async(req, res) =>{
  const gameid = req.query.gameid;
  const gameInfo = await db.games.findOne({ _id: new ObjectId(gameid) });
  res.send({data:{currentRound: gameInfo.currentRound}})
})


router.get("/getPlayersInGame" , async(req, res) =>{
  const gameid = req.query.gameid;
  const gameInfo = await db.games.findOne({ _id: new ObjectId(gameid) });
  res.send({data:{players: gameInfo.players}})
})


router.get("/isMultiDevice", async (req, res) =>{
  const gameid = req.query.gameid;
  const gameInfo = await db.games.findOne({ _id: new ObjectId(gameid) });
  res.send({data:{isMultiDevice: gameInfo.isMultiDevice}})
})


export default router;
