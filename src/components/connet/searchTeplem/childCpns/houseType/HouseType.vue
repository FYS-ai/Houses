<template>

  <div class="imgTitle" @click="todetailClick">

    <add-my-collect :islike="islike"
     ></add-my-collect>

    <img v-if="homesearchItem.h_images" class="xsimgCC" :src='(homesearchItem.h_images || "").split(",")[0]' alt="">
    <img v-else class="xsimgCC" src="~assets/img/pointOut/mytp.png" alt="">
    <div class="titlesss">{{homesearchItem.h_title}}</div>
  </div>
</template>
<script>
import AddMyCollect from 'views/home/houseChild/HouseDisplay/AddMyCollect'
export default {
  name: "housetype",
  data () {
    return {
    };
  },
  props:{
    homesearchItem:{
      type:Object
    },
    islike:{
      type:Boolean
    }
  },
  components:{
    AddMyCollect
  },
  methods: {
    todetailClick()
    {
       this.$router.push("/detail?hid="+this.homesearchItem.hid);
    }
  },
}
</script>
<style scoped>
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