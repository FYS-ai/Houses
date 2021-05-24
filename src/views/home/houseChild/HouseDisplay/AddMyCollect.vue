<template>
  <div :style="stylehhhff">
    <div class="likediv">
      <img @click.stop="tjLikeZDY" class="likeimg" 
      v-if="islike==true" v-cloak
       src="~assets/img/home/like1.png" alt="">
      <img @click.stop="qxLikeZDY" class="likeimg" 
       v-else v-cloak
       src="~assets/img/home/like2.png" alt="">
    </div>
    <!-- <del-my-collect v-else/> -->
    <!-- <div class="likediv" v-else >
      <img  @click.stop="tjLikeZDY" class="likeimg" src="~assets/img/home/like1.png" alt="">
    </div> -->
    
  </div>
</template>
<script>
import DelMyCollect from './DelMyCollect'
export default {
  name: "addmycollect",
  data () {
    return {
      addislike:''
    };
  },
  props:{
    islike:{
      type:Boolean
    },
    stylehhhff:{
      type:Object
    }
  },
  components:{
    DelMyCollect
  },
  created() {
  },
  computed:{
    
  },
  methods: {
    // 添加收藏
    tjLikeZDY(){
      this.addislike = false
      this.$emit("tjLikeEmit")
    },
    // 取消收藏
    qxLikeZDY(){
       this.addislike = true
      this.$emit("qxLikeEmit")
    }
  },
}
</script>
<style scoped>
/* .hhhff{
      position: absolute;
    top: -25px;
} */
.likediv{
    width: 30px;
    height: 30px;
    /* border: 1px solid; */
    text-align: center;
    /* line-height: 30px; */
    position: relative;
    left: 300px;
    top: 50px;
    vertical-align: middle;
    z-index:100;
}
.likeimg{
  width: 30px;
  height: 30px;
}  
.newdivhh{
  display: none;
}  
.isimgshow{
  display: block;
}
</style>