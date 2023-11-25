import { createRouter, createWebHistory } from 'vue-router'
import Main from '../views/Main.vue'
import search from '../views/search.vue'
import profile from '../views/profile.vue'
import create from '../views/create.vue'
import register from '../views/register.vue'
import login from '../views/login.vue'
import pet from '../views/pet.vue'

const routes = [
  {
    path: '/',
    name: 'home',
    component: Main
  },
  {
    path: '/search',
    name: 'search',
    component: search
  },
  {
    path: '/profile',
    name: 'profile',
    component: profile
  },
  {
    path: '/create',
    name: 'create',
    component: create
  },
  {
    path: '/register',
    name: 'register',
    component: register
  },
  {
    path: '/login',
    name: 'login',
    component: login
  },
  {
    path: '/pet/:id',
    name: 'pet',
    component: pet
  },
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
