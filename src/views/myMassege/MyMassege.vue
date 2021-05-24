<template>
  <div>
    <div class="sidebar">
      <div class="hhhss">
        <!-- 头像用户名 -->
        <div class="myname">

          <img class="myimg" v-if="$store.state.userList.user_photo!=''"
           :src="$store.state.userList.user_photo" alt="" />
          <img class="myimg" v-else 
          src="../../assets/img/pointOut/mytp.png" alt="" />
          <div class="mymz">{{$store.state.userList.user_name}}</div>
        </div>
        <div class="m-list">
          <!-- <div v-if="userList.length>0"> -->
            <!-- 自己添加的用户 -->
            <div class="youname" v-for="(useritem,userindex) in userList"
            :key="new Date().getTime()+userindex+new Date().getTime()" :class="acindex===userindex?'mylistactive':''"
            @click="listClick(userindex,useritem.user_name,useritem.uid,useritem.user_photo)">
              <!-- <div v-for="(childItem,childindex) in useritem" :key="childindex"> -->
                <img
                  class="myimg"
                  :src="useritem.user_photo"
                  alt=""
                />
                <div class="mymz">{{useritem.user_name}}</div>
              <!-- </div> -->
            </div>
          <!-- </div> -->
          <!-- <div v-else> -->
            <!-- 别人发消息过来的用户 -->
            <div class="youname" v-for="(senditem,sendindex) in sendChatList"
            :key="new Date().getTime()+sendindex" :class="sendacindex===sendindex?'mylistactive':''"
            @click="sendClick(sendindex,senditem.user_name,senditem.uid,senditem.user_photo)">
              <!-- <div v-for="(childItem,childindex) in useritem" :key="childindex"> -->
                <img
                  class="myimg"
                  :src="senditem.user_photo"
                  alt=""
                />
                <div class="mymz">{{senditem.user_name}}</div>
              <!-- </div> -->
            </div>
          <!-- </div> -->

          
        </div>
      </div>

      <div class="main">
        <div class="m-top">
          <!-- 用户名 -->
          <div class="yonghum">
            {{usertitle||sendusertitle}}
          </div>
          <!-- 内容记录 -->
          <div class="yinc" :class="(userId||senduserId)!=''? 'showtexttarea':''">
            <!-- 别人的信息 -->
            <div v-for="(receiverListItem,receiverListIndex) in receiverList"
            :key="new Date().getTime()+receiverListIndex">
              <div v-if="receiverList[receiverListIndex].user_name==usertitle">   
                <div v-for="(msgItem,msgIndex) in receiverListItem.message"
                :key="msgIndex+new Date().getTime()+new Date().getTime()+new Date().getTime()">
                  <!-- 时间 -->
                  <div  class='chattime'>{{msgItem.time}}</div>
                  <!-- 内容 -->
                  <div class="ltneirong">
                    <!-- <img class="lttouxiang" src="../../assets/img/pointOut/mytp.png" alt=""> -->
                    <img class="lttouxiang" :src="(photoredn||sendphotoredn)" alt="">

                    <div class="ltnrys">{{msgItem.data}}</div>
                  </div>
                </div>
              </div>
              <div v-if="receiverList[receiverListIndex].user_name==sendusertitle">   
                <div v-for="(msgItem,msgIndex) in receiverListItem.message"
                :key="msgIndex+new Date().getTime()+new Date().getTime()+new Date().getTime()">
                  <!-- 时间 -->
                  <div  class='chattime'>{{msgItem.time}}</div>
                  <!-- 内容 -->
                  <div class="ltneirong">
                    <!-- <img class="lttouxiang" src="../../assets/img/pointOut/mytp.png" alt=""> -->
                    <img class="lttouxiang" :src="(photoredn||sendphotoredn)" alt="">

                    <div class="ltnrys">{{msgItem.data}}</div>
                  </div>
                </div>
              </div>
            </div>
            <!-- 自己的信息-->
            <div  v-for="(showChatItem,showChatIndex) in showChat"
              :key="new Date().getTime()+new Date().getTime()+showChatIndex">
              <div v-for="(msgItem,msgIndex) in showChatItem.messages"
              :key="msgIndex+new Date().getTime()+new Date().getTime()">
                <div v-if="showChatItem.user_name==usertitle">
                  <!-- 时间 -->
                  <div class='chattime'>{{msgItem.time}}</div>
                  <!-- 内容 -->
                  <div class="ltneirong rightys">
                    <div class="ltnrys zjltjl">{{msgItem.data}}</div>
                    <img class="lttouxiang" :src="$store.state.userList.user_photo" alt=""> 
                  </div>
                </div>
                <div v-if="(showChatItem.user_name==sendusertitle)">
                  <!-- 时间 -->
                  <div class='chattime'>{{msgItem.time}}</div>
                  <!-- 内容 -->
                  <div class="ltneirong rightys">
                    <div class="ltnrys zjltjl">{{msgItem.data}}</div>
                    <img class="lttouxiang" :src="$store.state.userList.user_photo" alt=""> 
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div class="m-bto" :class="(userId||senduserId)!=''? 'showtexttarea':''">
          <textarea class="shuru" type="text" name="" id="" v-model="msg">
            
          </textarea>
          <div class="fs" :class="msg!=''?'fsshow':''" @click="fasongCilcik">发送</div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  name: "mymassege",
  data() {
    return {
      acindex:"",
      usertitle:'',
      photoredn:'',
      msg:"",//当前输入的聊天内容
      userId:'',//当前聊天用户id
      sendacindex:"",
      sendusertitle:'',
      sendphotoredn:'',
      senduserId:'',
      sessionList:{
        messages:[{
          data:'',
          time:''
        }],
        sender:"",
        id:''
      },
      
    };
  },
  computed:{
    //用户列表
    userList(){
      return this.$store.state.userChat
    },
    sendChatList(){
      return this.$store.state.sendChat
    },
    //聊天记录列表
    //显示自己发的信息
    showChat(){
      return this.$store.state.recordChat
    },
    // 显示别人发的信息
    receiverList(){
      return this.$store.state.receiverChat
    }
  },
  created() {
    this.sockets.subscribe("sendMsgOn",data=>{
      //如果不存在就添加到vuex中
      console.log("data的值",data)
      // for(let i=0;i<data.length;i++)
      // {
      //   //this.sendChatList有值的情况
        if(this.sendChatList.length>0)
        {
          //比较this.sendChatList里面的值和参数传过来的值是否相等
          //找出发消息的人
          const filltt = this.sendChatList.map(item=>{
            return item.user_name
          })
          const fffgrger = filltt.indexOf(data[0].sender.user_name)
          console.log("data的值",data)
          console.log("filltt的值",filltt)
          console.log("fffgrger的值",fffgrger)
          //this.userChat有值的情况，判断this.userChat中的用户有没有和传过来的用户相同
          if(this.userList.length>0)
          {
            const swrty = this.userList.map(rest=>{
              return rest.user_name
            })
            const treik = swrty.indexOf(data[0].sender.user_name)
            //如果找到了相同的用户，就不添加到this.sendChat中
            if(treik!=-1){
              //有相同的用户就只添加messages的一条记录
              this.$store.commit("receiverChatStore",
              {
                news:data[0].messages[data[0].messages.length-1],
                user_name:data[0].sender.user_name,
                morenzhi:'mrz'
              })
              console.log("this.userChat有值，传过来的用户和this.userChat用户相同")
              // break
            }
            else{
              this.$store.commit("receiverChatStore",
              {
                news:data[0].messages[data[0].messages.length-1],
                user_name:data[0].sender.user_name,
                morenzhi:'mrz'
              })
              console.log("this.userChat有值，传过来的用户没有this.userChat用户相同")
            }
          }else{
            //找到了相同的用户
            if(fffgrger!=-1)
            {
              //如果同个用户分别给两个不同的用户发消息，data是一个数组，这时你要找出是给哪个用户发消息
              if(data.length>1)
              {
                const lakd = data.map(letItem=>{
                  return letItem.user_name
                })
                const lalall = lakd.indexOf(this.$store.state.userList.user_name)
                console.log("lakd的值",lakd)
                console.log("lalall的值",lalall)
                //找到
                if(this.sendChatList[lalall].user_name==data[0].sender.user_name&&
                lalall!=-1)
                {
                  //记录可能是一条，也可能是多条，如果是多条，每一次添加就获取最后的一条
                  if(data[fffgrger].messages.length>1)
                  {
                    this.$store.commit("receiverChatStore",
                    {
                      news:data[fffgrger].messages[data[fffgrger].messages.length-1],
                      user_name:data[fffgrger].sender.user_name,
                      morenzhi:fffgrger
                    })
                  }
                  // else{
                  //   this.$store.commit("receiverChatStore",
                  //   {
                  //     news:data[fffgrger].messages[0],
                  //     morenzhi:fffgrger
                  //   })
                  // }
                  
                  console.log("在同个用户添加messages",data[lalall].messages.length)
                  // break
                }
              }else{
                this.$store.commit("receiverChatStore",
                {
                  news:data[0].messages[data[0].messages.length-1],
                  user_name:data[0].sender.user_name,
                  morenzhi:"mrz"
                })
                console.log("data长度等于1")
              }
              console.log("直接添加")
            }else{
              //重新在this.receiverChat添加一条新的，而且要也在this.sendChat添加一挑衅的
              //再判断this.userChat是否有值
              this.$store.commit("receiverChatStore",
              {
                news:data[0].messages[0],
                user_name:data[0].sender.user_name,
                morenzhi:"cxtj"
              })
              this.$store.commit("sendChatStore",data[0].sender)
              console.log("在this.receiverChat添加一条新的记录")
              // break
            }
          }
          
        }
        //没有值的情况，当传过来的参数有当前用户的用户，就添加到vuex
        else{
           const fig = data.map(item=>{
              return item.user_name
            })
            const xb = fig.indexOf(this.$store.state.userList.user_name)
          //判断this.userList是否有发消息过来的人，
          if(this.userList.length>0){
            const vvvv = this.userList.map(rritemss=>{
              return rritemss.user_name//张三
            })
            const ffffff = vvvv.indexOf(data[0].sender.user_name)//张利123123
            if(ffffff!=-1)
            {
              //如果data中的messages的长度大于1，就添加最后的一条
              if(data[0].messages.length>1){
                this.$store.commit("receiverChatStore",
                {
                  news:data[xb].messages[data[0].messages.length-1],
                  user_name:data[xb].sender.user_name,
                  morenzhi:data[0].messages.length-1
                })
                console.log("this.userList有相同的用户，并且data中的messages长度大于1，就不添加到sendChat，只添加到messages一条记录")
                // break
              }else{
                this.$store.commit("receiverChatStore",
                {
                  news:data[0].messages[0],
                  user_name:data[0].sender.user_name,
                  morenzhi:'mrz'
                })
                console.log("this.userList有相同的用户，并且data中的messages长度等于1，就不添加到sendChat，只添加到messages一条记录")
                // break
              }
            }else{
              this.$store.commit("sendChatStore",data[0].sender)
              this.$store.commit("receiverChatStore",
              {
                news:data[0].messages[0],
                user_name:data[0].sender.user_name,
                morenzhi:'mrz'
              })
              console.log("this.userList有值，但没有相同的用户，直接添加")
              // break
            }
          }else{
            // if(xb!=-1){
              this.$store.commit("sendChatStore",data[xb].sender)
              this.$store.commit("receiverChatStore",
              {
                news:data[0].messages[0],
                user_name:data[0].sender.user_name,
                morenzhi:'mrz'
              })
              console.log("第一次添加记录")
              // break
            // }
          }
          // 如果有，就不用再添加到用户列表
        
        }
      // }
    })
    
  },
  mounted() {
    
    this.sockets.subscribe("ces",data=>{
      // console.log(data)
    })
    //接收聊天记录
    this.sockets.subscribe("chatMsgOn",data=>{
      console.log(data)
      //判断是不是当前用户发的
      const ewrt = data.map(rrew=>{
        return rrew.sender.user_name
      })
      const numttt = ewrt.indexOf(this.$store.state.userList.user_name)
      if(numttt!=-1)
      {
        this.$store.commit("recordChatStore",data[numttt])
      }else{
        this.$store.commit("recordChatStore",data[0])
      }
      // console.log(numttt)
    })
  },
  methods: {
    //列表点击
    listClick(e,i,g,p){
      this.acindex = e
      this.usertitle = i
      this.userId = g
      this.photoredn = p
      this.sendacindex = ''
      this.sendusertitle = ''
      this.sendphotoredn = ''
    },
    sendClick(e,i,g,p){
      this.sendacindex = e
      this.sendusertitle = i
      this.senduserId = g
      this.sendphotoredn = p
      this.acindex = ''
      this.usertitle = ""
      this.photoredn = ""
    },
    // 发送按钮
    fasongCilcik(){
      // 当是同个用户
      // if(){
        //输入框不为空
        if(this.msg){
          this.sessionList.messages.map(res=>{
            {
              res.data = this.msg
              res.time = new Date().toLocaleTimeString()
            }           
          })
           this.sessionList.id = (this.userId||this.senduserId)
          this.sessionList.user_name = (this.usertitle||this.sendusertitle)
          this.sessionList.sender = this.$store.state.userList
          //发送聊天记录
          this.$socket.emit("chatMsgEmit",this.sessionList)
          // this.sockets.subscribe("receiveChat",data=>{
          //   console.log("接收人",data)
          // })
          
          this.msg=''
        //   this.sessionList = this.userId
        }else{
          alert("输入不能为空")
        }
        
      // }
      
      // console.log(this.sessionList)
    },
  },
};
</script>
<style scoped>
.sidebar {
  width: 900px;
  /* border: 1px solid; */
  margin: auto;
  display: flex;
}
.hhhss {
  height: 100vh;
  background: #2e3238;
  width: 20%;
  border-radius: 4px 0 0 4px;
  overflow: hidden;
  min-height: 520px;
  /* overflow-y: scroll; */
}
/* 用户名 */
.yonghum{
      font-size: 16px;
    text-align: center;
    margin-top: 20px;
    margin-bottom: 30px;
    /* position: fixed; */
    background: #eeeeee;
    /* width: 720px; */
    height: 44px;
    line-height: 44px;
    /* top: 40px; */
    z-index: 1000;
}
.myname {
  display: flex;
  height: 100px;
  /* border: 1px solid; */
  width: 100%;
  /* background: aliceblue; */

  border-bottom: 1px solid #24272c;
  /* background-color: #2e3238; */
  color: white;
  align-items: center;
}
.mylistactive{
  background-color: hsla(0,0%,100%,.1);
}
.myimg {
  width: 30px;
  height: 30px;
  border-radius: 4px;
  margin-left: 20px;
}
.mymz {
  font-size: 14px;
  margin-left: 12px;
  height: 30px;
  line-height: 30px;
}
.youname {
  display: flex;
  color: white;
  padding: 9pt 0;
  border-bottom: 1px solid #292c33;
  cursor: pointer;
  -webkit-transition: background-color 0.1s;
  transition: background-color 0.1s;
}
.youname:active {
  background-color: hsla(0, 0%, 100%, 0.1);
}

/* 左边
 */
.main {
  width: 80%;
  height: 100vh;
  min-height: 500px;
  background-color: #eee;
}
.m-top {
  height: 70vh;
  overflow-y: scroll;
  min-height: 70%;
}
/* 聊天记录样式 */
.yinc{
  display: none;
}
.chattime{
  font-size: 12px;
    color: #878686;
    text-align: center;
}
.ltneirong{
  display: flex;
    width: 90%;
    margin-left: 20px;
    margin-top: 15px
}
.lttouxiang{
  height: 30px;
    width: 30px;
    border-radius: 4px;
}
.rightys{
  justify-content: flex-end;
    margin-left: 55px;
}
.ltnrys{
      display: inline-block;
    position: relative;
    padding: 0 10px;
    max-width: calc(100% - 40px);
    min-height: 30px;
    line-height: 2.5;
    font-size: 10pt;
    text-align: left;
    word-break: break-all;
    background-color: #fafafa;
    border-radius: 4px;
    margin-left: 15px;
    margin-bottom: 15px;
}
.zjltjl{
  background-color: #b2e281;
  margin-right: 15px;
}
.zjltjl::before{
    right: inherit !important;
    left: 100% !important;
    border-right-color: transparent !important;
    border-left-color: #b2e281 !important;
}
.ltnrys::before{
  content: " ";
    position: absolute;
    top: 9px;
    right: 100%;
    border: 6px solid transparent;
    border-right-color: #fafafa;
}

.m-bto {
  height: 30vh;
  min-height: 30%;
  background-color: white;
  border-bottom: 1px solid #eee;
  border-right: 1px solid #eee;
  display: none;
  margin-top: 20px;
}
.showtexttarea{
  display: block;
}
.shuru {
  caret-color: black;
  /* text-indent: 30px; */
  height: 100%;
  width: 95%;
  border: none;
  outline: 0;
  font-family: Micrsofot Yahei;
  resize: none;
  margin-left: 10px;
}
.fs{
  width: 75px;
  height: 35px;
  border: 1px solid;
  font-size: 14px;
  line-height: 33px;
  text-align: center;
  border-radius: 4px;
  background: #908c8c;
  color: white;
  position: relative;
  left: 626px;
  top: -54px;
  cursor: pointer;
  display: none;
}
.fsshow:hover{
  background-color: rgb(18, 128, 18);
}
.fsshow{
  display: block;
}

</style>
