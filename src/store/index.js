import Vue from 'vue'
import Vuex from 'vuex'
import persistedstate from "vuex-persistedstate"
Vue.use(Vuex)
const store = new Vuex.Store({
  // plugins: [persistedstate()],
  
  state: {
    overall_h_deploy:[
      require("../assets/img/detail/woshi.png"),
      require("../assets/img/detail/chuang.png"),
      require("../assets/img/detail/shenghuo.png"),
      require("../assets/img/detail/ren.png")
    ],
    overall_sanjiaox:require("../assets/img/detail/sanjiaox.png"),
    userList:{
      user_name:"",//用户名
      uid:"",//用户id
      user_photo:"",//用户头像
      user_sex:"",//性别
      user_tel:"",//电话
      user_data:"",//注册时间
      isLandlord:"",//是否注册成为房东，1表示注册成为房东
    },
    //收藏状态
    collectList:{},
    //搜索结果的存放
    gatherList:[],
    //按房源、用户、区域数据存放
    storeSearch:{
      searchResultStore:[],
      searchResultMsgStore:'',//无结果信息
      selectNameType:'',//搜索类型
    },
    //用户收藏状态和未收藏
    shoucqh:[],
    
    //聊天用户列表
    userChat:[],
    sendChat:[],
    // 聊天记录列表
    recordChat:[],//自己发的信息

    receiverChat:[{
      message:[],
      user_name:""
    }]//别人发的信息


  },
  //localStorage存储
  plugins: [
    persistedstate({
      storage:window.sessionStorage,
      reducer(obj) {
        const {gatherList} = obj
        return {gatherList}
      }
    }),
    persistedstate({
      reducer(obj) {
        // const {username,uid,uPhoto,uSex,uTel,uTime,loginLandlord} = obj
        // return {username,uid,uPhoto,uSex,uTel,uTime,loginLandlord}
        const {userList,collectList,userChat,recordChat,sendChat,receiverChat} = obj
        return {userList,collectList,userChat,recordChat,sendChat,receiverChat}
      }
  })],
  mutations: {
    loginList(state,data){
      state.userList.user_name = data.user_name,
      state.userList.uid = data.uid,
      state.userList.user_photo = data.user_photo,
      state.userList.user_sex = data.user_sex,
      state.userList.user_tel = data.user_tel,
      state.userList.user_data = data.user_data,
      state.userList.isLandlord = data.isLandlord
    },
    //收藏状态的列表
    collectList(state,collectData){
      state.collectList = collectData
    },
    //搜索结果缓存
    gatherListMutation(state,gatherItem){
      state.gatherList.push(gatherItem)
    },
    //按房源、用户、区域数据存放
    searchResultStore(state,searchResult){
      state.storeSearch.searchResultStore = searchResult[0]
      state.storeSearch.searchResultMsgStore = searchResult[1]
      state.storeSearch.selectNameType = searchResult[2]
    },
    //用户收藏状态和未收藏
    shoucqhStore(state,d){
      state.shoucqh = d
    },
    //聊天用户列表
    userChatStore(state,data){
      // if(data.length>0){
        state.userChat.push(data)
      // }else{
      //   state.userChat = data
      // }
      
    },
    sendChatStore(state,data){
      // if(data.length>0){
        state.sendChat.push(data)
      // }else{
      //   state.sendChat = data
      // }
     
    },
    //聊天记录列表
    recordChatStore(state,data){
      // if(data.length>0){
        state.recordChat.push(data)
      //   console.log("state",data.length)
      // }else{
      //   state.recordChat = data
      // }
     
    },
    receiverChatStore(state,data){
      if(data.morenzhi=='mrz')
      {
        //判断receiverChat有没有和传过来的用户相同
        if(state.receiverChat.length>0)
        {
          const ss = state.receiverChat.map(item=>{
            return item.user_name==data.user_name
          })
          //如果相同的用户，就在message添加记录
          const dser = ss.indexOf(data.user_name)
          if(dser!=-1)
          {
            
            state.receiverChat[dser].message.push(data.news)
          }
          else{
            const mrzdata = {
              message:[],
              user_name:''
            }
            mrzdata.message.push(data.news)
            mrzdata.user_name = data.user_name
            state.receiverChat.push(mrzdata)
          }
        }else{
          state.receiverChat[0].message.push(data.news),
          state.receiverChat[0].user_name= data.user_name
        }
        
        console.log("默认值")
      }
      else if(data.morenzhi=='cxtj'){
        const newdata = {
          message:[],
          user_name:''
        }
        newdata.message.push(data.news)
        newdata.user_name = data.user_name
        state.receiverChat.push(newdata)
        console.log("cxtj")
       }
      else{
        state.receiverChat=data
      }
      
    }

  },
  actions: {
  },
  modules: {
  }
})
export default store
