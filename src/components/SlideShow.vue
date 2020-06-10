<template>
  <v-carousel cycle height="auto" hide-delimiter-background show-arrows-on-hover>
    <v-carousel-item v-for="(slide, i) in slides" :key="i">
      <v-row class="fill-height" align="center" justify="center">
        <v-img max-height="400" width="auto" :src="slide" :aspect-ratio="16/9"></v-img>
      </v-row>
    </v-carousel-item>
  </v-carousel>
</template>

<script>
  export default {
    data () {
      return {
        slides: [
          require('@/assets/a1.jpg'), require('@/assets/a2.jpg'), require('@/assets/a3.jpg'), require('@/assets/a4.jpeg'), require('@/assets/a5.jpg'),
        ],
      }
    },
  }
</script>