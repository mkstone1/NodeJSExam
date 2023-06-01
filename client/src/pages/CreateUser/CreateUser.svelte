<script>
  import LoginForm from "../../components/LoginForm/LoginForm.svelte";
  import { BASE_URL } from "../../stores/globalStore.js";
  import toastr from "toastr";
  import { navigate } from "svelte-navigator";

  
  async function handleSubmit(email, password, confirmPassword, confirmEmail, username) {
    if(!email || !password || !confirmEmail || !confirmPassword || !username) {
        toastr.error("Please fill out all information")
    }
    else if (!(password === confirmPassword)){
        toastr.error("Passwords dont match");
    }
    else if (!(email === confirmEmail)){
        toastr.error("Emails dont match");
    }

    else{
    const userinfo =  {data:{email:email, password:password, username:username}};


    const response = await fetch($BASE_URL + "/auth/createUser", {
      credentials: "include",
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(userinfo),
    });
    const responseStatus = await response.json();
    if (responseStatus.data.message === "success") {
        toastr.success("Account created. You can now login")
        navigate("/login")
      }
      else if(responseStatus.data.message === "Email in use"){
        toastr.error("Email is already in use")
      }
      else if(responseStatus.data.message === "Username in use"){
        toastr.error("Username is already in use")
      }
  }
  }
</script>

<LoginForm onSubmit={handleSubmit} state="createUser" />
