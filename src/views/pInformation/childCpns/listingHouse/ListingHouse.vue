<template>
  <div>
    <!-- 进度条 -->
    <steps-house></steps-house>
  </div>
</template>
<script>
import StepsHouse from './stepsHouse/StepsHouse'
export default {
  name: "listinghouse",
  data () {
    return {
    };
  },
  components:{
    StepsHouse
  }
}
</script>
<style scoped>
</style>