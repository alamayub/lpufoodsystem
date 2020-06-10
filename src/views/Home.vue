<template>
  <div class="home">
    <SlideShow />
    <v-divider></v-divider>
    <FoodItems />
    <v-content>
      <router-view></router-view>
    </v-content>
  </div>
</template>

<script>
import SlideShow from '@/components/SlideShow'
import FoodItems from '@/components/FoodItems'
export default {
  name: 'home',
  components: {
    FoodItems, SlideShow
  }
}
</script>
