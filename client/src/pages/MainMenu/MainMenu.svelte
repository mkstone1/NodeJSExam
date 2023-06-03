<script>
import TileList from "../../components/TileList/TileList.svelte";
import { navigate } from "svelte-navigator";



function handleStartGame(){
    navigate("/startGame")
}

function handleOptions(){
    navigate("/rules")
}

function handleJoinGame(){
    navigate("/joingame")
}


const tiles = [
    {title:"Start Game", function:handleStartGame},
    {title:"Rules", function:handleOptions},
    {title:"Join Game" , function:handleJoinGame}
];

</script>


<TileList tiles={tiles} listTitle="Main Menu" />
