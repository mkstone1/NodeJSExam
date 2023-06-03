<script>
  import { onMount } from "svelte";
  import { BASE_URL } from "../../stores/globalStore.js";

  let teamScores = [];
  let highestScore = [];
  let winner = "";

  export let isFinal = "";

  onMount(async () => {
    const gameId = localStorage.getItem("gameId");
    const response = await fetch($BASE_URL + "/getScore" + "?gameid=" + gameId);
    const scoreData = await response.json();
    teamScores = scoreData.data.teamScores;
    highestScore = teamScores.reduce(
      (prev, current) => {
        if (current.score > prev[0].score) {
          return [current];
        } else if (current.score === prev[0].score) {
          return [...prev, current];
        } else {
          return prev;
        }
      },
      [teamScores[0]]
    );
  
    if(highestScore.length ===1){
      winner = highestScore[0].name
    }
    else{
      winner = "tied"
    }
    
  });
</script>

<div>
  {#if isFinal === "true" && winner !== "tied"}
    <h1>The winner is {winner}</h1>
    <h1>The final score is</h1>
    {:else if isFinal === "true" && winner ==="tied"}
    <h1>The game is tied</h1>

  {:else}
    <h1>The current score is</h1>
  {/if}
  {#each teamScores as team}
    <h2>{team.name}: {team.score}</h2>
  {/each}
</div>
