import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'
import Register from '../views/Register.vue'
import Login from '../views/Login.vue'
import Shared from '../views/Shared.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/login',
    name: 'Login',  
    component: Login  
  },
  {
    path: '/register',
    name: 'Register',
    component: Register
  },
  {
    path: '/shared/:id', // $route.params.id
    name: 'Shared',
    component: Shared
  },
  {
    path: '/notes',
    name: 'Notes',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/Notes.vue')
  },  
]

const router = new VueRouter({
  routes
})

export default router
