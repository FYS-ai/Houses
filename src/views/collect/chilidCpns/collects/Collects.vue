<template>
  <div class="dfdd">
    <collect-list v-for="(collectItem,collectIdexn) in newCollectList"
      :key="collectIdexn" :collectItem="collectItem" 
      @CollectsEmit="CollectsClick"></collect-list>
  </div>
</template>
<script>
import CollectList from '../collectList/CollectList'
export default {
  name: "collects",
  data () {
    return {
    };
  },
  props:{
    newCollectList:{
      type:Array
    }
  },
  components:{
    CollectList
  },
  methods: {
    CollectsClick(colid)
    {
      this.$emit("CollectsFadeClick",colid)
      // console.log(colid)
    }
  },
}
</script>
<style scoped>
.dfdd{
  display: flex;
  flex-wrap: wrap;
}
</style>