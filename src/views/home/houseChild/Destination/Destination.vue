<template>
<div class="container">
  <div class="row">
    <div class="col-sm">
     <el-button plain class="butmdd">{{DestianData.cityname}}</el-button>
    </div>
  </div>
</div>
  

</template>
<script>
export default {
  name: "destination",
  data () {
    return {
    };
  },
  props:{
    DestianData:{
      type:Object
    }
  }
}
</script>
<style scoped>
.butmdd{
  margin-right: 35px;
}
</style>