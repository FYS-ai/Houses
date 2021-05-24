<template>
  <div class="userdetail">
    <h4>个人信息</h4>
    <div class="sss">
      <div class="toubuf">
        <img :src="commentItem.user_photo" v-if="sfxsmrimg" alt="" />
        <img
          class="2"
          src="../../assets/img/login/user_photo.png"
          v-else
          alt=""
        />
      </div>
      <div>
        <div class="user-name">您好，我是{{ commentItem.user_name }}</div>
        <div class="pjsj">
          注册于{{ (commentItem.user_data || "").split("-")[0] }} 年{{
            (commentItem.user_data || "").split("-")[1]
          }}月
        </div>
        <div class="pjsj">性别：{{ commentItem.user_sex }}</div>
      </div>
    </div>
    <h4>关于Ta</h4>
    <div v-if="userHouseList.length>0||commentList.length>0">
      <!-- 发表评论 -->
      <div class="pl">
        <!-- 房源内容 -->
        <div>
          <h6 style="margin-bottom: 20px;">
            一共有{{ comhouseList.length }}个评论
          </h6>
          <div
            class="zwc"
            v-for="(comhlItem, comhlIndex) in comhouseList"
            :key="comhlIndex"
            @click="todetailClickComm(comhlItem.hid)"
          >
            <div class="spxx">
              <div class="tpdiv">
                <img
                  width="150px"
                  height="150px"
                  style="border-radius:4px;"
                  v-if="comhlItem.h_images.split(',').length > 0"
                  :src="comhlItem.h_images.split(',')[0]"
                  alt=""
                />
                <img
                  v-else
                  width="150px"
                  height="150px"
                  style="border-radius:4px;"
                  src="~assets/img/pointOut/mytp.png"
                  alt=""
                />
              </div>
              <div class="rightnr">
                <div class="neirong">{{ comhlItem.h_title }}</div>
                <div class="xtdeyuansu">
                  <span class="xtks">{{ comhlItem.h_room }}</span>
                  <span class="xtks">{{ comhlItem.cityname }}</span>
                  <span class="xtks">￥{{ comhlItem.h_money }}</span>
                </div>

                <div class="xtdeyuansu">
                  <span
                    v-for="(deployItem,
                    deployIndex) in comhlItem.h_deploy.split(',')"
                    :key="deployIndex"
                    class="bubian"
                    :class="'tag' + (deployIndex + 1)"
                    >{{ deployItem }}</span
                  >
                </div>
                <div class="xtdeyuansu">
                  <span
                    v-for="(tagItem, tagIndex) in comhlItem.h_tag.split(',')"
                    :key="tagIndex"
                    :class="'bq' + (tagIndex + 1)"
                    class="bubian"
                    >{{ tagItem }}</span
                  >
                </div>
              </div>
            </div>
            <!-- 评论内容 -->
            <div class="plnrys">
              <!-- 图片 -->
              <div class="tpzwc" v-if="commentList[comhlIndex].comment_photo">
                <div class="cpimgItem">
                  <img
                    ref="xsTuPian"
                    class="pltupian"
                    v-for="(cpItem, cpIndex) in commentList[
                      comhlIndex
                    ].comment_photo.split(',')"
                    :key="cpIndex"
                    :src="cpItem"
                    alt=""
                  />
                </div>
              </div>
              <!-- 下 -->
              <div class="xia">
                {{ commentList[comhlIndex].com_detail }}
              </div>
            </div>
          </div>
        </div>
      </div>
      <!-- 发布房源 -->
      <div>
        <h6>已发布{{ userHouseList.length }}个房源</h6>
        <div class="manhouse">
          <div
            class="myhlist"
            v-for="(userhItem, userhIndex) in userHouseList"
            :key="userhIndex"
          >
            <div class="djliulan" @click="todetailClick(userhItem.hid)">
              <div class="myhtitle">
                {{ userhItem.h_title }}
              </div>
              <div>
                <img
                  class="fbtp"
                  :src="(userhItem.h_images || '').split(',')[0]"
                  v-if="(userhItem.h_images || '').split(',').length > 1"
                  alt=""
                />
                <img
                  class="fbtp"
                  v-else
                  src="~assets/img/pointOut/mytp.png"
                  alt=""
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div v-else>
      <p>Ta还没发布过任何动态</p>
    </div>
  </div>
</template>
<script>
import { GetFindUser } from "network/user";
import { GetCommentUid, GetHouseHid } from "network/comment";
import {GetUserIdHouse} from 'network/house'
export default {
  name: "userdetail",
  data() {
    return {
      uid: "",
      commentItem: {},
      sfxsmrimg: "",
      comhouseList: [], //房源列表
      commentList: [], //评论列表
      userHouseList:[],//房源列表
    };
  },
  created() {
    this.uid = this.$route.query.uid;
    this._GetFindUser(this.uid);
    this._GetCommentUid(this.uid);
    this._GetUserIdHouse()
  },

  methods: {
    // 跳转详情页
    todetailClick(hid){
        this.$router.push("/detail?hid="+hid);
    },
    //按用户id查询
    _GetUserIdHouse(){
      GetUserIdHouse(this.uid).
      then(res=>{
        if(res.code==200&&res.data)
        {
          this.userHouseList = res.data
        }
        console.log(res)
      })
    },
    // 跳转到详情页
    todetailClickComm(hid) {
      this.$router.push("/detail?hid=" + hid);
    },
    _GetCommentUid(uid) {
      GetCommentUid(uid).then((res) => {
        this.commentList = res.data;
        res.data.map((item) => {
          //按房源id请求房源
          GetHouseHid(item.hid).then((fyhid) => {
            this.comhouseList.push(...fyhid.data);
            // console.log(fyhid)
          });
        });
        console.log(this.comhouseList);
      });
    },
    //用户请求
    _GetFindUser(zdyuid) {
      GetFindUser(zdyuid).then((res) => {
        if (res.code == 200 && res.data) {
          this.commentItem = res.data;
          this.sfxsmrimg = res.data.user_photo != null;
        }
      });
    },
  },
};
</script>
<style scoped>
.userdetail {
width: 1140px;
border: 1px solid #d7d8da;
margin: auto;
margin-top: 20px;
padding: 10px 10px 10px 10px;
border-radius: 4px;
}
.sss {
  display: flex;
  width: 98%;
  margin: auto;
  margin-top: 15px;
  margin-bottom: 15px;
  /* justify-content: center; */
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
  font-size: 25px;
  font-weight: 700;
  margin-top: 30px;
}
.pjsj {
  font-size: 13px;
  margin-top: 3px;
}

/* 评论样式 */
.pl {
  margin-top: 25px;
}
.zwc {
  margin-bottom: 35px;
  border-bottom: 1px solid #cfcdcd;
  padding-bottom: 30px;
  margin-top: 30px;
  cursor: pointer;
}
.plnrys {
  width: 80%;
  margin: auto;
}
.tpzwc {
  margin-top: 20px;
}

.spxx {
  display: flex;
  width: 80%;
  margin: auto;
  /* margin-bottom: 40px; */
  /* border-bottom: 1px solid #cfcdcd;
    padding-bottom: 40px;
    margin-top: 40px; */
}
.tpdiv {
  width: 150px;
  height: 150px;
  /* border: 1px solid; */
  border-radius: 4px;
  /* margin-left: 20px; */
  margin-right: 20px;
}
.xtks {
  font-size: 13px;
  margin-right: 10px;
  color: #6c757d;
}
.rightnr {
  height: 150px;
  display: flex;
  flex-direction: column;
  padding: 5px;
}
.xtdeyuansu {
  margin-bottom: 10px;
  font-size: 13px;
}
.bubian {
  padding: 2px;
  border-radius: 4px;
  padding: 0 5px 0 5px;
  margin-right: 10px;
  display: inline-block;
  color: white;
}
.tag1 {
  background-color: #007bff;
}
.tag2 {
  background-color: #ffc107;
}
.tag3 {
  background-color: #fd7e14;
}
.tag4 {
  background-color: #20c997;
}
.bq1 {
  background-color: #6c757d;
}
.bq2 {
  background-color: #28a745;
}
.bq3 {
  background-color: #17a2b8;
}
.bq4 {
  background-color: #007bff;
}
.bq5 {
  background-color: #17a2b8;
}
.bq6 {
  background-color: #ffc107;
}
.bq7 {
  background-color: #dc3545;
}

.cpimgItem {
  display: flex;
  flex-wrap: wrap;
  margin-top: 10px;
}
.pltupian {
  width: 7%;
  margin-right: 10px;
  border-radius: 4px;
}
.xia {
  margin-top: 20px;
  font-size: 14px;
}


/* 发布房源样式 */
.manhouse{
      display: flex;
    flex-wrap: wrap;
        width: 80%;
    margin: auto;
}
.djliulan{
      display: flex;
    align-items: center;
        margin-top: 25px;
        box-sizing: border-box;
}
.djliulan:hover{
  /* border: 1px solid rgb(179, 178, 178); */
  
  /* padding: 5px;? */
  transform:scale(1.05);
  border-radius: 4px;
   box-shadow: 0 5px 8px rgba(0,0,0,0.09), 0 0 0 1px rgba(0,0,0,0.1);
}
.myhlist{
  box-sizing: border-box;
      display: flex;
    height: 130px;
    /* align-items: center; */
        flex-direction: column;
    padding: 0 10px 0 10px;
    background: white;
    box-shadow: 0 5px 8px rgba(0,0,0,0.09), 0 0 0 1px rgba(0,0,0,0.1);
    border-radius: 4px;
    cursor: pointer;
    margin-right: 15px;
    margin-top: 20px;
}
.dianjishijian{
    display: flex;
    color: #007bff;
    justify-content: space-between;
    font-size: 14px;
    margin-top: 10px;
    cursor: pointer;
}
.myhtitle{
  width: 150px;
    font-family: Roboto, Helvetica Neue, sans-serif;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
    vertical-align: middle;
}
.fbtp{
  width: 104px;
    height: 69px;
}
</style>
