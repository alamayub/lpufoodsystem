<template>
  <div class="mt-10">
    <v-bottom-navigation v-if="user!==null" color="deep-purple accent-4" class="d-flex d-sm-none" vertical fixed>
      <v-btn v-for="(item, i) in items" :key="i" link :to="item.route">
        <span>{{ item.title }}</span>
        <v-icon>{{ item.icon }}</v-icon>
      </v-btn>
    </v-bottom-navigation>

    <v-bottom-navigation v-if="user===null" color="deep-purple accent-4" class="d-flex d-sm-none" vertical fixed>
      <v-btn to="/">
        <span>Home</span>
        <v-icon>mdi-home</v-icon>
      </v-btn>
    </v-bottom-navigation>

  </div>
</template>

<script>
  import { fb } from '@/firebase'
  export default {
    data () {
      return {
        user: null,
        items: [
          { title: 'Home', icon: 'mdi-home', route: '/' },
          { title: 'Wishlist', icon: 'mdi-heart', route: '/wishlist' },
          { title: 'Orders', icon: 'mdi-food', route: '/orders' },
          { title: 'Cart', icon: 'mdi-cart', route: '/cart' },
          { title: 'Profile', icon: 'mdi-account', route: '/profile' },
        ],

      }
    },
    created() {
      this.user = fb.auth().currentUser
    }
  }
</script>