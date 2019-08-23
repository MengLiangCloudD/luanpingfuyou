<template>
  <div class="home-page">
    <div class="appointmentPage">
      <div class="tittle">
        <!-- <p class="pp">咨询</p> -->
        <div class="arrow-icon" @click="tobackdetail">
            <Icon size="30" type="ios-arrow-back" />
        </div>
        滦平县妇幼保健院挂号平台
      </div>
      <div class="doctorInfo">
        <p class="doctorName">{{this.$store.getters.getDocName}}</p>
        <div class="otherinfo">
          <p class="otherinfo-title">门诊科室：</p>
          <p class="otherinfo-text">{{this.$store.getters.getDepname}}</p>
        </div>
        <div class="otherinfo">
          <p class="otherinfo-title">号源名称：</p>
          <p class="otherinfo-text">{{doctor.RegID}}</p>
        </div>
        <div class="otherinfo">
          <p class="otherinfo-title">医生简介：</p>
          <p class="otherinfo-text">{{jiajie}}</p>
        </div>
        <Poptip  class="avatar" placement="bottom-start" width="300">
          <img class="avatar1" src="../assets/avatar.png" alt>
          <div class="api" slot="content">
              <div  v-for="(item,index) in docxiang" :key="index">
                <img src="./../assets/头像.png" alt="" width="50px;"  style="vertical-align: top;z-index:999">
                <div style="vertical-align: top;" class="po">
                  <p><span>医生姓名：</span><span>{{item.name}}</span></p>
                  <p><span>医生编码：</span><span>{{item.username}}</span></p>
                  <p><span>医生职称：</span><span>{{item.title}}</span></p>
                  <p><span>医生职位：</span><span>{{item.job}}</span></p>
                </div>
              </div>
            </div>
        </Poptip>
      </div>
      <div class="divid-line"></div>
      <div class="select-table">
        <p class="select-item">挂号时间：{{doctor.TimeRegion}} 8:00-17:00</p>
        <p class="select-item item-color" :class="{pmstate:pmstate=='约满'}">剩余号源：{{pmstate}}</p>
        <div style="display:flex">
          <p style="padding:0 20px;margin:20px 0px;flex:1">
            <Button @click="amRegistered()" size="large" type="primary" long>预约</Button>
          </p>
          <p style="padding:0 20px;margin:20px 0px;flex:1">
            <Button :disabled="true" @click="amRegistered()" size="large" type="primary" long>复诊</Button>
          </p>
        </div>
      </div>
    </div>
    <tabbar class="pubtabbar"></tabbar>
    <loading v-show="spinShow"></loading>
  </div>
</template>
<script>
import tabbar from "../common/tabbar";
import loading from ".././common/loading";
import {initwxshare} from "../common/js/share"
export default {
  name:"appointment",
  components: {
    loading,
    tabbar
  },
  data() {
    return {
      //返回的医生详细信息
      doctor: {},
      //pmstate 号源剩余的状态
      pmstate: "",
      //控制加载动画的显示
      spinShow: false,
      docxiang:[],
      jiajie:''
    };
  },
  created(){
  },
  //在mounted钩子里去获取医生的信息 保存支付费用 存储号源编码
  mounted() {
    this.spinShow = true;
    this.getdoctorinfo();
    this.doctorxinxi()
    // let requesturl=this.$store.getters.getUrl + "SweepCode.do";
    //     initwxshare(requesturl,1,"测试数据")
  },
  beforeDestroy(){
      //只在页面加载时执行一次
      //定义url地址
      if(!localStorage.getItem('cardno')){
        var url = this.$store.getters.getUrl + "card/getAllCards.do";
        var _this = this;
        //取得openid
        var openid = localStorage.getItem("openid");
        $.ajax({
          url: url,
          type: "post",
          dataType: "json",
          async: false,
          data: {
            openid: openid
          },
          success: function(data) {
            //判断已有几张卡
            if(data.data.length>0){
               localStorage.setItem('cardno',data.data[0].cardno);
              localStorage.setItem('cardername',data.data[0].name);
              _this.$store.commit('setCardCode',data.data[0].cardno);
            }
          },
          error: function(data) {
            //关闭加载动画
            _this.spinShow = false;
            //关闭加载动画
            _this.$Modal.error({
              title: "提示信息",
              content: "请求失败!"
            });
          }
        })
      }
      
  },
  methods: {
    //返回上一层
      tobackdetail(){
          this.$router.push("/home")
      },
    //获取当天日期
    getcurrentday() {
      let currentDay = new Date();
      let year = currentDay.getFullYear();
      if((currentDay.getMonth() + 1)<10){
         var  month = '0' + (currentDay.getMonth() + 1);
      }else{
        var month = currentDay.getMonth() + 1;
      }
      if((currentDay.getDate())<10){
        var day = '0' + (currentDay.getDate());
      }else{
        var day = currentDay.getDate();
      }
      let time = year + "-" + month + "-" + day;
      return time;
    },
    //去挂号 存储当天日期到vuex仓库 如果有预约号了就跳到确认挂号页，如果没有有预约号就跳弹窗提示
    amRegistered(){
      if (this.pmstate == "约满") {
        //弹出名额已满的提示信息。
        _this.$Modal.info({
          title: "提示信息",
          content: "名额已满!"
        });
        return;
      } else {
        this.pandun();
      }
    },
    //判断是否有卡
    pandun(){
      //开启加载动画
      let _this = this;
      _this.$router.push("/registeredInfo");
     
    },
    //存储医生信息
    savedoctorinfo() {
      let _this = this;

      //判断RegRemained是否为空
      if (_this.doctor.RegRemained === "") {
        _this.pmstate = "未约满";
      } else if (_this.doctor.RegRemained == "0") {
        _this.pmstate = "约满";
      } else {
        _this.pmstate = "未约满";
      }
      //把返回的医生详细信息的费用 号源源码 号源名称保存到vuex
      let currentDay = _this.getcurrentday();
      _this.$store.commit("setRegdata", currentDay);
      _this.$store.commit("setRegprice", _this.doctor.RegFee+_this.doctor.TreatFee); //挂号支付的费用
      _this.$store.commit("setRegcode", _this.doctor.RegID); //存储号源编码
      _this.$store.commit("setamprom", _this.doctor.TimeRegion); //保存白天昼夜
      let url1 = location.href;
      //后台接口
      var reurl = this.$store.getters.getUrl + "SweepCode.do";
      $.ajax({
        url: reurl,
        type: "post",
        dataType: "json",
        async: true,
        data: { url: url1 },
        success: function(data) {
          //取消禁止点击扫一扫
          wx.config({
            debug: false,
            appId: data.appId, // 必填,公众号的唯一标识
            timestamp:  data.timestamp, // 必填,生成签名的时间戳
            nonceStr: data.nonceStr, // 必填,生成签名的随机串
            signature:  data.signature, // 必填,签名
            jsApiList: [
              "onMenuShareAppMessage",
              "hideAllNonBaseMenuItem",
              "onMenuShareTimeline"
              ] // 必填,需要使用的JS接口列表
          });
        },
        error: function(data) {
          
        }
      });
      let targurl=location.href
      let msg=this.doctor.RegID
      let baseimgurl=this.$store.getters.getUrl
      wx.ready(function() {
          // if(type!=0){
          //     wx.hideAllNonBaseMenuItem({
          //         success:function(res){
          //         }
          //     });
          // }
          wx.onMenuShareAppMessage({ 
              title: '滦平县妇幼保健院挂号缴费平台', // 分享标题
              desc: msg, // 分享描述
              link: targurl, // 分享链接，该链接域名或路径必须与当前页面对应的公众号JS安全域名一致
              imgUrl: baseimgurl+'static/img/logo.18b2d33.jpg', // 分享图标
              
              success:function(res) { 
              }
          });
          wx.onMenuShareTimeline({
                title: '滦平县妇幼保健院挂号缴费平台', // 分享标题
                link: targurl, // 分享链接，该链接域名或路径必须与当前页面对应的公众号JS安全域名一致
                imgUrl: baseimgurl+'static/img/logo.18b2d33.jpg', // 分享图标
                success: function () {
                // 用户点击了分享后执行的回调函数
                },
          });

          /* 处理失败验证 */
          wx.error(function(res) {
            // config 信息验证失败会执行error函数,如签名过期导致验证失败,具体错误信息可以打开config的debug模式查看,也可以在返回的res参数中查看,对于SPA可以在这里更新签名
            // _this.$Message.error("配置验证失败: " + res.errMsg);
          });
      })
    },
    //获取医生信息
    getdoctorinfo() {
      //把就诊日期存储到vuex仓库
      var url = this.$store.getters.getUrl + "doctors/getDocSche.do";
      var _this = this;
      //获取链接里的医生编码参数
      var currentdepCode = _this.$store.getters.getdepCode;
      //发送请求获取当前医生详细的排班信息
      $.ajax({
        url: url,
        type: "post",
        dataType: "json",
        // async: false,
        data: { departid: currentdepCode },
        success: function(data) {
          _this.spinShow = false;
          if (data.Response.ResultCode == "1"&&data.Response.Item!=undefined) {
            //把返回的医生信息保存到doctor
            _this.doctor = data.Response.Item;
            _this.savedoctorinfo();
          } else {
            _this.$Modal.warning({
              title: "提示信息",
              content: "获取信息异常"
            });
          }
        },
        error: function(data) {
          //弹窗提示错误信息
          _this.spinShow = false;
          _this.$Modal.error({
            title: "提示信息",
            content: "请求失败"
          });
        }
      });
    },
    //查看医生详细信息
    doctorxinxi(){
      // $(".zhe").css("display","block");
      var that = this;
      var url = that.$store.getters.getUrl + "doctors/getdoctor.do";
      var doccode=that.$store.getters.getDoccode;
      $.ajax({
        url: url,
        type: "post",
        dataType: "json",
        data: {
          doccode: doccode
        },
        success:function(data){
          that.isshowloading = false;
          that.docxiang=data.data;
          if(data.data[0].expertjob!==undefined){
             that.jiajie=data.data[0].expertjob;
          }else{
            that.jiajie='无'
          }
        },
        error:function(data){
        }
      })
    },
  }
};
</script>

<style scoped>
.ivu-poptip-popper{
  top: 45px !important;
    left: 0px !important;
}
.pubtabbar {
  position: fixed;
  bottom: 0;
}

.appointmentPage {
  overflow: auto;
  padding: 0 0 70px 0;
}
.home-page {
  height: 100%;
  overflow: auto;
}
.tittle {
  background: #28b8a1;
  height: 50px;
  text-align: center;
  line-height: 50px;
  color: rgb(255, 255, 255);
  font-size: 16px;
  font-family: PingFangSC-regular;
  position: relative;
}
.pp{
   position: absolute;
  right: 10px;
  top: 0px;
}
.arrow-icon{
  position: absolute;
  left: 5px;
  top: 0px;
}
.doctorInfo {
  padding-left: 80px;
  position: relative;
  margin-top: 26px;
  border-bottom: 1px solid rgba(187, 187, 187, 1);
}
.doctorInfo .doctorName,
.doctorInfo .otherinfo {
  margin-bottom: 10px;
}
.doctorName {
  color: rgba(16, 16, 16, 1);
  font-size: 16px;
  font-family: PingFangSC-regular;
  font-weight: bolder;
}
.po{
  line-height: 2;
  display: inline-block;
  padding-left: 10px;
}
.otherinfo {
  color: rgba(16, 16, 16, 1);
  font-size: 14px;
  font-family: PingFangSC-regular;
  display: flex;
}
.otherinfo .otherinfo-title {
  flex-shrink: 0;
}
.otherinfo .otherinfo-text {
  padding-right: 18px;
}
.avatar {
  border-radius: 50%;
  top: 20px;
  width: 50px;
  height: 50px;
  position: absolute;
  left: 18px;
  top: 25px;
}
.avatar1 {
  border-radius: 50%;
    top: 5.33333vw;
    width: 13.33333vw;
    height: 13.33333vw;
    position: absolute;
        left: 0.8vw;
    top: -11.66667vw;
}
 
.date {
  display: flex;
  margin: 18px 0;
}
.date .date-left {
  display: flex;
  padding-right: 20px;
  margin: 0 10px;
  overflow: auto;
}
.date .date-left .dateitem {
  width: 60px;
  height: 60px;
  border-radius: 10px;
  background-color: rgba(40, 184, 161, 1);
  border: 1px solid rgba(187, 187, 187, 1);
  margin: 0 5px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  flex-shrink: 0;
}
.date .date-left .dateitem p {
  text-align: center;
  color: white;
}
.date-right {
  flex: 1;
  padding-top: 6px;
}
.date-right .text {
  color: rgba(16, 16, 16, 1);
  font-size: 16px;
  font-family: PingFangSC-regular;
  margin: 5px 0;
  text-align: center;
}
.date-right .iconwrraper {
  text-align: center;
}
.date-right .icon {
  display: inline-block;
  border-top: 9px solid rgba(187, 187, 187, 1);
  border-left: 9px solid transparent;
  border-right: 9px solid transparent;
}
.select-item {
  font-size: 14px;
  font-family: PingFangSC-regular;
  padding: 0 20px;
  height: 60px;
  line-height: 60px;
  border-bottom: 1px solid rgba(187, 187, 187, 1);
}
.calendar {
  text-align: center;
}
.weekwrraper {
  display: inline-block;
  text-align: left;
}
.weekwrraper > div {
  display: inline-block;
}
.weekwrraper .item {
  display: inline-block;
  width: 50px;
  text-align: center;
}
.daywrraper {
  display: inline-block;
}
.daywrraper > div {
  text-align: left;
  display: inline-block;
  width: 350px;
}
.daywrraper .item {
  display: inline-block;
  width: 50px;
  text-align: center;
}
.item-color {
  color: green;
}
.amstate {
  color: red;
}
.pmstate {
  color: red;
}
</style>