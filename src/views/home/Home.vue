<template>
  <el-main class="home">
    <div>
      <!-- 轮播图展示 -->
      <carousel/>
      <!-- 房源展示 -->
      <houses v-if="HouseList.length>0" :houseData.sync="HouseList"
         @scrollLoad="houseScroll" :cityData="CityList"
      />
    </div>
    
    
  </el-main>
</template>
<script>
import { Gethouse,GetCity } from "network/house.js";

import Carousel from "components/common/Carousel/Carousel.vue";
import Houses from "./houseChild/HouseDisplay/Houses";

export default {
  name: "home",
  data() {
    
    return {
      HouseList: [],
      CityList: [],
      page: 1,
      ctPage:1,
      
    };
  },
  created() {
    this._getHouse(this.page);
    this._GetCity();
   
  },

  components: {
    Carousel,
    Houses,
    

  },
  methods: {
    
    //请求房子
    _getHouse(page) {
      Gethouse(page).then((res) => {
        // this.HouseList = JSON.parse(JSON.stringify(res.data))
        this.HouseList.push(...res.data);
        // this.HouseList.unshift(...res.data);
        // console.log(this.HouseList);
      });
    },

    //请求城市
    _GetCity()
    {
      GetCity(this.ctPage).then(res=>{
        this.CityList.push(...res.data)
        // console.log(res.data);
      })
    },

    //上拉加载更多
    houseScroll(e)
    {
      console.log(e)
      this.page = e;
      console.log(this.page)
      this._getHouse(this.page);
      // console.log(e);
    }
  },
};
</script>
<style>

</style>
