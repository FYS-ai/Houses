<template>
  <div>
    <img class="photoUser" :src="newsList.user_photo" alt="" />
    <el-upload class="myupload" ref="uploadPhoto"
      action="123123123" accept="image/*" :show-file-list="false"
      :http-request="uploadFile" :auto-upload="false"
       :on-change="onChange">
        <span @click="genghuanPhoto">更换照片</span>
    </el-upload>
    <div class="sfsc" v-show="filelits" @click="shifousc">是否上传</div>
  </div>
</template>
<script>
import {uploadUserPhoto,UpCommentPhoto} from 'network/uploadimg'
import { MessageBox } from 'element-ui';
export default {
  name: "headephoto",
  inject:["reload"],
  data() {
    return {
      headerFileData:'',
      filelits:'',
      newYH:{}
    };
  },
  props:{
    newsList:{
      type:Object
    }
  },
  created() {
    this.headerFileData = new FormData()
    this.headerFileData.append('uid',this.$store.state.userList.uid)

    this.newYH = this.newsList
  },
  mounted() {
    this.newYH = this.newsList
  },
  methods: {
    onChange(file,fileList){
      this.filelits = fileList;
      // console.log(file,fileList)
    },
    uploadFile(file){
      this.headerFileData.append('user_photo',this.filelits[0].raw)
    },
    // 更换照片按钮
    genghuanPhoto(){},
    // 是否上传图片
    shifousc(){
      if(this.filelits){
        let timer = setInterval(()=>{
          this.$refs.uploadPhoto.submit()
            uploadUserPhoto(this.headerFileData).then(res=>{
              if(res.code==200&&res.data)
              {
                let user_photo = res.data
                this.newYH.user_photo = user_photo
                this.$store.commit('loginList',this.newYH)
                UpCommentPhoto(this.$store.state.userList.uid,res.data).
                then(comres=>{
                  // console.log(comres)
                })
                this.filelits = ''
                MessageBox.alert("头像修改成功","",
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
              if(res.code==400&&res.msg=="修改头像同步失败！")
              {
                MessageBox.alert("头像修改失败","",
                {
                  dangerouslyUseHTMLString: true,
                  showConfirmButton:false,
                  center:true,
                  distinguishCancelAndClose:true,
                  //右上角关闭按钮，点击就会调用Promise
                  callback:(action, instance)=>{}
                })
              }
              // console.log(res)
            })
          clearInterval(timer)
        },2000)
      }
    }
  },
};
</script>
<style scoped>
.photoUser {
  width: 150px;
  height: 150px;
  border-radius: 50%;
  border: 1px solid rgb(126, 124, 124);
}
.sfsc{
  height: 30px;
  border: 1px solid;
  font-size: 14px;
  line-height: 30px;
  border-radius: 4px;
  background: #007bff;
  color: white;
  display: inline-block;
  margin-left: -2px;
  width: 77px;
  margin-top: 10px;
}
</style>
