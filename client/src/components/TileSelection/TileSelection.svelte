<script>
    export let options = [];
    export let selection = 0;
    export let setSelection = (option) => {};
    export let title ="";
  </script>
  
  
  
  <div>
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
  </div>

  <style>
    .selected {
        border-color: #646cff;
    }
  </style>