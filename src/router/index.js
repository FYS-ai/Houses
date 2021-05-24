import Vue from 'vue'
import VueRouter from 'vue-router'

const Home = () => import('../views/home/Home.vue')
const Detail = () =>import('../views/detail/Detail.vue')
const UserLogin = () => import("views/userlogin/UserLogin.vue")
const Register = () => import("views/register/Register.vue")
const Order = () => import("views/order/Order.vue")
const Collect = () => import("views/collect/Collect.vue")
const Comment = () => import("views/comment/Comment.vue")
const PointOut = () => import("components/connet/pointOut/PointOut.vue")
const PInformation = () => import("views/pInformation/PInformation")
const SwitchAccount = () => import("views/switchAccount/SwitchAccount")
const SearchTeplem = () => import("components/connet/searchTeplem/SearchTeplem")
const UserDetail = () => import("views/userDetail/UserDetail")
const MyMassege = () => import("views/myMassege/MyMassege")
Vue.use(VueRouter)

const routes = [
  {
    path:'',
    redirect:'/home'
  },
  {
    path:'/home',
    component: Home,
    meta:{
      title:'首页'
    }

  },
  {
    path:'/detail',
    component: Detail,
    meta:{
      title:"详情页"
    }
  },
  {
    path:"/userlogin",
    component:UserLogin,
    meta:{
      title:"登录"
    },
    //独享路由，如果登录了，那么在浏览器地址栏输入登录路径是不会跳转到登录页面
    beforeEnter(to,from,next){
    //   // localStorage:长期存储，页面刷新还是会存在的,数据是json格式，需要用getItem获取
    //   // 可以利用JSON.parse转成数组
    //   // let isLogin = this.store.state.username//取不到
      if(localStorage.getItem('vuex')){
        let isUserName= JSON.parse(localStorage.getItem('vuex')).userList.user_name
        if ((!isUserName && to.path !== '/userlogin')) {
            //如果没有登录，跳转到登录页面
            next('/userlogin')
          } else {
            if ((to.path === '/userlogin') && isUserName) {
              //如果已经登录，却尝试访问登录页面或者错误页面，将继续保持原本的页面
              next('/home')
            } else {
              next()
            }
          }
      }else{
        next()
      }
      
    }
  },
  {
    path:"/register",
    component:Register,
    meta:{
      title:"注册"
    },
    beforeEnter: (to, from, next) => {
      if(localStorage.getItem('vuex')){
        let isRegister= JSON.parse(localStorage.getItem('vuex')).userList.user_name
        if (!isRegister && to.path !== '/register') {
          next('/register')
        } else {
          if ((to.path === '/register') && isRegister) {
              next('/home')
          } else {
            next()
          }
        }
      }else{
        next()
      }
      
    }
  },
  {
    path:'/order',
    component: Order,
    meta:{
      title:"我的订单",
    },
    beforeEnter: (to, from, next) => {
      if(localStorage.getItem('vuex'))
      {
        let isRegister= JSON.parse(localStorage.getItem('vuex')).userList.user_name
        if (isRegister=='' && to.path == '/order') {
          next('/home')
        } 
        if(to.path === '/order' && isRegister!=''){
          next()
        }
      }else{
        next()
      }
      
    }
  },
  {
    path:'/collect',
    component:Collect,
    meta:{
      title:'我的收藏'
    },
    beforeEnter: (to, from, next) => {
      if(localStorage.getItem('vuex'))
      {
        let isRegister= JSON.parse(localStorage.getItem('vuex')).userList.user_name
        if (isRegister=='' && to.path == '/collect') {
          next('/home')
        } 
        if(to.path === '/collect' && isRegister!=''){
          next()
        }
      }else{
        next()
      }
      
    }
  },
  {
    path:'/comment',
    component:Comment,
    meta:{
      title:'评论'
    },
    beforeEnter: (to, from, next) => {
      if(localStorage.getItem('vuex'))
      {
        let isRegister= JSON.parse(localStorage.getItem('vuex')).userList.user_name
        if (isRegister=='' && to.path == '/comment') {
          next('/home')
        } 
        if(to.path === '/comment' && isRegister!=''){
          next()
        }
      }else{
        next()
      }
    }
  },
  {
    path:"/pointout",
    component:PointOut,
    meta:{
      title:'成功'
    }
  },
  {
    path:"/pinformation",
    component:PInformation,
    meta:{
      title:"个人资料"
    },
    beforeEnter: (to, from, next) => {
      let isRegister= JSON.parse(localStorage.getItem('vuex')).userList.user_name
      if (!isRegister && to.path !== '/pinformation') {
        next('/pinformation')
      } else {
        if ((to.path === '/pinformation') && !isRegister) {
            next('/home')
        } else {
          next()
        }
      }
    }
  },
  {
    path:"/switchaccount",
    component:SwitchAccount,
    meta:{
      title:"切换账号"
    }
  },
  {
    path:'/searchteplem',
    component:SearchTeplem,
    meta:{
      title:'搜索'
    }
  },
  {
    path:'/userdetail',
    component:UserDetail,
    meta:{
      title:"他的信息"
    }
  },
  {
    path:'/mymassege',
    component:MyMassege,
    meta:{
      title:"我的消息"
    }
  }

]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})
//配合meta使用呢
router.beforeEach((to, from, next) => {
  document.title = to.matched[0].meta.title
  next()
})
//解决多次点击路由发生错误
const originalPush = VueRouter.prototype.push
VueRouter.prototype.push = function push(location) {
  return originalPush.call(this, location).catch(err => err)
}

export default router
