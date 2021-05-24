<template>
<div>
  <div v-if="qiehuanzt==1">
    <h4>已发布{{userHouseList.length}}个房源</h4>
    <div class="manhouse" >
      <div class="myhlist" v-for="(userhItem,userhIndex) in userHouseList"
      :key="userhIndex" >
        <div class="djliulan" @click="todetailClick(userhItem.hid)">
          <div class="myhtitle">
            {{userhItem.h_title}}
          </div>
          <div>
            <img class="fbtp" :src='(userhItem.h_images || "").split(",")[0]'
            v-if="(userhItem.h_images || '').split(',').length>1"
              alt="">
            <img class="fbtp" v-else src="~assets/img/pointOut/mytp.png" alt="">
          </div>
        </div>

        <div class="dianjishijian">
          <div @click="uploadClick(userhItem.hid)">上传图片</div>
          <div @click="upHouseClick(userhItem.hid)">修改</div>
          <div @click="delHouseClick(userhItem.hid)">删除</div>
        </div>
      </div>
    </div>
  </div>
  <!-- 上传图片 -->
  <div v-else-if="qiehuanzt==2">
    <upload-house-img :uploadHid="uploadHid"/>
  </div>

  <!-- 修改 -->
  <div v-else>
    <up-house-list :uphid="uphid"/>
  </div>
</div>
</template>
<script>
import {GetUserIdHouse,DelHouse} from 'network/house'
import UploadHouseImg from "components/connet/uploadHouseImg/UploadHouseImg"
import UpHouseList from './childCpns/upHouseList/UpHouseList'
export default {
  inject:["reload"],
  name: "managehouse",
  data () {
    return {
      userHouseList:[],
      uploadHid:'',//上传图片hid
      uphid:"",//修改房源hid
      qiehuanzt:1
    };
  },
  created() {
    this._GetUserIdHouse()
  },
  components:{
    UploadHouseImg,
    UpHouseList
  },
  methods: {
    // 上传图片
    uploadClick(hid){
      this.uploadHid = hid
      this.qiehuanzt=2
      // console.log("上传图片",hid)
    },
    //修改
    upHouseClick(hid){
      this.qiehuanzt=3
      this.uphid = hid
      console.log("修改",hid)
    },
    // 删除
    delHouseClick(hid){
      DelHouse(hid).then(res=>{
        if(res.code==200)
        {
          alert("删除成功")
          this.reload()
        }
      })
      console.log("删除",hid)
    },
    // 跳转详情页
    todetailClick(hid){
        this.$router.push("/detail?hid="+hid);
    },
    //按用户id查询
    _GetUserIdHouse(){
      GetUserIdHouse(this.$store.state.userList.uid).
      then(res=>{
        if(res.code==200&&res.data)
        {
          this.userHouseList = res.data
        }
        console.log(res)
      })
    }
  },
}
</script>
<style scoped>
.manhouse{
      display: flex;
    flex-wrap: wrap;
}
.djliulan{
      display: flex;
    align-items: center;
        margin-top: 25px;
}
.djliulan:hover{
  /* border: 1px solid rgb(179, 178, 178); */
   box-shadow: 0 5px 8px rgba(0,0,0,0.09), 0 0 0 1px rgba(0,0,0,0.1);
}
.myhlist{
      display: flex;
    height: 145px;
    /* align-items: center; */
        flex-direction: column;
    padding: 0 10px 0 10px;
    background: white;
    box-shadow: 0 5px 8px rgba(0,0,0,0.09), 0 0 0 1px rgba(0,0,0,0.1);
    border-radius: 4px;
    cursor: pointer;
    margin-right: 15px;
    margin-top: 20px;
}
.dianjishijian{
    display: flex;
    color: #007bff;
    justify-content: space-between;
    font-size: 14px;
    margin-top: 10px;
    cursor: pointer;
}
.myhtitle{
  width: 150px;
    font-family: Roboto, Helvetica Neue, sans-serif;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
    vertical-align: middle;
}
.fbtp{
  width: 104px;
    height: 69px;
}
</style>