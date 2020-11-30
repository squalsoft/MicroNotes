<template>
  <div id="app">   
    <ErrorBoundary> 
      <h1>MicroNotes</h1>    
      <div v-if="$store.state.sys.loading" class="loader"></div>
      <div v-if="$route.matched.some(({ name }) => name === 'Notes')">
        <input type="button" class="exit" value="Выйти" @click="exit"/>  
      </div>
      <div id="nav" v-else>
        <router-link to="/login">Вход</router-link> |  
        <router-link to="/register">Регистрация</router-link>    
      </div>
      
    
      <router-view/>
    </ErrorBoundary>
  </div>
</template>

<script>
import cookies from "js-cookie";
import ErrorBoundary from '@/components/ErrorBoundary.vue'

export default {
  components: {
    ErrorBoundary
  },
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
