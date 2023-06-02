<script>
  import { navigate } from "svelte-navigator";
  import TileSelection from "../../components/TileSelection/TileSelection.svelte";
  import { BASE_URL } from "../../stores/globalStore.js";
  import { isGameStrated } from "../../stores/gameStore.js";


  let roundLength = 30;
  let numberOfRounds = 1;
  let amountOfTeams = 2;




  async function handleStartGame() {
    const gameInfo = {
      data: { roundLength: roundLength, numberOfRounds: numberOfRounds, amountOfTeams: amountOfTeams },
    };

    const gameInit = 
    await fetch($BASE_URL + "/initGame" ,{
      credentials: "include",
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(gameInfo)
    })

    const result = await gameInit.json()
    console.log(result)
    localStorage.setItem("gameId", result.data.gameid)
    isGameStrated.set(true)
    navigate("/game/categories");
  }

  const tiles = [{ title: "Start Game", function: handleStartGame }];
</script>

<div class="tile-list">
  <h1>Setup Game</h1>
  <div class="tiles">


    <TileSelection options={[1,5, 30, 45, 60]}
    selection={roundLength}
    setSelection={val => roundLength = val}
    title="Round Length" />

    <TileSelection options={[1, 2, 3]}
    selection={numberOfRounds}
    setSelection={val => numberOfRounds = val}
    title="Number of rounds" />

    <TileSelection options={[2,3]}
    selection={amountOfTeams}
    setSelection={val => amountOfTeams = val}
    title="Amount of teams" />





    <button class="tile" on:click={handleStartGame}>Start game </button>
  </div>
</div>

<style>
  .tile-list {
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

  .tiles {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    margin-bottom: 10px;
  }

  .tile {
    margin-top: 2vh;
  }

</style>
