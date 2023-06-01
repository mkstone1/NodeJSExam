<script>
  import { onMount } from "svelte";
  import { BASE_URL } from "../../stores/globalStore.js";
  import TileList from "../../components/TileList/TileList.svelte";
  import { navigate } from "svelte-navigator";
 
  
  let tiles =[];




  onMount(async ()=>{
    const response = await fetch($BASE_URL + "/categories")

    const responseData = await response.json()
     tiles = responseData.map(category => ({
      title: category.title,
      function: ()=> navigate(`/category/${category.id}`),
      
     }))

  })
</script>


<TileList tiles={tiles} listTitle="Vælg Kategori" />