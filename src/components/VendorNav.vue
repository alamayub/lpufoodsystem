<template>
  <div class="vendornav">
    <v-toolbar>
      <v-app-bar-nav-icon @click="drawer = !drawer"></v-app-bar-nav-icon>
      <v-toolbar-title>Vendor Admin Panel</v-toolbar-title>

      <v-spacer></v-spacer>

      <v-toolbar-items>
        <v-btn text @click="logout">
          <v-icon left>mdi-logout</v-icon>
          <span>signout</span>
        </v-btn>
      </v-toolbar-items>

    </v-toolbar>

    <v-navigation-drawer v-model="drawer" disable-resize-watcher absolute temporary>
      <v-list-item>
        <v-list-item-avatar>
          <v-img :src="pic"></v-img>
        </v-list-item-avatar>

        <v-list-item-content>
          <v-list-item-title>{{ name }}</v-list-item-title>
        </v-list-item-content>
      </v-list-item>

      <v-divider></v-divider>

      <v-list dense>

        <v-list-item v-for="item in items" :key="item.title" link :to="item.route">
          <v-list-item-icon>
            <v-icon>{{ item.icon }}</v-icon>
          </v-list-item-icon>

          <v-list-item-content>
            <v-list-item-title>{{ item.title }}</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
      </v-list>
      
    </v-navigation-drawer>

    <v-snackbar v-model="snackbar" :timeout="3000" top>{{ text }}</v-snackbar>

  </div>
</template>


<script>
  import { fb } from '@/firebase'
  export default {
    data () {
      return {
        drawer: null,
        items: [
          { title: 'Dashboard', icon: 'mdi-view-dashboard', route: '/vendor/dashboard' },
          { title: 'Orders', icon: 'mdi-food', route: '/vendor/vorders' },
          { title: 'Profile', icon: 'mdi-account', route: '/vendor/vprofile' },
        ],

        name: '',
        pic: '',
        snackbar: false,
        text: '',
      }
    },
    created () {
      this.name = fb.auth().currentUser.displayName
      this.pic = fb.auth().currentUser.photoURL
    },
    methods: {
      logout() {
        fb.auth().signOut().then( () => {
          this.snackbar = true
          this.text = 'Vendor logged out successfully'
          this.$router.push('/vendorlogin')
        })
      }
    }
  }
</script>