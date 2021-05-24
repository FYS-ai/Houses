<template>
<div class="navdiv">
      <h5 style="font-weight: 600;">修改房源</h5>
      <!-- h_deploy -->
      <div class="hdeploy">
        <!-- 卧室 -->
        <div class="listclass">
          <div class='btTitle'>卧室:</div>
          <div class="xhclass" v-for="(wsItem,wsIndex) in woshi"
            @click="woshiClick(wsItem,wsIndex)"
            :class="wsActive==wsItem?'wsActiveys':''"
           :key="wsIndex">{{wsItem}}</div>
        </div>

        <!-- 床位 -->
        <div class="listclass">
          <div class="btTitle">床位:</div>
          <div class="xhclass" v-for="(cwItem,cwIndex) in chuangwei"
            @click="chuangweiClick(cwItem,cwIndex)"
            :class="cwActive==cwItem?'cwActiveys':''"
           :key="cwIndex">{{cwItem}}</div>
        </div>

        <!-- 卫生间 -->
        <div class="listclass">
          <div class="btTitle">卫生间:</div>
          <div class="xhclass" v-for="(wsjItem,wsjIndex) in weishengjian"
            @click="wsjClick(wsjItem,wsjIndex)"
            :class="wsjActive==wsjItem?'wsjActiveys':''"
            :key="wsjIndex">
            {{wsjItem}}</div>
        </div>

        <!-- 最多人数 -->
        <div class="listclass">
          <div class="btTitle">人数:</div>
          <div class="xhclass" v-for="(rsItem,rsIndex) in renshu"
            @click="renshuClick(rsItem,rsIndex)"
            :class="rsActive==rsItem?'rsActiveys':''"
            :key="rsIndex">
            {{rsItem}}</div>
        </div>

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
            :class="lxActive==lxItem?'lxActiveys':''"
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

        <div class="butdivss">
          <button class="nextbut" @click="nextClick">确认</button>
          <button class="tobut" @click="toClick">取消</button>
          
        </div>
      </div>
    </div>
</template>
<script>
import {FindHouse,UpHouse} from 'network/house.js'
import { MessageBox } from 'element-ui';
export default {
  name: "uphouselist",
  inject:["reload"],
  data () {
    return {
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
      ssActive:[],//设施

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
  props:{
    uphid:{
      type:Number
    }
  },

  created() {
    this._FindHouse(this.uphid)
  },
  methods: {
    _FindHouse(hid){
      FindHouse(hid).then(res=>{
        this.mingcheng = res.data.h_title//标题
        this.jieshao = res.data.h_detail//介绍
        this.h_money = res.data.h_money//价格
        this.cityname = res.data.cityname//城市
        this.wsActive = res.data.h_deploy.split(",")[0]//卧室
        this.cwActive = res.data.h_deploy.split(",")[1]//
        this.wsjActive = res.data.h_deploy.split(",")[2]
        this.rsActive = res.data.h_deploy.split(",")[3]

        this.lxActive = res.data.h_room//leix
        this.ssActive = res.data.h_basets.split(",")//设施
        this.bqActive = res.data.h_tag.split(",")
        // console.log(this.wsActive,this.cwActive,this.wsjActive,this.rsActive)
      })
    },
    //取消
    toClick(){
      console.log("取消按钮")
    },
    //确认
    nextClick(){
      if(this.h_tag=='')
      {
        this.h_tag = this.bqActive
      }
      if(this.h_basets=='')
      {
        this.h_basets = this.ssActive
      }
      console.log(this.h_basets)
      let deploys = this.h_deploy.join(",")
      UpHouse(this.mingcheng,this.jieshao,deploys,this.h_tag,this.h_room, 
        this.h_basets, this.cityname
        ,this.h_money,this.uphid).then(res=>{
          if(res.code==200)
          {
            MessageBox.alert("修改成功","",
            {
              dangerouslyUseHTMLString: true,
              showConfirmButton:false,
              center:true,
              distinguishCancelAndClose:true,
              //右上角关闭按钮，点击就会调用Promise
              callback:(action, instance)=>{
                this.reload()
              }
            })
          }
          if(res.code==400){
             MessageBox.alert("修改失败","",
            {
              dangerouslyUseHTMLString: true,
              showConfirmButton:false,
              center:true,
              distinguishCancelAndClose:true,
              //右上角关闭按钮，点击就会调用Promise
              callback:(action, instance)=>{
                // this.reload()
              }
            })
          }
      })
    },
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
      this.lxActive = e
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
      this.wsActive=e
      this.h_deploy[0] = e
    },
    // 床位
    chuangweiClick(e,i){
      this.cwActive=e
      this.h_deploy[1] = e
    },
    // 卫生间
    wsjClick(e,i){
      this.wsjActive=e
      this.h_deploy[2] = e
    },
    // 人数
    renshuClick(e,i){
      this.rsActive=e
      this.h_deploy[3] = e
    },
  },
}
</script>
<style scoped>
.butdivss{
      width: 80%;
    /* border: 1px solid; */
    display: flex;
    /* justify-content: space-between; */
    height: 44px;
    margin-top: 20px;
    font-size: 14px;
}
.tobut{
  border: none;
  border-radius: 4px;
   margin-left: 30px;
}
.nextbut{
    background: #007bff;
    color: white;
    border: 1px solid #007bff;
    border-radius: 4px;
   
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
</style>