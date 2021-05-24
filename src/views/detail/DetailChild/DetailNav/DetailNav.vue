<template>
  <div class="fyffl">
    <div class="fangyuandhl">
      <span
        class="newdetail"
        v-for="(navItem, navIndex) in detailNav"
        ref="aaa"
        :key="navIndex"
        @click="nacClick(navIndex)"
      >
        <span
          class="detailNav"
          :class="activeIndex == navIndex ? 'navActiv' : ''"
        >
          {{ navItem }}
        </span>
        <span class="fengefu">•</span>
      </span>
    </div>
  </div>
</template>
<script>
export default {
  name: "detailnav",
  data() {
    return {
      activeIndex:""
    };
  },
  props:{
    detailNav:{
      type:Array
    }
  },
  methods: {
     nacClick(e) {
      this.activeIndex = e;
      this.$emit("detailActive",this.activeIndex);
     
    },
  },
};
</script>
<style scoped>
.fyffl {
  width: 1140px;
  margin: auto;
}
.fangyuandhl {
  height: 44px;
  line-height: 44px;
  width: 50%;
  border-bottom: 1px solid #dcd7d7;
  /* margin-top: 10px; */
}

.navActiv {
  color: black !important;
  border-bottom: 1px solid black !important;
  height: 44px;
  display: inline-block;
  font-weight: 700 !important;
}
.detailNav {
  color: rgb(0, 132, 137);
  font-style: inherit;
  font-variant: inherit;
  font-weight: inherit;
  font-stretch: inherit;
  font-size: 14px;
  line-height: inherit;
  appearance: none;
  background: transparent;
  border: 0px;
  cursor: pointer;
  margin: 0px;
  padding: 0px;
  user-select: auto;
  text-align: left;
}
.fengefu {
  margin: 0px !important;
  overflow-wrap: break-word !important;
  font-family: Circular, PingFang-SC, "Hiragino Sans GB", 微软雅黑,
    "Microsoft YaHei", "Heiti SC" !important;
  font-size: 14px !important;
  font-weight: 600 !important;
  line-height: 1.28571em !important;
  color: rgb(72, 72, 72) !important;
  margin: 0px 4px !important;
}

.fangyuandhl :nth-child(6) :nth-child(2) {
  display: none;
}
</style>
