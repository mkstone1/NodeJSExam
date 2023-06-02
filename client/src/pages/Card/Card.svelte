<script>
  import { onMount } from "svelte";
  import { BASE_URL } from "../../stores/globalStore.js";
  import { navigate, useParams } from "svelte-navigator";

  let params = useParams();
  let id = $params.id;
  let card = {};
  let answers = [];
  let checkedAnswers = [];
  let checkedWrongAnswer = false;

  export let isGameCard;
  export let roundLength;
  let timeLeft = roundLength;

  onMount(async () => {
    const response = await fetch($BASE_URL + "/card/" + id);
    card = await response.json();
    answers = card.answers;

    if (isGameCard === "true") {
      const interval = setInterval(async () => {
        timeLeft -= 1;

        if (timeLeft == 0) {
          clearInterval(interval);
          const checkedCount = checkedAnswers.filter(
            (checked) => checked
          ).length;
          const scoreUpdate = {
            data: [
              { correctAnswers: checkedCount },
              { isWrongChecked: checkedWrongAnswer },
            ],
          };
     
          const gameId = localStorage.getItem("gameId");
          const response = await fetch($BASE_URL + "/updateScore" + "?gameid=" + gameId, {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify(scoreUpdate)
          });

          const keepPlaying = await response.json()

          console.log(keepPlaying.data)

          if(keepPlaying.data === "true"){
            navigate("/game/categories")
          }

          else{
             navigate("/gameover")
          }
         
        }
      }, 1000);
    }
  });
</script>

<div class="card">
  <h1>{card.title}</h1>
  {#if isGameCard === "true"}
    <h2>{timeLeft}</h2>
  {/if}
  <div class="answer-list">
    <div class="answer" style="background-color:red">
      <label for={card.wrong}>
        <input
          id={card.wrong}
          type="checkbox"
          bind:checked={checkedWrongAnswer}
        />
        <p>{card.wrong}</p>
      </label>
    </div>

    {#each answers as answer, i (answer)}
      <div class="answer">
        <label for={answer.answer}>
          <input
            id={answer.answer}
            type="checkbox"
            bind:checked={checkedAnswers[i]}
          />
          <p>{answer.answer}</p>
        </label>
      </div>
    {/each}
  </div>
</div>

<style>
  .card {
    margin-top: 3vh;
    display: flex;
    padding-bottom: 4vh;
    align-items: center;
    flex-direction: column;

    background-color: #700c37;
    flex-flow: column;
    justify-content: center;
    padding: 5vw;
    padding-top: 0;
  }

  .answer-list {
    display: flex;
    flex-direction: column;
  }

  .answer label {
    display: flex;
    align-items: center;
  }

  .answer {
    margin-top: 1vh;
    background-color: green;
    min-width: 30vw;
    border: 2px solid Black;
  }
</style>
