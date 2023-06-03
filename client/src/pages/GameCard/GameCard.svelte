<script>
  import { onMount } from "svelte";
  import Card from "../Card/Card.svelte";
  import { BASE_URL } from "../../stores/globalStore.js";
  import { io } from "socket.io-client";
  import {useParams } from "svelte-navigator";

  let params = useParams();
  let id = $params.id;
  let shouldStart =$params.hasStarted 
  let hasStarted = "false"

  const socket = io($BASE_URL);

  let roundLength = 0;
  let isMultiDevice = "";
  const gameId = localStorage.getItem("gameId");


  onMount(async ()=>{
    const gameId = localStorage.getItem("gameId")
    const roundLengthReponse = await fetch($BASE_URL + "/getRoundLength" + "?gameid=" + gameId)
    const roundLengthInfo = await roundLengthReponse.json();

    roundLength = roundLengthInfo.data.roundLength;

    const isMultiDeviceResponse = await fetch($BASE_URL + "/isMultiDevice" + "?gameid=" + gameId)
    const isMultiDeviceInfo = await isMultiDeviceResponse.json()
    isMultiDevice = isMultiDeviceInfo.data.isMultiDevice
    socket.emit("hasRoundStarted", { gameId: gameId, hasStarted:hasStarted })
    if(shouldStart === "true"){
      hasStarted="true"
    }
  
  })

  socket.on("RoundHasStarted",()=>{
    hasStarted ="true";
  })


  function startRound(){
    hasStarted = "true";
    if(isMultiDevice === "True"){
      socket.emit("hasRoundStarted", { gameId: gameId, hasStarted:hasStarted, cardId:id})
    }
  
  }


</script>


{#if hasStarted==="false"}
<button class="start-game-button" on:click={startRound}>Start Round</button>


{:else}
<Card isGameCard="true" roundLength={roundLength}/>

{/if}



<style>

    .start-game-button{
        margin-top:10vh;
    }
</style>