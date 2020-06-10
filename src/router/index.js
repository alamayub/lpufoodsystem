import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'home',
    component: Home,
  },
  {
    path: '/viewFood/:id',
    name: 'viewfood',
    component: () => import('../views/user/ViewFood.vue'),
  },
  {
    path: '/cart',
    name: 'Cart',
    component: () => import('../views/user/Cart.vue')
  },
  {
    path: '/wishlist',
    name: 'wishlist',
    component: () => import('../views/user/Wishlist.vue')
  },
  {
    path: '/orders',
    name: 'orders',
    component: () => import('../views/user/Orders.vue')
  },
  {
    path: '/profile',
    name: 'profile',
    component: () => import('../views/user/Profile.vue')
  },
  

  {
    path: '/vendorlogin',
    name: 'vendorlogin',
    component: () => import('../views/vendor/VendorLogin.vue')
  },

  {
    path: '/vendor',
    name: 'vendor',
    component: () => import('../views/vendor/Vendor.vue'),
    children: [
      {
        path: 'dashboard',
        name: 'dashboard',
        component: () => import('../views/vendor/Dashboard.vue')
      },
      {
        path: 'vorders',
        name: 'vorders',
        component: () => import('../views/vendor/Orders.vue')
      },
      {
        path: 'vprofile',
        name: 'vprofile',
        component: () => import('../views/vendor/Profile.vue')
      },
    ]
  },
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
