<script>
  import { onMount } from "svelte";
  import { BASE_URL } from "../../stores/globalStore.js";
  import { username } from "../../stores/userStore.js";
  import toastr from "toastr";
  import { navigate } from "svelte-navigator";
  let showDropDown = false;

  function handleClickDropDown() {
    showDropDown = !showDropDown;
  }

  async function handleLogout(){
    const response = await fetch($BASE_URL + "/auth/logout", {
      method: "POST",
      credentials: "include",
    });
    toastr.error("You are now logged out")
    window.location.href = "/";
  }
</script>

<!-- svelte-ignore a11y-click-events-have-key-events -->
<div class="drop-down" on:click={handleClickDropDown}>
  <p>{$username} ↓</p>
  {#if showDropDown}
    <div class="drop-down-links">
      <a class="links" href="/">link 1</a>
      <a class="links" href="/">link 1</a>
      <button class="links" on:click={handleLogout}>Logout</button>
    </div>
  {/if}
</div>

<style>
  .drop-down {
    position: relative;
    display: flex;
    align-items: center;
    justify-content: center;
    font-weight: 500;
    background-color: #9c285a;
    color: white;
    text-decoration: inherit;
    margin-right: 1em;
    border: 2px solid Black;
    border-radius: 5%;
    padding-left: 15px;
    padding-right: 15px;
    min-width: 10vw;
  }

  .drop-down:hover {
    cursor: pointer;
  }

  .drop-down-links {
    position: absolute;
    top: calc(100% + 2px);
    left: 0;
    background-color: #700c37;
    box-shadow: 0px 8px 16px 0px rgba(0, 0, 0, 0.2);
    width: 100%;
  }
  .links {
    display: block;
    box-sizing: border-box;
    padding: 12px 16px;
    width: 100%;
    border-radius: 5%;
    background-color: #9c285a;
    color: white;
    border: 2px solid Black;
    padding-left: 15px;
    padding-right: 15px;
  }
</style>
