<script>

export let tiles = [];
export let listTitle = "";
</script>



<div class="tile-list">
    <h1>{listTitle}</h1>
    <div class="tiles">
{#each tiles as tile}
	<button class="tile" on:click={tile.function}>{tile.title} </button>
{/each}
    </div>
</div>

<style>

    .tile-list{
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
    
    .tiles{
    display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
      margin-bottom: 10px;
    }

    .tile{
        margin-top:2vh;
    }
    
</style>