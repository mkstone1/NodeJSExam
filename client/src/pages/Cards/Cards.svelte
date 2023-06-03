<script>
  import { onMount } from "svelte";
  import { BASE_URL } from "../../stores/globalStore.js";
  import { navigate, useParams } from "svelte-navigator";
  import TileList from "../../components/TileList/TileList.svelte";
  import { io } from "socket.io-client";

  const socket = io($BASE_URL);
  let tiles = [];
  let params = useParams();
  let id = $params.id;
  const gameId = localStorage.getItem("gameId");

  onMount(async () => {
    const response = await fetch($BASE_URL + "/cards/" + id);

    const responseData = await response.json();

    if (!gameId) {
      tiles = responseData.map((card) => ({
        title: card.title,
        function: () => navigate(`/card/${card._id}`),
      }));
    } else {
      tiles = responseData.map((card) => ({
        title: card.title,
        function: () => navigate(`/gamecard/card/${card._id}/false`),
      }));
    }
  });

  socket.on("RoundHasStarted", (data) => {

    if (data.cardId) {
      navigate(`/gamecard/card/${data.cardId}/true`);
    }
  });
</script>

<TileList {tiles} listTitle="Vælg et kort" />
