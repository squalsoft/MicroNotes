<template>
  <div class="register">
    <h1>Регистрация</h1>
    <h3>Придумайте логин и пароль</h3>

    <div class="register-box">
      <b>Логин</b><br>
      <input type="text" v-model="login" /><br>
      <b>Пароль</b><br>
      <input type="password" v-model="password" /><br>
      <b>Подтверждение пароля</b><br>
      <input type="password" v-model="passwordConfirm" /><br>
      <div v-if="loading" class="loader-small"></div>
      <input type="button" v-else  @click="registerUser"  class="register-button" 
        value="Зарегистрироваться">
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
      passwordConfirm: "",
      loading: false
    }
  },
  methods: {
    async registerUser() {
      this.error = "";
      if(this.password !== this.passwordConfirm) {
        this.error = "Пароли должны совпадать";
        return;
      }
      this.loading = true;
      try {
        const response = await this.$axios.post("/api/user/register/",
        {
          login: this.login,
          password: this.password
        });
        const token = response.data.token;
        // Сразу логиним пользователя после регистрации
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
.register-box {
  margin-left: auto;
  margin-right: auto;
  border: 1px solid black;
  max-width: 300px;
  padding: 10px;
}

.register-button {
  margin-top: 10px;
}
</style>