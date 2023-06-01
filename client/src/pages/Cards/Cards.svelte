<script>
    import { onMount } from "svelte";
    import { BASE_URL } from "../../stores/globalStore.js";
    import { navigate, useParams } from "svelte-navigator";
  import TileList from "../../components/TileList/TileList.svelte";

    let tiles = []
    let params = useParams();
    let id = $params.id;

    onMount(async ()=>{
      console.log(id)
      
      const response = await fetch($BASE_URL + "/cards/"+ id)
  
      const responseData = await response.json()
      console.log(responseData)

      tiles = responseData.map(card => ({
      title: card.title,
      function: ()=> navigate(`/card/${card.id}`)
     }))


      
    
    })
  </script>
  
  <TileList tiles={tiles} listTitle="Vælg et kort" />

  