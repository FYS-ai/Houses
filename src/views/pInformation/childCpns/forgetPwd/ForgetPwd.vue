<template>
<div>
  <el-form :model="ruleForm" status-icon :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm">
    <el-form-item label="手机号" prop="mytel">
      <el-input type="tel" autocomplete="off" v-model="ruleForm.mytel"
      class="inputpp"></el-input>
    </el-form-item>
    <el-form-item label="新密码" prop="pass">
      <el-input type="password" v-model="ruleForm.pass"
      autocomplete="off"
      class="inputpp"></el-input>
    </el-form-item>
    <el-form-item label="确认新密码" prop="checkPass">
      <el-input type="password" v-model="ruleForm.checkPass" autocomplete="off"
      class="inputpp"></el-input>
    </el-form-item>
    <el-form-item>
      <el-button type="primary" @click="submitForm('ruleForm')">提交</el-button>
      <el-button @click="resetForm('ruleForm')">重置</el-button>
    </el-form-item>
  </el-form>
</div>
</template>
<script>
import {UpUser} from 'network/user'
export default {
  name: "forgetPwd",
  data () {
      var validateTel = (rule, value, callback) => {
        if (value === '') {
          callback(new Error('请输入手机号'));
        }else if(!(/^1[3456789]\d{9}$/.test(this.ruleForm.mytel))){
          callback(new Error('手机号格式不正确'));
        }
         else {
          if (this.ruleForm.mytel !== '') {
            this.$refs.ruleForm.validateField('checkPass');
          }
          callback();
        }
      };
      var validatePass = (rule, value, callback) => {
        if (value === '') {
          callback(new Error('请输入密码'));
        }else if(value.length<6){
          callback(new Error('密码长度必须大于6'));
        }
         else {
          if (this.ruleForm.checkPass !== '') {
            this.$refs.ruleForm.validateField('checkPass');
          }
          callback();
        }
      };
      var validatePass2 = (rule, value, callback) => {
        if (value === '') {
          callback(new Error('请再次输入密码'));
        } else if (value !== this.ruleForm.pass) {
          callback(new Error('两次输入密码不一致!'));
        } else {
          callback();
        }
      };
    return {
      ruleForm: {
        mytel:"",
        pass: '',
        checkPass: ''
      },
      rules: {
        mytel:[
          {validator: validateTel, trigger: 'blur'}
        ],
        pass: [
          { validator: validatePass, trigger: 'blur' }
        ],
        checkPass: [
          { validator: validatePass2, trigger: 'blur' }
        ]
      },
      uid:""
    };
  },
  created() {
    this.uid = this.$store.state.userList.uid
  },
  methods: {
    // 提交
      submitForm(formName) {
        this.$refs[formName].validate((valid) => {
          if (valid) {
            // console.log(this.ruleForm.pass)
            this._UpUser(this.ruleForm.mytel,this.ruleForm.pass)
            // alert("修改成功")
          } else {
            alert("修改失败")
            return false;
          }
        });
      },
      //重置
      resetForm(formName) {
        this.$refs[formName].resetFields();
      },
      // 修改密码网络发送
      _UpUser(user_tel,user_pwd){
        UpUser(user_tel,user_pwd).then(res=>{
          if(res.code==200&&res.data){
            alert('密码修改成功，请重新登录')
            let tuichuUserList = {
              user_name:"",
              uid:"",
              user_photo:"",
              user_sex:"",
              user_tel:"",
              user_data:"",
              isLandlord:""
            }
            this.$store.commit("loginList",tuichuUserList)
            //根据路由的活跃状态来执行不同的响应
            if(this.$route.fullPath=="/userlogin"){
              this.$emit("closeForm",false)
            }
            if(this.$route.fullPath=="/pinformation"){
              this.$router.push("/userlogin")
            }
            
          }
          if(res.code==400&&res.msg=="修改失败，请重新操作！"){
            alert('新的密码不能和近期的相同，请重新操作')
          }
          if(res.code==401&&res.msg=="改手机号还未注册，请注册"){
            alert("改手机号还未注册，请注册")
          }
          console.log(res)
        })
      },
  }

}
</script>
<style scoped>
.inputpp{
  width: 320px;
}
</style>