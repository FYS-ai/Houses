import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import VueSocketIO from 'vue-socket.io' 
import ClientSocketIO from 'socket.io-client'
import {InfiniteScroll,Button,Image,Container
        ,Main,Footer,Header, Popover,DatePicker,
        Select,Option,Loading,Table,TableColumn,Dialog,Upload,
        Form,FormItem,Input,Aside,Dropdown,Menu,DropdownItem,
        MenuItem,DropdownMenu,MenuItemGroup,Submenu,Steps,Step,
        Backtop,Pagination
        } from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
Vue.config.productionTip = false
Vue.use(new VueSocketIO({
  debug:true,
  connection:ClientSocketIO.connect('http://localhost:3000/', {
    transports: ['websocket']
  }),//socket地址端口
  vuex:{
    store,
    actionPrefix:'SOCKET_',
    mutationPrefix:"SOCKET_"
  },
}))

// const io = ClientSocketIO('http://localhost:3000/', {
//   transports: ['websocket']
// })
// console.log(io)
// io.on('senduserlist', () => {
//   console.log(123)
// })
// io.on("senderEmit",data=>{
//   console.log(data)
// })

// Vue.prototype.$testSocket = io

Vue.use(InfiniteScroll)
Vue.use(Button)
Vue.use(Image)
Vue.use(Container)
Vue.use(Main)
Vue.use(Footer)
Vue.use(Header)
Vue.use(Popover)
Vue.use(DatePicker)
Vue.use(Select)
Vue.use(Option)
Vue.use(Loading)
Vue.use(Table)
Vue.use(TableColumn)
Vue.use(Dialog)
Vue.use(Upload)
Vue.use(Form)
Vue.use(FormItem)
Vue.use(Input)
Vue.use(Aside)
Vue.use(DropdownItem)
Vue.use(Dropdown)
Vue.use(Menu)
Vue.use(MenuItem)
Vue.use(DropdownMenu)
Vue.use(MenuItemGroup)
Vue.use(Submenu)
Vue.use(Steps)
Vue.use(Step)
Vue.use(Backtop)
Vue.use(Pagination)
new Vue({
  router,
  store,
  sockets: {
    disconnect () {
      console.log('Socket 断开')
    },
    connect_failed () {
      console.log('连接失败')
    },
    connect () {
      console.log('socket connected')
    }
  },
  render: h => h(App)
}).$mount('#app')
