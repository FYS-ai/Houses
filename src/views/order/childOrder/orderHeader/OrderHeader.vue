<template>
<!-- 头 -->
    <div class="topOrder">
      <div class="ddhao">
        <!-- 订单号 -->
        <div class="spaninputddh">
          <span>订单号：</span>
          <input type="text" v-model="orderText"/>
        </div>

        <!-- 订单状态 -->
        <div class="ddzt">
          <span>订单状态：</span>
          <!-- 待确认入住 -->
          <div class="divmk"  @click="daiqrruzhuClick">
            <span>待确认入住</span>(<span class="number">{{dqrrznum!=''?dqrrznum:0}}</span>)
          </div>
          <!-- 待评价 -->
          <div class="divmk" @click="daipingjiadeanniu">
            <span>待评价</span>(<span class="number">{{dpjnum!=''?dpjnum:0}}</span>)
          </div>
          <!-- 已评价 -->
          <div class="divmk" @click="yipingjaidingdan">
            <span>已评价(已确认入住)</span>(<span class="number">{{pjnum!=''?pjnum:0}}</span>)
          </div>
          <!-- 已取消 -->
          <div class="divmk" @click="yiquxiaodingdan">
            <span>已取消</span>(<span class="number">{{yqxnum!=''?yqxnum:0}}</span>)
          </div>
        </div>
      </div>

      <div class="quyu">
        <!-- 订单搜索 -->
        <!-- <span>地区名称：</span>
        <input class="quyuinput" type="text" /> -->
        <div class="chaxun" @click="submitCX">查询</div>
      </div>
    </div>
</template>
<script>
import {FindOrder,GetIsComment,GetIsdel} from 'network/order.js'
export default {
  name: "orderheader",
  data () {
    return {
      orderText:'',
      pjnum:'',//评价数量
      dpjnum:"",//待评价数量
      yqxnum:'',//取消订单数量
      dqrrznum:'',//待确认入住数量
      ztList:[],//已评价数组
      wpjztList:[],//待评价数组
      dqrrzList:[],//待确认入住数组
      qxddList:[],//取消订单数组

    };
  },
  created() {
    this._GetIsComment(1,0)//已评价
    this._GetIsComment(0,0)//待评价
    this._GetIsdel(1)//已取消订单
    this._GetIsdel(2)//待确认入住
  },
  methods: {
    // 按id查询
    submitCX(){
      // console.log("---")
      //订单id不为空那么查找id那条订单，如果为空查询全部
      if(this.orderText&&this.$store.state.userList.user_name){
        FindOrder(this.orderText,this.$store.state.userList.user_name)
        .then(res=>{
          if(res.code==200&&res.data){
            this.$emit("dingdanhaocx",[res.data])
          }
          if(res.code==400&&res.msg=="请求数据为空,请输入有效参数！"){
            alert("查询不到该订单！")
            // this.$emit("dingdanhaocx",[res.data])
          }
          if(res.code==400&&res.msg=="orid只能是数字！"){
            alert("订单编号输入错误")
          }
          console.log(res)
        })
      }
      if(!this.orderText){
        this.$router.go(0)
      }
    },
    // 待确认入住
    daiqrruzhuClick(){
      this._GetIsdel(2)
       this.$emit("daipingjiadeanniuClick",this.dqrrzList)
    },
    // 待评价
    daipingjiadeanniu(){
      this._GetIsComment(0,0)
      this.$emit("daipingjiadeanniuClick",this.wpjztList)
    },
    // 已评价订单
    yipingjaidingdan(){
      this._GetIsComment(1,0)
      this.$emit("yipingjaidingdanClick",this.ztList)
    },
    // 已取消订单
    yiquxiaodingdan(){
      this._GetIsdel(1)
      this.$emit("yipingjaidingdanClick",this.qxddList)
    },
    //已评价和未评价请求
    _GetIsComment(iscomment,isdel){
      // 已评价
      if(iscomment==1){
        GetIsComment(this.$store.state.userList.user_name,iscomment,isdel)
        .then(res=>{
          if(res.code==200&&res.data){
            this.pjnum = res.data.length
            this.ztList = res.data
            // console.log("已评价")
          }
       })
      }
      // 未评价
      if(iscomment==0){
        GetIsComment(this.$store.state.userList.user_name,iscomment,isdel)
        .then(res=>{
          if(res.code==200&&res.data){
            this.dpjnum = res.data.length
            this.wpjztList = res.data
            // console.log("未评价")
          }
       })
      }
      
    },
    //待确认入住和取消订单请求
    _GetIsdel(isdel){
       // 取消订单
      if(isdel==1){
        GetIsdel(this.$store.state.userList.user_name,isdel)
        .then(res=>{
          if(res.code==200&&res.data){
            this.yqxnum = res.data.length
            this.qxddList = res.data
            // console.log("已评价")
          }
       })
      }
      //待确认入住
      if(isdel==2){
        GetIsdel(this.$store.state.userList.user_name,isdel)
        .then(res=>{
          if(res.code==200&&res.data){
            this.dqrrznum = res.data.length
            this.dqrrzList = res.data
            // console.log("未评价")
          }
       })
      }
    }
  },
}
</script>
<style scoped>
.topOrder {
  display: flex;
  flex-direction: column;
  font-size: 14px;
  background: #eff0f0;
  border: 1px solid #eff0f0;
  margin-bottom: 15px;
  padding: 26px 0;
}
.ddhao {
  display: flex;
  /* flex-direction: initial; */
  height: 44px;
  /* line-height: 44px; */
  /* border: 1px solid; */
  align-items: center;
}
.spaninputddh {
  margin-left: 20px;
  font-size: 13px;
}
.ddzt {
  display: flex;
  margin-left: 30px;
  width: 520px;
  /* border: 1px solid; */
  justify-content: space-around;
}
.divmk {
  padding: 3px;
  background: #d8dbe2;
  border-radius: 4px;
  font-size: 12px;
  cursor: pointer;
}
.number {
  color: #ec4a0c;
  font-size: 14px;
  font-weight: 700;
}
.quyu {
  margin-top: 10px;
  margin-bottom: 10px;
  margin-left: 20px;
  font-size: 13px;
  display: flex;
  height: 44px;
  align-items: center;
  /* border: 1px solid; */
}
.quyuinput {
  width: 360px;
}
.chaxun {
  width: 70px;
  height: 30px;
  /* border: 1px solid; */
  border-radius: 4px;
  text-align: center;
  line-height: 30px;
  margin-bottom: 10px;
  /* margin-left: 20px; */
  background: #f8f9fa;
  color: #555656;
  box-shadow: 0px 0 1px 0.7px;
  cursor: pointer;
  margin-top: 10px;
}
</style>