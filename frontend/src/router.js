import Vue from 'vue'
import Router from 'vue-router'
import Home from './views/Home.vue'
import Profile from './views/Profile.vue'
import addProduct from './views/addProduct.vue'
import allProduct from './views/allProduct.vue'
import oneProduct from './views/oneProduct.vue'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'home',
      component: Home
    },
    {
      path: '/profile',
      name: 'profile',
      component: Profile
    },
    {
      path: '/addproduct',
      name: 'product',
      component: addProduct
    },
    {
      path: '/allProduct',
      name: 'allProduct',
      component: allProduct
    },
    {
      path: '/product/:id',
      name: 'product/:id',
      component: oneProduct
    }
  ]
})
