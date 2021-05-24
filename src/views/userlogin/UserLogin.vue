<template class="temp">
  <div class="myLogin">
    <div class="tp d1">
      <img :src="loginleft" alt="" />
    </div>
    <div class="tp d2">
      <img :src="loginleft" alt="" />
    </div>
    <div class="tp d3">
      <img :src="loginleft" alt="" />
    </div>
    <div class="tp d4">
      <img :src="loginleft" alt="" />
    </div>
    <div class="tp d5">
      <img :src="loginleft" alt="" />
    </div>
    <div class="tp d6">
      <img :src="loginleft" alt="" />
    </div>
    <div class="tp d7">
      <img :src="loginleft" alt="" />
    </div>
    <div class="tp d8">
      <img :src="loginleft" alt="" />
    </div>
    <div class="tp d9">
      <img :src="loginleft" alt="" />
    </div>
    <div class="tp d10">
      <img :src="loginleft" alt="" />
    </div>
    <div class="formUser">
      <legend class="yhdl">用户登录</legend>
      <p class="zhuceP" @click="zhucexyh">
        <span>新用户</span><span>注册</span>
      </p>
      <label for="" class="zlabel">用户名</label>
      <input
        class="zinput"
        type="text"
        placeholder="输入用户名"
        @blur="usernameblur"
        @focus="usernamefocus"
        v-model="user_name"
      /><br />
      <p class="msgp" :class="isuserActive ? '' : 'msgpActive'">
        用户名不能为空
      </p>

      <label for="" class="zlabel">密码</label>
      <input
        class="zinput"
        type="password"
        placeholder="输入密码"
        v-model="user_pwd"
        @blur="userpwdblur"
        @focus="userpwdfocus"
      /><br />
      <p class="msgp" :class="ispwdActive ? '' : 'msgpActive'">密码不能为空</p>

      <div class="myanniu">
        <div class="zbutton" @click="submitClick">提交</div>
        <div class="zbutton chongzhi" @click="chongzhiClick">重置</div>
      </div>
      <p class="wjmm" @click="wjmmClick">忘记密码</p>
    </div>
    <!-- 弹出忘记密码框 -->
    <el-dialog title="忘记密码" :visible.sync="dialogFormVisible">
      <forget-pwd @closeForm = "closeFormClick"></forget-pwd>
    </el-dialog>
  </div>
</template>
<script>
import { UserLogin } from "network/user.js";

// import {myLoading} from "components/js/Loading"

import ForgetPwd from '../pInformation/childCpns/forgetPwd/ForgetPwd'
export default {
  name: "userlogin",
  data() {
    return {
      loginleft: require("../../assets/img/login/loginleft.png"),
      user_photo: require("../../assets/img/login/user_photo.png"),//用户头像
      user_name: "",
      user_pwd: "",
      msg: "",
      isuserActive: true,
      ispwdActive: true,
      // isshowforgetpwd:false,
      dialogFormVisible: false
    };
  },
  components:{
    ForgetPwd
  },
  mounted() {},
  updated() {
    // 当输入框有值隐藏提示信息
    if (this.user_name != "") {
      this.isuserActive = true;
    }
    if (this.user_pwd != "") {
      this.ispwdActive = true;
    }
  },
  methods: {
    // 注册
    zhucexyh() {
      this.$router.push("/register");
    },
    // 登录
    _UserLogin(user_name, user_pwd) {
      UserLogin(user_name, user_pwd).then((res) => {
        this.msg = res.msg;
        // console.log(res)
        if (res.msg == "用户名或密码错误！" && res.code == 400) {
          alert(this.msg);
        }
        if (res.code == 200) {
          //修改state中变量的状态，不能直接this.$store.state.username
          if(res.data.user_photo==null){
            res.data.user_photo = this.user_photo
          }else{
            res.data.user_photo = res.data.user_photo//用户头像
          }
          this.$store.commit("loginList",res.data)
      
          const loading = this.$loading({
            lock: true,
            text: "加载中",
            spinner: "el-icon-loading",
            background: "rgba(0, 0, 0, 0.7)",
          });
          setTimeout(() => {
            loading.close();
            //当你登录成功时就加入socket聊天室
            this.$socket.emit('online',this.$store.state.userList)
            this.$router.push("/home");
            // this.$router.go(0);
          }, 2000);
        }
        // console.log(this.msg)
      });
    },

    submitClick() {
      this._UserLogin(this.user_name, this.user_pwd);
      // 当输入框没有提示信息
      if (this.user_name == "") {
        this.isuserActive = false;
      }
      if (this.user_pwd == "") {
        this.ispwdActive = false;
      }
    },
    //失去焦点
    usernameblur() {
      this.isuserActive = false;
    },
    userpwdblur() {
      this.ispwdActive = false;
    },
    usernamefocus() {
      this.isuserActive = true;
    },
    userpwdfocus() {
      this.ispwdActive = true;
    },
    //重置
    chongzhiClick() {
      (this.user_name = ""), (this.user_pwd = "");
    },
    // 忘记密码
    wjmmClick(){
      console.log("----")
      this.dialogFormVisible = true
    },
    // 修改成功关闭当前的弹出框
    closeFormClick(e){
      this.dialogFormVisible = e
    }
  },
};
</script>
<style scoped>
.myLogin {
  width: 1140px;
  /* border: 1px solid; */
  margin: auto;
  margin-top: 30px;
  margin-bottom: 30px;
  display: flex;
}
.formUser {
  width: 40%;
  border: 1px solid white;
  margin-left: auto;
  padding: 40px;
  background: white;
  border-radius: 4px;
  display: flex;
  flex-direction: column;
}
.yhdl {
  text-align: center;
  font-size: 20px;
}
.zhuceP {
  text-align: right;
  font-size: 14px;
  color: gray;
  cursor: pointer;
}
.zlabel {
  font-size: 14px;
}
.zinput {
  height: 44px;
  border-radius: 11px;
  /* color: white; */
  font-size: 14px;
  border: 1px solid black;
}
.myanniu {
  display: flex;
  justify-content: space-around;
}
.zbutton {
  color: white;
  border: 1px solid rgb(0, 117, 255);
  background-color: rgb(0, 117, 225);
  height: 34px;
  width: 80px;
  border-radius: 4px;
  font-size: 14px;
  text-align: center;
  line-height: 34px;
  cursor: pointer;
}
.chongzhi {
  background: rgb(222, 225, 230);
  color: black;
  border: 1px solid rgb(222, 225, 230);
}
.wjmm {
  text-align: right;
  margin-top: 23px;
  font-size: 13px;
  color: gray;
  cursor: pointer;
}
.msgp {
  font-size: 10px;
  color: red;
  margin-top: -17px;
  margin-left: 6px;
  display: none;
}
.msgpActive {
  display: block;
}
.tp {
  position: relative;
}
.d2 {
  margin-top: 286px;
}
.d3 {
  margin-top: 120px;
}
.d4 {
  margin-top: 50px;
}
.d5 {
  margin-top: 300px;
}
.d6 {
  position: absolute;
  margin-left: 636px;
  z-index: -1;
}
.d7 {
  position: absolute;
  margin-top: 356px;
  margin-left: 1090px;
  z-index: -1;
}
.d8 {
  position: absolute;
  margin-left: 484px;
  margin-top: 173px;
}
.d9 {
  position: absolute;
  margin-left: 3px;
  margin-top: 173px;
}
.d10 {
  position: absolute;
  margin-left: 224px;
  margin-top: 400px;
}
.inputpp{
  width: 320px;
}

</style>
