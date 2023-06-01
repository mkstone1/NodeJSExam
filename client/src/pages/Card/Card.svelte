<script>
  import { onMount } from "svelte";
  import { BASE_URL } from "../../stores/globalStore.js";
  import { useParams } from "svelte-navigator";


  let params = useParams();
  let id = $params.id
  let card = {}
  let answers= []
 
onMount(async ()=>{
    const response = await fetch($BASE_URL + "/card/" + id)
    card = await response.json();
   
    console.log(card.answers)
    answers = card.answers
}

)
</script>

<div class="card">
    <h1>{card.title}</h1>
    <div class="answer-list">
    <div class="answer" style="background-color:red">
        <label for={card.wrong}>
            <input id={card.wrong} type="checkbox">
            <p>{card.wrong}</p>
          </label>
    </div>
        
       
        {#each answers as answer}
        <div class="answer" >    
            <label for={answer.answer}>
                <input id={answer.answer} type="checkbox">
                <p>{answer.answer}</p>
              </label>
        </div>
         {/each}
      
    </div>
</div>

<style>
    .card{
      margin-top: 3vh;
      display: flex;
      padding-bottom: 4vh;
      align-items: center;
      flex-direction: column;
      
      background-color: #700c37;
      flex-flow: column;
      justify-content: center;
      padding: 5vw;
      padding-top:0;

    }

    .answer-list{
        display:flex;
        flex-direction: column;
    }


    .answer label {
        display: flex;
        align-items: center;
  }

    .answer{
        margin-top:1vh;
        background-color: green;
        min-width: 30vw;
        border: 2px solid Black;
        
        
     
    }
</style>