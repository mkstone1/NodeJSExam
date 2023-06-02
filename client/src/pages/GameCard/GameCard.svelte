<script>
  import { onMount } from "svelte";
  import Card from "../Card/Card.svelte";
  import { BASE_URL } from "../../stores/globalStore.js";


  let hasStarted = false;
  let roundLength = 0;

  onMount(async ()=>{
    const gameId = localStorage.getItem("gameId")
    const response = await fetch($BASE_URL + "/getRoundLength" + "?gameid=" + gameId)
    const gameInfo = await response.json();

   
    roundLength = gameInfo.data.roundLength;

  })

  function startRound(){
    hasStarted = true;
  }


</script>


{#if !hasStarted}
<button class="start-game-button" on:click={startRound}>Start Round</button>


{:else}
<Card isGameCard="true" roundLength={roundLength}/>

{/if}



<style>

    .start-game-button{
        margin-top:10vh;
    }
</style>