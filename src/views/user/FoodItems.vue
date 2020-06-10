<template>
  <div>
    <v-item-group>
      <v-container fluid>
        <v-row>
          <v-col v-for="(food, i) in foods" :key="i" cols="12" xs="12" sm="6" md="3">
            <v-item v-slot:default="{ active, toggle }">
              <v-card>
                <v-img class="white--text" height="190px" src="https://cdn.vuetifyjs.com/images/cards/docks.jpg">
                  <v-btn icon @click="wishlist(food)">
                    <v-icon>mdi-heart</v-icon>
                  </v-btn>
                  
                </v-img>
                <v-card-title class="align-end fill-height">{{ food.name }}</v-card-title>
                <v-card-text>
                  <span class="text--primary">
                    <span>Price: Rs. {{ food.price }} {{ food.dicount }}%</span><br>
                  </span>
                  <span>Type {{ food.type }}</span>
                  <span>By {{ food.shopName }}</span>
                </v-card-text>
                <v-card-actions>
                  <v-btn text color="blue" @click="addToCart(food)">cart</v-btn>
                  <div class="flex-grow-1"></div>
                  <v-btn text color="orange">View</v-btn>
                </v-card-actions>
              </v-card>
            </v-item>
          </v-col>
        </v-row>
      </v-container>
    </v-item-group>
    <v-snackbar v-model="snackbar" :timeout="3000">{{ text }}</v-snackbar>
  </div>
</template>

<script>
import SlideShow from '@/components/SlideShow'
import FoodItems from '@/components/FoodItems'
import { db, fb} from '@/firebase'
import Swal from 'sweetalert2'
export default {
  name: 'home',
  components: {
   SlideShow, FoodItems
  },
  data: () => ({
    carts: [],
    foods: [],
    food: {
      name: '', price: 0, rating: 0, discount: 0, type: '', shopName: '', shopID: '',
    },
    userID: '', 
    userName: '',

    user: null,

    snackbar: false,
    text: '',
    
  }),
  created() {
    this.user = fb.auth().currentUser
    this.userID = fb.auth().currentUser.uid
    this.userName = fb.auth().currentUser.displayName
  },
  firestore() {
    foods: db.collection('foodItems');
    carts: db.collection('carts');
  },
  methods: {
    addToCart(food) {
      if (!this.user) {
        this.snackbar = true
        this.text = 'Please login to add to cart this item'
      } else {
        var cartData = {
          name: food.name,
          price: food.price,
          rating: food.rating,
          dicount: food.discount,
          type: food.type,
          shopName: food.shopName,
          shopID: food.shopID,
          userName: this.userName,
          userID: this.userID,
          foodID: food.uid
        }
        this.$firestore.carts.add(cartData).then( () => {
          Swal.fire({
            position: 'top-end',
            icon: 'success',
            title: 'Following item has been added to cart',
            showConfirmButton: false,
            timer: 1500
          })
        })
      }
    },
    wishlist(food) {
      if (!this.user) {
        this.snackbar = true
        this.text = 'Please login to wishlist this item'
      } else {
        var cartData = {
          name: food.name,
          price: food.price,
          rating: food.rating,
          dicount: food.discount,
          type: food.type,
          shopName: food.shopName,
          shopID: food.shopID,
          userName: this.userName,
          userID: this.userID,
          foodID: food.uid
        }
        this.$firestore.carts.add(cartData).then( () => {
          Swal.fire({
            position: 'top-end',
            icon: 'success',
            title: 'Following food has been wishlisted',
            showConfirmButton: false,
            timer: 1500
          })
        })
      }
    }
  }
}
</script>
