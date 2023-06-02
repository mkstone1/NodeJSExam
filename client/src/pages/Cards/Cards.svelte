<script>
    import { onMount } from "svelte";
    import { BASE_URL } from "../../stores/globalStore.js";
    import { navigate, useParams } from "svelte-navigator";
  import TileList from "../../components/TileList/TileList.svelte";
  import { isGameStrated } from "../../stores/gameStore.js";

    let tiles = []
    let params = useParams();
    let id = $params.id;

    onMount(async ()=>{
   
      const response = await fetch($BASE_URL + "/cards/"+ id)
  
      const responseData = await response.json()
   

      console.log($isGameStrated)
      if(!$isGameStrated){
      tiles = responseData.map(card => ({
      title: card.title,
      function: ()=> navigate(`/card/${card._id}`)
     }))}
     else{
      tiles = responseData.map(card => ({
      title: card.title,
      function: ()=> navigate(`/gamecard/card/${card._id}`)
     }))}
     }
    )
  </script>
  
  <TileList tiles={tiles} listTitle="Vælg et kort" />

  