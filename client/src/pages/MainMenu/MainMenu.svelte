<script>
import TileList from "../../components/TileList/TileList.svelte";
import { navigate } from "svelte-navigator";



function handleStartGame(){
    navigate("/categories")
}

function handleOptions(){
    navigate("/Options")
}

const tiles = [
    {title:"Start Game", function:handleStartGame},
    {title:"Options", function:handleOptions}
];

</script>


<TileList tiles={tiles} listTitle="Main Menu" />
