<template>
  <div>
   
    <!-- 订单展示列表 -->
    <el-table :data="ListItem" border v-if="newIsOrder" style="width: 100%" max-height="360">
       <el-table-column prop="orid" label="订单编号" width="120">
      </el-table-column>
      <el-table-column fixed label="图片" width="150">
        <template slot-scope="scope">
          <div style="text-align: center;">
            <img :src="scope.row.h_images" alt="" width="60px" height="60px" />
          </div>
        </template>
      </el-table-column>
      <el-table-column prop="myName" label="姓名" width="120">
      </el-table-column>
      <el-table-column prop="IDcard" label="身份证" width="120">
      </el-table-column>
      <el-table-column prop="or_tel" label="电话" width="120">
      </el-table-column>
      <el-table-column prop="h_title" label="标题" width="300">
      </el-table-column>
      <el-table-column prop="h_money" label="价格" width="120">
      </el-table-column>
      <el-table-column prop="time_day" label="天数" width="120">
      </el-table-column>
      <el-table-column prop="num_people" label="人数" width="120">
      </el-table-column>
      <el-table-column prop="into_time" label="入住时间" width="120">
      </el-table-column>
      <el-table-column prop="exit_time" label="退房时间" width="120">
      </el-table-column>
      <el-table-column label="订单状态" width="120">
        <template slot-scope="scope">
          <span
            :class="
              scope.row.isdel == '已入住'
                ? 'bred'
                : scope.row.isdel == '已取消订单'
                ? 'bblud'
                : 'bgreen'
            "
          >
            {{ scope.row.isdel }}</span
          >
        </template>
      </el-table-column>
      <el-table-column fixed="right" label="操作" width="100">
        <template slot-scope="scope">
          <el-button
            v-if="scope.row.isdel == '已入住'"
            type="text"
            size="small"
            @click="pingjiazj(scope.row.orid, scope.row.hid)"
            :disabled="scope.row.isComment == 1 ? true : false"
            >评价</el-button
          >
          <el-button
            v-else-if="scope.row.isdel == '已取消订单'"
            type="text"
            size="small"
            @click="shanchuddzj(scope.row.orid)"
            >删除订单</el-button
          >
          <template slot-scope="scope" v-else>
            <el-button
              type="text"
              size="small"
              @click="
                querenruzhuzj(
                  scope.row.orid,
                  scope.row.isdel == '还未入住' ? 0 : ''
                )
              "
              >确认已入住</el-button
            >
            <el-button
              type="text"
              size="small"
              @click="
                quxiaoddzj(
                  scope.row.orid,
                  scope.row.isdel == '还未入住' ? 1 : ''
                )
              "
              >取消订单</el-button
            >
          </template>
        </template>
      </el-table-column>
    </el-table>
    <div v-else v-cloak class="mddtp">
      <span class="zeddwz">暂无订单！</span>
      <img :src="require('../../../../assets/img/order/HMDD.png')" alt="" />
    </div>
    <!-- <order-lie-biao :OrderListItem="ListItem" :newIsOrder="newIsOrder"
    @shanchuddzjEmit="shanchuddzj" @pingjiazjEmit="pingjiazj"
    @querenruzhuzjEmit="querenruzhuzj" @quxiaoddzjEmit="quxiaoddzj">
    </order-lie-biao> -->
    <!-- <el-table :data="ListItem" border v-if="newIsOrder" style="width: 100%" max-height="360">
      <el-table-column fixed label="图片" width="150">
        <template slot-scope="scope">
          <div style="text-align: center;">
            <img :src="scope.row.h_images" alt="" width="60px" height="60px" />
          </div>
        </template>
      </el-table-column>
      <el-table-column prop="myName" label="姓名" width="120">
      </el-table-column>
      <el-table-column prop="IDcard" label="身份证" width="120">
      </el-table-column>
      <el-table-column prop="or_tel" label="电话" width="120">
      </el-table-column>
      <el-table-column prop="h_title" label="标题" width="300">
      </el-table-column>
      <el-table-column prop="h_money" label="价格" width="120">
      </el-table-column>
      <el-table-column prop="time_day" label="天数" width="120">
      </el-table-column>
      <el-table-column prop="num_people" label="人数" width="120">
      </el-table-column>
      <el-table-column prop="into_time" label="入住时间" width="120">
      </el-table-column>
      <el-table-column prop="exit_time" label="退房时间" width="120">
      </el-table-column>
      <el-table-column label="订单状态" width="120">
        <template slot-scope="scope">
          <span
            :class="
              scope.row.isdel == '已入住'
                ? 'bred'
                : scope.row.isdel == '已取消订单'
                ? 'bblud'
                : 'bgreen'
            "
          >
            {{ scope.row.isdel }}</span
          >
        </template>
      </el-table-column>
      <el-table-column fixed="right" label="操作" width="100">
        <template slot-scope="scope">
          <el-button
            v-if="scope.row.isdel == '已入住'"
            type="text"
            size="small"
            @click="pingjiazj(scope.row.orid, scope.row.hid)"
            :disabled="scope.row.isComment == 1 ? true : false"
            >评价</el-button
          >
          <el-button
            v-else-if="scope.row.isdel == '已取消订单'"
            type="text"
            size="small"
            @click="shanchuddzj(scope.row.orid)"
            >删除订单</el-button
          >
          <template slot-scope="scope" v-else>
            <el-button
              type="text"
              size="small"
              @click="
                querenruzhuzj(
                  scope.row.orid,
                  scope.row.isdel == '还未入住' ? 0 : ''
                )
              "
              >确认已入住</el-button
            >
            <el-button
              type="text"
              size="small"
              @click="
                quxiaoddzj(
                  scope.row.orid,
                  scope.row.isdel == '还未入住' ? 1 : ''
                )
              "
              >取消订单</el-button
            >
          </template>
        </template>
      </el-table-column>

      <el-table-column span-method="12"
      label=" ">
      <div>加载跟多···</div>
    </el-table-column>

    </el-table>
    <div v-else v-cloak class="mddtp">
      <span class="zeddwz">暂无订单！</span>
      <img :src="require('../../../../assets/img/order/HMDD.png')" alt="" />
    </div> -->
  </div>
</template>
<script>

import OrderLieBiao from '../orderLieBiao/OrderLieBiao'
export default {
  name: "orderlist",
  data() {
    return {
      // newOrderList:[],
      newIsOrder: "",
    };
  },
  props: {
    ListItem: {
      type: Array,
    },
    isOrder: {
      type: Boolean,
    },
  },
  components:{
   
    OrderLieBiao
  },
  mounted() {
    this.newIsOrder = this.isOrder;
  },
  methods: {
    // 评价
    pingjiazj(orid, hid) {
      this.$emit("pingjiafs", { orid, hid });
    },
    // 删除订单
    shanchuddzj(e) {
      this.$emit("shanchuddfs", e);
    },
    // 确认已入住
    querenruzhuzj(orid,newIsdel) {
      this.$emit("querenruzhufs",[orid,newIsdel]);
    },
    // 取消订单
    quxiaoddzj( orid, newIsdel) {
      this.$emit("quxiaoddfs", [orid, newIsdel]);
    },
  },
};
</script>
<style scoped>
.bred {
  color: red;
}
.bblud {
  color: blue;
}
.bgreen {
  color: green;
}
.mddtp {
  width: 1140px;
  margin: auto;
  margin-top: 30px;
  text-align: center;
}
.zeddwz {
  color: #9e9e9e;
}
.mddtp img {
  width: 26%;
  height: 329px;
}
</style>
