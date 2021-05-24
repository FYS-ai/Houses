<template>
  <div class="orderList">
     <!-- 头 -->
    <order-header @dingdanhaocx="dingdanhaoList"
    @yipingjaidingdanClick="ypjClickdd" @daipingjiadeanniuClick="dpjClickdd"></order-header>
    <!-- 列表展示 -->
    <order-list-item :ListItem="OrderList" 
      :isOrder="isOrder" @pingjiafs="pingjia"
      @shanchuddfs="shanchudd" @querenruzhufs="querenruzhu"
      @quxiaoddfs="quxiaodd"/>
  </div>
</template>
<script>
import {GetOrder, UpOrderZT, DelOrder} from "network/order"

import OrderListItem from './childOrder/orderList/OrderList'
import OrderHeader from './childOrder/orderHeader/OrderHeader'
export default {
  name: "order",
  data () {
    return {
      uid:"",
      isOrder:"",
      // orid:"",
      OrderList:[],
    }
  },
  mounted() {
    this.uid = this.$store.state.userList.uid,
    this._GetOrder();
  },
  methods: {
    // 待评价
    dpjClickdd(data){
      this.OrderList = data
      this.xgddzhuangtai(data)
    },
    // 已评价订单
    ypjClickdd(data){
       this.OrderList = data
      this.xgddzhuangtai(data)
    },
    // 修改订单状态
    xgddzhuangtai(list){
      let newIsdel = list.map(item=>{
        //0表示已入住，1表示取消订单，2表示已预订还未入住
        return item.isdel==0?"已入住": (item.isdel==1?"已取消订单":"还未入住")
      })
      list.map((item,index)=>{
        return item.isdel=newIsdel[index]
      })
    },
    // 订单号查询
    dingdanhaoList(data){
      this.OrderList = data
      this.xgddzhuangtai(data)
      // console.log(data)
    },
    // 订单列表请求
    _GetOrder(){
      GetOrder(this.uid).then(res=>{
        console.log(res)
        if(res.msg=="查询失败，请重新操作！"){
          this.isOrder = false
        }
        if(res.code==200&&res.data){
          this.isOrder = true
          this.OrderList = res.data
          this.xgddzhuangtai(res.data)
          // let newIsdel = res.data.map(item=>{
          //   //0表示已入住，1表示取消订单，2表示已预订还未入住
          //   return item.isdel==0?"已入住": (item.isdel==1?"已取消订单":"还未入住")
          // })
          // res.data.map((item,index)=>{
          //   return item.isdel=newIsdel[index]
          // })
          
        }
        // console.log(this.OrderList)
      })
    },
    // 修改订单状态请求
    _UpOrderZT(xorid,xisdel){
      UpOrderZT(xorid,xisdel).then(res=>{
        // console.log(res)
      })
    },
    // 删除取消的订单请求
    _DelOrder(dorid){
      DelOrder(dorid).then(res=>{
        console.log(res)
      })
    },
    // 评价
    pingjia(e){
      const loading = this.$loading({
        lock: true,
        text: "Loading",
        spinner: "el-icon-loading",
        background: "rgba(0, 0, 0, 0.7)",
      });
      setTimeout(() => {
        loading.close();
        this.$router.push("/comment?orid="+e.orid+"&hid="+e.hid)
      }, 2000)
      
    },
    // 删除订单
    shanchudd(e){
      this._DelOrder(e)
      this.shuaxin()
    },
    // 确认入住事件
    querenruzhu(dataLi){
      this._UpOrderZT(dataLi[0],dataLi[1])
      this.shuaxin()
    },
    // 取消订单
    quxiaodd(data){
      this._UpOrderZT(data[0],data[1])
      this.shuaxin()
     
    },
    // 刷新当前页面
    shuaxin(){
      const loading = this.$loading({
        lock: true,
        text: "Loading",
        spinner: "el-icon-loading",
        background: "rgba(0, 0, 0, 0.7)",
      });
      setTimeout(() => {
        loading.close();
        this.$router.go(0)
      }, 2000)
    }
  },
  components:{
    OrderListItem,
     OrderHeader
  }
}
</script>
<style scoped>
.orderList{
  width: 1140px;
  margin: auto;
  margin-top: 30px;
}
</style>