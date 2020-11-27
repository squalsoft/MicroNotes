<template>
  <div id="app">    
    <div v-if="$route.matched.some(({ name }) => name === 'Notes')">
      <input type="button" class="exit" value="Выйти" @click="exit"/>  
    </div>
    <div id="nav" v-else>
      <router-link to="/login">Вход</router-link> |  
      <router-link to="/register">Регистрация</router-link>    
    </div>
    
    <router-view/>
  </div>
</template>

<script>
import cookies from "js-cookie";

export default {
  data: function () {
    return {
      isLoggedIn: false,
    }
  },
  async mounted() {
  },
  methods: {
    exit() {
      // Очистка реквизитов доступа
      cookies.remove('x-access-token');
      this.$router.push('login');
    }
  }
}
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

#nav {
  padding: 30px;
}

#nav a {
  font-weight: bold;
  color: #2c3e50;
}

#nav a.router-link-exact-active {
  color: #42b983;
}
</style>
