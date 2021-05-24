<template>
  <div>
    <el-steps :space="200" :active="stepNum">
      <el-step title="步骤 1"></el-step>
      <el-step title="步骤 2"></el-step>
      <el-step title="步骤 3"></el-step>
    </el-steps>

    <!-- h_deploy -->
    <div v-if="stepNum==1" class="navdiv">
      <!-- h_deploy -->
      <div class="hdeploy">
        <!-- 卧室 -->
        <div class="listclass">
          <div class='btTitle'>卧室:</div>
          <div class="xhclass" v-for="(wsItem,wsIndex) in woshi"
            @click="woshiClick(wsItem,wsIndex)"
            :class="wsActive==wsIndex?'wsActiveys':''"
           :key="wsIndex">{{wsItem}}</div>
        </div>

        <!-- 床位 -->
        <div class="listclass">
          <div class="btTitle">床位:</div>
          <div class="xhclass" v-for="(cwItem,cwIndex) in chuangwei"
            @click="chuangweiClick(cwItem,cwIndex)"
            :class="cwActive==cwIndex?'cwActiveys':''"
           :key="cwIndex">{{cwItem}}</div>
        </div>

        <!-- 卫生间 -->
        <div class="listclass">
          <div class="btTitle">卫生间:</div>
          <div class="xhclass" v-for="(wsjItem,wsjIndex) in weishengjian"
            @click="wsjClick(wsjItem,wsjIndex)"
            :class="wsjActive==wsjIndex?'wsjActiveys':''"
            :key="wsjIndex">
            {{wsjItem}}</div>
        </div>

        <!-- 最多人数 -->
        <div class="listclass">
          <div class="btTitle">人数:</div>
          <div class="xhclass" v-for="(rsItem,rsIndex) in renshu"
            @click="renshuClick(rsItem,rsIndex)"
            :class="rsActive==rsIndex?'rsActiveys':''"
            :key="rsIndex">
            {{rsItem}}</div>
        </div>
      </div>
    </div>
    
    <!-- h_tag和h_room、h_basets -->
    <div v-else-if="stepNum==2" class="navdiv">
      <div class="hdeploy">
        <!-- h_tag -->
        <div class="listclass">
          <div class='btTitle'>标签:</div>
          <div class="xhclass" v-for="(bqItem,bqIndex) in biaoqian"
            @click="biaoqianClick(bqItem,bqIndex)"
            :class="bqActive.indexOf(bqItem)!=-1?'wsActiveys':''"
           :key="bqIndex">{{bqItem}}</div>
        </div>

        <!-- h_room -->
        <div class="listclass">
          <div class='btTitle'>类型:</div>
          <div class="xhclass" v-for="(lxItem,lxIndex) in leixing"
            @click="leixingClick(lxItem,lxIndex)"
            :class="lxActive==lxIndex?'lxActiveys':''"
           :key="lxIndex">{{lxItem}}</div>
        </div>

        <!-- h_basets -->
        <div class="listclass">
          <div class='btTitle'>设施:</div>
          <div class="xhclass" v-for="(ssItem,ssIndex) in sheshi"
            @click="sheshiClick(ssItem,ssIndex)"
            :class="ssActive.indexOf(ssItem)!=-1?'ssActiveys':''"
           :key="ssIndex">{{ssItem}}</div>
        </div>

        <!-- cityname -->
        <div class="listclass">
          <div class='btTitle'>城市:</div>
          <input class="txk" type="text" v-model="cityname">
        </div>

        <!-- h_money -->
         <div class="listclass">
          <div class='btTitle'>价格:</div>
          <input class="txk" type="text" v-model="h_money">
        </div>
      </div>
    </div>

    <!-- h_detail、h_title -->
    <div v-else-if="stepNum==3" class="navdiv">
      <div class="hdetail">
        <div class="fzjs">房子介绍</div>
        <textarea class="textareanr" name="" id="" v-model="jieshao"
        placeholder="介绍您的房源，让更多的人了解您的房源..."></textarea>
      </div>
      <div class="hdetail">
        <div class="fzjs">房子标题</div>
       <textarea class="textareanr" name="" id="" v-model="mingcheng"
       placeholder="为您的房源起个标题吧..."></textarea>
      </div>
    </div>
    
    <!-- 上传图片 -->
    <!-- <div v-else class="navdiv"> 
      <div>上传图片</div>
      <div class="sctpxx">
      <div class="dasd">
        <el-dialog :visible.sync="dialogVisible">
          <img width="100%" :src="dialogImageUrl" alt="">
        </el-dialog>
        <el-upload class="myupload" ref="upload"
          action="12312"
          list-type="picture-card" :multiple="multiple"
          :on-preview="handlePictureCardPreview" :limit="limitnum"
          :auto-upload="auto_upload" :on-exceed="onexceed"  accept="image/*"
          :http-request="uploadFile" :on-change="onChange">
          <i class="el-icon-plus"></i>
        </el-upload>
      </div>
      </div>
    </div> -->
    
    <div class="butdivss">
      <button class="tobut" :disabled="kstrue" @click="toClick">上一步</button>
      <button class="nextbut" @click="nextClick" v-if="showClick==1">下一步</button>
      <button class="nextbut" @click="fabuClick" v-if="showClick==2">发布</button>
      <!-- <button class="nextbut" @click="uploadimgClick" v-if="showClick==3">上传</button> -->
    </div>
    
  </div>
</template>
<script>
import {AddHouse} from 'network/house'
export default {
  name: "stepHouse",
  inject:["reload"],
  data() {
    return {
      stepNum:1,//当前步骤激活
      kstrue:true,//上一步是否可以
      woshi:["1间卧室","2间卧室","3间卧室","4间卧室","5间卧室","6间卧室"],//卧室
      chuangwei:["1张床","2张床","3张床","4张床","5张床","6张床"],//床位
      weishengjian:["1间卫生间","2间卫生间","3间卫生间"],//卫生间
      renshu:["最多住1人","最多住2人","最多住3人","最多住4人"],//最多人数
      biaoqian:["新上线","可开发票","近地铁","自助入住","可以做饭","可存行李"],//房子标签
      leixing:["整个房源","独立房间","合住房间"],//类型
      sheshi:["生活必需品","无线网络","电视","暖气","空调","洗发水","洗衣机","电脑桌","衣架"],//设施
      jieshao:"",//介绍
      mingcheng:"",//名称
      wsActive:"",//卧室变色
      cwActive:"",//床位变色
      wsjActive:"",//卫生间变色
      rsActive:"",//人数变色
      bqActive:[],//标签
      lxActive:"",//类型
      ssActive:[],//类型

      
      
      showClick:1,//按钮的切换

      h_title:'',//标题
      h_deploy:["1间卧室","1张床","1间卫生间","最多住1人"],//配置
      h_images:'',//图片
      h_tag:'',//标签
      h_room:'整个房源',//类型
      h_basets:'',//设施
      cityname:'',//城市
      h_money:'',//价格


    };
  },
  mounted() {
  },
  methods: {
    // 设施
    sheshiClick(e,i){
      if(this.ssActive.indexOf(e)==-1)
      {
        this.ssActive.push(e)
      }
      else{
        let num = this.ssActive.indexOf(e)
        this.ssActive.splice(num,1)
      }
      this.h_basets = this.ssActive.join(",")
      // console.log(this.h_basets)
    },
    // 类型
    leixingClick(e,i){
      this.lxActive = i
      this.h_room = e
      // console.log(e,i)
    },
    // 标签
    biaoqianClick(e,i){
      //判断数组中有没有当前点击标签，没有就push进去数组中，
        if(this.bqActive.indexOf(e)==-1){
          this.bqActive.push(e)
        }
        //如果有那么就查找出当前点击的标签的位置indexOf，利用splice删除指定位置
        else{
          let num = this.bqActive.indexOf(e)
          this.bqActive.splice(num,1)
        }
        this.h_tag = this.bqActive.join(",")
        // console.log(this.h_tag)
      // }
    },
    // 卧室
    woshiClick(e,i){
      // console.log(e)
      this.wsActive=i
      this.h_deploy[0] = e
    },
    // 床位
    chuangweiClick(e,i){
      this.cwActive=i
      this.h_deploy[1] = e
    },
    // 卫生间
    wsjClick(e,i){
      this.wsjActive=i
      this.h_deploy[2] = e
    },
    // 人数
    renshuClick(e,i){
      this.rsActive=i
      this.h_deploy[3] = e
    },
    //上一步
    toClick(){
      //设置步骤的激活状态
      if(this.stepNum>1){
        this.stepNum -=1
      }
      if(this.stepNum==1){
        this.kstrue = true
      }
      //设置发布上传和下一步按钮的切换
      if(this.showClick==2)
      {
        this.showClick=1
      } 
      if(this.showClick==3)
      {
        this.showClick=2
      }
    },
    //下一步
    nextClick(){
      if(this.stepNum<3){
        this.stepNum +=1
        this.kstrue = false
        if(this.cityname==''&&this.stepNum==3){
          alert("请为您的房子填写城市")
          this.stepNum =2 
        }
        if(this.h_money==''&&this.stepNum==3){
          alert("请为您的房子填写价格")
          this.stepNum =2 
        }
        if(this.bqActive.length==0&&this.stepNum==3){
          alert("请为您的房子选择标签吧")
          this.stepNum =2 
        }
        if(this.ssActive.length==0&&this.stepNum==3)
        {
            alert("请为您的房子选择基础设施吧")
          this.stepNum =2
        }
        if(this.stepNum==3){
          this.showClick=2
        }
      }
    },
    // 发布
    fabuClick(){
      if(this.jieshao==''&&this.stepNum==3){
        alert("请为您介绍的房源")
        this.stepNum =3
      }
      if(this.mingcheng==''&&this.stepNum==3){
        alert("请您为您的房源起个标题吧")
        this.stepNum =3
      }
      if(this.mingcheng&&this.jieshao){
        let deploys = this.h_deploy.join(",")
        this._AddHouse(this.mingcheng,this.jieshao,deploys,this.h_tag,this.h_room, 
        this.h_basets, this.cityname
        ,this.h_money,this.$store.state.userList.uid)
      }
      // this.h_deploy.join(",")
      console.log(this.h_deploy)
    },
    // 上传
    // uploadimgClick(){

    // },
    //发布房源
    _AddHouse(h_title,h_detail,h_deploy,h_tag,h_room,h_basets,cityname,h_money,uid){
      AddHouse(h_title,h_detail,h_deploy,h_tag,h_room,h_basets,cityname,h_money,uid).
      then(res=>{
        if(res.code==200&&res.msg=="添加成功！"){
          alert("房源发布成功")
          this.reload()
          // this.showClick = 3
        }
        console.log(res)
      })
    },
  },
};
</script>
<style scoped>
.butdivss{
      width: 80%;
    /* border: 1px solid; */
    display: flex;
    /* justify-content: space-between; */
    height: 44px;
    margin-top: 30px;
    font-size: 14px;
}
.tobut{
  border: none;
  border-radius: 4px;
}
.nextbut{
    background: #007bff;
    color: white;
    border: 1px solid #007bff;
    border-radius: 4px;
    margin-left: 30px;
}


.navdiv{
  margin-top: 20px;
}
.hdeploy{
  width: 80%;
}
.listclass{
  display: flex;
  width: 100%;
  border-bottom: 1px solid #d7d9da;
  /* justify-content: space-around; */
  height: 60px;
  align-items: center;
}

.xhclass{
  /* border: 1px solid #e2e4e6; */
    padding: -3px;
    height: 30px;
    width: 75px;
    text-align: center;
    line-height: 30px;
    font-size: 12px;
    font-weight: 700;
    background: #e2e4e6;
    border-radius: 4px;
        margin-left: 10px;
        cursor: pointer;
}
.btTitle{
      font-size: 14px;
    font-weight: 600;
    width: 50px;
}
.wsActiveys{
  color:white;
  background:#007bff;
}
.cwActiveys{
  color:white;
  background:#dc3545;
}
.wsjActiveys,.ssActiveys{
  color:white;
  background:#28a745;
}
.rsActiveys{
  color:white;
  background:#fd7e14;
}
.lxActiveys{
  color:white;
  background: #dc3545;
}
.hdetail{
  width: 600px;
    /* border: 1px solid; */
    font-size: 14px;
    font-weight: 600;
    padding-bottom: 19px;
}
.fzjs{
      margin: 10px 0 10px 0;
}
.textareanr{
      width: 100%;
    height: 120px;
    margin-top: 0px;
    margin-bottom: 0px;
    text-indent: 30px;
        border: 1px solid #cdcaca;
}

/* 上传图片 */
.sctpxx{
  width: 80%;
  margin: auto;
  /* border: 1px solid; */
  margin-top: 20px;
  display: flex;
}
.dasd{
      /* width: 150px; */
    text-align: center;
    border-radius: 4px;
    background: #f8f9fa;
    display: flex;
}
.txk{
  border: 1px solid #d8d6d6;
    width: 350px;
    border-radius: 4px;
}
</style>
