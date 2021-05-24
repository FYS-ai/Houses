<template>
  <div class="pointOut">
    <!-- 图片 -->
    <div class="pointMsg">
      <!-- <slot name="plSlot"> -->
        <img style="width: 438px;" src="../../../assets/img/pointOut/chenggong.png" alt="">
        <div class="msgList">
          <span>您可能还需要的操作</span>
          <span class="fhcz sy" @click="fnhuisy">返回首页</span>
          <span class="fhcz dd" @click="fnhuizdy">返回{{msg}}</span>
        </div>
        
      <!-- </slot> -->
    </div>
  </div>
</template>
<script>
export default {
  name: "pointout",
  data () {
    return {
      // msg:""
   };
  },
  created() {
    // this.path = this.$route.fullPath
  },
  props:{
    path:{
      type:String
    },
    msg:{
      type:String
    }
  },
  methods: {
    //返回首页
    fnhuisy(){
      this.$router.push("/home")
    },
    // 返回订单
    fnhuizdy(){
      this.$router.push(this.path);
    }
  },
}
</script>
<style scoped>
.pointOut{
  width:1140px;
  margin: auto;
  margin-top: 30px;
}
.pointMsg{
  display: flex;
}
.msgList{
    height: 44px;
    line-height: 44px;
    /* border: 1px solid; */
    position: relative;
    margin-top: 315px;
    margin-left: -28px;
}
.fhcz{
  cursor: pointer;
    margin-left: 20px;
    display: inline-block;
    font-size: 15px;
    font-weight: 600;
}
.sy{
  color: rgb(240, 53, 53);
}
.dd{
color :#007bff;
}
</style>