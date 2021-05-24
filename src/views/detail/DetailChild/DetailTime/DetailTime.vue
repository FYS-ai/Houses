<template>
  <div class="keri">
    <div class="dierk">
      <!-- 每晚价格 -->
      <div class="mririjiage xiangt">
        <div class="meiwmenoy">
          <span style="font-size: 20px;font-weight: 700;">￥{{ hmoney }}</span>
          <span style="font-size: 13px;margin-left: 5px;font-weight: 700;"
            >每晚</span
          >
        </div>
        <div style="display: flex;">
          <div v-for="(yhItem, yhIndex) in yhList" :key="yhIndex">
            <img class="dagouimg" :src="dagou" alt="" />
            <span class="youhui">{{ yhItem }}</span>
          </div>
        </div>
      </div>
      <!-- 日期 -->
      <div class="block blockel xiangt">
        <span class="demonstration mydemonstration">可订日期</span>
        <el-date-picker
        v-model="values"
          type="daterange"
          range-separator="-"
          start-placeholder="订房日期"
          end-placeholder="退房日期"
          @change="eldatep"
          :clearable="isclearable"
          :picker-options="pickerOptions1"
        >
        </el-date-picker>
      </div>
      <!-- 人数 -->
      <div style="margin-top:-24px;" class="xiangt">
        <span class="demonstration mydemonstration" style="display: block;"
          >人数</span
        >
        <select class="myselect" name="" id="" v-model="renshu"
        @change="getSele">
          <option
            v-for="renItem in serenshu"
            :value="renItem"
            :key="renItem"
            selected
            >{{ renItem }}</option
          >
        </select>
      </div>

      <!-- 按钮 -->
      <div class="shengqing" @click="dialogFormVisible = true">
        <div style="width: 91%;background: red;border-radius: 4px;">
          申请预订
        </div>
      </div>

      <!-- 弹出房客个人填写资料 -->
      <el-dialog title="个人资料" :visible.sync="dialogFormVisible">
      <el-form :model="form">
        <el-form-item label="姓名" :label-width="formLabelWidth">
          <el-input class="myinputWidth" v-model="form.name"
          @blur="nameBlur" autocomplete="off" @focus="nameFocus"></el-input>
          <p class="msgp" :class="isformname ? '' : 'msgpActive'">
            姓名不能为空
          </p>
        </el-form-item>
        <el-form-item label="身份证号码" :label-width="formLabelWidth">
          <el-input class="myinputWidth" v-model="form.IDcard"
          @blur="IDcardBlur" autocomplete="off" @focus="IDcardFocus"></el-input>
          <p class="msgp" :class="isformIDcard ? '' : 'msgpActive'">
            身份证号码格式不正确
          </p>
        </el-form-item>
        <el-form-item label="电话" :label-width="formLabelWidth">
          <el-input class="myinputWidth" v-model="form.or_tel" 
          @blur="telBlur" autocomplete="off" @focus="ortelFocus"></el-input>
          <p class="msgp" :class="isortel ? '' : 'msgpActive'">
            电话号码格式不正确
          </p>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">取 消</el-button>
        <el-button type="primary" @click="fasequeding">确 定</el-button>
      </div>
    </el-dialog>
    </div>
  </div>
</template>
<script>
export default {
  name: "detailtime",
  data() {
    return {
      pickerOptions1: {
        disabledDate: time => {
          return time.getTime() < Date.now() - 8.64e7 
        }
      },   
      
      pickerMinDate: '',
      renshu: "",
      values:[],
      daysNumber:Number,
      isclearable:false,
      dgetDate:Number,//月份天数

      // elm数据
      dialogFormVisible: false,
      form: {
        name: '',
        IDcard:'',
        or_tel:''
      },
      formLabelWidth: '100px',

      //显示和隐藏提示信息
      isformname:true,
      isformIDcard:true,
      isortel:true,
    };
  },
  props: {
    yhList: {
      type: Array,
    },
    serenshu: {
      type: Array,
    },
    dagou: {
      type: String,
    },
    hmoney: {
      type: Number,
    },
  },
  created() {
    //如果没有这句代码，select中初始化会是空白的，默认选中就无法实现
    this.renshu = this.serenshu[0];
    let dataTime = new Date();
    const checkIn = dataTime.toLocaleDateString();
    const checkOut =dataTime.getFullYear() +"/" +(dataTime.getMonth()+1) +"/" +(dataTime.getDate() + 1);
    this.values.push(checkIn,checkOut)
    this.timeJian(checkIn,checkOut)
    this.mGetDate()
    // console.log(this.daysNumber)
  },
  mounted() {
    
  },
  updated() {
    // 当输入框有值隐藏提示信息
    if (this.form.name != "") {
      this.isformname = true;
    }
    if (this.form.IDcard != ""&&
    (/(^\d{15}$)|(^\d{18}$)|(^\d{17}(\d|X|x)$)/.test(this.form.IDcard))) {

      this.isformIDcard = true;
    }
    if (this.form.or_tel != ""&&
    (/^(13[0-9]|14[5|7]|15[0|1|2|3|4|5|6|7|8|9]|18[0|1|2|3|5|6|7|8|9])\d{8}$/
      .test(this.form.or_tel))) {
      this.isortel = true;
    }
  },
  methods: {
    // 申请预订
    open() {
      this.nameBlur()
      this.IDcardBlur()
      this.telBlur()
     
    },
    getSele(){
      // console.log(this.renshu);
    },
    eldatep(){
      const myvalues = this.values.map(item=>{
        return item.toLocaleDateString()
      })
      this.values = myvalues
      this.timeJian(myvalues[0],myvalues[1])
      // console.log(this.daysNumber)
    },

    //时间天数相减
    timeJian(beforeDay,bextDay)
    {
      // 同月
      if(bextDay.split("/")[1] == beforeDay.split("/")[1]){
         this.daysNumber = bextDay.split("/")[2]-beforeDay.split("/")[2]
      }
      // 不同月
      if(bextDay.split("/")[1] > beforeDay.split("/")[1]){
         this.daysNumber = (parseInt(bextDay.split("/")[2]) + (this.dgetDate-parseInt(beforeDay.split("/")[2])))
      }
      parseInt
    },
    //月份天数
    mGetDate(){
     var date = new Date();
     var year = date.getFullYear();
     var month = date.getMonth()+1;
     var d = new Date(year, month, 0);
     this.dgetDate = d.getDate();
    },
    //获取焦点把显示的隐藏
    nameFocus(){
      this.isformname = true
    },
    IDcardFocus(){
      this.isformIDcard = true
    },
    ortelFocus(){
      this.isortel = true
    },

    // 失去焦点把隐藏的显示
    nameBlur(){
      this.isformname = false
    },
    IDcardBlur(){
      if(!(/(^\d{15}$)|(^\d{18}$)|(^\d{17}(\d|X|x)$)/.test(this.form.IDcard))){
        this.isformIDcard = false
      }
    },
    telBlur(){
      if(!(/^(13[0-9]|14[5|7]|15[0|1|2|3|4|5|6|7|8|9]|18[0|1|2|3|5|6|7|8|9])\d{8}$/
      .test(this.form.or_tel))){
          this.isortel = false
      }
    },

    //弹出框确定按钮
    fasequeding(){
      const summoney = this.daysNumber*this.hmoney
     //人数，入住和退房日期，总价钱，多少晚
     if(this.form.name&&this.form.IDcard&&this.form.or_tel){
       this.$emit("zaixianyuding",
        [
          this.renshu,
          this.values,
          summoney,
          this.daysNumber,
          this.form.name,
          this.form.IDcard,
          this.form.or_tel,
        ]);
        this.dialogFormVisible =false
        const loading = this.$loading({
            lock: true,
            text: "Loading",
            spinner: "el-icon-loading",
            background: "rgba(0, 0, 0, 0.7)",
          });
          setTimeout(() => {
            loading.close();
            // this.$router.push("/pointout");
          }, 2000);
     }else{
      this.nameBlur()
      this.IDcardBlur()
      this.telBlur()
     }
      
    }

  },
};
</script>
<style scoped>
/* //可订日期 */
.keri {
  width: 1140px;
  margin: auto;
  margin-top: 25px;
}
.blockel {
  width: 50%;
  display: flex;
  flex-direction: column;
  margin-top: 20px;
}
.mydemonstration {
  font-size: 13px;
  font-weight: 700;
  margin-bottom: 11px;
  margin-top: 17px;
}
.el-picker-panel__body-wrapper {
  display: block !important;
}
.dierk {
  width: 40%;
  border: 1px solid gray;
  padding-bottom: 30px;
}
.xiangt {
  width: 85%;
  margin: auto;
  padding-bottom: 20px;
}
.mririjiage {
  display: flex;
  flex-direction: column;

  border-bottom: 1px solid;
}
.meiwmenoy {
  margin-top: 10px;
}
.dagouimg {
  width: 13px;
  height: 13px;
}
.youhui {
  font-size: 12px;
  margin-left: 3px;
}
.myselect {
  width: 91%;
  height: 44px;
  border-radius: 5px;
  border: 1px solid gray;
}
.shengqing {
  width: 85%;
  height: 35px;
  /* background: red; */
  color: white;
  /* border-radius: 4px; */
  text-align: center;
  line-height: 35px;
  font-size: 13px;
  margin-top: 20px;
  margin: auto;
}
.myinputWidth{
  width:451px;
}
.msgp {
  font-size: 10px;
  color: red;
  margin-top: -8px;
  margin-left: 6px;
  display: none;
  height: 15px;
}
.msgpActive {
  display: block;
}
</style>
