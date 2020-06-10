<template>
  <div class="viewfood"> 
    <v-container class="d-none d-sm-flex d-md-flex" fluid>
      <v-layout align-center>
        <v-flex>
          <v-card  tile elevation="0"  class="mx-auto" height="auto"  max-width="1500">
            <h1 class="my-2">{{ food.name }}</h1>
            <v-layout align-center>
              <div>
                <div class="mx-auto" style="width: 100%;">
                  <v-img src="@/assets/a5.jpg" style="max-width: 1500px;" height="500"></v-img>
                </div>
                <v-btn absolute color="orange" class="white--text" style="top: 70px;" fab medium right top @click="addToCart(food)">
                  <v-icon>mdi-cart</v-icon>
                </v-btn>
                <v-card-text class="black--text px-0 py-1"> Food ID: - {{ food['.key'] }} </v-card-text>
                <v-card-text class="red--text px-0 py-1"> Price: - Rs. {{ food.price }} </v-card-text>
                <v-card-text class="orange--text px-0 py-1"> Discount: - {{ food.discount }}% off </v-card-text>
                <v-card-text class="blue--text px-0 py-1"> By Restaurant: - {{ food.shopName }}</v-card-text>
                <v-card-text class="blue--text px-0 py-1"> Food Description: - {{ food.description }} </v-card-text>
              </div>
            </v-layout>
          </v-card>
        </v-flex>
      </v-layout>
    </v-container>

    <v-container class="d-flex d-sm-none d-md-none" fluid>
      <v-layout align-center>
        <v-flex>
          <v-card  tile elevation="0"  class="mx-auto" height="auto"  max-width="500">
            <h1 class="my-2">{{ food.name }}</h1>
            <v-layout align-center>
              <div>
                <div class="mx-auto" style="width: 100%;">
                  <v-img src="@/assets/a5.jpg" style="max-width: 1500px;" height="150"></v-img>
                </div>
                <v-btn absolute color="orange" class="white--text" style="top: 70px;" fab medium right top @click="addToCart(food)">
                  <v-icon>mdi-cart</v-icon>
                </v-btn>
                <v-card-text class="black--text px-0 py-1"> Food ID: - {{ food['.key'] }} </v-card-text>
                <v-card-text class="red--text px-0 py-1"> Price: - Rs. {{ food.price }} </v-card-text>
                <v-card-text class="orange--text px-0 py-1"> Discount: - {{ food.discount }}% off </v-card-text>
                <v-card-text class="blue--text px-0 py-1"> By Restaurant: - {{ food.shopName }}</v-card-text>
                <v-card-text class="blue--text px-0 py-1"> Food Description: - {{ food.description }} </v-card-text>
              </div>
            </v-layout>
          </v-card>
        </v-flex>
      </v-layout>
    </v-container>
   
    <v-snackbar v-model="snackbar" :timeout="1000" top>{{ text }}</v-snackbar>
    
  </div>
</template>

<script>
import { db, fb } from '@/firebase'
export default {
  name: 'viewfood',
  data () {
    return {
      id: this.$route.params.id,
      foods: [],
      food: {
        name: '', price: 0, rating: 0, discount: 0, type: '', shopName: '', shopID: '', description: ''
      },
      pics: [ 
        require('@/assets/a5.jpg'), require('@/assets/a3.jpg'), require('@/assets/a2.jpg'), require('@/assets/a4.jpeg'), require('@/assets/a1.jpg'), require('@/assets/a6.jpg'), 
        require('@/assets/a1.jpg'), require('@/assets/a2.jpg'), require('@/assets/a3.jpg'), require('@/assets/a4.jpeg'), require('@/assets/a5.jpg'), require('@/assets/a6.jpg'),
        require('@/assets/a5.jpg'), require('@/assets/a3.jpg'), require('@/assets/a2.jpg'), require('@/assets/a4.jpeg'), require('@/assets/a1.jpg'), require('@/assets/a6.jpg'),
      ],
      snackbar: false,
      text: '',
      userID: '',
      userName: '',
    }
  },
  created() {
    if (fb.auth().currentUser) {
      this.user = fb.auth().currentUser
      this.userID = fb.auth().currentUser.uid
      this.userName = fb.auth().currentUser.displayName
    }
  },
  firestore () {
    return {
      food: db.collection('foodItems').doc(this.id),
      carts: db.collection('carts')
    }
  },
  methods: {
    addToCart(food) {
      if(!fb.auth().currentUser) {
        this.snackbar = true
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
          this.snackbar = true
          this.text = 'Product added to cart successfully'
        })
      }
    },
  }
  
}
</script>