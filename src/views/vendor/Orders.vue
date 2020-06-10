<template>
  <div>
    <v-simple-table>
      <template v-slot:default>
        <thead>
          <tr>
            <th class="text-left">Name</th>
            <th class="text-left">Type</th>
            <th class="text-left">Price</th>
            <th class="text-left">Order No.</th>
            <th class="text-left">Payment Status</th>
            <th class="text-left">Action</th>
            
          </tr>
        </thead>
        <tbody>
          <tr v-for="(item, i) in desserts" :key="i">
            <td>{{ item.name }}</td>
            <td>{{ item.type }}</td>
            <td>{{ item.price }}</td>
            <td>{{ item.orderNo }}</td>
            <td>
              <span v-if="item.payment === true"><v-chip color="green">Paid</v-chip></span>
              <span v-else><v-chip color="red">Unpaid</v-chip></span>
            <td>
              <v-btn tile class="success" @click="pay(item)">Pay</v-btn>
              
            </td>
          </tr>
        </tbody>
      </template>
    </v-simple-table>

    <v-dialog v-model="dialog" max-width="500px">    
      <v-card>
        <v-card-text>
          <v-form v-model="valid">
            <v-row>
              <v-col cols="12" sm="6" md="6">
                <v-text-field v-model="item1.orderNo" disabled label="Order No"></v-text-field>
              </v-col>
              <v-col cols="12" sm="6" md="6">
                <v-text-field v-model="item1.price" disabled label="Payable Amount"></v-text-field>
              </v-col>
              <v-col class="mx-auto" cols="12" sm="8" md="8">
                <v-btn block class="success" tile @click="payBill">Pay</v-btn>
              </v-col>
            </v-row>
          </v-form>
        </v-card-text>
      </v-card>
    </v-dialog>

    <v-snackbar v-model="snackbar" :timeout="2000" top>{{ text }}</v-snackbar>
  </div>
</template>
<script>
  import { db, fb } from '@/firebase'
  export default {
    data: () => ({

      snackbar: false,
      text: '',
      dialog: false,
      search: '',
      
      headers: [
        { text: 'Name', align: 'left', value: 'name', },
        { text: 'Type', value: 'type' },
        { text: 'Price', value: 'price' },
        { text: 'Rating(5)', value: 'rating' },
        { text: 'Discount', value: 'discount' },
        { text: 'Order No.', value: 'orderNo', sortable: false },
        { text: 'Payment Status', value: 'payment', sortable: false },
        { text: 'Action', value: '', sortable: false },
      ],
      desserts: [],
      item: { name: '', type: '', price: 0, rating: 0, discount: 0, orderNo: 0, payment: false },
      item1: { name: '', type: '', price: 0, rating: 0, discount: 0, orderNo: 0, payment: false },
      orderNo: 0,
      amount: 0,
      user: null,
      pays: [],
    }),

    created () {
      if(!fb.auth().currentUser) {
        this.$router.push('/vendorlogin')
      } else {
        this.user = fb.auth().currentUser.uid
      }

    },

    firestore() {
      return {
         desserts: db.collection('orders').where('shopID', '==', fb.auth().currentUser.uid), //desserts: db.collection('foodItems').where('type', '==', 'lunch'),
         pays: db.collection('orders')
      }
    },
    methods: {
      pay(item) {
        
        if (!fb.auth().currentUser) {
          this.$router.push('/vendorlogin')
        } else {
          this.dialog = true
          this.item1 = item
        }
      },
      payBill() {
        
        this.$firestore.pays.doc(this.item1['.key']).update({ payment: true }).then( () => {
          this.dialog = false
          this.snackbar = true
          this.text = 'Congratulation... Bill Paid'
        })
        .catch( () => {
          this.dialog = false
          this.snackbar = true
          this.text = 'Wrong order no'
        })
      }
    }
  }
</script>