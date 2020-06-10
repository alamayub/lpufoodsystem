
<template>
  <div class="wishlist">
    <h1 class="ml-4 ma-2">My Wishlist Items</h1>
    <v-divider></v-divider>

    <v-container class="d-none d-sm-flex d-md-flex" fluid>
      <v-layout align-center>
        <v-flex>
          <v-card v-for="(food, i) in foods" :key="i" tile elevation="0" style="margin-bottom: 1px;" class="mx-auto" height="auto"  max-width="800">
            <v-layout align-center>
              <div style="float: left; margin-right: 10px; width: 100px;">
                <img :src="pics[i]" width="100" height="100">
              </div>
              <div style="width: 100%;">
                <v-card-text class="black--text px-0 py-1">{{ food.name }}</v-card-text>
                <v-card-text class="orange--text px-0 py-1">
                  <span style="margin-right: 600px;" class="text-left">Rs. {{ food.price }}</span>
                  <span class="text-right">{{ food.discount }}% off</span>
                </v-card-text>
                <v-card-action>
                  <v-btn icon color="blue" @click="addToCart(food)">
                    <v-icon>mdi-cart</v-icon>
                  </v-btn>
                  <v-btn @click="removeFood(food)" style="float: right; opacity: .7;"  icon color="red">
                    <v-icon>mdi-delete</v-icon>
                  </v-btn>
                </v-card-action>
              </div>
            </v-layout>
          </v-card>
        </v-flex>
      </v-layout>
    </v-container>

    <v-container class="d-flex d-sm-none" fluid>
      <v-layout align-center>
        <v-flex>
          <v-card v-for="(food, i) in foods" :key="i" tile elevation="0" style="margin-bottom: 1px;" class="mx-auto" height="auto"  max-width="400">
            <v-layout align-center>
              <div style="float: left; margin-right: 10px; width: 100px;">
                <img :src="pics[i]" width="100" height="100">
              </div>
              <div style="width: 100%;">
                <v-card-text class="black--text px-0 py-1">{{ food.name }}</v-card-text>
                <v-card-text class="orange--text px-0 py-1">
                  <span style="margin-right: 200px;" class="text-left">Rs. {{ food.price }}</span>
                  <span class="text-right">{{ food.discount }}% off</span>
                </v-card-text>
                <v-card-action>
                  <v-btn icon color="blue" @click="addToCart(food)">
                    <v-icon>mdi-cart</v-icon>
                  </v-btn>
                  <v-btn @click="removeFood(food)" style="float: right; opacity: .7;"  icon color="red">
                    <v-icon>mdi-delete</v-icon>
                  </v-btn>
                </v-card-action>
              </div>
            </v-layout>
          </v-card>
        </v-flex>
      </v-layout>
    </v-container>
    <div class="mx-auto" style="max-width: 400px;" v-if="Object.keys(foods).length == 0">
      <h2>Wishlist is empty</h2>
    </div>
  </div>
</template>


<script>
import { db, fb } from '@/firebase'
import Swal from 'sweetalert2'
export default {
  name: 'home',
  components: {
  },
  data: () => ({
    orders: [],
    foods: [],
    food: {
      name: '', price: 0, rating: 0, discount: 0, type: '', shopName: '', shopID: '',
    },
    pics: [ 
      require('@/assets/a5.jpg'), require('@/assets/a3.jpg'), require('@/assets/a2.jpg'), require('@/assets/a4.jpeg'), require('@/assets/a1.jpg'), require('@/assets/a6.jpg'), 
      require('@/assets/a1.jpg'), require('@/assets/a2.jpg'), require('@/assets/a3.jpg'), require('@/assets/a4.jpeg'), require('@/assets/a5.jpg'), require('@/assets/a6.jpg'),
      require('@/assets/a5.jpg'), require('@/assets/a3.jpg'), require('@/assets/a2.jpg'), require('@/assets/a4.jpeg'), require('@/assets/a1.jpg'), require('@/assets/a6.jpg'),
    ],
    userID: '', 
    userName: '',
  }),
  created() {
    this.userID = fb.auth().currentUser.uid
    this.userName = fb.auth().currentUser.displayName
    if (!fb.auth().currentUser) {
      this.$router.push('/')
    }
  },
  firestore() {
    return {
      foods: db.collection('wishlists').where('userID', '==', fb.auth().currentUser.uid),
      carts: db.collection('carts')
    }
  },
  methods: {
    removeFood(food) {
      Swal.fire({
        title: 'Are you sure?',
        text: "You won't be able to revert this!",
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Yes, delete it!'
      }).then((result) => {
        if (result.value) {
          db.collection('wishlists').doc(food['.key']).delete().then( () => {
            Swal.fire({
              position: 'top-end',
              icon: 'success',
              title: 'Following item has been removed',
              showConfirmButton: false,
              timer: 1000
            })
          })
          
        }
      })
    },
    addToCart(food) {
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
        Swal.fire({
          position: 'top-end',
          icon: 'success',
          title: 'Following item has been added to cart',
          showConfirmButton: false,
          timer: 1000
        })
        db.collection('wishlists').doc(food['.key']).delete()
      })
    }
  }
}
</script>
