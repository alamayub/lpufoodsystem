<template>
  <v-app>
    <UserNav />
    <v-content>
      <router-view></router-view>
    </v-content>
    <Footer class="d-none d-sm-flex d-md-flex" />
    <BottomNav class="d-flex d-sm-none d-md-none" />
  </v-app>
</template>

<script>
import UserNav from '@/components/UserNav'
import Footer from '@/components/Footer'
import BottomNav from '@/components/BottomNav'
export default {
  name: 'App',

  components: {
    UserNav, Footer, BottomNav
  },

  data: () => ({
    //
  }),
};
</script>
