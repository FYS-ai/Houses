<template>
  <div>
    <form action="">
      <div class="ndsjh">
        <span class="textwz">您的手机号码：</span>
        <span class="fdgh">{{phoneList.user_tel}}</span>
      </div>
      <label for="" class="zlabel">新电话</label>
      <input
        class="zinput"
        type="text"
        name=""
        id=""
        v-model="newPhone"
        @blur="phoneBlurClick"
        @focus="phoneFocusClick"
      /><br />
      <p class="msgp" :class="isphoneActive ? '' : 'msgpActive'">
        电话格式不正确
      </p>
      <div class="myanniu">
        <div class="zbutton" @click="phoneButtomClick">提交</div>
        <div class="zbutton chongzhi">重置</div>
      </div>
    </form>
  </div>
</template>
<script>
import {UpUserTel} from 'network/user'
export default {
  name: "forgetphone",
  data() {
    return {
      isphoneActive: true,
      newPhone: "",
      phoneList:{}
    };
  },
  created() {
    this.phoneList = this.$store.state.userList
  },
  methods: {
    // 失去焦点
    phoneBlurClick() {
      if (!(/^1[3456789]\d{9}$/.test(this.newPhone))) {
        this.isphoneActive = false;
      }
      if((/^1[3456789]\d{9}$/.test(this.newPhone))){
        this.isphoneActive = true;
      }
    },
    //获取焦点
    phoneFocusClick() {
      this.isphoneActive = true;
    },
    // 提交按钮
    phoneButtomClick() {
    this.phoneBlurClick();
     if ((/^1[3456789]\d{9}$/.test(this.newPhone))) {
       this._UpUserTel(this.phoneList.uid,this.newPhone)
    }
      
    },
    //修改手机发送
    _UpUserTel(uid,user_tel){
     UpUserTel(uid,user_tel).then(res=>{
        if(res.code==200){
          alert("更换手机号成功")
          let newlll = this.newPhone.substr(0,3)+'****'+this.newPhone.substr(7);
          this.phoneList.user_tel = newlll
          this.$store.commit('loginList',this.phoneList)
          this.newPhone=""
          this.$router.go(0)
        }
        if(res.code==400&&res.msg=="修改失败，请重新操作！"){
           alert("更换手机号不能是同一个，请重新操作")
        }
        console.log(res)
      })
    }
  },
};
</script>
<style scoped>
.ndsjh {
  margin-top: 30px;
  margin-bottom: 20px;
  font-size: 15px;
  font-weight: 700;
}
.zlabel {
  font-size: 14px;
}
.zinput {
  height: 35px;
  border-radius: 11px;
  width: 350px;
  border: 1px solid black;
  margin-left: 15px;
}
.myanniu {
  display: flex;
  justify-content: space-around;
  width: 450px;
  /* border: 1px solid; */
  margin-top: 30px;
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
.msgp {
  font-size: 10px;
  color: red;
  margin-top: 5px;
  margin-left: 58px;
  display: none;
}
.msgpActive {
  display: block;
}
</style>
