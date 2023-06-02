<script>
  import { onMount } from "svelte";
  import { BASE_URL } from "../../stores/globalStore.js";
  import TileList from "../../components/TileList/TileList.svelte";
  import { navigate } from "svelte-navigator";
 
  
  let tiles =[];
  export let teamName = "";
  export let currentRound = "";




  onMount(async ()=>{
    const response = await fetch($BASE_URL + "/categories")

    const responseData = await response.json()

     tiles = responseData.map(category => ({
      title: category.title,
      function: ()=> navigate(`/category/${category._id}`),
      
     }))

  })
</script>

<div class="categories">

  {#if currentRound}
  <h1>Round: {currentRound}</h1>
{/if}
  {#if teamName}
  <h1>Current turn: {teamName}</h1>
{/if}
<TileList tiles={tiles} listTitle="Pick Category" />
</div>


<style>
  .categories{
    background-color: #700c37;
    margin-top: 3vh;
  }

</style>