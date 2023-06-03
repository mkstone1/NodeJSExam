<script>
  import { navigate } from "svelte-navigator";
  import TeamScore from "../../components/TeamScore/TeamScore.svelte";
  import { onMount } from "svelte";
  import { BASE_URL } from "../../stores/globalStore.js";

  const gameId = localStorage.getItem("gameId");


  function handleStartNewGame(){
    localStorage.clear();
    endGame();
    window.location.href = "/startGame";

  }
  function handleExitGame (){
    localStorage.clear();
    endGame();
    window.location.href = "/";
  }

  async function endGame(){
    const reponse = await fetch($BASE_URL +  "/endRound" + "?gameid=" + gameId,{
    method: "POST"})
  }

</script>



<div class="game-stats">

    <h1>GAME IS OVER</h1>

    <TeamScore isFinal="true"/>

    <button on:click={handleStartNewGame}>Start new game</button>
    <button on:click={handleExitGame}>Exit Game</button>


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