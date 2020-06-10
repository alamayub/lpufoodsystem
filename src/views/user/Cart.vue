
<template>
  <div class="cart mb-5">
    <h1>My Cart</h1>
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
                  <span style="margin-right: 600px;" class="text-left">{{ food.price }}</span>
                  <span class="text-right">{{ food.discount }}% off</span>
                </v-card-text>
                <v-card-action>
                  <div style="width: 30%; float: left;">
                    <v-btn icon>
                      <v-icon>mdi-minus</v-icon>
                    </v-btn>
                    <span> 1 </span><!--<v-text-field type="number"></v-text-field>-->
                    <v-btn icon>
                      <v-icon>mdi-plus</v-icon>
                    </v-btn>
                  </div>
                  
                  <div style="width: 33.33%; float: left;">
                    <v-btn tile color="success" block @click="orderFood(food)">order</v-btn>
                  </div>
                    
                    
                  <div class="text-right">
                    <v-btn @click="removeFood(food)" icon color="red">
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
                    <v-btn icon>
                      <v-icon>mdi-minus</v-icon>
                    </v-btn>
                    <span> 1 </span><!--<v-text-field type="number"></v-text-field>-->
                    <v-btn icon>
                      <v-icon>mdi-plus</v-icon>
                    </v-btn>
                    <v-btn @click="removeFood(food)" style="float: right" icon color="red" right>
                    <v-icon>mdi-delete</v-icon>
                  </v-btn> 
                  </div>
                </v-card-action>
              </div>
            </v-layout>
            <v-btn tile block color="success" class="my-1 mr-2" @click="orderFood(food)">order</v-btn>
          </v-card>
          
        </v-flex>
      </v-layout>
    </v-container>
    <div class="mx-auto" style="max-width: 400px;" v-if="Object.keys(foods).length == 0">
      <h2>Cart is empty</h2>
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
      foods: db.collection('carts').where('userID', '==', fb.auth().currentUser.uid),
      orders: db.collection('orders')
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
          db.collection('carts').doc(food['.key']).delete().then( () => {
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
    orderFood(food) {
      var min=100000; 
      var max=999999;   
      var cartData = {
          name: food.name,
          price: food.price,
          rating: food.rating,
          discount: food.discount,
          type: food.type,
          shopName: food.shopName,
          shopID: food.shopID,
          userName: this.userName,
          userID: this.userID,
          foodID: food['.key'],
          orderNo: Math.floor(Math.random() * (+max - +min)) + +min,
          payment: false
        }
      this.$firestore.orders.add(cartData).then( () => {
        Swal.fire({
          position: 'top-end',
          icon: 'success',
          title: 'Following item has been ordered',
          showConfirmButton: false,
          timer: 1500
        })
        db.collection('carts').doc(food['.key']).delete()
      })
    },
  
  }
}
</script>
