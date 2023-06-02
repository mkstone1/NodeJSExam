<script>
  import { navigate } from "svelte-navigator";

function handleStartGame(){
    navigate("/startGame")
}
</script>


<div class="rules">
    <button on:click={handleStartGame}>Start game</button>
<h1>Generelle Regler</h1>
<h3>Få dine holdkammerater til at gætte alle de grønne</h3>
<h3>Den røde må ikke gættes og giver minus point</h3>
<h3>De grønne giver 1 point hver og den røde giver minus 2</h3>


<h1>Regler for Nynne</h1>
<h3>I denne kategori skal du nynne sangene</h3>
<h3>Du må gerne bruge lyde men ikke ord</h3>


<h1>Regler for tale</h1>
<h3>I denne kategori skal du forklare om emnet</h3>
<h3>Der må ikke rimes på ord eller oversættes </h3>

<h1>Regler for mime</h1>
<h3>I denne kategori skal du mime det der står i emnet</h3>
<h3>Du må ikke bruge lyde</h3>
<h3>Du må gerne bruge objekter tæt på dig</h3>

</div>

<style>
    .rules{
        background-color: #700c37;
        padding: 3vh;
        margin-top: 3vh;
    }
    
</style>