<template>
  <div class="login">
    <h1>Вход</h1>

    <div class="login-box">
      <b>Логин</b><br>
      <input type="text" v-model="login" /><br>
      <b>Пароль</b><br>
      <input type="password" v-model="password" /><br>
      <div v-if="loading" class="loader-small"></div>
      <input v-else  @click="loginUser" type="button" class="login-button" value="Войти">
      <div v-if="error" class="error">
        {{error}}
      </div>
    </div>
  </div>
</template>

<script>
import {errorDetails} from "@/utils/error";
import cookies from "js-cookie";

export default {
  data: function () {
    return {
      error: "",
      login: "",
      password: "",
      loading: false
    }
  },
  methods: {
    async loginUser() {
      this.error = "";
      this.loading = true;
      try {
        const response = await this.$axios.post("/api/user/login/",
        {
          login: this.login,
          password: this.password
        });
        const token = response.data.token;
        // Устанавливаем токен в кукисы на 24 часа для дальнейшего доступа      
        cookies.set('x-access-token', token, { expires: 1 });
        this.$router.push('notes');

      } catch(err) {
        this.error = errorDetails(err);
      } finally {
        this.loading = false;
      }
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