import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView
    },
    {
      path: '/anime/:id',
      name: 'anime',
      // route level code-splitting
      // this generates a separate chunk (About.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import('../views/animeView.vue')
    },
    {
      path: '/manga/:id',
      name: 'manga',
      // route level code-splitting
      // this generates a separate chunk (About.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import('../views/MangaView.vue')
    },
    {
      path: '/anime/search/:search', // Define your route with parameter
      name: 'Animesearch',
      component: () => import('../views/animeSearchView.vue')
    },
    {
      path: '/manga/search/:search', // Define your route with parameter
      name: 'Mangasearch',
      component: () => import('../views/mangaSearchView.vue')
    },
    {
      path: '/anime/tagSearch', // Define your route with parameter
      name: 'Animegener',
      component: () => import('../views/animeGenerView.vue')
    },
    {
      path: '/manga/tagSearch', // Define your route with parameter
      name: 'Mangagener',
      component: () => import('../views/mangaGenerView.vue')
    },
    {
      path: '/:catchAll(.*)', // This should be the last route in your routes array
      name: 'NotFound',
      component: () => import('../views/NotFound.vue')
    }
    // { path: '*', component: () => import('../views/notfoundView.vue') }
  ]
})

export default router
