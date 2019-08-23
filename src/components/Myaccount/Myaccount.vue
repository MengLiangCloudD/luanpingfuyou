<template>
  <div style="height:100%">
    <div class="Myaccount-pag">
      <div class="tittle" style="background:#28b8a1;color:white">我的账户</div>
      <div class="content">
        <div class="zhe" style="width:100%;background: rgb(255, 255, 255);height: 100%;position: absolute;z-index: 900;" v-show="isshowmask" @click="clicusers()"></div>
        <div class="header" style="z-index:910;position:relative">
          <div class="userssss"  style="padding-left: 5%; border-bottom:1px solid #ccc;">
            <img src="./../../assets/头像.png" alt="" width="50px;" style="vertical-align: top;" >
            <div class="user" style="display: inline-block;vertical-align: top;margin-left:10px;">
              <p><span>患者姓名：</span><span>{{name}}</span></p>
              <p><span>患者卡号：</span><span>{{cardno}}</span></p>
              <p><span>身份证号：</span><span>{{idno}}</span></p>
              <svg :class="'barcodea'"></svg>
            </div>
            <div style="position: absolute;right: 7%;top: 35px;">
              <img src="./../../assets/更多.png" alt="" width="40px;" @click="clicusers()">
            </div>
          </div>
          <div class="userss" style="display:none;position:absolute;z-index:100;width:100%;height:0" v-show="showuserlist">
            <RadioGroup  v-model="index" size="large" style="width:100%;height:0" >
              <div class="users" v-for="(item,index) in myCardType"  :key="index" style="border-bottom:1px solid #ccc;padding-left: 5%;background:#fff;" @click="seledoctor(index)">
                <img src="./../../assets/头像.png" alt="" width="50px;" style="vertical-align: top;">
                <div class="user" style="display: inline-block;vertical-align: top;margin-left:10px;">
                  <p><span>患者姓名：</span><span>{{item.name}}</span></p>
                  <p><span>患者卡号：</span><span>{{item.cardno}}</span></p>
                  <p><span>身份证号：</span><span>{{item.idno}}</span></p>
                <svg :class="'barcode'+ index"></svg>
                </div>
                <Radio :label="index" style="float:right;margin-top:20px;margin-right: 8%;"><span style="display:none;"></span></Radio>
              </div>
            </RadioGroup>
          </div>
        </div>
        <p class="dang"></p>
      </div>
      <div class="content2">
        <p @click="goOrderList">
          <img src="./../../assets/guahao.png" alt width="24">
          <span>我的挂号</span>
        </p>
        <p @click="goMyCard">
          <img src="./../../assets/carder.png" alt width="24">
          <span>我的就诊卡</span>
        </p>
        <p @click="goMycase">
          <img src="./../../assets/bing.png" alt width="24">
          <span>我的病历</span>
        </p>
         <p @click="goMyprescription">
          <img src="./../../assets/chu.png" alt width="24">
          <span>药品处方</span>
        </p>
        <p @click="goMyincidentals">
          <img src="./../../assets/za.png" alt width="24">
          <span>检查处方</span>
        </p>
        <p @click="goLaboratory">
          <img src="./../../assets/huayan.png" alt width="24">
          <span>化验处方</span>
        </p>
        <p @click="goMyExamine">
          <img src="./../../assets/jian.png" alt width="24">
          <span>我的检查结果</span>
        </p>
        <p @click="goMyassay">
          <img src="./../../assets/hua.png" alt width="24">
          <span>我的化验结果</span>
        </p>
        <p @click="goMyCollect">
          <img src="./../../assets/guan.png" alt width="24">
          <span>我的关注</span>
        </p>
        <p @click="goMyValuation">
          <img src="./../../assets/icon_ping-95.png" alt width="24">
          <span>我的评价</span>
        </p>
      </div>
    </div>
    <tabbar class="pubtabbar"></tabbar>
     <loading v-show="spinShow" class="loading"></loading>
  </div>
</template>
<script>
//引入底部公共组件
import tabbar from "../../common/tabbar";
import JsBarcode from "jsbarcode";
//引人加载动画
import loading from "../../common/loading";
import {hidemenu} from "../../common/js/hide"
export default {
  name:'Myaccount',
  components: {
    tabbar,
    loading
  },
  mounted(){
    if(this.myCardType[0].cardno!=undefined){
        if(this.$store.getters.getusernums==''||this.$store.getters.getusernums==undefined){
          this.cardno= this.myCardType[0].cardno;
          this.idno= this.myCardType[0].idno;
          this.name=this.myCardType[0].name;
          localStorage.setItem('cardno',this.myCardType[0].cardno);
          localStorage.setItem('cardername',this.myCardType[0].name);
          this.index=0;
        }else{
          var index = parseInt(this.$store.getters.getusernums);
          this.index=index;
          this.cardno= this.myCardType[index].cardno;
          this.idno= this.myCardType[index].idno;
          this.name=this.myCardType[index].name;
          localStorage.setItem('cardno',this.myCardType[index].cardno);
          localStorage.setItem('cardername',this.myCardType[index].name);
        }
        // 调用生成条形码的方法
        this.setBarcode();
        this.setBarcodea();
    }else{
      this.$router.push("/authentication");
    }
    
    
  },
  created() {
    //调用渲染方法
    this.loding();
    var that=this;
    const requesturl=that.$store.getters.getUrl + "SweepCode.do";
    hidemenu(requesturl);
  },
  data() {
    return {
      //loading动画
      spinShow: false,
      //用户名称
      username: "",
      //用户电话
      phone: "",
      // 用户头像
      headimgurl: "",
      carderList:[],
      //用户就诊卡数据
      myCardType:[{},{},{}],
      // 姓名
      name:'',
      //卡号
      cardno:'',
      //身份证号
      idno:'',
      index:0,
      //控制出现
      showuserlist:false,
      isshowmask:false,//控制遮罩的显示
    };
  },
  methods: {
    
    //跳转到我的挂号订单页
    goOrderList() {
      this.$router.push("/orderList");
     
      //关闭加载动画
      // this.spinShow = true;
      // this.$Loading.finish();
    },
    //跳转到我的就诊卡
    goMyCard() {
      this.$router.push("/myCard");
      // 关闭加载动画
      // this.spinShow = true;
    },
    //跳转到我的关注页面
    goMyCollect() {
      this.$router.push("/myCollect");
      //关闭加载动画
      // this.spinShow = true;
    },
    goMyValuation() {
      this.$router.push("/Myevaluation");
      //关闭加载动画
      // this.spinShow = true;
    },
    //跳转到我的检查页面
    goMyExamine() {
      // this.$Loading.start();
      this.$router.push("/MyExamine");
      //关闭加载动画
      // this.spinShow = true;
      // this.$Loading.finish();
    },
    //跳转到我的病例
    goMycase() {
      // this.$Loading.start();
      this.$router.push("/Mycase");
      //关闭加载动画页面
      // this.spinShow = true;
      // this.$Loading.finish();
    },
    //药品处方
    goMyprescription() {
      // this.$Loading.start();
      this.$router.push("/Myprescription");
      //关闭加载动画
      // this.spinShow = true;
      // this.$Loading.finish();
    },
    //我的化验
    goMyassay(){
      //  this.$Loading.start();
      this.$router.push("/Myassay");
      //关闭加载动画
      // this.spinShow = true;
      // this.$Loading.finish();
    },
    //检查处方
    goMyincidentals(){
      //  this.$Loading.start();
      this.$router.push("/Myincidentals");
      //关闭加载动画
      // this.spinShow = true;
      // this.$Loading.finish();
    },
    //化验处方
    goLaboratory(){
      // this.$Loading.start();
      this.$router.push("/Laboratorys");
      //关闭加载动画
      // this.spinShow = true;
      // this.$Loading.finish();
    },
     //生成条形码集合
    setBarcode() {
      var that = this;
      for (var i = 0; i < that.myCardType.length; i++) {
        JsBarcode(".barcode" + i, that.myCardType[i].cardno, {
          height: 30,
          width: 2,
          displayValue: true,
          margin: 0,
          displayValue: false
        });
      }
    },
    //单个的生成条形码
    setBarcodea(){
       JsBarcode(".barcodea" , this.cardno, {
          height: 30,
          width: 2,
          displayValue: true,
          margin: 0,
          displayValue: false
        });
    },
    //查询患者就诊卡
    loding() {
      var url = this.$store.getters.getUrl + "card/getAllCards.do";
      this.doctorType = [];
      var doctorType = this.doctorType;
      var _this = this;
      var code = this.code;
      var openid = localStorage.getItem("openid");
      // _this.$Loading.start();
      $.ajax({
        url: url,
        type: "post",
        dataType: "json",
        async: false,
        data: { openid: openid},
        success: function(data){
          // _this.$Loading.finish();
          //返回回来的数据
          if(data.status==1&&data.data.length!==0){
            var maycard=[];
            for(var i =0;i<data.data.length;i++){
              if(data.data[i].stauts==1){
                maycard.push(data.data[i])
              }
            }
          _this.myCardType = maycard;
          }else if(data.data.length==0){
             _this.$router.push("/authentication");
          }else{
             _this.myCardType = [];
          }
        },
        error: function(data) {
           _this.$Modal.warning({
              title: "提示信息",
              content: "获取信息异常,请重新请求"
            });
        }
      });
    },
      //点击出现
    clicusers(){
      this.showuserlist=!this.showuserlist;
      this.isshowmask=!this.isshowmask;
      // $(".userss").css("display","block");
      // $(".users").css("transition","1s");
      // $(".users").css("height","auto");
      //  $(".zhe").css("display","block");
      // $(".ivu-radio-group").css("height","auto");
    },
    //点击消失
    sevcusers(){
      this.showuserlist=!this.showuserlist;
      alert(this.showuserlist);
      // $(".userss").css("display","none");
      //  $(".zhe").css("display","none");
    },
    //点击选择患者
    seledoctor(index){
      this.isshowmask=false;//隐藏遮罩层
      this.cardno=this.myCardType[index].cardno;
      this.idno=this.myCardType[index].idno;
      this.name=this.myCardType[index].name;
      this.index=index;
      this.$store.commit("setusernums", this.index);
      localStorage.setItem('cardno',this.cardno);
      localStorage.setItem('cardername',this.name);
      // $(".userss").css("display","none");
      this.showuserlist=!this.showuserlist;

      this.setBarcodea();
    },
    //用户个人中心
    userCentre() {}
  }
};
</script>

<style scoped>
.mask{
  height: 100%;
  width:100%;
  background: red;
  z-index: 95;
  position:absolute;
}
.pubtabbar {
  position: fixed;
  bottom: 0;
}
.Myaccount-pag {
  height: 100%;
  overflow: auto;
  padding: 0 0 50px 0;
}
.user p{
  line-height: 1.8;
}
.tittle {
  height: 50px;
  text-align: center;
  line-height: 50px;
  font-size: 20px;
  font-family: PingFangSC-regular;
}
.headerimage {
  vertical-align: middle;
  border-radius: 50%;
}
.name {
  vertical-align: middle;
  display: inline-block;
  padding-left: 10px;
  font-size: 18px;
}
.right {
  padding-left: 10%;
}
/* .header {
  padding-left: 10%;
} */
.header img,
header span {
  display: inline-block;
  vertical-align: middle;
}
.dang {
  padding-left: 62px;
}
.content {
  margin-top: 10px;
  /* padding-bottom: 10px; */
}
.content2{
    padding-bottom: 50px;
}
.content2 p img {
  vertical-align: middle;
}
.content2 p span {
  display: inline-block;
  vertical-align: middle;
  padding-left: 15px;
}
.content2 p {
  padding: 16px 10% 16px 10%;
  border-bottom: 1px solid #aaa;
  color: black;
}
.footer {
  text-align: center;
}
</style>