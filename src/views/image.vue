<template>
  <div>
    <input type="file" @change="imageUpload">
    <v-btn @click="getimg">get</v-btn>
    <v-img :src="img"></v-img>
  </div>
</template>

<script>
import { fb } from '@/firebase'
export default {
  data: () => ({
    img: null,
  }),
  
  methods: {
    imageUpload(e) {
      var file = e.target.files[0];
      var ref = fb.storage().ref('food/'+file.name);
      ref.put(file);
      alert(file.name)
      alert('uploaded')
      
    },
    getimg() {
      var starsRef = fb.storage().child('images/stars.jpg');
      starsRef.getDownloadURL().then(function(url) {
        this.img = url
      })
    }
  }
};
</script>
