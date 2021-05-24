<template>
  <div class="collectItem">
    <collects :newCollectList="collecListz" @CollectsFadeClick="delcollectClick"
    v-if="collecListz.length>0">
    </collects>
    <div v-else>
      暂无收藏。。。
    </div>
  </div>
</template>
<script>
import Collects from "./chilidCpns/collects/Collects"
import {DelCollect} from "network/collect.js" 
import {GetUserCollect} from 'network/collect'
export default {
  name: "collect",
  inject:["reload"],
  data() {
    return {
      collecListz: [],
      isshowcollect:''
    };
  },
  components:{
    Collects
  },
  created() {
    this._GetUserCollect()
  },
  mounted() {
    
  },
  methods: {
    // 取消收藏按钮事件监听
    delcollectClick(colids)
    {
      this._DelCollect(colids)
    },

    // 取消个人收藏的请求
    _DelCollect(colid)
    {
      DelCollect(colid).then(res=>
      {
        if(res.code==200&&res.data)
        { 
          this.$store.commit("collectList",res.data)
          this.reload()
        }
      })
    },
    // 查询个人收藏
    _GetUserCollect()
    {
      GetUserCollect(this.$store.state.userList.uid).then(res=>{
        if(res.code==200){
          this.$store.commit("collectList",res.data)
          this.collecListz = this.$store.state.collectList
          // console.log(this.collecListz)
        }
      })
    }
    
  },
};
</script>
<style scoped>
.collectItem{
  display: flex;
    flex-direction: row;
    /* justify-content: space-between; */
    width: 1140px;
    /* border: 1px solid; */
    margin: auto;
    margin-top: 30px;
    flex-wrap: wrap;
}

</style>
