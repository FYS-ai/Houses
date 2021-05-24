<template>
  <div class="grxxdiv">
    <div class="geziliao">
      <!-- 头像 -->
      <div class="photohhh">
        <div class="photoleft">
          <div class="ghzp">
            <heade-photo :newsList="newsList"></heade-photo>
          </div>
        </div>
        <div class="photoright">
          <div class="bubianclass biaotimz">
            您好，我叫{{ newsList.user_name }}
          </div>
          <div class="bubianclass">注册时间：{{ newsList.user_data }}</div>
          <div class="bubianclass">性别：{{ newsList.user_sex }}</div>
          <div class="bubianclass">电话：{{ newsList.user_tel }}</div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import HeadePhoto from './headePhoto/HeadePhoto'
export default {
  name: "news",
  data() {
    return {
      newsList: {},
      imageUrl: ''
    };
  },
  created() {
    this.newsList = this.$store.state.userList;
    // console.log(this.newsList);
  },
  components:{
    HeadePhoto
  },
  methods: {

  },
};
</script>
<style scoped>
/* 个人资料 */
.grxxdiv {
  margin: auto;
  width: 90%;
  /* border: 1px solid; */
}
.grziliao {
  display: flex;
}

.photohhh {
  display: flex;
}
.photoleft {
  margin-right: 30px;
  text-align: center;
}
.photoright {
  display: flex;
  flex-direction: column;
}
.bubianclass {
  margin-top: 12px;
  font-size: 14px;
}
.biaotimz {
  font-size: 20px;
  font-weight: 700;
}
.ghzp {
  text-decoration: underline;
  margin-top: 10px;
  cursor: pointer;
}
</style>
