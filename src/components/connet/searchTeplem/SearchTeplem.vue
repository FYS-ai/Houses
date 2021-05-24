<template>
  <el-container>
    <el-main>
      <div class="collectItem" 
      :class="searchcpt.searchResultStore.length===0?'gbdisplay':''"
      >
        <h5 class="h5title">
          一共找到{{ searchcpt.searchResultStore.length }}条记录
        </h5>
        <!-- 房源 -->
        <div
          v-if="
            searchcpt.selectNameType == 'fy' &&
              searchcpt.searchResultStore.length > 0
          "
          class="dfdd"
        >
          <div
            class="ItemList"
            v-for="(homesearchItem,
            homesearchIdexn) in searchcpt.searchResultStore"
            :key="homesearchIdexn"
          >
            <house-type :homesearchItem="homesearchItem"
             :islike.sync="shoucqh[homesearchIdexn]" 
             ></house-type>

           
          </div>
        </div>
        <!-- 用户 -->
        <div class="dfdd"
          v-else-if="
            searchcpt.selectNameType == 'yh' &&
              searchcpt.searchResultStore.length > 0
          "
        >
          <div class="usersearch"
            v-for="(homeSeItem, homeSeIndex) in searchcpt.searchResultStore"
            :key="homeSeIndex"
          >
           <user-type :usersearchItem="homeSeItem"/>
           
          </div>
        </div>
        <!-- 区域 -->
        <div class="dfdd"
          v-else-if="
            searchcpt.selectNameType == 'qy' &&
              searchcpt.searchResultStore.length > 0
          "
        >
          <div class="ItemList"
            v-for="(homeSeItem,
            homeSeIndex) in searchcpt.searchResultStore"
            :key="homeSeIndex"
          >
           <house-type :homesearchItem="homeSeItem"></house-type>
          </div>
        </div>
        <!-- 暂无数据 -->
        <div class="zwsj" v-else>暂无该数据。。。</div>
      </div>
    </el-main>
  </el-container>
</template>
<script>
import HouseType from "components/connet/searchTeplem/childCpns/houseType/HouseType";
import UserType from "components/connet/searchTeplem/childCpns/userType/UserType";

export default {
  name: "searchteplem",
  data() {
    return {
      homeSearchList: {}, //搜索列表
      shoucqh:[]
    };
  },
  components: {
    HouseType,
    UserType
  },
  updated() {
    // this.$store.commit("shoucqhStore",thisshoucqh)
    // console.log(this.shoucqhcpt)
    // this.shoucqhcpt()
  },
  watch:{
    
  },
  computed:{
    searchcpt()
    {
      if (this.$store.state.storeSearch.searchResultMsgStore) {
          return JSON.parse(
            JSON.stringify(this.$store.state.storeSearch)
          );
        }else
        {
         return JSON.parse(
            JSON.stringify(this.$store.state.storeSearch)
          );
        }
    },

    shoucqhcpt(){
      if(this.$store.state.userList.user_name){
        for(let i=0;i<this.searchcpt.searchResultStore.length;i++)
        {
          let flag = this.$store.state.collectList.map(item=>{
            return item == this.searchcpt.searchResultStore[i].hid
          })
          const ss = flag.every(function(value){
            return value === false
          })
          this.shoucqh.push(ss)
          console.log(this.shoucqh)
        }
        this.$store.commit("shoucqhStore",this.shoucqh)
      }
    }
   
  },
  methods: {
    // searchCollect(){
    //   console.log(this.searchcpt.searchResultStore)
    // }
  },
};
</script>
<style scoped>
  .collectItem{
  /* display: flex; */
    /* flex-direction: row; */
    /* justify-content: space-between; */
    width: 1140px;
    /* border: 1px solid; */
    margin: auto;
    margin-top: 30px;
    flex-wrap: wrap;
}
.h5title
{
      margin-left: 15px;
    margin-bottom: 10px;
}
.dfdd{
  display: flex;
  flex-wrap: wrap;
}
.ItemList{
  width:33%;
}
.zwsj{
      margin-left: 15px;
}
.gbdisplay{
      flex-direction: column;
}
.usersearch{
    width: 33%;
}
</style>
