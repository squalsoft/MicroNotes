<template>
  <div class="login">
    <h1>Вход</h1>

    <form class="login-box">
      <b>Логин</b><br>
      <input type="text" v-model="login" v-on:keyup.enter="loginUser"
        autocomplete="username" /><br>
      <b>Пароль</b><br>
      <input type="password" v-model="password" v-on:keyup.enter="loginUser"
        autocomplete="password" /><br>
      <input :disabled="$store.state.sys.loading"  
        @click="loginUser" 
        type="button" class="login-button" value="Войти">      
    </form>
  </div>
</template>

<script>
import cookies from "js-cookie";

export default {
  data: function () {
    return {
      login: "",
      password: ""
    }
  },
  methods: {
    async loginUser() {
        const response = await this.$axios.post("/api/user/login/",
          {
            login: this.login,
            password: this.password
          });
        const token = response.data.token;
        // Устанавливаем токен в кукисы на 24 часа для дальнейшего доступа      
        cookies.set('x-access-token', token, { expires: 1 });
        this.$router.push('notes');
    }
  }
}
</script>

<style scoped>
.login-box {
  margin-left: auto;
  margin-right: auto;
  border: 1px solid black;
  max-width: 300px;
  padding: 10px;
}
.login-button {
  margin-top: 10px;
}
 
</style>