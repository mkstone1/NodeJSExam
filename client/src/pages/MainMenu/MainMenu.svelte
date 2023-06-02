<script>
import TileList from "../../components/TileList/TileList.svelte";
import { navigate } from "svelte-navigator";



function handleStartGame(){
    navigate("/startGame")
}

function handleOptions(){
    navigate("/rules")
}

const tiles = [
    {title:"Start Game", function:handleStartGame},
    {title:"Rules", function:handleOptions}
];

</script>


<TileList tiles={tiles} listTitle="Main Menu" />
