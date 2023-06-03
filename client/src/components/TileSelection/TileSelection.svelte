<script>
    export let options = [];
    export let selection = 0;
    export let setSelection = (option) => {};
    export let title ="";
    export let stringSelection = ""
  </script>
  
  
  
  <div>
    {#if !stringSelection}
    <h3>{title}</h3>
  
    {#each options as option (option)}
      <button
        class:selected={selection === option}
        on:click={() => setSelection(option)}
        style="margin-left: 0.5vw"
      >
        {option}
      </button>
    {/each}
    {/if}

    {#if stringSelection}
    <h3>{title}</h3>
    {#each options as option (option)}
      <button
        class:selected={stringSelection === option}
        on:click={() => setSelection(option)}
        style="margin-left: 0.5vw"
      >
        {option}
      </button>
    {/each}
    {/if}
  </div>

  <style>
    .selected {
        border-color: #646cff;
    }
  </style>