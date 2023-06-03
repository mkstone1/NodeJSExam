<script>
  import { io } from "socket.io-client";
  import { navigate } from "svelte-navigator";
  import { username } from "../../stores/userStore.js";
  import { BASE_URL } from "../../stores/globalStore.js";
  import toastr from "toastr";

  let gameId = "";

  const socket = io($BASE_URL);
  let anonCounter = 1;


  function joinGame() {
    if($username){
    socket.emit("joinGame", {gameId: gameId, username:$username});}
    else{
      const anon = `John Doe ${anonCounter}`;
      socket.emit("joinGame", {gameId: gameId, username:anon});
    }
    gameId = "";

  }


  socket.on("gameJoined", (data) =>{
   
    toastr.success("Joining game")
    localStorage.setItem("gameId",data.gameId)
    navigate("/gameMultiDeviceSetup")
    
    })

    socket.on("gameJoinedFailed", ()=>{
      toastr.error("Failed to join game. Double check game ID");
    })
</script>

<div class="gameid-input">
  <form on:submit|preventDefault={joinGame}>
    <div class="gameid-form">
      <label for="email">Game ID:</label>
      <input type="text" id="email" class="form-input" bind:value={gameId} />
    </div>
    <button type="submit">Join Game</button>
  </form>
</div>

<style>
  .gameid-input {
    padding-top: 4vh;
    margin-top: 3vh;
    background-color: #700c37;
    width: 30vw;
    height: 15vh;
  }

  .gameid-form {
    margin-bottom: 3vh;
  }

  .form-input {
    background-color: #9c285a;
    border: 1px solid #9c285a;
    height: 4vh;
    width: 17vw;
  }
</style>
