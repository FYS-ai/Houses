<template>
<div class="house" >
  <div class="house-h">
    <h3>冬季特惠房源</h3>
  </div>

  <!-- <div class="mudidi row">
    <destination class="col-md-1" v-for="(cityitem,cityindex) in cityData"
     :DestianData="cityitem" :key="cityindex" />     
  </div> -->
  <div class="container">
      <div class="row scro">
          <house-item v-for="(item,index) in houseData"
           :houseItem="item" :key="index"  :collectHid.sync="collectHids" 
           :islike="shoucqh[index]"
             v-infinite-scroll="load" infinite-scroll-disabled="disabled"/>
          <p class="jzgd" v-if="loading">加载中...</p>
          <p class="jzgd" v-if="noMore">没有更多了</p>
      </div>
  </div>
</div>
</template>
<script>
import HouseItem from './HouseItem'
import Destination from '../Destination/Destination'

import {GetUserCollect} from 'network/collect'
import {GethouseOver} from "network/house.js";
export default {
  name: "houses",
  data () {
    return {
      count:1,
      loading: false,
      collectHids:[],
      shoucqh:[],
      arrHouseData:''//所有房子列表
    };
  },
  props:{
    houseData:{
      type:Array
    },
    cityData:{
      type:Array
    },
    ss:{
      type:Array
    }
  },
  created() {
    // 登录后显示个人的收藏状态
    // this.$nextTick(()=>{
      if(this.$store.state.userList.user_name){
        this.GetUserCollect()
      }
    // })) 
    this._getHouseOver()
  },
  
  mounted() {
    
  },
  computed: {
    noMore () {
      return this.count >= (this.arrHouseData.length/10)
    },
    disabled () {
      return this.loading || this.noMore
    },
  },
  components:{
    HouseItem,
    Destination
  },
  methods: {

     //请求所有房子
    _getHouseOver() {
      GethouseOver().then((res) => {
        this.arrHouseData = JSON.parse(JSON.stringify(res.data))
        // 比较收藏的状态
        if(this.$store.state.userList.user_name)
        {
          for(let i=0;i<this.arrHouseData.length;i++)
          {
            let flag = this.collectHids.map(item=>{
              return item ==this.arrHouseData[i].hid
            })
            const ss = flag.every(
              function (value){
                return value === false
              }
            )
            this.shoucqh.push(ss)
            // console.log(this.shoucqh)
          }
          this.$store.commit("shoucqhStore",this.shoucqh)
        }
      });
    },
    //个人收藏请求
    GetUserCollect()
    {
      GetUserCollect(this.$store.state.userList.uid).then(res=>{
        if(res.code==200){
          this.$store.commit("collectList",res.data)
          this.collectHids = this.$store.state.collectList.map(item=>
          {
            return item.hid
          })
          // console.log("赋值了collectHids")
          // console.log( this.collectHids)
        }
      })
    },
    load()
    {
       this.loading = true
        setTimeout(() => {
          this.count += 1
          this.loading = false
          this.$emit("scrollLoad",this.count);
        }, 3000)
     
    }
  },
}
</script>
<style scoped>
.house{
  padding-bottom: 20px;
  
}
.scro{
  height:70%; 
  overflow:auto;
}
.house-h{
  width: 1140px;
  margin: auto;
  padding-right: 15px;
  padding-left: 15px;
  margin-right: auto;
  margin-left: auto;
  
}
.house-h h3{
  margin: 20px 0 20px 0;
}
.jzgd{
  width: 1140px;
  margin: auto;
  text-align: center;
  font-size: 18px;
}
.mudidi{
  display: flex;
  width: 1140px;
  margin: auto;
  /* padding-left: 14px; */
  padding-right: 6px;
  margin-bottom: 15px;
  justify-content: space-between;
}
</style>