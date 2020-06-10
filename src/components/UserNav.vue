<template>
  <div class="usernav" v-show="$route.path!=='/vendorlogin' || $route.path!=='/vendor'">
    <v-toolbar>
      <v-app-bar-nav-icon @click="drawer = !drawer" class="d-flex d-sm-none d-md-none"></v-app-bar-nav-icon>
      <v-toolbar-title><h1>LPU Food Court</h1>
      </v-toolbar-title>

      <v-spacer></v-spacer>

      <v-toolbar-items class="d-none d-sm-flex d-md-flex">
        <v-btn text to="/">Home</v-btn>
        <v-btn text v-if="user === null" @click="log = true">Login</v-btn>
        <v-btn text v-if="user !== null" to="/cart">Cart</v-btn>
        <v-btn text v-if="user !== null" to="/wishlist">Wishlist</v-btn>
        <v-btn text v-if="user !== null" to="orders">Orders</v-btn>
        <v-btn text v-if="user !== null" to="profile">Profile</v-btn>   
        <v-btn text v-if="user !== null" @click="logout">
          <v-icon left>mdi-logout</v-icon>
          <span>signout</span>
        </v-btn>    
      </v-toolbar-items>
    </v-toolbar>

    <v-navigation-drawer v-model="drawer" disable-resize-watcher absolute temporary>
        <v-list-item>
          <v-list-item-avatar>
            <v-icon v-if="user === null">mdi-account</v-icon>
            <v-img v-if="user !== null" :src="user.photoURL"></v-img>
          </v-list-item-avatar>

          <v-list-item-content>
            <v-list-item-title v-if="user !== null">{{ user.displayName}}</v-list-item-title>
            <v-list-item-title v-if="user === null">Please Login</v-list-item-title>
          </v-list-item-content>

        </v-list-item>

        <v-divider></v-divider>

        <v-list dense v-if="user === null">

          <v-list-item @click="[log = true, reg = false, drawer = false]">
            <v-list-item-icon>
              <v-icon>mdi-login</v-icon>
            </v-list-item-icon>

            <v-list-item-content>
              <v-list-item-title>Login</v-list-item-title>
            </v-list-item-content>
          </v-list-item>

        </v-list>

        <v-list dense v-if="user !== null">

          <v-list-item v-for="item in items" :key="item.title" link :to="item.route">
            <v-list-item-icon>
              <v-icon>{{ item.icon }}</v-icon>
            </v-list-item-icon>

            <v-list-item-content>
              <v-list-item-title>{{ item.title }}</v-list-item-title>
            </v-list-item-content>
          </v-list-item>

        </v-list>
      <template v-slot:append v-if="user !== null">
        <div>
          <v-btn tile block @click="logout">Logout</v-btn>
        </div>
      </template>
    </v-navigation-drawer>

    <v-dialog v-model="log" max-width="800">
      <v-card class="elevation-0" tile>
        <v-toolbar  color="primary" dark flat>
          <v-toolbar-title>Login form</v-toolbar-title>
        </v-toolbar>
        <v-card-text>
          <v-form v-model="valid">
            <v-container>
              <v-row>
                <v-col cols="12">
                  <v-text-field v-model="lemail" type="email" :rules="emailRules" label="E-mail"></v-text-field>
                </v-col>
                <v-col cols="12">
                  <v-text-field v-model="lpassword" :rules="[v => !!v || 'Password is required', ]" @click:append="show2 = !show2" :append-icon="show2 ? 'mdi-eye' : 'mdi-eye-off'" :type="show2 ? 'text' : 'password'" label="Password"></v-text-field>
                </v-col>
              </v-row>
            </v-container>
            <v-col cols="12" md="6" sm="6" class=" mx-auto">
              <v-btn color="success" :disabled="!valid" tile @click="login" block class="mb-2">Login</v-btn>
              <v-spacer></v-spacer>
              <v-btn color="primary" tile @click="[reg = true, log = false]" block>Register</v-btn>
            </v-col>
          </v-form>
        </v-card-text>
      </v-card>
    </v-dialog>

    <v-dialog v-model="reg" max-width="800">
      <v-card class="elevation-0" tile text>
        <v-toolbar  color="primary" dark flat>
          <v-toolbar-title>Register form</v-toolbar-title>
        </v-toolbar>
        <v-card-text>
          <v-form v-model="validr">
            <v-container>
              <v-row>
                <v-col cols="12" xs="12" sm="6" md="4">
                  <v-text-field v-model="name" type="text" :rules="[v => !!v || 'Name is required']" label="Full Name"></v-text-field>
                </v-col>
                <v-col cols="12" xs="12" sm="6" md="4">
                  <v-text-field v-model="email" type="email" :rules="emailRules" label="E-mail"></v-text-field>
                </v-col>
                <v-col cols="12" xs="12" sm="6" md="4">
                  <v-text-field v-model="contact" type="number" :counter="10" :rules="[v => !!v || 'Contact is required', v => v.length == 10 || 'Enter 10 digit phone number']" label="Contact"></v-text-field>
                </v-col>
                <v-col cols="12" xs="12" sm="6" md="4">
                  <v-text-field v-model="pass1" :rules="[v => !!v || 'Password is required', v => v.length >= 6 || 'Password should be at least 6 character']" @click:append="show1 = !show1" :append-icon="show1 ? 'mdi-eye' : 'mdi-eye-off'" :type="show1 ? 'text' : 'password'" label="Enter Password"></v-text-field>
                </v-col>
                <v-col cols="12" xs="12" sm="6" md="4">
                  <v-text-field v-model="pass2" :rules="[v => !!v || 'Password is required', ]" @click:append="show2 = !show2" :append-icon="show2 ? 'mdi-eye' : 'mdi-eye-off'" :type="show2 ? 'text' : 'password'" label="Password"></v-text-field>
                </v-col>
              </v-row>
            </v-container>
            <v-col cols="12" md="6" sm="6" class="text-center mx-auto">
              <v-btn color="success" :disabled="!validr" tile @click="register" block class="mb-2">Register</v-btn>
              <v-spacer></v-spacer>
              <v-btn color="primary" tile @click="[reg = false, log = true]" block>Login</v-btn>
            </v-col>
          </v-form>
        </v-card-text>
      </v-card>
    </v-dialog>

    <v-snackbar v-model="snackbar" :timeout="3000" top>{{ text }}</v-snackbar>


  </div>
</template>

<script>
  import { fb, db} from '@/firebase'
  export default {
    data: () => ({
      valid: false,
      validr: false,
      log: false,
      reg: false,

      show1: false, 
      show2: false,



      drawer: null,
      items: [
        { title: 'Home', icon: 'mdi-home', route: '/' },
        { title: 'Cart', icon: 'mdi-cart', route: '/cart' },
        { title: 'Orders', icon: 'mdi-food', route: '/orders' },
        { title: 'Wishlist', icon: 'mdi-heart', route: '/wishlist' },
        { title: 'Profile', icon: 'mdi-account', route: '/profile' },
      ],

      emailRules: [v => !!v || 'E-mail is required', v => /.+@.+\..+/.test(v) || 'E-mail must be valid'],

      user: null,

      lemail: '',
      lpassword: '',
      name: '',
      email: '',
      contact: 0,
      pass1: '',
      pass2: '',

      snackbar: false,
      text: '',

      users: [],
      
    }),
    created() {
      this.user = fb.auth().currentUser
    },
    firestore() {
    },
    methods: {
      login() {
        fb.auth().signInWithEmailAndPassword(this.lemail, this.lpassword).then( () => {
          this.snackbar = true
          this.text = 'User logged in successfully!'
          this.log = false
          //this.$router.push('/cart')
        }).catch( () => {
          this.snackbar = true
          this.text = 'Invalid E-mail/Password...Please retry'
        })
      },
      register() {
        fb.auth().createUserWithEmailAndPassword(this.email, this.pass1)
        .then( () => {
          var user = fb.auth().currentUser
          var sd = {
            name : this.name,
            email : this.email,
            contact: this.contact,
            password: this.pass1,
            userID : user.uid,
          }

          db.collection('users').add(sd).then( () => {
            this.snackbar = true
            this.text = 'user registered successfully'
          });
          
          if(user) {
            user.updateProfile({
              displayName: this.name,
              photoURL: "https://static.eazydiner.com/resized/750X436/eazytrendz%2F1950%2Ftrend20180709030615.jpg"
            }).then( () => {
              alert(user.displayName)
            })
          }
          this.reg = false
          //this.$router.push('/cart')
        })
      },
      logout() {
        fb.auth().signOut().then( () => {
          this.snackbar = true
          this.text = 'User logged out successfully!'
          this.$router.push('/')
        })
      }
    }
  }
</script>
