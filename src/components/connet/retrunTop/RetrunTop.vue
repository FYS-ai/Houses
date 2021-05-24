<template>
  
<el-backtop target=".myScroll" :bottom="100"
 :visibility-height="100"
 @click="ftopClick">
  <div>
    <img class="ftopimg" src="~assets/img/restop/top.png" alt="">
  </div>
</el-backtop>

</template>
<script>
export default {
  name: "returntop",
  data () {
    return {
    };
  },
  
  methods: {
    ftopClick()
    {
      console.log("返回顶部",this.newHeight)
    },
  },
}
</script>
<style scoped>
/* .ftop{
  width: 35px;
  height: 35px;
  text-align: center;
  vertical-align: middle;
  position: fixed;
  bottom: 161px;
  right: 61px;
  z-index: 2000;
  display: none;
  cursor: pointer;
} */
.ftopimg{
  width: 30px;
  height: 30px;

}
/* .activeTop{
  display: block;
} */

</style>