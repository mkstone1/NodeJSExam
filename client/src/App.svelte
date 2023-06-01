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
  import CreateUser from "./pages/CreateUser/CreateUser.svelte";
  import MainMenu from "./pages/MainMenu/MainMenu.svelte";
  import Card from "./pages/Card/Card.svelte";
 

  let categories = [];
  let cards = [];
  onMount(async () => {

    getCategories();
    checkForLogin();
   

  });

  async function getCategories() {
    const categoryFetch = await fetch($BASE_URL + "/categories");

    categories = await categoryFetch.json();
  }

  async function getCards(){
    const response = await fetch($BASE_URL + "/cards")
  
    const cards = await response.json()
    console.log(cards)
  }


  async function checkForLogin(){
    const response = await fetch($BASE_URL + "/api/user", {
      credentials: "include",
    });
    const responseData = await response.json();
    if (!(responseData.data.message == "Not Logged in")) {
      username.set(responseData.data[0].username);
    }
  }

</script>

<Router>
  <nav class="navbar">
    <div class="right-links">
      <Link to="/">Home</Link>
      <Link to="/categories">categories</Link>
    </div>
    {#if $username}
      <ProfileDropDown />
    {:else}
      <Link to="/login">Login</Link>
    {/if}
  </nav>

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
  <Route path="/">
    <MainMenu />
  </Route>




  <Route path={`/category/:id`}>
    <Cards />
  </Route>


  <!--
      {#each categories as category (category.id)}
    <Route path={`/category/${category.title}`}>
      <Cards />
    </Route>
  {/each}
    
    
    {#each cards as card (card.id)}
    <Route path={`/card/${card.title}`}>
      <Cards />
    </Route>
  {/each} -->

  <Route path={`/card/:id`}>
    <Card />
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
</style>
