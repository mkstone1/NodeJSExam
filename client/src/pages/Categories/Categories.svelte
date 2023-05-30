<script>
  import { onMount } from "svelte";
  import { BASE_URL } from "../../stores/globalStore.js";
 

  onMount(async ()=>{
    const response = await fetch($BASE_URL + "/categories")

    const responseData = await response.json()
    console.log(responseData)
  })
</script>

<p>
    categories
</p>

