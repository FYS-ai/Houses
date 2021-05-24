<template>

  <div class="col-sm h-item" @click="toDetail">
    <!-- 登录状态可以看到自己的收藏的房子 -->
    <add-my-collect @tjLikeEmit="tjLike"
      :stylehhhff="stylehhhff" :islike="islike"
      @qxLikeEmit="qxLike" v-if="nologinshow==false"></add-my-collect>
    
    <!-- 这里是还未登录显示空心 -->
    <del-my-collect :islike2="nologinshow==true" v-else></del-my-collect>
    <div class="f-img">
      <img class="h-images" :src="this.h_images[0]" v-if="this.h_images.length>1" alt=""/>
      <img class="h-images" src="~assets/img/pointOut/mytp.png" v-else alt=""/>
    </div>
    <div class="h-jieshao">
      <div class="room">{{houseItem.h_room}} • {{this.h_deploy[1]}}</div>
      <div class="title">{{houseItem.h_title}}</div>
      <div class="money"><span class="jg">￥{{houseItem.h_money}}</span>每晚</div>
    </div>
  </div>
</template>
<script>
import ElementUI from 'element-ui'

import {DelCollect} from "network/collect.js" 
import {AddCollect} from 'network/collect'
import AddMyCollect from './AddMyCollect'
import DelMyCollect from './DelMyCollect'
export default {
  name: "houseitem",
  inject:['reload'],
  data () {
    return {
      h_images:[],
      h_deploy:[],
      likehid:"",
      stylehhhff:{
        position:'absolute',
        top:-25+'px'
      },
      ddasdf:true,
      nologinshow:''//未登录显示空心
    };
  },
  updated() {
    //判断是否登录，未登录显示空心
    if(this.collectHid.length>0&&this.$store.state.userList.user_name)
    {
      this.nologinshow=false
    }
    else if(this.collectHid.length==0&&this.$store.state.userList.user_name)
    {
      this.nologinshow=false
    }
    else{
      this.nologinshow=true
    }
    
  },
  props:{
    houseItem:{
      type:Object
    },
    collectHid:{
      type:Array
    },
    islike:{
      type:Boolean
    },
  },
  components:{
    AddMyCollect,
    DelMyCollect
  },
  mounted() {
    this.h_images = (this.houseItem.h_images || "").split(",");
    this.h_deploy = this.houseItem.h_deploy.split(",");
    // for(let i=0;i<houseItem.length)
  },
  methods: {
    //跳转到详情页
    toDetail()
    {
      this.$router.push("/detail?hid="+this.houseItem.hid);
    },
    // 添加到收藏
    tjLike(){
      if(this.$store.state.userList.user_name){
        if(this.h_images.length>1){
          this._AddCollect(this.h_images[0],this.houseItem.h_title,
          this.houseItem.cityname,this.h_deploy[1],
          this.$store.state.userList.uid,
          this.houseItem.hid)
        }
        else{
          let imgss = "~assets/img/pointOut/mytp.png"
          this._AddCollect(imgss,this.houseItem.h_title,
          this.houseItem.cityname,this.h_deploy[1],
          this.$store.state.userList.uid,
          this.houseItem.hid)
        }
          this.reload()
          console.log("添加shouc了")
      }else{
        alert("您还没登录，请登录")
      }
    },
    // 取消收藏
    qxLike(event){
      this._DelCollect()
      console.log("取消收藏了")
    },
    // 添加收藏网络请求
    _AddCollect(h_images,h_title,cityname,h_deploy,uid,hid){
      AddCollect(h_images,h_title,cityname,h_deploy,uid,hid).then(res=>{
        if(res.code==200){
        }
      })
    },
     // 取消个人收藏的请求
    _DelCollect(colid)
    {
      DelCollect(colid).then(res=>
      {
        if(res.code==200&&res.data)
        { 
          this.$store.commit("collectList",res.data)
        }
      })
    },
  },
}
</script>
<style scoped>

.h-item{
  height: 350px;
  display: flex;
  /* border: 1px solid; */
  justify-content: center;
  flex-direction: column;
  flex-grow: 0;
}
.h-item .f-img{
  display: flex;
  justify-content: center;
}
.f-img .h-images{
  /* border: 1px solid red; */
  width:  348px;;
  height: 235px;
  border-radius: 4px;
  margin-top: 10px;
}
.h-jieshao{
  width: 348px;
  margin: auto;
  margin-top: 10px;
  display: flex;
  flex-direction: column;
  justify-content: center;
}
.h-jieshao .room{
    font-size: 14px;
    color: rgb(57, 87, 106);
}
.h-jieshao .title{
  width: 348px;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  font-weight: bold;
  color: rgb(72, 72, 72);
}
.h-jieshao .money{
  font-size: 13px;
  color: rgb(72, 72, 72);
}
.money .jg{
  font-weight: bold;
  color: rgb(72, 72, 72);
  font-size: 18px;
  padding-right: 4px;
}

</style>