<template>
  <div class="fooditem ma-2">
    <h1>Lovely Food Items</h1>

    <v-layout row wrap class="pad-overall d-flex d-sm-none" fill-height>
      <template v-for="(food, index) in foods" >
        <v-flex xs="2" :key="index">
          <v-card elevation="0" class="mx-auto pad white" tile flat max-width="200" max-height="250">
            <v-img class="text-right" :src="pics[index]" style="max-width: 100%; opacity: .6;" height="120">
              <v-btn icon @click="wishlist(food)" color="red" style="opacity: 1;">
                <v-icon>mdi-heart</v-icon>
              </v-btn>
            </v-img>

            <v-card-text style="position: relative;">
              <v-btn absolute color="orange" class="white--text" fab small right top @click="addToCart(food)">
                <v-icon>mdi-cart</v-icon>
              </v-btn>
              <div class="font-weight-bold blue--text yellow--text"><router-link v-bind:to="'/view/'+food['.key']">{{food.name}}</router-link></div>
              <div class="font-weight-light green--text">
                <span style="float: left;">Rs. {{food.price}}</span>
                <span style="float: right;">off {{food.discount}}%</span>
              </div><br>
              
            </v-card-text>
          </v-card>
        </v-flex>
      </template>
    </v-layout>
    
    <v-item-group class="d-none d-sm-lex d-md-flex">
      <v-container fluid >
        <v-row  class="mx-auto">
          <v-col class="ma-0 pa-0" v-for="(food, i) in foods" :key="food">
            <v-hover v-slot:default="{ hover }">
              <v-card :elevation="hover ? 12 : 2" max-width="300" tile flat class="mx-1 my-1" >
                <!--<v-item v-slot:default="{ active, toggle }">
                  <v-img class="text-right" src="https://cdn.vuetifyjs.com/images/cards/mountain.jpg" style="max-width: 100%;" @click="toggle">
                    <v-btn icon @click="icon ? 'mdi-heart' : 'mdi-heart-outline'">
                      <v-icon>{{ active ? 'mdi-heart' : 'mdi-heart-outline' }}</v-icon>
                    </v-btn>
                  </v-img>
                </v-item>-->
                <v-item>
                  <v-img class="text-right" :src="pics[i]" style="max-width: 100%;" height="200">
                    <v-btn icon @click="wishlist(food)" color="red">
                      <v-icon>mdi-heart</v-icon>
                    </v-btn>
                  </v-img>
                </v-item>
                <v-card-text class="pt-4" style="position: relative;">
                  <v-btn absolute color="orange" class="white--text" fab medium right top @click="addToCart(food)">
                    <v-icon>mdi-cart</v-icon>
                  </v-btn>

                  <div class="font-weight-light red--text">For : {{food.type}}</div>
                  <div class="font-weight-bold blue--text yellow--text"><router-link v-bind:to="'/viewFood/'+food['.key']">{{food.name}}</router-link></div>
                  <div class="font-weight-light green--text">
                    <span style="float: left;">Rs. {{food.price}}</span>
                    <span style="float: right;">{{food.discount}}% off</span>
                  </div><br>
                  <!--<div class="font-weight-light green--text text-center"><v-rating value="Number('food.rating')"></v-rating></div>-->
                </v-card-text>
              </v-card>
            </v-hover>
          </v-col>
        </v-row>
      </v-container>
    </v-item-group>

    <v-snackbar v-model="snackabar" :timeout="1000" top>{{ text }}</v-snackbar>

    <v-content>
      <router-view></router-view>
    </v-content>
  </div>
</template>

<script>
import { db, fb } from '@/firebase'
export default {
  name: 'home',
  components: {
  },
  data: () => ({
    carts: [],
    foods: [],
    food: {
      name: '', price: 0, rating: 0, discount: 0, type: '', shopName: '', shopID: ''
    },

    pics: [ 
      require('@/assets/a5.jpg'), require('@/assets/a3.jpg'), require('@/assets/a2.jpg'), require('@/assets/a4.jpeg'), require('@/assets/a1.jpg'), require('@/assets/a6.jpg'), 
      require('@/assets/a1.jpg'), require('@/assets/a2.jpg'), require('@/assets/a3.jpg'), require('@/assets/a4.jpeg'), require('@/assets/a5.jpg'), require('@/assets/a6.jpg'),
      require('@/assets/a5.jpg'), require('@/assets/a3.jpg'), require('@/assets/a2.jpg'), require('@/assets/a4.jpeg'), require('@/assets/a1.jpg'), require('@/assets/a6.jpg'),
    ],
    userID: '',
    userName: '',
    snackabar: false,
    text: '',
    user: null,
  }),
  created() {
    this.user = fb.auth().currentUser
    this.userID = fb.auth().currentUser.uid
    this.userName = fb.auth().currentUser.displayName
  },
  firestore() {
    return {
      foods: db.collection('foodItems'),
      carts: db.collection('carts'),
      wishlists: db.collection('wishlists')
    }
  },
  methods: {
    addToCart(food) {
      if(!this.user) {
        this.snackabar = true
        this.text = 'Please login to add this item to cart'
      } else {
        var cartData = {
          name: food.name,
          price: food.price,
          rating: food.rating,
          discount: food.discount,
          type: food.type,
          shopName: food.shopName,
          shopID: food.shopID,
          foodID: food['.key'],
          userName: this.userName,
          userID: this.userID,
        }
        this.$firestore.carts.add(cartData).then( () => {
          this.snackabar = true
          this.text = 'Product added to cart successfully'
        })
      }
    },
    wishlist(food) {
      if(!this.user) {
        this.snackabar = true
        this.text = 'Please login to wishlist this item'
      } else {
        var cartData = {
          name: food.name,
          price: food.price,
          rating: food.rating,
          discount: food.discount,
          type: food.type,
          shopName: food.shopName,
          shopID: food.shopID,
          foodID: food['.key'],
          userName: this.userName,
          userID: this.userID,
        }
        this.$firestore.wishlists.add(cartData).then( () => {
          this.snackabar = true
          this.text = 'Product added to wishlist successfully'
        })
      }
    }
  }
}
</script>

<style >
  v-tab:first-child {
    margin-left: 0;
  }
  .pad-overall {
    margin: 0px;
  }
  .pad {
    margin-top: 4px; 
  }
</style>