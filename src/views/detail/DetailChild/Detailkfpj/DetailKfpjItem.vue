<template>
<div>
    <!-- 上 -->
    <div class="sss">
      <!-- 头像 -->
      <div class="toubuf" @click="touserdetail(commentItem.uid)">
        <img :src="commentItem.user_photo" v-if="this.commentItem.user_photo!=null&&this.commentItem.user_photo!=''" alt="" />
        <img  src="../../../../assets/img/login/user_photo.png" v-else alt="" />
      </div>
      <div>
        <div class="user-name">{{ commentItem.user_name }}</div>
        <div class="pjsj">{{commentItem.com_date.split("-")[0]}}
          年{{commentItem.com_date.split("-")[1]}}月</div>
      </div>
    </div>
    <!-- 图片 -->
    <div v-if=" commentItem.comment_photo">
      <div class="cpimgItem">
        <img ref="xsTuPian" class="pltupian" v-for="(cpItem,cpIndex) in commentItem.comment_photo.split(',')"
         :key="cpIndex" :src="cpItem" alt="" @click="setImgClick(cpItem)"/>
      </div>
    </div>
    <!-- 下 -->
    <div class="xia">
      {{ commentItem.com_detail }}
    </div>
</div>
</template>
<script>
import { MessageBox } from 'element-ui';
export default {
  name: "detailItem",
  data() {
    return {
      commentphoto:[],
      imgBig:[]
    };
  },
  props:{
    commentItem:{
      type:Object
    }
  },
  created() {
    // console.log(this.commentItem)
  },
  computed:{
    sssss(){
     return this.commentItem.user_photo!=null&&this.commentItem.user_photo!=''
    }
  },
  methods: {
     setImgClick(e){
      let imgnew = `<img src="${e}" style="width:300px;height=300px;">`
      
       MessageBox.alert(imgnew, '', {
          dangerouslyUseHTMLString: true,
          showConfirmButton:false,
          center:true,
          distinguishCancelAndClose:true,
          //右上角关闭按钮，点击就会调用Promise
          callback:(action, instance)=>{}
        });

       
    },
    touserdetail(e){
      this.$router.push("/userdetail?uid="+e)
    }
  },
};
</script>
<style scoped>
  .sss {
  display: flex;
}
.toubuf {
  margin-right: 20px;
  cursor: pointer;
}
.toubuf img {
  width: 50px;
  height: 50px;
  border-radius: 50%;
}
.user-name {
  font-size: 15px;
  font-weight: 700;
}
.pjsj {
  font-size: 13px;
  margin-top: 3px;
}
.cpimgItem{
  display: flex;
    flex-wrap: wrap;
    margin-top: 10px;
}
.pltupian{
      width: 23%;
    margin-right: 10px;
    border-radius: 4px;
}
.xia {
  margin-top: 20px;
  font-size: 14px;
}
</style>
