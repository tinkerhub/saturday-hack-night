import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/profile',
    component: () => import(/* webpackChunkName: "about" */ '../views/Profile.vue')
  },
  {
    path: '/logout',
    component: () => import(/* webpackChunkName: "about" */ '../views/Logout.vue')
  },
  {
    path: '/dashboard',
    component: () => import(/* webpackChunkName: "about" */ '../views/Dashboard.vue')
  }
]

// eventID / teamID
//
//
// import { getFunctions, httpsCallable } from "firebase/functions";
//
// const functions = getFunctions();
// const joinTeam = httpsCallable(functions, 'joinTeam');
//
// try{
//   await joinTeam({ teamID, eventID }) // Both are got from the invite url.
// }
// catch(error)
// {
//   // Not invited or already in some team, check the error returned.
// }

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
