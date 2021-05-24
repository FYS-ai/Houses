<template>
<div>
    <div class="detial_img demo-image" v-if="h_images.length>1">
      <div class="img_l">
        <img :src="h_images[0]" />
      </div>
      <div class="img_r">
        <div class="r-pj demo-image">
          <img class="r_pj_img1" :src="h_images[1]" alt="" />
        </div>
        <div class="r-pj demo-image">
          <img class="r_pj_img1" :src="h_images[2]" alt="" />
        </div>
        <div class="r-pj demo-image">
          <img class="r_pj_img1" :src="h_images[3]" alt="" />
        </div>
        <div class="r-pj demo-image">
          <img class="r_pj_img1" :src="h_images[4]" alt="" />
        </div>
      </div>
    </div>
     <div class="detial_img demo-image zdygd" v-else>
      <img class="fbtp" src="~assets/img/pointOut/mytp.png" alt="">
    </div>
</div>
</template>
<script>
export default {
  name: "detailimg",
  data () {
    return {
    };
  },
  props:{
    h_images:{
      type:Array
    }
  },
  created() {
    console.log(this.h_images.length)
  },
}
</script>
<style scoped>
.detial_img {
  display: flex;
  flex-direction: row;
  width: 100%;
  /* border: 1px solid yellow; */
  height: 280px;
}
.fbtp{
  width:100%;
  height:100%;
}
.zdygd{
  height:443px;
}
.img_l {
  width: 50%;
  height: 280px;
}
.img_l img {
  width: 100%;
  height: 100%;
  padding-right: 1px;
  max-width: 100%;
  max-height: 100%;
}
.img_r {
  width: 50%;
  height: 280px;
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
}
.img_r .r-pj {
  width: 50%;
  height: 50%;
}
.r_pj_img1 {
  width: 100%;
  height: 140px;
  padding: 1px;
  max-width: 100%;
  max-height: 100%;
}
</style>