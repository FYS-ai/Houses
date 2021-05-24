<template class="temp">
<div class="myLogin">
  <div class="tp d1">
    <img :src="loginleft" alt="">
  </div>
  <div class="tp d2">
    <img :src="loginleft" alt="">
  </div>
  <div class="tp d3">
    <img :src="loginleft" alt="">
  </div>
  <div class="tp d4">
    <img :src="loginleft" alt="">
  </div>
  <div class="tp d5">
    <img :src="loginleft" alt="">
  </div>
  <div class="tp d6">
    <img :src="loginleft" alt="">
  </div>
  <div class="tp d7">
    <img :src="loginleft" alt="">
  </div>
  <div class="tp d8">
    <img :src="loginleft" alt="">
  </div>
  <div class="tp d9">
    <img :src="loginleft" alt="">
  </div>
  <div class="tp d10">
    <img :src="loginleft" alt="">
  </div>
   <div class="tp d11">
    <img :src="loginleft" alt="">
  </div>
   <div class="tp d12">
    <img :src="loginleft" alt="">
  </div>
   <div class="tp d13">
    <img :src="loginleft" alt="">
  </div>
   <div class="tp d14">
    <img :src="loginleft" alt="">
  </div>
  <form action="" class="formUser">
    <legend class="yhdl">用户注册</legend>
    <p class="zhuceP" @click="yyzhdl"><span>已有账号</span><span>登录</span></p>
    <label for="" class="zlabel">用户名</label>
    <input class="zinput" type="text" name="user_name" id=""
    v-model="user_name" @blur="userNameBlurClick"
    @focus="userNameFocusClick"/><br/>
    <p class="msgp" :class="isuserActive ? '':'msgpActive'">
     {{name_msg}}</p>

    <!-- 密码 -->
    <label for="" class="zlabel">密码</label>
    <input class="zinput" type="password" name="" id=""
      v-model="user_pwd" @blur="userPwdBlurClick"
      @focus="userPwdFocusClick"/><br/>
    <p class="msgp" :class="ispwdActive ? '':'msgpActive'">
      {{pwd_msg}}</p>

    <!-- 确认密码 -->
    <label for="" class="zlabel">确认密码</label>
    <input class="zinput" type="password" name="" id=""
    v-model="user_pwd_two" @blur="userPwdTowBlurClick"
    @focus="userPwdToFocusClick"/><br/>
    <p class="msgp" :class="isuserpwdtwo ? '':'msgpActive'">密码不一致</p>


    <!-- 联系电话 -->
    <label for="" class="zlabel">联系电话</label>
    <input class="zinput" type="text" name="" id=""
    v-model="user_tel" @blur="usertelBlurClick"
    @focus="userTelFocusClick"/><br/>
    <p class="msgp" :class="isusertelActive ? '':'msgpActive'">{{tel_msg}}</p>

    <!-- 性别 -->
     <!-- <label for="" class="zlabel">性别</label> -->
     <div style="margin-bottom: 20px;">
       <span class="nan">性别</span>
       <span class="nan">
         <input type="radio" name="sex" value="男" v-model="user_sex"/>男
       </span>
       <span>
         <input type="radio" name="sex" value="女" v-model="user_sex"/>女
       </span>
     </div>
    <div class="myanniu">
      <div class="zbutton" @click="yhzctjClick">提交</div>
      <div class="zbutton chongzhi">重置</div>
    </div>
  </form>
</div>
</template>
<script>
import {AddUser} from "network/register"
export default {
  name: "userlogin",
  data () {
    return {
      loginleft:require("../../assets/img/login/loginleft.png"),
      user_name:"",
      user_pwd:"",
      user_pwd_two:"",
      user_sex:"男",
      user_tel:"",
      user_photo:require("../../assets/img/login/user_photo.png"),
      user_data:new Date().toLocaleDateString(),
      isuserActive:true,//用户名
      ispwdActive:true,//密码
      isuserpwdtwo:true,//确认密码
      isusertelActive:true,//电话
      name_msg:"",
      pwd_msg:"",
      tel_msg:"",
      //提示信息
      nametsxx:["用户名不能为空","用户名长度不能小于4"],
      pwdtsxx:["密码不能为空","密码长度不能小于6","密码不能含有特殊字符"],
      teltsxx:["电话不能为空","联系电话长度为11","联系电话格式不正确"]
    }
  },
  methods: {
    //注册提交按钮
    yhzctjClick()
    {
       //当输入框没有值提示错误信息
       //用户名
      this.youusernaem()
      this.mimayz()//密码
      this.qrmm()//确认密码
      this.telyz()//电话
      //防止重复调用api
      if(this.isuserActive==true&&this.ispwdActive==true
        && this.isuserpwdtwo==true&&this.isusertelActive==true){
        this._AddUser()
      }
      

    },
    // 用户名
    youusernaem(){
      if(this.user_name==""){
        this.isuserActive = false
        this.name_msg = this.nametsxx[0]
      }
      if(this.user_name.length<4 && this.user_name!=""){
        this.isuserActive = false
        this.name_msg = this.nametsxx[1]
      }
      if(this.user_name.length>4){
        this.isuserActive = true
      }
    },
    //密码验证
    mimayz(){
      // 密码
      if(this.user_pwd==""){
        this.ispwdActive = false
        this.pwd_msg = this.pwdtsxx[0]
      }
      if(this.user_pwd.length<6 && this.user_pwd!=""){
        this.ispwdActive = false
        this.pwd_msg = this.pwdtsxx[1]
      }
      if(!((/^(?=[0-9a-zA-Z@_.]+$)/).test(this.user_pwd))){
        this.ispwdActive = false
        this.pwd_msg = this.pwdtsxx[2]
        // console.log(this.user_pwd!="/^(?=[0-9a-zA-Z@_.]+$)/")
      }
      if(((/^(?=[0-9a-zA-Z@_.]+$)/).test(this.user_pwd))&&this.user_pwd.length>6){
        this.ispwdActive = true
      }
    },
    qrmm(){
      if(this.user_pwd_two==""||this.user_pwd_two!=this.user_pwd){
        this.isuserpwdtwo = false
        // console.log("密码不一致")
      }
      if(this.user_pwd_two == this.user_pwd){
        this.isuserpwdtwo = true
        // console.log("密码一致")
      }
    },
    //电话验证
    telyz(){
      if(this.user_tel==""){
        this.isusertelActive = false
        this.tel_msg = this.teltsxx[0]
      }
      if(this.user_tel.length<11&&this.user_tel!=""){
        this.isusertelActive = false
        this.tel_msg = this.teltsxx[1]
      }
      if(!(/^1[3456789]\d{9}$/.test(this.user_tel))&&this.user_tel!=""){
        this.isusertelActive = false
        this.tel_msg = this.teltsxx[2]
      }
      if((/^1[3456789]\d{9}$/.test(this.user_tel))&&this.user_tel.length==11){
        this.isusertelActive = true
      }
    },
    // 用户名失去焦点
    userNameBlurClick()
    {
      this.youusernaem()
    },
    // 密码失去焦点
    userPwdBlurClick(){
      this.mimayz()
    },
    // 确认密码
    userPwdTowBlurClick(){
      this.qrmm()
    },
    // 电话
    usertelBlurClick(){
      this.telyz()
    },
    // 获取焦点
    userNameFocusClick(){
      this.isuserActive = true
    },
    userPwdFocusClick(){
      this.ispwdActive = true
      
    },
    userPwdToFocusClick(){
      this.isuserpwdtwo = true
    },
    userTelFocusClick(){
      this.isusertelActive = true
    },

    //提交事件
    _AddUser(){
      AddUser(this.user_name,this.user_pwd,
          this.user_sex,this.user_tel,this.user_data)
      .then(res=>{
        if (res.code == 200) {
          const loading = this.$loading({
            lock: true,
            text: "Loading",
            spinner: "el-icon-loading",
            background: "rgba(0, 0, 0, 0.7)",
          });
          setTimeout(() => {
            loading.close();
            this.$router.push("/userlogin");
          }, 2000);
        }
        if(res.code == 400&& res.data==''){
          alert(res.msg)
        }
        // console.log(res)
      })
    },

    //已有账号登录事件
    yyzhdl(){
      this.$router.push("/userlogin")
    }
  }
}
</script>
<style scoped>

.myLogin{
  width: 1140px;
  /* border: 1px solid; */
  margin: auto;
  margin-top: 30px;
  margin-bottom: 30px;
  display: flex;
}
.formUser{
     width: 40%;
    border: 1px solid white;
    margin-left: auto;
    padding: 40px;
    background: white;
    border-radius: 4px;
    display: flex;
    flex-direction: column;
}
.yhdl{
      text-align: center;
    font-size: 20px;
}
.zhuceP{
      text-align: right;
    font-size: 14px;
    color: gray;
    cursor: pointer;
}
.zlabel{
      font-size: 14px;
}
.zinput{
  height: 35px;
    border-radius: 11px;
    /* color: white; */
    border: 1px solid black;
}
.myanniu{
  display: flex;
    justify-content: space-around;
}
.zbutton{
  color: white;
  border: 1px solid rgb(0, 117, 255);
  background-color: rgb(0,117,225);
  height: 34px;
  width: 80px;
  border-radius: 4px;
  font-size: 14px;
  text-align: center;
  line-height: 34px;
  cursor: pointer;
}
.chongzhi{
  background: rgb(222, 225, 230);
  color: black;
  border: 1px solid rgb(222, 225, 230);
}
.wjmm{
      text-align: right;
    margin-top: 23px;
    font-size: 13px;
    color: gray;
}
.nan{
  display: inline-block;
    margin-right: 44px;
}
.msgp{
      font-size: 10px;
    color: red;
    margin-top: -17px;
    margin-left: 6px;
    display: none;
}
.msgpActive{
  display: block;
}
.tp{
  position: relative;
}
.d2{
margin-top: 286px;
}
.d3{
    margin-top: 120px;
}
.d4{
    margin-top: 50px;
}
.d5{
margin-top: 300px;
}
.d6{
    position: absolute;
    margin-left: 636px;
    z-index: -1;
}
.d7{
    position: absolute;
    margin-top: 356px;
    margin-left: 1090px;
    z-index: -1;
}
.d8{
position: absolute;
    margin-left: 484px;
    margin-top: 173px;
}
.d9{
    position: absolute;
    margin-left: 3px;
    margin-top: 173px;
}
.d10{
    position: absolute;
    margin-left: 224px;
    margin-top: 400px;
}
.d11{
    position: absolute;
        margin-top: 554px;
}
.d12{
    position: absolute;
      margin-top: 540px;
    margin-left: 300px;
}
.d13{
    position: absolute;
        margin-top: 690px;
    margin-left: 600px;
}
.d14{
    position: absolute;
    margin-left: 500px;
    margin-top: 458px;
}
</style>