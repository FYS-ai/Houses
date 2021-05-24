<template>
  <div class="ItemList">
    <slot name="addmycollect">
      <add-my-collect  @qxLikeEmit="qxLike(collectItem.colid)" 
      :islike="islike"></add-my-collect>
    </slot>
    <div class="imgTitle" @click="colltodetailClick">
      <img class="xsimgCC" :src="collectItem.h_images"
      v-if="collectItem.h_images.indexOf('http')!=-1||
      collectItem.h_images.indexOf('https')!=-1" alt="">
      <img class="xsimgCC" src="~assets/img/pointOut/mytp.png" v-else alt="">
      
      <div class="titlesss">{{collectItem.h_title}}</div>
    </div>
  </div>
</template>
<script>
import AddMyCollect from '../../../home/houseChild/HouseDisplay/AddMyCollect'
export default {
  name: "collectlist",
  data () {
    return {
      islike:false
    };
  },
  props:{
    collectItem:{
      type:Object
    }
  },
  components:{
    AddMyCollect
  },
  methods: {
    // 取消收藏
    qxLike(event){
     this.islike = false
     this.$emit("CollectsEmit",event)
      // console.log("取消收藏了",event)
    },
    //跳转到详情页
    colltodetailClick()
    {
      this.$router.push("/detail?hid="+this.collectItem.hid);
    }
  },
}
</script>
<style scoped>
.ItemList{
  width: 33%;
}
.imgTitle{
      width: 96%;
    padding: 5px;
    text-align: center;
    margin: auto;
}
.xsimgCC{
  width: 100%;
  height: 220px;
  border-radius: 8px;
}
.titlesss{
  font-size: 15px;
font-weight: 700;
margin-top: 10px;
}
</style>