<template>
  <div class="dashboard mx-sm-4">
    <v-col cols="12"><h1>My Dashboard</h1></v-col>
    <v-data-table :headers="headers" :search="search" :items="desserts" sort-by="type" class="elevation-1">

      <template v-slot:top>
        <v-toolbar flat color="white">

          <v-dialog v-model="dialog" max-width="500px">
            <template v-slot:activator="{ on }">
              <v-btn color="primary" tile width="200" dark class="mb-2" v-on="on">New Item</v-btn>
            </template>
            <v-card>
              <v-card-title>
                <span class="headline">{{ formTitle }}</span>
              </v-card-title>

              <v-card-text>
                <v-container>
                  <v-row>
                    <v-col cols="12" sm="6" md="4">
                      <v-text-field v-model="editedItem.name" label="Food Name"></v-text-field>
                    </v-col>

                    <v-col cols="12" sm="6" md="4">
                      <v-select v-model="editedItem.type" :items="ftype" label="Food Type"></v-select>
                    </v-col>
                    <v-col cols="12" sm="6" md="4">
                      <v-text-field v-model="editedItem.price" label="Price"></v-text-field>
                    </v-col>
                    <v-col cols="12" sm="6" md="4">
                      <v-text-field v-model="editedItem.rating" label="Rating"></v-text-field>
                    </v-col>
                    <v-col cols="12" sm="6" md="4">
                      <v-text-field v-model="editedItem.discount" label="Discount"></v-text-field>
                    </v-col>

                     <v-col cols="12" sm="6" md="4">
                      <v-text-field v-model="editedItem.desciption" label="Description"></v-text-field>
                    </v-col>
                  </v-row>
                </v-container>
              </v-card-text>

              <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn color="blue darken-1" text @click="close">Cancel</v-btn>
                <v-btn color="blue darken-1" text @click="save">Save</v-btn>
              </v-card-actions>
            </v-card>
          </v-dialog>
          
          <v-spacer></v-spacer>
          <v-divider class="mx-4" inset vertical ></v-divider> 
          <v-text-field v-model="search" label="Search by..." single-line hide-details></v-text-field>
                   

        </v-toolbar>
      </template>

      <template v-slot:item.action="{ item }">
        <v-icon class="mr-2" @click="editItem(item)"> mdi-table-edit </v-icon>
        <v-icon @click="deleteItem(item)"> mdi-delete </v-icon>
      </template>

    </v-data-table>
  </div>
</template>


<script>
import Swal from 'sweetalert2'
  import { db, fb } from '@/firebase'
  export default {
    data: () => ({
      search: '',
      dialog: false,
      headers: [
        { text: 'Name', align: 'left', /*sortable: false,*/ value: 'name', },
        { text: 'Type', value: 'type' },
        { text: 'Price', value: 'price' },
        { text: 'Rating(5)', value: 'rating' },
        { text: 'Discount', value: 'discount' },
        { text: 'Actions', value: 'action', sortable: false },
      ],

      ftype: [ 'Breakfast', 'Lunch', 'Snacks', 'Dinner', 'Deserts' ],

      addText: 'New Item',
      editText: 'Edit Item',
      desserts: [],
      dessertsAdd: [],
      editedIndex: -1,
      editedItem: { name: '', type: '', price: 0, rating: 0, discount: 0, shopName: '', shopID: '', desciption: '' },
      defaultItem: { name: '', type: '', price: 0, rating: 0, discount: 0, },

      pid: null,
    }),

    computed: {
      formTitle () {
        return this.editedIndex === -1 ? this.addText : this.editText
      },
    },

    watch: {
      dialog (val) {
        val || this.close()
      },
    },

    created () {
      if (!fb.auth().currentUser) {
        this.$router.push('/vendorlogin')
      } else {
        this.editedItem.shopName = fb.auth().currentUser.displayName,
        this.editedItem.shopID = fb.auth().currentUser.uid
      }
    },

    firestore() {
      return {
         desserts: db.collection('foodItems').where('shopID', '==', fb.auth().currentUser.uid),//desserts: db.collection('foodItems').where('type', '==', 'lunch'),
         dessertsAdd: db.collection('foodItems')//desserts: db.collection('foodItems').where('type', '==', 'lunch'),
      }
    },

    methods: {
      editItem (item) {
        this.editedIndex = this.desserts.indexOf(item)
        this.editedItem = item
        this.dialog = true
        //alert(this.desserts.indexOf(item))
        alert(this.item['.key'])
        this.pid = this.item['.key']
      },

      deleteItem (item) {
        const swalWithBootstrapButtons = Swal.mixin({
          customClass: {
            confirmButton: 'btn btn-success',
            cancelButton: 'btn btn-danger'
          },
          buttonsStyling: false
        })

        swalWithBootstrapButtons.fire({
          title: 'Are you sure?',
          text: "You won't be able to revert this!",
          icon: 'warning',
          showCancelButton: true,
          confirmButtonText: 'Yes, delete it!',
          cancelButtonText: 'No, cancel!',
          reverseButtons: true
        }).then((result) => {
          if (result.value) {
            this.$firestore.desserts.doc(item['.key']).delete()
            swalWithBootstrapButtons.fire(
              'Deleted!',
              'Your food item has been deleted.',
              'success'
            )
          } else if (
            result.dismiss === Swal.DismissReason.cancel
          ) {
            swalWithBootstrapButtons.fire(
              'Cancelled',
              'Your food item is safe :)',
              'error'
            )
          }
        })
      },

      close () {
        this.dialog = false
        setTimeout(() => {
          this.editedItem = Object.assign({}, this.defaultItem)
          this.editedIndex = -1
        }, 300)
      },

      save () {
        if (this.editedIndex > -1) {
          //Object.assign(this.desserts[this.editedIndex], this.editedItem)
          alert(this.editedItem['.key'])
          this.$firestore.dessertsAdd.doc(this.pid).update(this.editedItem)
          Swal.fire({
            position: 'top-end',
            icon: 'success',
            title: 'Your food item has been updated',
            showConfirmButton: false,
            timer: 1500
          })
        } else {
          this.$firestore.dessertsAdd.add({
            name: this.editedItem.name,
            type: this.editedItem.type,
            price: this.editedItem.price,
            rating: this.editedItem.rating,
            discount: this.editedItem.discount,
            shopName: fb.auth().currentUser.displayName,
            shopID: fb.auth().currentUser.uid
          })
          Swal.fire({
            position: 'top-end',
            icon: 'success',
            title: 'Your food item has been added',
            showConfirmButton: false,
            timer: 1500
          })
        }
        this.close()
      },
    },
  }
</script>