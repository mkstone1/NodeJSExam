<script>
  import { onMount } from "svelte";

  import {BASE_URL} from "../../stores/globalStore"

  let username = "";
  let email = "";

onMount(async()=>{
    const userReponse = await fetch($BASE_URL + "/user", {
        credentials:"include"
    })

    const userData = await userReponse.json();


    username = userData.data[0].username
    email = userData.data[1].email

})

</script>


<div class=profile>
    <h1>Username: {username}</h1>
    <h1>Email: {email} </h1>
</div>


<style>
    .profile{
        background-color: #700c37;
        margin-top: 3vh;
        padding-left: 3vw;
        padding-right: 3vw;
        padding-bottom: 3vh;

    }

</style>