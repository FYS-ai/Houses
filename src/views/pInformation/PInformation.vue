<template>
  <div>
    <div class="pinformation">
      <el-container style="height: 500px; border: 1px solid #eee">
        <el-aside width="200px" style="background-color: rgb(238, 241, 246)">
          <el-menu :default-openeds="['1', '3']">
            <el-submenu index="1">
              <template slot="title"><i class="el-icon-s-custom"></i>我的个人资料</template>
              <el-menu-item-group>
                <!-- <template slot="title"></template> -->
                <el-menu-item index="1-1" @click="gerenxx">个人信息</el-menu-item>
                <el-menu-item index="1-2" @click="xiugaimm">修改密码</el-menu-item>
                <el-menu-item index="1-3" @click="gehuansj">更换手机号</el-menu-item>
              </el-menu-item-group>
            </el-submenu>
            <el-submenu index="2">
              <template slot="title"><i class="el-icon-document"></i>我的评论</template>
              <el-menu-item-group>
                <el-menu-item index="2-1" @click="mycommentClick">已评论</el-menu-item>
              </el-menu-item-group>
            </el-submenu>
            <el-submenu index="3">
              <template slot="title"><i class="el-icon-s-grid"></i>成为房东</template>
              <el-menu-item-group>
                <el-menu-item index="3-1" @click="fabuHouseClick">发布房源</el-menu-item>
                <el-menu-item index="3-2" @click="wodeHouseClick">我的房源</el-menu-item>
                <!-- <el-menu-item index="3-3" @click="fabuHouseClick">我的房源</el-menu-item> -->
              </el-menu-item-group>
            </el-submenu>
          </el-menu>
        </el-aside>
        
        <el-container>
          <el-header style="text-align: right; font-size: 12px">
            <el-dropdown  @command="handleCommand">
              <i class="el-icon-setting" style="margin-right: 15px"></i>
              <el-dropdown-menu slot="dropdown">
                <el-dropdown-item  command="qiehuanzh">切换账号</el-dropdown-item>
                <el-dropdown-item command="tuichuzh">退出账号</el-dropdown-item>
              </el-dropdown-menu>
            </el-dropdown>
            <span>{{myusername}}</span>
          </el-header>
          
          <el-main>
           <!-- 个人资料模块 -->
           <news v-if="myIndexbh=='1-1'"></news>
           <forget-pwd v-else-if="myIndexbh=='1-2'"></forget-pwd>
           <forget-phone v-else-if="myIndexbh=='1-3'"></forget-phone>

           <!-- 我的评论模块模块 -->
           <my-comment v-else-if="myIndexbh=='2-1'"/>
            
           <!-- 我是房东模块 -->
            <listing-house v-else-if="myIndexbh=='3-1'"></listing-house>
            <manage-house v-else-if="myIndexbh=='3-2'"></manage-house>
            
          </el-main>
        </el-container>
      </el-container>
    </div>
  </div>
</template>
<script>


import News from './childCpns/news/News'
import ForgetPwd from './childCpns/forgetPwd/ForgetPwd'
import ForgetPhone from './childCpns/forgetPhone/ForgetPhone'


import ListingHouse from './childCpns/listingHouse/ListingHouse'
import ManageHouse from './childCpns/manageHouse/ManageHouse'
import MyComment from './childCpns/myComment/MyComment'
export default {
  name: "pinformation",
  data () {
    const item = {
      date: '2016-05-02',
      name: '王小虎',
      address: '上海市普陀区金沙江路 1518 弄'
    };
    return {
      tableData: Array(20).fill(item),
      myIndexbh:'1-1',
      myusername:''//用户名
    }
  },
  created() {
    this.myusername = this.$store.state.userList.user_name
  },
  components:{
    News,
    ForgetPwd,
    ForgetPhone,
    ListingHouse,
    ManageHouse,
    MyComment
  },
  methods: {
    //下拉菜单退出账号和切换账号
    handleCommand(command){
      //切换账号
      if(command=="qiehuanzh"){
        this.$router.push('/switchaccount')
      }
      //退出账号
      if(command=="tuichuzh"){
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
        this.$store.commit("loginList",tuichuUserList)
        this.$store.commit("collectList",datacoll)
        this.$router.push("/home")
      }
    },
    //个人信息
    gerenxx(){
      this.myIndexbh = '1-1'
    },
    //修改密码
    xiugaimm(){
      this.myIndexbh = '1-2'
      console.log(this.myIndexbh)
    },
    //更换手机号
    gehuansj(){
      this.myIndexbh = '1-3'
    },
    //我的评论
    mycommentClick(){
       this.myIndexbh = '2-1'
    },
    // 发布房源
    fabuHouseClick(){
       this.myIndexbh = '3-1'
    },
    wodeHouseClick(){
      this.myIndexbh = '3-2'
    }
  },
}
</script>
<style scoped>
.el-header {
    background-color: #B3C0D1;
    color: #333;
    line-height: 60px;
  }
  
  .el-aside {
    color: #333;
  }
  .pinformation{
    width:1140px;
    margin: auto;
    margin-top: 30px;
  }
</style>