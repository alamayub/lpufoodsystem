<template>
  <div class="text-center">
    <v-toolbar class="success mb-10">
      <v-spacer></v-spacer>
      <v-toolbar-title class="display-1 font-weight-bold white--text">Welcome...Your journey starts from here</v-toolbar-title>
      <v-spacer></v-spacer>
    </v-toolbar>

    <v-dialog class="mx-auto elevation-0" tile max-width="800" title elevation="0">
      <template v-slot:activator="{ on }">
        <v-btn color="primary" class="mx-2" tile width="300" dark v-on="on">
          Login
        </v-btn>
      </template>
      <v-card class="elevation-0" tile>
        <v-toolbar  color="primary" dark flat>
          <v-toolbar-title>Login form</v-toolbar-title>
        </v-toolbar>
        <v-card-text>
          <v-form v-model="log">
            <v-container>
              <v-row>

                <v-col cols="12">
                  <v-text-field v-model="email" type="email" :rules="emailRules" label="E-mail"></v-text-field>
                </v-col>

                <v-col cols="12">
                  <v-text-field v-model="password" :rules="[v => !!v || 'Password is required', ]" @click:append="show2 = !show2" :append-icon="show2 ? 'mdi-eye' : 'mdi-eye-off'" :type="show2 ? 'text' : 'password'" label="Password"></v-text-field>
                </v-col>

              </v-row>
            </v-container>
            <v-col cols="12" md="4" class="text-center mx-auto">
              <v-btn color="success" :disabled="!log" tile @click="login" block>Login</v-btn>
            </v-col>
          </v-form>
        </v-card-text>
      </v-card>

      
    </v-dialog>

    <v-dialog class="mx-auto" max-width="800">
      <template v-slot:activator="{ on }">
        <v-btn color="red lighten-2" dark class="mx-2" tile width="300" v-on="on">
          Register
        </v-btn>
      </template>

      <v-card class="elevation-0" tile>
        <v-toolbar  color="primary" dark flat>
          <v-toolbar-title>Register form</v-toolbar-title>
        </v-toolbar>
        <v-card-text>

          <v-form v-model="valid">
            <v-container>
              <v-row>

                <v-col cols="12" xs="12" sm="6" md="4">
                  <v-text-field v-model="shopName" type="text" :rules="[v => !!v || 'Shop Name is required']" label="Shop Name"></v-text-field>
                </v-col>

                <v-col cols="12" xs="12" sm="6" md="4">
                  <v-select v-model="shopAdress" :items="sadr" :rules="[v => !!v || 'Shop Adress is required']" label="Shop Adress"></v-select>
                </v-col>

                <v-col cols="12" xs="12" sm="6" md="4">
                  <v-text-field v-model="shopNumber" type="number" :rules="[v => !!v || 'Shop Number is required']" label="Shop Number"></v-text-field>
                </v-col>

                <v-col cols="12" xs="12" sm="6" md="4">
                  <v-text-field v-model="shopEmail" type="email" :rules="emailRules" label="Shop E-mail"></v-text-field>
                </v-col>

                <v-col cols="12" xs="12" sm="6" md="4">
                  <v-text-field v-model="shopOwner" type="text" :rules="[v => !!v || 'Owner Name is required']" label="Shop Owner Name"></v-text-field>
                </v-col>

                <v-col cols="12" xs="12" sm="6" md="4">
                  <v-text-field v-model="shopOwnerNo" type="number" :counter="10" :rules="[v => !!v || 'Shop Contact is required', v => v.length == 10 || 'Enter 10 digit phone number']" label="Shop Owner Name"></v-text-field>
                </v-col>

                <v-col cols="12" xs="12" sm="6" md="4">
                  <v-text-field v-model="pass1" :rules="[v => !!v || 'Password is required', v => v.length >= 6 || 'Password should be at least 6 character']" @click:append="show1 = !show1" :append-icon="show1 ? 'mdi-eye' : 'mdi-eye-off'" :type="show1 ? 'text' : 'password'" label="Enter Password"></v-text-field>
                </v-col>
                
                <v-col cols="12" xs="12" sm="6" md="4">
                  <v-text-field v-model="pass2" :rules="[v => !!v || 'Password is required', ]" @click:append="show2 = !show2" :append-icon="show2 ? 'mdi-eye' : 'mdi-eye-off'" :type="show2 ? 'text' : 'password'" label="Confirm Password"></v-text-field>
                </v-col>
                
              </v-row>
            </v-container>
            <v-col cols="12" md="4" class="text-center mx-auto">
              <v-btn color="success" :disabled="!valid" tile @click="register" block>Register</v-btn>
            </v-col>
          </v-form>
        </v-card-text>
      </v-card>
    </v-dialog>

    <v-snackbar v-model="snackbar" :timeout="3000" top>{{ text }}</v-snackbar>

  </div>
</template>

<script>
  import { fb, db } from '@/firebase'
  export default {
    data() {
      return {
        log: false,
        email: '',
        password: '',

        valid: false,
        show1: false, 
        show2: false,

        shopName: '',
        shopAdress: '',
        shopNumber: null,
        shopEmail: '',
        shopOwner: '',
        shopOwnerNo: null,
        pass1: '',
        pass2: '',
        shopImage: null,

        emailRules: [v => !!v || 'Shop E-mail is required', v => /.+@.+\..+/.test(v) || 'E-mail must be valid'],


        sadr: [ 'Campus Cafe', '34 Food Court', 'BH1 Food Court', 'BH2 Food Court', '56 Block Food Court' ],
        snackbar: false,
        text: '',
        utype: null,
      }
    },
    created() {
      this.u = fb.auth().currentUser
      if(fb.auth().currentUser) {
        this.$router.push('/vendor/dashboard')
      }
    },
    methods: {
      login() {
        fb.auth().signInWithEmailAndPassword(this.email, this.password).then( () => {
          this.$router.push('/vendor/dashboard')
          //this.utype = user.type
        }).catch( () => {
          this.snackbar = true
          this.text = 'Invalid E-mail/Password...Please retry'
        })
      },
      register() {
        fb.auth().createUserWithEmailAndPassword(this.shopEmail, this.pass1)
        .then( () => {
          var user = fb.auth().currentUser
          var sd = {
            shopAdress : this.shopAdress,
            shopEmail : this.shopEmail,
            shopID : user.uid,
            shopName : this.shopName,
            shopNumber : this.shopNumber,
            shopOwner : this.shopOwner,
            shopOwnerNo : this.shopOwnerNo,
            type: 'Vendor'
          }

          db.collection('shops').add(sd);
          
          if(user) {
            user.updateProfile({
              displayName: this.shopName,
              photoURL: "https://static.eazydiner.com/resized/750X436/eazytrendz%2F1950%2Ftrend20180709030615.jpg"
            }).then( () => {
              this.snackbar = true
              this.text = 'You have registered successfully'
            })
          }
          this.$router.push('/vendor/dashboard')
        })
      },
    }
  }
</script>