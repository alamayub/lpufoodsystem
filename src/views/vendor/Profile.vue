<template>
  <v-container fill-height fluid grid-list-xl>
    <v-layout justify-center wrap>
      <v-flex xs12 md8>
        <material-card color="green" title="Edit Profile" text="Complete your profile">
          
          <v-flex xs12>
            <v-img height="auto" style="width: 100%; height: 500px;" class="text-left" :src="shopPic">
              <v-btn text>
                <v-file-input accept="image/*" label="Select image" prepend-icon="mdi-camera"></v-file-input>
              </v-btn>
              <div class="display-1 white--text text-center font-weight-bold" style="margin-top: 400px;">{{ shopName }}</div>
            </v-img>
          </v-flex>

          <v-form>
            <v-container py-0>
              <v-layout wrap>

                <v-flex xs12 md4>
                  <v-text-field v-model="shopName" label="Shop Name (disabled)" disabled/>
                </v-flex>

                <v-flex xs12 md4>
                  <v-text-field v-model="shopEmail" label="Shop Email Address" />
                </v-flex>

                <v-flex xs12 md4>
                  <v-text-field v-model="profile.shopAdress" label="Shop Adress"/>
                </v-flex>
                
                <v-flex xs12 md6>
                  <v-text-field label="Shop Owner" v-model="profile.shopOwner"/>
                </v-flex>
                

                <v-flex xs12 md12>
                  <v-text-field v-model="profile.shopNumber" label="Shop No." class="purple-input"/>
                </v-flex>

                <v-flex xs12 md4>
                  <v-text-field v-model="profile.shopOwnerNo" label="Contact No." class="purple-input"/>
                </v-flex>
                
                <v-flex xs12 md4>
                  <v-text-field value="India" label="Country" class="purple-input"/>
                </v-flex>

                <v-flex xs12 md4>
                  <v-text-field v-model="profile.shopOwner"/>
                </v-flex>

                <v-flex xs12>
                  <v-textarea class="purple-input" label="About Me" value="Lorem ipsum dolor sit amet, consectetur adipiscing elit." />
                </v-flex>

                <v-flex xs12 text-xs-right>
                  <v-btn tile class="mx-0 font-weight-light" color="success">
                    Update Profile
                  </v-btn>
                </v-flex>

              </v-layout>
            </v-container>
          </v-form>
          
        </material-card>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
import { fb, db } from '@/firebase'
export default {
  data() {
    return {
      shopName: '',
      shopPic: '',
      shopEmail: '',
      shopOwner: '',
      profile: [],
    }
  },
  created() {
    if (!fb.auth().currentUser) {
      this.$router.push('/vendorlogin')
    } else {
      this.shopEmail = fb.auth().currentUser.email
      this.shopName = fb.auth().currentUser.displayName
      this.shopPic = fb.auth().currentUser.photoURL
    }
    
  },
  firestore() {
    return {
      profile : db.collection('shops').where('shopID', '==', fb.auth().currentUser.uid) 
    }
  }
}
</script>