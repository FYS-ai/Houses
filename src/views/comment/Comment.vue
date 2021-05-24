<template>
  <div class="comment">
    <!-- 商品信息 -->
    <div class="spxx">
      <div class="tpdiv">
        <img width="150px" height="150px" style="border-radius:4px;" :src="h_images[0]" alt="">
      </div>
      <div class="rightnr">
        <div class="neirong">{{h_title}}</div>
        <div class="xtdeyuansu">
          <span class="xtks">{{h_room}}</span>
          <span class="xtks">{{cityname}}</span>
          <span class="xtks">￥{{h_money}}</span>
          <!-- <span class="xtks">
            <span>{{checkIn}}</span>到
            <span>{{checkOut}}</span>
          </span> -->
        </div>

        <div  class="xtdeyuansu">
          <span v-for="(deployItem,deployIndex) in h_deploy" :key="deployIndex"
           class="bubian" :class="('tag'+(deployIndex+1))">{{deployItem}}</span>
        </div>
        <div  class="xtdeyuansu">
          <span v-for="(tagItem,tagIndex) in h_tag" :key="tagIndex"
           :class="('bq'+(tagIndex+1))"  class="bubian">{{tagItem}}</span>
        </div>
      </div>
    </div>
    <!-- 评论框 -->
    <div class="plxx">
      <textarea placeholder="把您美好体验分享给更多的人吧！！！" 
        v-model="com_detail" class="textta" name="" id=""></textarea>
    </div>
    <!-- 上传图片 -->
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
    <div class="djanxx">
      <div class="fdasdsa">
        <span class="queren xiangtong" @click="submitUpload">确认</span>
        <span class="quxiao xiangtong">取消</span>
      </div>
     
    </div>
  </div>
</template>
<script>
import {AddComment, CommentPhoto,FindCommentOrid,UpOrderPL} from 'network/uploadimg.js'
import {GetDetail} from 'network/detail.js'

import { MessageBox } from 'element-ui';
export default {
  name: "comment",
  inject:["reload"],
  data () {
    return {
      dialogImageUrl: '',//图片路径
      dialogVisible: false,//
      multiple:true,//是否支持多文件上传
      auto_upload:false,//是否在选取文件后立即进行上传
      limitnum:5,//最大支持上传5个
      fileParams:"",
      fileList:'',//上传文件列表
      com_detail:"",//评论内容
      user_name :"",//用户名
      user_photo :"",//用户名
      com_date:new Date().toLocaleDateString(),//评论时间
      // detailList: {},
      h_title: "",//标题
      h_deploy: [],//配置内容
      h_images: [],//图片
      h_tag: [],//标签
      checkIn:"",//入住时间
      checkOut:"",//退房时间
      h_money:"",//价格
      h_room:"",//整套公寓
      cityname:"",//城市
      hid:"",//房子id
      uid:"",//房子id
      orid:"",//订单id
      comid:"",//评论id
      isComment:1,//是否评论
    };
  },
  created() {
    this.user_name = this.$store.state.userList.user_name//用户名
    this.user_photo = this.$store.state.userList.user_photo//用户名
    this.uid = this.$store.state.userList.uid
    this.hid = this.$route.query.hid
    this.orid = this.$route.query.orid
    GetDetail(this.$route.query.hid).then(res=>{
      this.h_title = res.data.h_title;
      this.h_deploy = res.data.h_deploy.split(",");//配置内容
      this.h_images = res.data.h_images.split(",");//图片
      this.h_tag = res.data.h_tag.split(",");//标签
      this.checkIn = res.data.checkIn;//入住时间
      this.checkOut = res.data.checkOut;//退房时间
      this.h_money = res.data.h_money;//价格
      this.h_room = res.data.h_room;//房间
      this.cityname = res.data.cityname;//城市
      console.log(res)
    })
    // console.log(this.$route.query)
  },
  methods: {
    // 上传超过5张图片
    onexceed(file, fileList){
      console.log(file)
      if(fileList.length ==0 || fileList.length>=5){
        alert("最大只能上传5张图片")
      }
      
    },
    //选取图片渲染到界面
    handlePictureCardPreview(file) {
      console.log(file)
      this.dialogImageUrl = file.url;
      this.dialogVisible = true;
    },
    //选择文件、取消文件等调用
    onChange(file,fileList){
      this.fileList = fileList;
    },
    uploadFile(file){
      //upload组件不会一次性把全部上传，而是一张一张图片的上传
      this.fileParams = new FormData()
      this.fileParams.append('comid',this.comid)
      for(var i=0;i<this.fileList.length;i++){
        this.fileParams.append('comment_photo[]',this.fileList[i].raw)
      }
    },
    // 上传到服务器
    submitUpload(){
      if(this.fileList.length>0){
        let timer = setInterval(()=>{
        // console.log("延迟执行uploadFile")
        this.$refs.upload.submit();
        CommentPhoto(this.fileParams)
        .then(resPhoto=>{
          if(resPhoto.code==200&&resPhoto.data){
            MessageBox.alert("评论成功","",
            {
              dangerouslyUseHTMLString: true,
              showConfirmButton:false,
              center:true,
              distinguishCancelAndClose:true,
              //右上角关闭按钮，点击就会调用Promise
              callback:(action, instance)=>{
                this.$router.push("order")
              }
            })
          }
          // console.log(resPhoto)
        })
        clearInterval(timer)
      },2000)
      }
      if(this.com_detail!=''){
         AddComment(this.hid,this.uid,this.com_detail,this.com_date,
          this.user_name,this.user_photo,this.orid).then(res=>{
            if(res.code==200){
              // console.log("先执行了AddComment")
            //添加成功，查询刚刚添加的id
              FindCommentOrid(this.orid).then(res=>{
                if(res.code==200){
                  this.comid = res.data.comid
                }if(res.code==400){
                  alert("上传图片失败")
                }
              })
            }if(res.code==400){
              alert("评论失败，请重新操作")
            } 
            //修改评论是否完成状态
            UpOrderPL(this.orid,this.isComment).then(upOred=>{
              console.log(upOred)  
            })
        })
      }else{
        MessageBox.alert("评论内容不能为空！！！","",
        {
          dangerouslyUseHTMLString: true,
          showConfirmButton:false,
          center:true,
          distinguishCancelAndClose:true,
          //右上角关闭按钮，点击就会调用Promise
          callback:(action, instance)=>{}
        })
      }
      
     
    }
    
  }
}
</script>
<style scoped>
.comment{
      width: 940px;
    margin: auto;
    margin-top: 30px;
    border: 1px solid;
    padding: 10px;
}
.spxx{
      display: flex;
    width: 80%;
    margin: auto;
}
.tpdiv{
      width: 150px;
    height: 150px;
    /* border: 1px solid; */
    border-radius: 4px;
    /* margin-left: 20px; */
    margin-right: 20px;
}
.plxx{
  width: 80%;
    margin: auto;
    margin-top: 20px;
    border-radius: 4px;
}
.sctpxx{
      width: 80%;
    margin: auto;
    /* border: 1px solid; */
    margin-top: 20px;
        display: flex;
}
.djanxx{
      display: flex;
    width: 80%;
    margin: auto;
    margin-top: 30px;
    height: 44px;
    /* border: 1px solid; */
    /* justify-content: right; */
    text-align: right;
}
.textta{
  width: 100%;
    height: 200px;
    border-radius: 4px;
    font-size: 14px;
    text-indent: 21px;
}
.neirong{
      font-size: 14px;
    font-weight: 700;
        margin-bottom: 5px;
}
.xtks{
font-size: 13px;
    margin-right: 10px;
    color: #6c757d; 
}
.rightnr{
      height: 150px;
    display: flex;
    flex-direction: column;
    padding: 5px;
}
.xtdeyuansu{
  margin-bottom: 10px;
  font-size: 13px;
}
.dasd{
      /* width: 150px; */
    text-align: center;
    border-radius: 4px;
    background: #f8f9fa;
    display: flex;
}
.bubian{
  padding: 2px;
    border-radius: 4px;
    padding: 0 5px 0 5px;
    margin-right: 10px;
    display: inline-block;
    color: white;
}
.tag1{
    background-color: #007bff;
}
.tag2{
    background-color: #ffc107;
}
.tag3{
    background-color: #fd7e14;
}
.tag4{
    background-color: #20c997;
}
.bq1{
  background-color: #6c757d;
}
.bq2{
  background-color: #28a745;
}
.bq3{
  background-color: #17a2b8;
}
.bq4{
  background-color: #007bff;
}
.bq5{
  background-color:#17a2b8;
}
.bq6{
  background-color: #ffc107;
}
.bq7{
  background-color: #dc3545;
}
.fdasdsa{
      width: 50%;
    /* border: 1px solid; */
    position: relative;
    left: 50%;
    text-align: right;
}
.xiangtong{
 width: 56px;
    height: 38px;
    /* border: 1px solid; */
    display: inline-block;
    text-align: center;
    line-height: 38px;
    font-size: 15px;
    color: white;
    
    border-radius: 4px;
}
.queren{
   background: #007bff;
    margin-right: 68px;
}
.quxiao{
  background: #6c757d;
    /* margin-right: 68px; */
}
.scdeimg{
      width: 100px;
    height: 100px;
        margin-right: 8px;
    border-radius: 4px;
}
/* .myupload{
      width: 100px;
    height: 100px;
    line-height: 100px;
} */
.picture-card{
  display: flex;
}
</style>