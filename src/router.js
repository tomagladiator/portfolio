import Vue from 'vue'
import Router from 'vue-router'
import Home from './views/Home.vue'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'home',
      component: Home
    },
    {
      path: '/realisations',
      name: 'realisations',
      // route level code-splitting
      // this generates a separate chunk (about.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import(/* webpackChunkName: "about" */ './views/Realisations.vue')
    },
    {
      path: '/articles',
      name: 'articles',
      component: () => import('./views/Articles.vue')
    },
    {
      path: '/chatbot',
      name: 'chatbot',
      component: () => import('./views/Robot.vue')
    },
    {
      path: '/robot',
      name: 'robot',
      component: () => import('./views/Robot.vue')
    },
    {
      path: '/contact',
      name: 'contact',
      component: () => import('./views/Contact.vue')
    },
    {
      path: '/thanks',
      name: 'thanks',
      component: () => import('./views/Thanks.vue')
    },
    {
      path: '/expertise',
      name: 'expertise',
      component: () => import('./views/Expertise.vue')
    },
    {
      path: '/remote',
      name: 'remote',
      component: () => import('./views/Remote.vue')
    }
  ]
})
