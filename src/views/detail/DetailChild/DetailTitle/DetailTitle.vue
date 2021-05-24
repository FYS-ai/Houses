<template>
<div>
  <!-- 标题 -->
    <div id="biaoti" class="biaoti">
      <div class="cityname">
        <span>{{ detailList.cityname }}</span>
        <span>•{{ detailList.h_room }}</span>
      </div>
      <div class="title">{{ detailList.h_title }}</div>
      <div class="deployf">
        <div
          class="h_deploy"
          v-for="(deployItem, deployIndex) in h_deploy"
          :key="deployIndex"
        >
          <img class="h_deploy_img" :src="h_deploy_img[deployIndex]" alt="" />
          <span>{{ deployItem }}</span>
        </div>
      </div>

      <div class="tag">
        <div class="h_tag" v-for="(tagItem, tagIndex) in h_tag" :key="tagIndex">
          {{ tagItem }}
        </div>
      </div>
    </div>
     <div class="fzjianjie">
      <!-- 房东 -->
      <div class="fd">
        <div class="fd_img"><img :src="userlists.user_photo" alt="" /></div>
        <div>
          <div class="lxfd">
            <div class="fdname">房东：{{userlists.user_name}}</div>
            <!-- <div class="dhlx"> -->
            <el-popover placement="right" width="300" trigger="click">
              <h5 style="font-size: 16px;font-weight: 700;">联系电话</h5>
              <div>{{ userlists.user_tel }}</div>
              <h5 style="font-size: 16px;font-weight: 700;cursor: pointer;"
               @click="shixinClick">私信Ta</h5>
              <el-button class="dhlx" slot="reference">联系房东</el-button>
            </el-popover>

            <!-- </div> -->
          </div>
          <div class="fdbq">
            <span class="spa">118条评论•</span>
            <span class="spa">已验证身份•</span>
            <span class="spa">超赞房东</span>
          </div>
        </div>
      </div>

      <!-- 介绍 -->
      <div class="topsjhd">
        <img class="topsanjiao" :src="sanjiaox" alt="" />
        <div class="housedetail">
          <div class="fzjsxx">{{ detailList.h_detail }}</div>
          <div class="ckgd">
            <el-popover placement="right" width="400" trigger="click">
              <div>
                <h5 style="font-size: 16px;font-weight: 700;">详细介绍</h5>
                <div>{{ detailList.h_detail }}</div>
              </div>
              <el-button class="ckgd" slot="reference">查看更多</el-button>
            </el-popover>
          </div>
        </div>
      </div>
    </div>
</div>
</template>
<script>
import {GetFindUser} from 'network/user'
export default {
  name: "detailtitle",
  data () {
    return {
      userchatList:"",
      userlists:{}
    };
  },
  created() {
    console.log(this.detailList)
    this._GetFindUser()
  },
  props:{
    detailList:{
      type:Object
    },
    h_tag:{
      type:Array
    },
    h_deploy:{
      type:Array
    },
    h_deploy_img:{
      type:Array
    },
    sanjiaox:{
      type:String
    }
  },
  computed:{
    uChatDetail(){
      return this.$store.state.userChat
    },
    detailsendChatList(){
      return this.$store.state.sendChat
    },
  },

  mounted() {
    //添加到发送人的类表中
    this.sockets.subscribe("senderEmit",data=>{
      //不能添加当前用户到自己的聊天列表中
      if(data.user_name==this.$store.state.userList.user_name){
        alert("不能添加自己到列表中")
      }else{
        //如果this.userChat有值
        if(this.uChatDetail.length>0){
          const find = this.uChatDetail.find(item=>{
            return item.user_name==data.user_name
          })
          
          if(find){
            alert("改房东已存在聊天列表")
          }else{  
            if(this.detailsendChatList.length>0){
              const ddee = this.detailsendChatList.find(res=>{
                return res.user_name
              })
              if(ddee){
                alert("改房东已存在聊天列表")
              }
            }else{
              this.$store.commit("userChatStore",data)
              alert("添加成功")
            }
          }
        }else{
          const fftt = this.detailsendChatList.find(ii=>{
            return ii.user_name==data.user_name
          })
          if(fftt){
            alert("改房东已存在聊天列表")
          }else{
            this.$store.commit("userChatStore",data)
            alert("添加成功")
          }
          
        }
        
      }
      
    })
    //离线处理
    this.sockets.subscribe("offline",data=>{
      alert(data)
    })
  },
  methods: {
    _GetFindUser(){
      GetFindUser(this.detailList.uid).then(res=>{
        this.userlists = res.data
        // console.log(res)
    })
    },
    //私信Ta
    shixinClick(){
      //点击私聊Ta
      this.$socket.emit("userchatlist",this.userlists)

    }
  },
}
</script>
<style scoped>
.biaoti {
  width: 1140px;
  margin: auto;
  margin-top: 20px;
}
.cityname {
  color: rgb(155, 49, 67);
  font-size: 14px;
  margin-bottom: 5px;
}
.title {
  width: 50%;
  font-size: 19px;
  font-weight: 900;
  padding-bottom: 20px;
  /* border-bottom: 1px solid #dcd7d7; */
}

.deployf {
  display: flex;
  width: 50%;
  justify-content: space-between;
}
.h_deploy {
  display: flex;
  width: 205px;
  flex-direction: row;
}
.h_deploy_img {
  height: 20px;
  width: 20px;
}
.tag {
  display: flex;
  justify-content: space-between;
  width: 50%;
  margin-top: 11px;
  margin-bottom: 11px;
  padding-bottom: 25px;
  border-bottom: 1px solid #dcd7d7;
}
.tag :nth-child(1) {
  border-radius: 25px;
  padding: 4px;
  font-size: 12px;
  font-weight: bold;
  color: rgb(42, 110, 0);
  background-color: rgb(205 230 189);
}
.tag :nth-child(2) {
  border-radius: 25px;
  padding: 4px;
  font-size: 12px;
  font-weight: bold;
  color: rgb(110, 72, 0);
  background-color: rgb(224 210 185);
}
.tag :nth-child(3) {
  border-radius: 25px;
  padding: 4px;
  font-size: 12px;
  font-weight: bold;
  color: rgb(72, 72, 72);
  background-color: rgb(242 242 242);
}
.tag :nth-child(4) {
  border-radius: 25px;
  padding: 4px;
  font-size: 12px;
  font-weight: bold;
  color: rgb(72, 72, 72);
  background-color: rgb(242 242 242);
}
.tag :nth-child(5) {
  border-radius: 25px;
  padding: 4px;
  font-size: 12px;
  font-weight: bold;
  color: rgb(72, 72, 72);
  background-color: rgb(242 242 242);
}
.tag :nth-child(6) {
  border-radius: 25px;
  padding: 4px;
  font-size: 12px;
  font-weight: bold;
  color: rgb(72, 72, 72);
  background-color: rgb(242 242 242);
}
.tag :nth-child(7) {
  border-radius: 25px;
  padding: 4px;
  font-size: 12px;
  font-weight: bold;
  color: rgb(72, 72, 72);
  background-color: rgb(242 242 242);
}
.fzjianjie {
  width: 1140px;
  margin: auto;
  margin-top: 20px;
  margin-bottom: 10px;
}
.fd {
  display: flex;
  flex-direction: row;
  width: 50%;
}
.fd_img {
  margin-right: 20px;
}
.fd_img img {
  width: 50px;
  height: 50px;
  border-radius: 50%;
  /* border: 1px solid; */
  vertical-align: middle;
}
.lxfd {
  display: flex;
  font-size: 15px;
  font-weight: 700;
}
.fdname {
  margin-right: 15px;
}
.dhlx {
  color: var(--color-text-link, #008489) !important;
  text-decoration: underline;
  border: none;
  padding: 0;
}
.fdbq {
  margin-top: 5px;
}
.spa {
  margin-right: 10px;
  font-size: 14px;
  font-weight: 700;
}

.topsanjiao {
  width: 20px;
  height: 12px;
  position: revert;
  margin-top: -12px;
  margin-left: 14px;
}
.housedetail {
  background-color: #f8f8f8;
  border-radius: 4px;
  position: relative;
  margin-top: -10px;
  height: 103px;
}
.topsjhd {
  width: 50%;
  border-bottom: 1px solid #dcd7d7;
  padding-bottom: 30px;
}
.fzjsxx {
  font-size: 14px;
  font-weight: 500;
  width: 100%;
  height: 44px;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  padding: 20px;
}
.ckgd {
  font-size: 15px;
  font-weight: 700;
  color: rgb(0, 132, 137) !important;
  cursor: pointer;
  border: none;
  background: #f8f8f8;
  margin-top: 2px;
}

</style>