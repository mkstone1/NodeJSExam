<script>
    import { navigate } from "svelte-navigator";
  
  
    let Email = "";

  
    function handleForgotPassword(){
      navigate("/login")
    }
   
    </script>
    <div class="login-box">
    <h1>Login</h1>
    
    
    <form on:submit>
      <div class="loginForm">
      
        <label for="email">Email:</label>
        <input type="text" id="email" class="login-input" bind:value={Email} />
    
      </div>
      <button type="submit" class="login-button">Reset Password</button>
    </form>
    
    <button on:click={handleForgotPassword} class="login-button" >Go To Login </button>
  
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
  
      .login-box{
          margin-top:3vh;
          display: flex;
          padding-bottom: 4vh;
          align-items: center;
          flex-direction: column;
          width: 30vw;
          background-color: #700c37;
          flex-flow: column;
          justify-content: center;
      }
      .login-input{
      
          background-color: #9c285a;
          border: 1px solid #9c285a;
          height: 4vh;
          width:17vw;
      }   
  
      .login-button{
          background-color: #c30b64;
  
          margin-top: 1vh;
          color:white;
      }
  
      .input-text{
          margin-top:1vh;
      }
    </style>
    