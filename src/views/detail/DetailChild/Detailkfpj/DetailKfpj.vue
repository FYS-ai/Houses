<template>
  <div class="fzpj">
      <div class="pjnr">
        <h3 class="ht">客房评价</h3>
        <div v-if="CommentList.length > 0" class="CommentItem">
          <div
            class="shangxia"
            v-for="(commentItem, commentIndex) in CommentList"
            :key="commentIndex"
          >
            <detail-kfpj-item :commentItem="commentItem"></detail-kfpj-item>
          </div>
          <div class="ckgd">
            <div class="cccss">
              <span v-if="isGengduo" @click="ckgdClick">查看更多</span>
              <span v-else class="wysydx">我也是有底线的••</span>
            </div>
          </div>
        </div>
        <div v-else style="font-size: 16px;width: 50%;margin: auto;">
          暂无评论！
        </div>
      </div>
    </div>
</template>
<script>
import DetailKfpjItem from './DetailKfpjItem.vue'
export default {
  name: "detailkfpj",
  data () {
    return {
    };
  },
  props:{
    CommentList:{
      type:Array
    },
    isGengduo:{
      type:Boolean
    }
  },
  components:{
    DetailKfpjItem
  },
  methods: {
    //查看更多评论
    ckgdClick(){
      this.$emit("ckgedjsj")
    }
  },
}
</script>
<style scoped>
/* 客房评价 */
.fzpj {
  width: 1140px;
  margin: auto;
}
.pjnr {
  width: 50%;
}
.ht {
  font-size: 18px;
  font-weight: 700;
  margin-top: 21px;
}
.CommentItem :nth-last-child(2){
   border-bottom:none;
}
.ckgd{
  width: 1140px;
    margin: auto;
    margin-top: 30px;
    
}
.cccss{
  font-size: 15px;
    font-weight: 600;
  width: 50%;
    text-align: center;
}
.shangxia {
  display: flex;
  flex-direction: column;
  padding: 20px 0 20px 0;
  border-bottom: 1px solid #dcd7d7;
}

.shang {
  display: flex;
  margin-bottom: 15px;
}
.wysydx{
  color: #cdcdcd;
}
</style>