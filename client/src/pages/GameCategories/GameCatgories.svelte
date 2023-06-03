<script>
  import { onMount } from "svelte";
  import Card from "../Card/Card.svelte";
  import { BASE_URL } from "../../stores/globalStore.js";
  import Categories from "../Categories/Categories.svelte";
  import TeamScore from "../../components/TeamScore/TeamScore.svelte";
  import { io } from "socket.io-client";
  import { navigate } from "svelte-navigator";

  let currentTeam = "";
  let currentRound = "";

  const socket = io($BASE_URL);

  onMount(async () => {
    const gameId = localStorage.getItem("gameId");
    const response = await fetch(
      $BASE_URL + "/getCurrentTeam" + "?gameid=" + gameId
    );
    const gameInfo = await response.json();
    currentTeam = gameInfo.data.currentTeam;


    const roundsResponse = await fetch($BASE_URL + "/getRemaningRounds" + "?gameid=" + gameId )
    const currentRoundsData = await roundsResponse.json()
    currentRound = currentRoundsData.data.currentRound
    socket.emit("hasRoundStarted", { gameId: gameId})
  });

  socket.on("RoundHasStarted",(data)=>{
   
    if(data.cardId){
    navigate(`/gamecard/card/${data.cardId}/true`)
  }
  })
</script>

<div class="game-categories">

  <Categories teamName={currentTeam} currentRound = {currentRound} />
  <div class="scores">
    <TeamScore />
  </div>
</div>

<style>
  .game-categories {
    display: flex;
    align-items: center;
    margin-top:5vh;
  }

  .scores{
    background-color: #700c37;
    position: absolute;
    margin-left: 40vw;
    height: 28vh;
    width: 18vw;
  }
</style>
