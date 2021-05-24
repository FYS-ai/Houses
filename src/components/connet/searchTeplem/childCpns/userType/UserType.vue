<template>
  <div class="sss">
      <!-- 头像 -->
      <div class="toubuf" @click="touserClick(usersearchItem.uid)">
        <img :src="usersearchItem.user_photo" alt="" />
      </div>
      <div>
        <div class="user-name">{{ usersearchItem.user_name }}</div>
        <div class="user-name">{{ usersearchItem.user_sex }}</div>
        <div class="pjsj">{{dataTime[0]}}年{{dataTime[1]}}月</div>
      </div>
    </div>
</template>
<script>
export default {
  name: "usertype",
  data () {
    return {
      dataTime:''
    };
  },
  props:{
    usersearchItem:{
      type:Object
    }
  },
  created() {
    // console.log(this.usersearchItem)
    this.dataTime = this.usersearchItem.user_data.split('-')
  },
  methods: {
    touserClick(e){
      this.$router.push("/userdetail?uid="+e)
    }
  },
}
</script>
<style scoped>
    .sss {
  display: flex;
    height: 150px;
    align-items: center;
    margin-right: 25px;
    border: 1px solid white;
    border-radius: 4px;
    background: white;
    padding: 20px;
}
.toubuf {
  margin-right: 20px;
}
.toubuf img {
 width: 150px;
    height: 150px;
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
</style>