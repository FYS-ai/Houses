<template>
  <div id="app" class="myScroll">
    <navbar :usernames="sessionname"/>
    <router-view v-if="isRouterAlive"></router-view>
    <my-foot></my-foot>
  </div>
</template>
<script>
import Navbar from 'components/connet/Navbar/Navbar';
import MyFoot from "components/connet/MyFoot/MyFoot";
import RetrunTop from 'components/connet/retrunTop/RetrunTop'
export default {
  provide()
  {
    return{
      reload:this.reload
    }
  },
  components:{
    Navbar,
    MyFoot,
    RetrunTop
  },
  data()
  {
    return{
      sessionname:"",
      isRouterAlive:true
    }
  },
  updated() {
    setInterval(
      this.$nextTick(()=>{
        this.sessionname = this.$store.state.userList.user_name
        // console.log(this.sessionname)
      },2000)
    )
    
  },
  mounted() {
    this.$socket.emit('online',this.$store.state.userList)
  },
  methods: {
    reload(){
      this.isRouterAlive = false,
      this.$nextTick(function(){
        this.isRouterAlive = true
      })
    }
  },
}
</script>
<style>
body{
  background-color: rgb(250, 250, 251);
}

/* @import url('assets/css/base.css'); */
</style>
