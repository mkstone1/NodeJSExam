<script>
  import { io } from "socket.io-client";
  import { onMount } from "svelte";
  import { BASE_URL } from "../../stores/globalStore.js";
  import toastr from "toastr";
  import { username } from "../../stores/userStore.js";
  import { navigate } from "svelte-navigator";

  const socket = io($BASE_URL);
  const gameId = localStorage.getItem("gameId");
  let players = [];

  socket.on("gameJoined", async (data) => {
    players = [];
    const response = await fetch(
      $BASE_URL + "/getPlayersInGame" + "?gameid=" + gameId
    );
    const gameInfo = await response.json();
    players = [...gameInfo.data.players];

    if(data.username){
    toastr.success("Someone has joined this game");}
  });

  onMount(async () => {
    const response = await fetch(
      $BASE_URL + "/getPlayersInGame" + "?gameid=" + gameId
    );
    const gameInfo = await response.json();
    players = [...gameInfo.data.players];
 

    socket.emit("joinGame", { gameId: gameId, username: "" });
  });

  socket.on("startingGame", () => {
    navigate("/game/categories");
  });

  function handleStartGame() {
    socket.emit("startGame", { gameId: gameId });
  }
</script>

<div class="multi-device">
  <h1>Your game id is</h1>
  <h2>{gameId}</h2>

  <h1>Player in game:</h1>
  {#if !(players.length === 0)}
    {#each players as player}
      <h1>{player.username}</h1>
    {/each}
  {/if}
  <div>
    <button on:click={handleStartGame}>Start game</button>
  </div>
</div>

<style>
  .multi-device {
    display: flex;
    flex-direction: column;
    margin-top: 3vh;
    background-color: #700c37;
    width: 50vw;
    padding-bottom: 3vh;
  }
</style>
