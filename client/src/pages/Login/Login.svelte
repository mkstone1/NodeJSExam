<script>
  import { navigate } from "svelte-navigator";
  import { BASE_URL } from "../../stores/globalStore.js";
  import { isLoggedIn, isAdmin } from "../../stores/authStore.js";
  import { writable } from "svelte/store";
  // @ts-ignore
  import toastr from "toastr";
  
  let email = "";
  let password = "";


  const failedLogin = writable(false);

  function handleForgotPassword() {
    navigate("/forgotpassword");
  }

  function handleCreateUser(){
    navigate("/createUser")
  }

  async function handleSubmit() {
    const userinfo = {
      data: { email: email, password: password },
    };

    const response = await fetch($BASE_URL + "/auth/login", {
      credentials: "include",
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(userinfo),
    });

    const responseStatus = await response.json();

    if (responseStatus.data[0].message === "success") {
      isLoggedIn.set(true);
    

      if (responseStatus.data[1]) {
        isAdmin.set(true);
      }
      toastr.success("You are now logged in");
      window.location.href = "/";
    } else {
      email = "";
      password = "";
      failedLogin.set(true);
    }
  }
</script>

<div class="login-box">
  <h1>Login</h1>

  <form on:submit|preventDefault={handleSubmit}>
    <div class="loginForm">
      {#if $failedLogin}
        <p class="failed-login">Login failed! Try again</p>
      {/if}
      <label for="email">Email:</label>
      <input type="text" id="email" class="login-input" bind:value={email} />


      <label class="input-text" for="password">Password:</label>
      <input
        type="password"
        id="password"
        class="login-input"
        bind:value={password}
      />
    </div>
    <button type="submit" class="login-button">Login</button>
  </form>

  <button on:click={handleForgotPassword} class="login-button">Forgot Password</button>
  <button on:click={handleCreateUser} class="login-button">Create user</button>
</div>

<style>
  .loginForm {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    margin-bottom: 10px;
  }
  .failed-login {
    background-color: red;
    padding: 10px;
    border-radius: 5%;
  }

  .login-box {
    margin-top: 3vh;
    display: flex;
    padding-bottom: 4vh;
    align-items: center;
    flex-direction: column;
    width: 30vw;
    background-color: #700c37;
    flex-flow: column;
    justify-content: center;
  }
  .login-input {
    background-color: #9c285a;
    border: 1px solid #9c285a;
    height: 4vh;
    width: 17vw;
  }

  .login-button {
    background-color: #c30b64;

    margin-top: 1vh;
    color: white;
  }

  .input-text {
    margin-top: 1vh;
  }
</style>
