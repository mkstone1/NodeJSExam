<script>
  import { navigate } from "svelte-navigator";
  import TeamScore from "../../components/TeamScore/TeamScore.svelte";
  import { onMount } from "svelte";
  import { BASE_URL } from "../../stores/globalStore.js";

  const gameId = localStorage.getItem("gameId");

  onMount(async()=>{
    const reponse = await fetch($BASE_URL +  "/endRound" + "?gameid=" + gameId,{
    method: "POST"})
    localStorage.clear();
  })

  function handleStartNewGame(){
    navigate("/startGame")

  }


</script>



<div class="game-stats">

    <h1>GAME IS OVER</h1>

    <TeamScore isFinal="true"/>

    <button on:click={handleStartNewGame}>Start new game</button>


</div>


<style>
        .game-stats{
      margin-top: 3vh;
      display: flex;
      padding-bottom: 4vh;
      align-items: center;
      flex-direction: column;
      width: 30vw;
      background-color: #700c37;
      flex-flow: column;
      justify-content: center;
    }
    
</style>