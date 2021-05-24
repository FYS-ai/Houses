<template>
  <el-footer class="myfooter">
    <div class="yi">
      <div class="f-head">爱彼迎</div>
      <div class="f-text">工作机会</div>
      <div class="f-text">爱彼迎新闻</div>
      <div class="f-text">政策</div>
      <div class="f-text">多元文化与归属</div>
      <div class="f-text">无障碍设施</div>
    </div>
    <div class="er">
      <div class="f-head">发现</div>
      <div class="f-text">信任与安全</div>
      <div class="f-text">旅行基金</div>
      <div class="f-text">商务体验</div>
      <div class="f-text">缤纷体验</div>
      <div class="f-text">爱彼迎杂志</div>
    </div>
    <div class="san">
      <div class="f-head">出租</div>
      <div class="f-text">为什么要出租</div>
      <div class="f-text">待客之道</div>
      <div class="f-text">房东义务</div>
      <div class="f-text">开展体验</div>
      <div class="f-text">Open Homes</div>
      <div class="f-text">资源中心</div>
    </div>
    <div class="s">
      <div class="f-head">客服与帮助</div>
      <div class="f-text">帮助</div>
      <div class="f-text">邻里支持</div>
    </div>
  </el-footer>
</template>
<script>
export default {
  name: "myFoot",
  data() {
    return {};
  },
};
</script>
<style scoped>
.myfooter {
  display: flex;
  justify-content: space-around;
  padding-bottom: 247px;
  /* border-bottom: 1px solid;  */
  position: relative;
  bottom: 0px;
  left: 0px;
  right: 0px;
  width: 100%;
  margin: auto;
  background-color: white;
  margin-top: 200px;
  padding-top: 30px;
  border-top: 1px solid #dcd7d7;
}
.f-head {
  font-size: 15px;
  font-weight: bold;
  margin-bottom: 20px;
}
.f-text {
  font-size: 15px;
  margin-bottom: 10px;
  color: rgb(78 74 74);
  cursor: pointer;
}
</style>
