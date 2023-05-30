<script>
  // @ts-ignore
  import { Router, Link, Route } from "svelte-navigator";
  import Categories from "./pages/Categories/Categories.svelte";
  import Cards from "./pages/Cards/Cards.svelte";
  import Login from "./pages/Login/Login.svelte";
  import ForgotPassword from "./pages/ForgotPassword/ForgotPassword.svelte";
  import { isLoggedIn, isAdmin } from "./stores/authStore.js";
  import ProfileDropDown from "./components/ProfileDropDown/ProfileDropDown.svelte";
  import { username } from "./stores/userStore.js";
  import { BASE_URL } from "./stores/globalStore.js";
  import { onMount } from "svelte";

  onMount(async () => {
    const response = await fetch($BASE_URL + "/api/user", {
      credentials: "include",
    });
    const responseData = await response.json();
    if(!(responseData.data.message=="Not Logged in")) {
    
      username.set(responseData.data[0].username);
    }
  });
</script>
<Router>
  <nav class="navbar">
    <div class="right-links">
      <Link to="/categories">categories</Link>
      <Link to="/cards">cards</Link>
    </div>
    {#if $username}
      <ProfileDropDown />
    {:else}
      <Link to="/login">Login</Link>
    {/if}
  </nav>

  <Route path="/" />
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
    --note-color: black;
  }
  .right-links {
    display: flex;
  }
</style>
