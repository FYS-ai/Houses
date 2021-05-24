<template>
  <div :style="stylehhhff">
    <div class="likediv" v-if="islike2">
      <img @click.stop="tjLikeZDY" class="likeimg" src="~assets/img/home/like1.png" alt="">
      <!-- <img @click.stop="qxLikeZDY" class="likeimg" src="~assets/img/home/like2.png" alt=""> -->
    </div>
  </div>
</template>
<script>
export default {
  name: "delmycollect",
  data () {
    return {
    };
  },
  props:{
    islike2:{
      type:Boolean
    },
    stylehhhff:{
      type:Object
    }
  },
  mounted() {
    // console.log(this.islike)
  },
  methods: {
    // 添加收藏
    tjLikeZDY(){
      //未登录不能添加到收藏
      if(this.$store.state.userList.user_name)
      {
        this.$emit("tjLikeEmit")
      }else
      {
        alert("请登录")
      }
      
    },
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
</style>