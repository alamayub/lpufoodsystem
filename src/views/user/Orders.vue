<!--
<template>
  <div class="orders">
    <h1 class="ml-4 ma-2">My Ordered Items</h1>
    <v-divider></v-divider>
    <v-container fill-height fluid grid-list-xl>
    
    <v-layout justify-center wrap>
      <v-flex xs12 md8 sm8>
      
        <v-container>
          <v-layout >
             
            <v-flex xs4 sm4 md4 >
              <span>Image</span>
            </v-flex>
            <v-flex xs3 sm3 md3 >
              <span>Name</span>
            </v-flex>

            <v-flex xs2 sm2 md2 >
              <span>Price</span>
            </v-flex>

            <v-flex xs1 sm1 md1 >
              <span>Count</span>
            </v-flex>
              
            <v-flex xs1 sm1 md1 class="my-auto">
              <span>Status</span>
            </v-flex>

            <v-flex xs1 sm1 md1 class="my-auto">
              <span>Cancel</span>
            </v-flex>

            </v-layout>
          </v-container>


        <v-container>
          <v-layout wrap v-for="(food, i) in foods" :key="i">
             
            <v-flex xs4 sm4 md4 class="my-auto">
              
              <v-avatar size="120">
                <img src="http://blog.tastebay.com/wp-content/uploads/2014/08/restaurant_owner.jpg">
              </v-avatar>
            </v-flex>
            <v-flex xs3 sm3 md3 class="my-auto">
              <span>{{ food.name }}</span>
              
            </v-flex>

            <v-flex xs2 sm2 md2 class="my-auto">
              <span>{{ food.price }}</span>
            </v-flex>

            <v-flex xs1 sm1 md1 class="my-auto">
              <span>1</span>
            </v-flex>
              
            <v-flex xs1 sm1 md1 class="my-auto">
              <span v-if="food.payment === true">Paid</span>
              <span else>UnPaid</span>
            </v-flex>

            <v-flex xs1 sm1 md1 class="my-auto">
              <v-btn large color="red" icon @click="cancelFood(food)">
                <v-icon>mdi-delete</v-icon>
              </v-btn>
            </v-flex>

            </v-layout>
          </v-container>
        </v-flex>
    </v-layout>
  </v-container>
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
    foods: [],
    food: {
      name: '', price: 0, rating: 0, discount: 0, type: '', shopName: ''
    },
    user: null,
  }),
  created() {
    this.user = fb.auth().currentUser.uid
    if (!fb.auth().currentUser) {
      this.$router.push('/')
    }
  },
  firestore() {
    return {
      foods: db.collection('orders').where('userID', '==', fb.auth().currentUser.uid)
    }
  },
  methods: {
    cancelFood(food) {
      Swal.fire({
        title: 'Are you sure?',
        text: "Do you want to cancel the food?",
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Yes, cancel it!'
      }).then((result) => {
        if (result.value) {
          db.collection('wishlists').doc(food['.key']).delete().then( () => {
            Swal.fire(
              'Cancelled!',
              'Your order has been cancelled.',
              'success'
            )
          })
          db.collection('orders').doc(food['.key']).delete()
        }
      })
    },
  }
}
</script>
-->

<!--
<template>
  <div>
    <h1 class="ml-4 ma-2">My Cart Items</h1>
    <v-divider></v-divider>
    <v-container fill-height fluid grid-list-xl>
    
    <v-layout justify-center wrap>
      <v-flex xs12 md8 sm8>
      
        <v-container>
          <v-layout >
             
            <v-flex xs4 sm4 md4 >
              <span>Image</span>
            </v-flex>
            <v-flex xs3 sm3 md3 >
              <span>Name</span>
            </v-flex>

            <v-flex xs2 sm2 md2 >
              <span>Price</span>
            </v-flex>

            <v-flex xs2 sm2 md2 >
              <span>Count</span>
            </v-flex>
              
            <v-flex xs1 sm1 md1 class="my-auto">
              <span>Action</span>
            </v-flex>

            </v-layout>
          </v-container>


        <v-container>
          <v-layout wrap v-for="(food, i) in foods" :key="i">
             
            <v-flex xs4 sm4 md4 class="my-auto">
              
              <v-avatar size="120">
                <img src="http://blog.tastebay.com/wp-content/uploads/2014/08/restaurant_owner.jpg">
              </v-avatar>
            </v-flex>
            <v-flex xs3 sm3 md3 class="my-auto">
              <span>{{ food.name }}</span>
              
            </v-flex>

            <v-flex xs2 sm2 md2 class="my-auto">
              <span>{{ food.price }}</span>
            </v-flex>

            <v-flex xs2 sm2 md2 class="my-auto">
              <span>1</span>
            </v-flex>
              
            <v-flex xs1 sm1 md1 class="my-auto">
              <v-btn large color="red" icon ">
                <v-icon>mdi-delete</v-icon>
              </v-btn>

              <v-btn color="success"  @click="orderFood(food)">Order</v-btn>
            </v-flex>

            </v-layout>
          </v-container>  
          
      </v-flex>
    </v-layout>
  </v-container>

  </div>
</template>


-->

<template>
  <div class="cart mb-5">
    <h1 class="my-2 mx-auto">My Order</h1>
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
                <v-card-text class="blue--text px-0 py-1">{{ food.name }}</v-card-text>
                <v-card-text class="orange--text px-0 py-1">
                  <span style="margin-right: 600px;" class="text-left">Rs. {{ food.price }}</span>
                  <span class="text-right">{{ food.discount }}% off</span>
                </v-card-text>
                <v-card-action>
                  <div>
                    <span class="font-weight-bold">Order No: - {{ food.orderNo }}</span>
                    <v-btn @click="removeFood(food)" style="float: right" icon color="red" right>
                      <v-icon>mdi-delete</v-icon>
                    </v-btn> 
                  </div>
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
                <v-card-text class="blue--text px-0 py-1">{{ food.name }}</v-card-text>
                <v-card-text class="orange--text px-0 py-1">
                  <span style="margin-right: 200px;" class="text-left">Rs. {{ food.price }}</span>
                  <span class="text-right">{{ food.discount }}% off</span>
                </v-card-text>
                <v-card-action>
                  <div>
                    <span class="font-weight-bold">Order No. {{ food.orderNo }}</span>
                    <v-btn @click="removeFood(food)" style="float: right" icon color="red" right>
                      <v-icon>mdi-delete</v-icon>
                    </v-btn> 
                  </div>
                </v-card-action>
              </div>
            </v-layout>
          </v-card>
        </v-flex>
      </v-layout>
    </v-container>
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
    foods: [],
    food: {
      name: '', price: 0, rating: 0, discount: 0, type: '', shopName: '', shopID: '', orderNo: 0,
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
      foods: db.collection('orders').where('userID', '==', fb.auth().currentUser.uid),
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
          db.collection('orders').doc(food['.key']).delete().then( () => {
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
  }
}
</script>
