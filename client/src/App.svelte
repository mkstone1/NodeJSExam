<script>
  // @ts-ignore
  import { Router, Link, Route } from "svelte-navigator";
  import Categories from "./pages/Categories/Categories.svelte";
  import Cards from "./pages/Cards/Cards.svelte";
  import Login from "./pages/Login/Login.svelte";
  import ForgotPassword from "./pages/ForgotPassword/ForgotPassword.svelte";
  import ProfileDropDown from "./components/ProfileDropDown/ProfileDropDown.svelte";
  import { username } from "./stores/userStore.js";
  import { BASE_URL } from "./stores/globalStore.js";
  import { onMount } from "svelte";
  import CreateUser from "./pages/CreateUser/CreateUser.svelte";
  import MainMenu from "./pages/MainMenu/MainMenu.svelte";
  import Card from "./pages/Card/Card.svelte";
  import StartGame from "./pages/StartGame/StartGame.svelte";
  import GameCard from "./pages/GameCard/GameCard.svelte";
  import GameCatgories from "./pages/GameCategories/GameCatgories.svelte";
  import GameOver from "./pages/GameOver/GameOver.svelte";
  import Rules from "./pages/Rules/Rules.svelte";
  import GameMultiDeviceSetup from "./pages/GameMultiDeviceSetup/GameMultiDeviceSetup.svelte";
  import JoinGame from "./pages/JoinGame/JoinGame.svelte";
  import MyProfile from "./pages/MyProfile/MyProfile.svelte";
  import { Shadow } from "svelte-loading-spinners";

  const gameId = localStorage.getItem("gameId");
  let isLoading = true;

  onMount(async () => {
 
    try {
        const response = await fetch($BASE_URL+ "/api/user", {
        credentials: "include",
      });
      const responseData = await response.json();

      if (!(responseData.data.message == "Not Logged in")) {
        username.set(responseData.data.username);
      }
    } catch (error) {
      username.set(null);
    }
     isLoading = false;
  
  });

  function handleExitGame() {
    localStorage.clear();
    window.location.href = "/";
  }
</script>

<Router>
  <nav class="navbar">
    <div class="right-links">
      <Link to="/">Home</Link>
      <Link to="/categories">View questions</Link>
      {#if gameId}
        <button on:click={handleExitGame}>Exit game</button>
      {/if}
    </div>
    {#if $username}
      <ProfileDropDown />
    {:else}
      <Link to="/login">Login</Link>
    {/if}
  </nav>

  <Route path="/">
    <MainMenu />
  </Route>

  <Route path="/myprofile">
    {#if isLoading}
      <div class="spinner">
        <Shadow />
      </div>
    {:else if $username}
      <MyProfile />
    {:else}
      <Login />
    {/if}
  </Route>
  <Route path="/rules">
    <Rules />
  </Route>

  <Route path="/categories">
    <Categories />
  </Route>

  <Route path="/cards">
    <Cards />
  </Route>

  <Route path="/login">
    <Login />
  </Route>

  <Route path="/forgotpassword">
    <ForgotPassword />
  </Route>

  <Route path="/createUser">
    <CreateUser />
  </Route>

  <Route path="/startGame">
    <StartGame />
  </Route>

  <Route path={`/category/:id`}>
    <Cards />
  </Route>

  <Route path={`/card/:id`}>
    <Card isGameCard="false" roundLength="-1" />
  </Route>

  <Route path={`/gamecard/card/:id`}>
    <GameCard />
  </Route>

  <Route path={`/gamecard/card/:id/:hasStarted`}>
    <GameCard />
  </Route>

  <Route path="/game/categories">
    <GameCatgories />
  </Route>

  <Route path="/gameover">
    <GameOver />
  </Route>

  <Route path="/gameMultiDeviceSetup">
    <GameMultiDeviceSetup />
  </Route>

  <Route path="/joingame">
    <JoinGame />
  </Route>
</Router>

<style>
  .navbar {
    display: flex;
    width: 100vw;

    justify-content: space-around;
    background-color: #02aab5;
    height: 5vh;
    padding-top: 2vh;
    padding-bottom: 2vh;
  }
  .right-links {
    display: flex;
  }

  .spinner {
    margin-top: 10vh;
  }
</style>
