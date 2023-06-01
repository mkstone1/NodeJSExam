<script>
  import { BASE_URL } from "../../stores/globalStore.js";
  import LoginForm from "../../components/LoginForm/LoginForm.svelte";
  

  async function handleSubmit(email, password) {
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
      window.location.href = "/";
      return false
    } else {
      email = "";
      password = "";
      return true;
    }
  }

</script>

  <LoginForm onSubmit={handleSubmit} state="login"/>