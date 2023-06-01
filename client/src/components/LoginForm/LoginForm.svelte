<script>
    import { navigate } from "svelte-navigator";
  
    let email = "";
    let password = "";
    let confirmPassword = "";
    let confirmEmail = "";
    let username = "";
    let isFailedLogin = false;
  
    export let onSubmit;
    export let state;
  
    function handleForgotPassword() {
      navigate("/forgotpassword");
    }
  
    function handleCreateUser() {
      navigate("/createUser");
    }
  
    function handleToLogin() {
      navigate("/login");
    }
  
    async function handleSubmit() {
      const failedLogin = await onSubmit(email, password, confirmPassword, confirmEmail, username);
      console.log(failedLogin)
      isFailedLogin = failedLogin;
      email = "";
      password = "";
      confirmEmail= "";
      confirmPassword= "";
      username = "";
    }
  </script>
  
  <div class="login-box">


    {#if state === "login"}
    <h1>Login</h1>
    {:else if state === "forgotPassword"}
    <h1>Reset Password</h1>
    {:else if state === "createUser"}
    <h1>Create User</h1>
    {/if}


    <form on:submit|preventDefault={handleSubmit}>
      <div class="loginForm">
        {#if isFailedLogin && state === "login"}
          <p class="failed-login">Login failed! Try again</p>
        {/if}

        <label for="email">Email:</label>
        <input type="text" id="email" class="login-input" bind:value={email} />


        {#if state === "login"}
          <label class="input-text" for="password">Password:</label>
          <input
            type="password"
            id="password"
            class="login-input"
            bind:value={password}
          />
          <button type="submit" class="login-button">Login</button>
          <button on:click={handleForgotPassword} class="login-button">Forgot Password</button>
          <button on:click={handleCreateUser} class="login-button">Create user</button>


        {:else if state === "forgotPassword"}
          <button type="submit" class="login-button">Reset Password</button>
          <button on:click={handleToLogin} class="login-button">To Login</button>


        {:else if state === "createUser"}
          <label for="email">Confirm email:</label>
          <input type="text" id="email" class="login-input" bind:value={confirmEmail} />
          <label class="input-text" for="password">Password:</label>
          <input
            type="password"
            id="password"
            class="login-input"
            bind:value={password} />
          <label class="input-text" for="password">Confirm password:</label>
          <input
            type="password"
            id="password"
            class="login-input"
            bind:value={confirmPassword}/>
          <label for="username">Pick username:</label>
          <input type="text" id="email" class="login-input" bind:value={username} />
          <button type="submit" class="login-button">Create User</button>
          <button on:click={handleToLogin} class="login-button">To Login</button>
          <button on:click={handleForgotPassword} class="login-button">Forgot Password</button>
        {/if}
      </div>
    </form>
  </div>
  
  <style>
    .loginForm {
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
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
      margin-top: 1vh;
    }
  
    .input-text {
      margin-top: 1vh;
    }
  </style>
  