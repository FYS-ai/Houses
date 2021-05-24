<template>
  <div>
    <div v-show="code!=200">
      <!-- 图片 -->
      <detail-img :h_images.sync="h_images"></detail-img>

      <!-- 房源导航栏 -->
      <detail-nav :detailNav="detailNav" @detailActive="detailClick"></detail-nav>

      <!-- 标题 --> <!-- 房子简介 -->
      <detail-title :detailList="detailList" v-if="JSON.stringify(this.detailList)!='{}'"
       :h_deploy_img="h_deploy_img" 
        :h_tag="h_tag" :h_deploy="h_deploy" ref="refbiaoti"
        :sanjiaox="sanjiaox"/>
    

      <!-- 客房评价 -->
    <detail-kfpj :CommentList="CommentList"  ref="kfpjref" @ckgedjsj="jzgdplsj"
    :isGengduo="isGengduo"/>

      <!-- 可定日期 -->
      <detail-time :yhList="yhList" :serenshu="serenshu" :dagou="dagou"
      ref="refkdrq" :hmoney="detailList.h_money" @zaixianyuding="zxydClick"/>
    </div>
    <point-out v-show="code==200" :path="pointPath" :msg="pointMsg"></point-out>
  </div>
</template>
<script>
import { GetDetail, GerComment,AddOrder } from "network/detail";
import DetailImg from './DetailChild/DetailImg/DetailImg'
import DetailNav from './DetailChild/DetailNav/DetailNav'
import DetailTitle from './DetailChild/DetailTitle/DetailTitle'
import DetailKfpj from './DetailChild/Detailkfpj/DetailKfpj'
import DetailTime from './DetailChild/DetailTime/DetailTime'
import PointOut from 'components/connet/pointOut/PointOut.vue'
export default {
  name: "detail",
  data() {
    return {
      hid: "", //房子id
      ldid: "", //房东id
      activeIndex: "",
      // ld_photo: "", //房东头像
      detailList: {},
      h_basets: [],
      h_deploy: [],
      h_images: [],
      h_tag: [],
      detailNav: ["详情", "评价", "可订日期", "位置", "须知", "房东"],
      h_deploy_img: [],
      sanjiaox: "",
      ldList: {},
      CommentList: [],
      
      yhList:["暖冬特惠8折","月租优惠","周租优惠"],
      dagou:"",
      serenshu:["1人","2人","3人","4人"],
      myScrollTop:[],
      plPage:1,//评论的页数
      isGengduo:true,
      code:"",
      flag :"",
      // pointPath:"/order",
      // pointMsg:"我的订单"
    };
  },
  components:{
    DetailImg,
    DetailNav,
    DetailTitle,
    DetailKfpj,
    DetailTime,
    PointOut
  },
  mounted() {
    this.hid = this.$route.query.hid;
    this.h_deploy_img = this.$store.state.overall_h_deploy;
    this.sanjiaox = this.$store.state.overall_sanjiaox;
    this.dagou = require("../../assets/img/detail/dagou.png");
    this._GetDetail();
    this._GerComment(this.hid, this.plPage);
  },
  updated() {
    // this.$nextTick(()=>{
    //   this.myScrollTop = []
    //   this.myScrollTop.push(
    //     this.$refs.refbiaoti.$el.offsetTop,
    //     this.$refs.kfpjref.$el.offsetTop,
    //     this.$refs.refkdrq.$el.offsetTop,
    //   )
    // })
  },
  computed:{
    pointPath(){
      return '/order'
    },
    pointMsg(){
      return '我的订单'
    }
  },
  methods: {
    // 导航栏点击事件
    detailClick(e){ 
     
      //  console.log(e)
    },
    // 在线预订
    zxydClick(e){
      this._AddOrder(this.detailList.h_title,
      this.$store.state.userList.user_name,
      e[2],this.h_images[0],e[1][0],e[1][1],
      this.$store.state.userList.uid,
      e[5],e[4],e[6],e[3],this.detailList.hid,2,e[0])
      // console.log(e)

    },

    //详情页
    _GetDetail() {
      GetDetail(this.hid).then((res) => {
        this.detailList = res.data;
        this.h_basets = res.data.h_basets.split(",");
        this.h_deploy = res.data.h_deploy.split(",");
        this.h_images = (res.data.h_images ||"").split(",");
        this.h_tag = res.data.h_tag.split(",");
        // this.flag = JSON.stringify(this.detailList)!='{}'

        // console.log(this.flag);
      });
    },
    // //房东
    // _GetLandlord(ldid) {
    //   GetLandlord(ldid).then((res) => {
    //     this.ldList = res.data;
    //     this.ld_photo = res.data.ld_photo;
    //     // console.log(res);
    //   });
    // },
    //评论
    _GerComment(hid, cpage) {
      GerComment(hid, cpage).then((res) => {
        this.CommentList.push(...res.data);
        if(res.code==400&&res.msg=="暂无评论！"){
          this.isGengduo = false
        }
        // console.log(res)
      });
    },
    //在线预订请求
    _AddOrder(h_title,user_name,h_money,h_images,into_time,exit_time,
      uid,IDcard,myName,or_tel,time_day,hid,isdel,num_people){
      AddOrder(h_title,user_name,h_money,h_images,into_time,exit_time,
      uid,IDcard,myName,or_tel,time_day,hid,isdel,num_people).then(res=>{
        this.code = res.code 
        // console.log(res)
      })
    },

    //加载更多评论
    jzgdplsj(){
      this.plPage += 1;
      this._GerComment(this.hid, this.plPage)
    },
  },
};
</script>
<style>




</style>
