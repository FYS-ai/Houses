<template>
<div>
  <!-- 登录状态 -->
  <el-header v-if="usernames!=''">
    <nav class="navbar navbar-expand-lg navbar-light bg-light">
      <a class="navbar-brand" @click="homeClick">首页</a>
      <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
        <span class="navbar-toggler-icon"></span>
      </button>
      <div class="collapse navbar-collapse" id="navbarSupportedContent">
        <ul class="navbar-nav mr-auto">
          <li class="nav-item active">
            <a class="nav-link" @click="collectClick">收藏 <span class="sr-only">(current)</span></a>
          </li>
          <li class="nav-item">
            <a class="nav-link" @click="orderClick">订单中心</a>
          </li>
          <li class="nav-item">
            <a class="nav-link" @click="myMassegeClick">我的消息</a>
          </li>
          <li class="nav-item dropdown">
            <a class="nav-link dropdown-toggle" href="#" id="navbarDropdown" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
              我的
            </a>
            <div class="dropdown-menu" aria-labelledby="navbarDropdown">
              <a class="dropdown-item" @click="gerenzhiliaoClick">个人资料</a>
              <!-- <a class="dropdown-item">账号</a> -->
              <div class="dropdown-divider"></div>
              <a class="dropdown-item" @click="quitlogin">退出</a>
            </div>
          </li>
        </ul>
        <form class="form-inline my-2 my-lg-0 wodeform">
          <input class="form-control mr-sm-2 wodeinput" type="text" @focus="searchFocus"
          @blur="searchBlur" 
          placeholder="输入目的地..." aria-label="Search" v-model="searchtext">
          <!-- 条件选项框 -->
          <div class="input-group-append">
            <select name="" id="" class="wodeselect" v-model="selectName">
              <option value="fy">房源</option>
              <option value="yh">用户</option>
              <option value="qy">区域</option>
            </select>
          </div>
          <button class="btn my-sm-0 wodebut" type="button"
           @click="searchClick">搜索</button>
          <!-- 显示搜索结果 -->
          <div class="sxssjg" :class="isSearch?'isActiveClass':''" v-show="issxssjg">
            <div class="divlists">
              <p class="pjg"  v-for="(gatherItem,gatherIdenx) in gather"
                :key="gatherIdenx" @click="tjdaosrk(gatherIdenx)">{{gatherItem}}</p>
            </div>
          </div>
        </form>

        
      </div>
    </nav>
  </el-header>

  <!-- 未登录状态 -->
  <el-header v-else>
    <nav class="navbar navbar-expand-lg navbar-light bg-light">
      <a class="navbar-brand" @click="homeClick">首页</a>
      <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
        <span class="navbar-toggler-icon"></span>
      </button>
      <div class="collapse navbar-collapse" id="navbarSupportedContent">
        <ul class="navbar-nav mr-auto">
          <li class="nav-item">
            <a class="nav-link" @click="userLoginClick">登录</a>
          </li>
          <li class="nav-item">
            <a class="nav-link" @click="registerClick">注册</a>
          </li>
        </ul>
        <form class="form-inline my-2 my-lg-0 wodeform">
          <input class="form-control mr-sm-2 wodeinput" type="text" @focus="searchFocus"
          @blur="searchBlur" 
          placeholder="输入目的地..." aria-label="Search" v-model="searchtext">
          <!-- 条件选项框 -->
          <div class="input-group-append">
            <select name="" id="" class="wodeselect" v-model="selectName">
              <option value="fy">房源</option>
              <option value="yh">用户</option>
              <option value="qy">区域</option>
            </select>
          </div>
          <button class="btn my-sm-0 wodebut" type="button"
           @click="searchClick">搜索</button>
          <!-- 显示搜索结果 -->
          <div class="sxssjg" :class="isSearch?'isActiveClass':''" v-show="issxssjg">
            <div class="divlists">
              <p class="pjg"  v-for="(gatherItem,gatherIdenx) in gather"
                :key="gatherIdenx" @click="tjdaosrk(gatherIdenx)">{{gatherItem}}</p>
            </div>
          </div>
        </form>
      </div>
    </nav>
  </el-header> 
</div>
</template>
<script>
import {GetSearchHouse} from 'network/house.js'
export default {
  name: "Navbar",
  data () {
    return {
      searchtext:"",//输入框的值
      isSearch:"",//是否显示搜索结果
      gather:[],//收集搜索过的结果数组
      issxssjg:true,
      selectName:"fy",//选项框
      searchResult:[],//搜索列表
      searchResultMsg:'',//查询错误信息
    };
  },
  props:{
    usernames:{
      type:String
    },
    path:{
      type:String
    }
  },
  created() {
     this.listenerFunction();
  },
  beforeDestroy () {
      document.removeEventListener("scroll", this.listenerFunction);
  },
  mounted() {
    if(sessionStorage.getItem('vuex')){
      if(JSON.parse(sessionStorage.getItem('vuex')).gatherList)
      {
        this.gather = JSON.parse(sessionStorage.getItem('vuex')).gatherList
      }
    }else{
      this.gather = this.$store.state.gatherList
    }

  },
  methods: {
    // 我的消息
    myMassegeClick(){
      this.$router.push("/mymassege")
    },
    //搜索请求
    _GetSearchHouse(type,typeName)
    {
      GetSearchHouse(type,typeName).then(res=>
      {
        if(res.code==200&&res.data)
        {
          this.searchResultMsg = '查询到以下结果。。。'
          this.$store.commit("searchResultStore",[res.data,this.searchResultMsg,this.selectName])
        }
        if(res.code==400&&res.msg=='搜索失败，请重新操作！')
        {
          this.searchResultMsg = '暂无该数据。。。'
          this.$store.commit("searchResultStore",[res.data,this.searchResultMsg,this.selectName])
        }
      })
    },
    //隐藏搜索列表
    listenerFunction(e) {
        document.addEventListener('scroll', this.handleScroll, true);
    },
    handleScroll () {
      //隐藏搜索记录的显示框
      if(window.pageYOffset>80){
        this.issxssjg = false
      }
      if(window.pageYOffset<70)
      {
        this.issxssjg = true
      }
        // console.log(window.pageYOffset)
    },
    // 添加到输入框
    tjdaosrk(e){
      this.searchtext=this.gather[e]
    },
    // 获取焦点
    searchFocus(){
      if(this.gather.length>0){
        this.isSearch = true        
      } 
    },
    // 失去焦点
    searchBlur(){
      let timeers = setInterval(()=>{
        this.isSearch = false
        clearInterval(timeers)
      },500)
      
    },
    // 搜索按钮
    searchClick(){
      if(this.searchtext){
        //搜索过的结果存到数组中
        let ret= JSON.parse(sessionStorage.getItem('vuex')).gatherList
        //如果ret长度大于0，
        // 那么就对比数组中有没有输入框的值，
        // 有就不添加到数组中，
        // 没有就添加到数组中
        if(ret.length>0)
        {
          let falg = ret.map(item=>{
            return item!=this.searchtext
          })
          //使用forearm，结束用break会报错，return也不会跳出整个循环
          for(let i=0;i<falg.length;i++)
          {
            if(falg[i])
            {
              this.$store.commit("gatherListMutation",this.searchtext)
              this.gather = JSON.parse(sessionStorage.getItem('vuex')).gatherList
              break
            }else
            {
              this.gather = JSON.parse(sessionStorage.getItem('vuex')).gatherList
              break
            }
          }
        }
        else
        {
          this.$store.commit("gatherListMutation",this.searchtext)
          this.gather = JSON.parse(sessionStorage.getItem('vuex')).gatherList
        
        } 
        this._GetSearchHouse(this.selectName,this.searchtext)
         const loading = this.$loading({
            lock: true,
            text: "加载中",
            spinner: "el-icon-loading",
            background: "rgba(0, 0, 0, 0.7)",
          });
          setTimeout(() => {
            loading.close();
            this.$router.push("/searchteplem")
          }, 2000);
        
      }
    },
    
    //首页
    homeClick(){
      this.$router.push("/home");
      console.log(this.usernames)
    },
    //登录
    userLoginClick(){
      this.$router.push("/userlogin")

    },

    //注册
    registerClick(){
      this.$router.push("/register")
    },
    collectClick(){
      this.$router.push("/collect")
    },
    //订单
    orderClick(){
      // console.log("---")
      this.$router.push("/order")
    },
    // 个人资料
    gerenzhiliaoClick(){
      this.$router.push('/pinformation')
    },

    // 退出登录
    quitlogin(){
      //删除本地长期缓存的用户名
      let tuichuUserList = {
        user_name:"",
        uid:"",
        user_photo:"",
        user_sex:"",
        user_tel:"",
        user_data:"",
        isLandlord:""
      }
      let datacoll = []
      let singOutinit = [
        {
          message:[],
          user_name:''
        }
      ]
      this.$store.commit("loginList",tuichuUserList)
      this.$store.commit("collectList",datacoll)
      // this.$store.commit("userChatStore",[])
      // this.$store.commit("sendChatStore",[])
      // this.$store.commit("recordChatStore",[])
      // this.$store.commit("receiverChatStore",singOutinit)
      // localStorage.removeItem("loginList")
      const loading = this.$loading({
          lock: true,
          text: "Loading",
          spinner: "el-icon-loading",
          background: "rgba(0, 0, 0, 0.7)",
        });
        setTimeout(() => {
          loading.close();
          //退出登录，在线改为离线
          this.$socket.emit("signOut",this.$store.state.userList.user_name)
          this.$router.go(0)
          //如果是订单页面点击退出那么就跳转到home页面，如果是home页面点击就刷新当前页
          // if(this.$route.path=="/order"&&this.$store.state.username==''){
          //   // console.log("当前路由order")
          //   this.$router.push("/home");
          // }else{
          //   // console.log("跳转了go")
          //   this.$router.go(0)
          // }
        }, 2000);
        
    }
  },
}
</script>
<style scoped>
.sxssjg{
  position: fixed;
  /* border: 1px solid; */
  width: 273px;
  top: 51px;
  height:200px;
  /* left: 15px; */
  z-index: 1000;
  background: white;
  display: none;
  border-radius: 4px;
  overflow: scroll;
  scrollbar-face-color:#fff;/*滑块颜色*/ 
  scrollbar-arrow-color:#000; /*箭头颜色*/
  scrollbar-shadow-color:#000000; /*滑块边线颜色*/
  scrollbar-track-color:#dde3fa;
}
.divlists{
  display: flex;
  flex-direction: column;
  /* margin-left: 10px; */
  padding-top: 18px;
  font-size: 14px;
}
.isActiveClass{
  display: block;
}
.pjg{
  height: 30px;
  line-height: 30px;
  padding-left: 10px;
  cursor: pointer;
}
.pjg:hover{
  background: darkgrey;
}
.wodeform{
  border-radius: 5px;
    border: 1px solid #ced4da;
    background: white;
}
.wodeinput{
  border: none;
  font-size: 14px;
  width: 250px;
  /* width: 250px; */
    outline: none;
    box-shadow: none;
}
.wodeinput:focus{
  border: none;
}
.wodeselect{
  width: 65px;
  height: 38px;
  border: 1px solid #ced4da;
  cursor: pointer;
  border: none;
  color: #6c757d;
  background: white;
  font-size: 14px;
  outline: none;
}
.wodeselect:focus{
  border: none;
}
.wodebut{
  font-size: 13px;
  border: none;
  color: #848281;
  height: 38px;
  /* background: #f8f9fa; */
  outline: none;
    
}
.wodebut:hover{
  background-color: #f8f9fa;
  /* color:white; */
  border-radius: 0 4px 4px 0;
}
.wodebut:active{
  border:none;
  background-color: #f8f9fa;
}
.btn:focus,
.btn:active:focus,
.btn.active:focus,
.btn.focus,
.btn:active.focus,
.btn.active.focus {
    outline: none;    
    box-shadow:none
}
</style>