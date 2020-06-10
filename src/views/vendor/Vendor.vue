
<template>
  <div class="vendor" >
    <VendorNav />
    <v-content>
      <router-view></router-view>
    </v-content>
  </div>
</template>

<script>
  import VendorNav from '@/components/VendorNav'
  import { fb } from '@/firebase'
  export default {
    components: {
      VendorNav,
    },
    data: () => ({
    }),
    computed() {
      if (!fb.auth().currentUser) {
        this.$router.push('/vendorlogin')
      }
    }
  }
</script>