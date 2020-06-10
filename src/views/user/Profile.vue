<template>
  <v-container fill-height fluid grid-list-xl>
    <v-layout justify-center wrap>

      <v-flex xs12 md4>
        <material-card class="v-card-profile">
          <v-avatar slot="offset" class="mx-auto d-block" size="250">
            <v-img :src="pic" />
          </v-avatar>

          <v-card-text class="text-xs-center" v-for="(p, i) in profile" :key="i">
            <h6 class="category text-gray font-weight-bold display-1 mb-3">User Profile</h6>
            <h4 class="card-title font-weight-bold green--text" style="font-size: 22px;" >Name : {{ p.name }}</h4>            
            <h4 class="card-title font-weight-bold green--text" style="font-size: 22px;">Email : {{ p.email }}</h4>
            <h4 class="card-title font-weight-bold green--text" style="font-size: 22px;">Contact : {{ p.contact }}</h4>
            
          </v-card-text>
          <v-btn class="mt-2 success" tile block @click="logout" v-if="user !== null">Logout</v-btn>
        </material-card>
      </v-flex>

    </v-layout>
  </v-container>
</template>

<script>
import { fb, db } from '@/firebase'
export default {
  data() {
    return {
      user: null,
      pic: '',
      profile: [],
      p: { name: '', email: '', contact: 0, },
    }
  },
  created() {
    this.pic = fb.auth().currentUser.photoURL
    if(!fb.auth().currentUser) {
      this.$router.push('/')
    } else {
      this.user = fb.auth().currentUser
    }
  },
  firestore() {
    return {
      profile : db.collection('users').where('userID', '==', fb.auth().currentUser.uid) 
    }
  },
  methods: {
    logout() {
      fb.auth().signOut().then( () => {
        this.$router.push('/')
      })
    }
  }
}
</script>