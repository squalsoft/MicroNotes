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
      <input type="button" :disabled="$store.state.sys.loading"  
        @click="registerUser"  class="register-button" 
        value="Зарегистрироваться">
    </div>
  </div>
</template>

<script>
import cookies from "js-cookie";

export default {
  data: function () {
    return {
      login: "",
      password: "",
      passwordConfirm: ""
    }
  },
  methods: {
    async registerUser() {
      if(this.password !== this.passwordConfirm) {
        throw new Error("Пароли должны совпадать");
      }
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