<template>
  <div>
    <div>
      <!-- 房源内容 -->
      <div>
        <h5 style="margin-bottom: 20px;">一共有{{comhouseList.length}}个评论</h5>
        <div class="zwc" v-for="(comhlItem,comhlIndex) in comhouseList" 
        :key="comhlIndex" @click="todetailClickComm(comhlItem.hid)">
          <div class="spxx">
            <div class="tpdiv">
              <img width="150px" height="150px" style="border-radius:4px;"
                v-if="comhlItem.h_images.split(',').length>0" 
                :src="comhlItem.h_images.split(',')[0]" alt="">
              <img v-else width="150px" height="150px" style="border-radius:4px;"
                src="~assets/img/pointOut/mytp.png" alt="">
            </div>
            <div class="rightnr">
              <div class="neirong">{{comhlItem.h_title}}</div>
              <div class="xtdeyuansu">
                <span class="xtks">{{comhlItem.h_room}}</span>
                <span class="xtks">{{comhlItem.cityname}}</span>
                <span class="xtks">￥{{comhlItem.h_money}}</span>
              </div>

              <div  class="xtdeyuansu">
                <span v-for="(deployItem,deployIndex) in comhlItem.h_deploy.split(',')" :key="deployIndex"
                class="bubian" :class="('tag'+(deployIndex+1))">{{deployItem}}</span>
              </div>
              <div  class="xtdeyuansu">
                <span v-for="(tagItem,tagIndex) in comhlItem.h_tag.split(',')" :key="tagIndex"
                :class="('bq'+(tagIndex+1))"  class="bubian">{{tagItem}}</span>
              </div>
            </div>
          </div>
          <!-- 评论内容 -->
          <div>
            <!-- 图片 -->
            <div class="tpzwc" v-if=" commentList[comhlIndex].comment_photo">
              <div class="cpimgItem">
                <img ref="xsTuPian" class="pltupian" v-for="(cpItem,cpIndex) in commentList[comhlIndex].comment_photo.split(',')"
                :key="cpIndex" :src="cpItem" alt=""/>
              </div>
            </div>
            <!-- 下 -->
            <div class="xia">
              {{ commentList[comhlIndex].com_detail }}
            </div>
          </div>
        </div>
         
      
      </div>

     
    </div>
  </div>
</template>
<script>
import {GetCommentUid,GetHouseHid} from 'network/comment'
export default {
  name: "mycomment",
  data () {
    return {
      uid:"",
      comhouseList:[],//房源列表
      commentList:[],//评论列表
    };
  },
  created() {
    this.uid = this.$store.state.userList.uid
    this._GetCommentUid(this.uid)
  },
  methods: {
    // 跳转到详情页
    todetailClickComm(hid){
      this.$router.push("/detail?hid="+hid);
    },
    _GetCommentUid(uid){
      GetCommentUid(uid).then(res=>{
        this.commentList = res.data
        res.data.map(item=>{
          //按房源id请求房源
          GetHouseHid(item.hid).then(fyhid=>
          {
            this.comhouseList.push(...fyhid.data)
            // console.log(fyhid)
          })
        })
        console.log(this.comhouseList)
        
      })
    }
  },
}
</script>
<style scoped>
.zwc{
      margin-bottom: 40px;
    border-bottom: 1px solid #cfcdcd;
    padding-bottom: 40px;
    margin-top: 40px;
    cursor: pointer;
}
.tpzwc{
      margin-top: 20px;
}
.spxx{
    display: flex;
    /* margin-bottom: 40px; */
    /* border-bottom: 1px solid #cfcdcd;
    padding-bottom: 40px;
    margin-top: 40px; */
}
.tpdiv{
      width: 150px;
    height: 150px;
    /* border: 1px solid; */
    border-radius: 4px;
    /* margin-left: 20px; */
    margin-right: 20px;
}
.xtks{
font-size: 13px;
    margin-right: 10px;
    color: #6c757d; 
}
.rightnr{
      height: 150px;
    display: flex;
    flex-direction: column;
    padding: 5px;
}
.xtdeyuansu{
  margin-bottom: 10px;
  font-size: 13px;
}
.bubian{
  padding: 2px;
    border-radius: 4px;
    padding: 0 5px 0 5px;
    margin-right: 10px;
    display: inline-block;
    color: white;
}
.tag1{
    background-color: #007bff;
}
.tag2{
    background-color: #ffc107;
}
.tag3{
    background-color: #fd7e14;
}
.tag4{
    background-color: #20c997;
}
.bq1{
  background-color: #6c757d;
}
.bq2{
  background-color: #28a745;
}
.bq3{
  background-color: #17a2b8;
}
.bq4{
  background-color: #007bff;
}
.bq5{
  background-color:#17a2b8;
}
.bq6{
  background-color: #ffc107;
}
.bq7{
  background-color: #dc3545;
}


.cpimgItem{
  display: flex;
    flex-wrap: wrap;
    margin-top: 10px;
}
.pltupian{
      width: 7%;
    margin-right: 10px;
    border-radius: 4px;
}
.xia {
  margin-top: 20px;
  font-size: 14px;
}
</style>