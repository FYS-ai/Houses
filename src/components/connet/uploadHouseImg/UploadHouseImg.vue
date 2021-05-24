<template>
<div>
  <div class="navdiv"> 
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
import {HouseImgUpload} from "network/uploadimg" 
import { MessageBox } from 'element-ui';
export default {
  name: "uploadhouseimg",
  inject:["reload"],
  data () {
    return {
      dialogImageUrl: '',//图片路径
      dialogVisible: false,//
      multiple:true,//是否支持多文件上传
      auto_upload:false,//是否在选取文件后立即进行上传
      limitnum:5,//最大支持上传5个
      fileParams:"",//formData对象
      fileList:"",//图片列表
    };
  },
  props:{
    uploadHid:{
      type:Number
    }
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
      this.fileParams.append('hid',this.uploadHid)
      for(var i=0;i<this.fileList.length;i++){
        this.fileParams.append('h_images[]',this.fileList[i].raw)
      }
    },
    submitUpload(){
      if(this.fileList.length>0){
        let timer = setInterval(()=>{
        this.$refs.upload.submit();
        HouseImgUpload(this.fileParams)
        .then(resPhoto=>{
          if(resPhoto.code==200&&resPhoto.data)
          {
            MessageBox.alert("上传成功","",
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
          console.log(resPhoto)
        })
        clearInterval(timer)
      },2000)
      }
      else{
        MessageBox.alert("上传图片不能为空","",
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
  },
}
</script>
<style scoped>
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
.fdasdsa{
      width: 50%;
    /* border: 1px solid; */
    position: relative;
    left: 50%;
    text-align: right;
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
</style>