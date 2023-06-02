<script>
  import { onMount } from "svelte";
  import { BASE_URL } from "../../stores/globalStore.js";

  let teamScores = [];
  let winner = {};

  export let isFinal = "";

  onMount(async () => {
    const gameId = localStorage.getItem("gameId");
    const response = await fetch($BASE_URL + "/getScore" + "?gameid=" + gameId);
    const scoreData = await response.json();
    teamScores = scoreData.data.teamScores;
    winner = teamScores.reduce((highest, team) => {
      if (!highest || team.score > highest.score) {
        return team.name;
      } else {
        return highest;
      }
    }, null);
  
  });
</script>

<div>
  {#if isFinal === "true"}
    <h1>The winner is {winner}</h1>
    <h1>The final score is</h1>
  {:else}
    <h1>The current score is</h1>
  {/if}
  {#each teamScores as team}
    <h2>{team.name}: {team.score}</h2>
  {/each}
</div>
