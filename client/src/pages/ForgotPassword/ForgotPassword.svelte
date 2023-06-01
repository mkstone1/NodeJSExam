<script>
  import toastr from "toastr";
  import LoginForm from "../../components/LoginForm/LoginForm.svelte";
  import { BASE_URL } from "../../stores/globalStore.js";
  import { navigate } from "svelte-navigator";
    async function handleSubmit(email){
      if(email){
      const response = await fetch($BASE_URL + "/auth/forgotPassword/" + email);
      toastr.success("If email is in use a link to reset password has been sent")
      navigate("/login")
    }
    else{
      toastr.error("Please enter email")
    }
  }
   
    </script>


<LoginForm onSubmit={handleSubmit} state="forgotPassword"/>
    