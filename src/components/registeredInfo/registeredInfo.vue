<template>
  <div class="pem">
    <div class="registeredInfo">
      <div class="tittle">
        滦平县妇幼保健院挂号平台
        <div class="arrow-icon" @click="tobackdetail">
            <Icon size="30" type="ios-arrow-back" />
        </div>
      </div>
      <div class="peopleNameTitle">
        <p style="display: inline-block;">
          就诊人:
          <!-- <span style="margin-left:20px;color:rgb(187,187,187)" v-if="isshowlist">请添加就诊人</span> -->
        </p>
        <div class="peopleList">
          <div
            class="list-item"
          >
            <div class="people-info">
              <div class="people-info-top">
                <div class="name">{{name}}</div>
                <div class="carno">{{cardno }}</div>
              </div>
              <div class="card-name">滦平县妇幼保健院就诊卡</div>
            </div>
          </div>
        </div>
      </div>
      <div class="addPeople" @click="addPeople">
        <Icon type="ios-add-circle"/>新增就诊人信息
      </div>
      <div class="registeredInfo-wrraper">
        <p class="registeredInfo-title">挂号信息</p>
        <p class="registeredInfo-item">
          <span class="item-title">就诊医院</span>
          <span class="item-text">滦平县妇幼保健院</span>
        </p>
        <p class="registeredInfo-item">
          <span class="item-title">就诊科室</span>
          <span class="item-text">{{depname}}</span>
        </p>
        <p class="registeredInfo-item">
          <span class="item-title">医事服务费</span>
          <span class="item-text">￥{{regprice}}</span>
        </p>
        <p class="registeredInfo-item">
          <span class="item-title">就诊日期</span>
          <span class="item-date">{{regDate}}</span>
        </p>
      </div>
      <div class="warning-info">
        <img src="../../assets/jing.png" alt width="18">
        <span>不支持工伤，特病患者微信挂号</span>
      </div>
      <div class="tip" @click="modal11 = true">
        挂号须知
        <div class="icon"></div>
      </div>
      <Modal v-model="modal11" fullscreen title="滦平妇幼保健院挂号须知">
        <div>
          <p>尊敬的各位患者及家属：</p>
          <p
            style="margin-top:20px"
          >为了给您提供便捷、舒心、有序的挂号就诊服务，承德市医院管理局和全部市属医院共同打造滦平妇幼服务平台，现将服务流程和规则介绍如下：</p>
          <p style="margin-top:20px">一、线上挂号</p>
          <p>1．同一个临时卡，只能锁定一个号源（即只能有一个待取号、待缴费的挂号记录）；</p>
          <p>2．同一账号，1天最多只能取消挂号2次，超过2次后，无法通过微信或自助机挂号，只能到医院窗口挂号;</p>
          <p>3．同一患者，同一天，同一就诊单元，同一科室（二级科室），同一医院，同一级别，只能挂1个号（已挂1个专家号，则还可挂1个普通号；若已挂1个普通号，则还可以挂1个普通号或1个专家号）；</p>
          <p>4．同一患者，同一自然周（星期一到星期日），最多可挂10个号，其中不超过5个专家号7.患者一个自然月内，最多可挂15个号，其中不超过10个专家号；</p>
          <p>5．同一患者，同一自然月（1－31日），最多可挂15个号，其中不超过10个专家号；</p>
          <p>6．同一患者，同一季度内（1月到3月），最多可挂30个号，其中不超过15个专家号；</p>
          <p>7．患者个人原因退号，所退号源仍占用挂号名额；因医生停诊、系统问题等导致的退号，不占用可挂号的名额。</p>
          <p style="margin-top:20px">二、自助机挂号、取号</p>
          <p>1．自助机预约挂号完成后会打印预约单，预约单不能作为就诊凭证使用，患者仍需于就诊当日在自助机上取号；</p>
          <p>2．自助机只支持患者就诊当天取号，不可提前取号；</p>
          <p>3．就诊当天，工作日上午号需在11:30前取号，下午号需在16:30前取号，周末上午号需在11:30前取号，下午号需在16:00前取号，未取号，视为爽约，该号不退不换。</p>
          <p style="margin-top:20px">三、支付</p>
          <p>1．为保证患者就诊权益，落实实名就诊要求，微信未绑定银行卡的患者不允许使用微信支付。</p>
          <p style="margin-top:20px">四、退号</p>
          <p>1．未到就诊当天可在线退号退费，就诊当天请到医院办理退号退费，逾期将不可办理退号退费；</p>
          <p>2．就诊当天，未取号，可在“候诊时间”段起始时间前在自助机办理；已取号，上午号凭挂号单需在11:30前窗口办理退号退费，下午号凭挂号单需在16:30前窗口办理退号退费，逾期将不可办理退号退费。</p>
          <p style="margin-top:20px">五、爽约</p>
          <p>1.爽约的定义</p>
          <p>就诊单元内未取号，视为爽约</p>
          <p>2.爽约规则</p>
          <p>（1）同一患者一个自然年内爽约3次，包含第三次爽约时间的91天内不可预约挂号（微信、自助机均不可预约挂号），仅能在自助机挂当天号</p>
          <p>（2）爽约次数会在下一自然年清零，重新计数</p>
          <p style="margin-top:20px">六、建卡</p>
          <p>在线建滦平妇幼临时卡和滦平社保卡预约开户请务必填写准确的实名信息，若线下核对信息与实际的不符，将不能领取滦平妇幼实体卡和关联滦平妇幼账户，从而无法就诊，由此带来的损失须本人承担。</p>
        </div>
      </Modal>
      <Modal v-model="ispayment"  @on-ok="toorderlist" title="挂号提示信息">
        <p>您有一个未支付的挂号订单</p>
      </Modal>
      <Modal v-model="paymented"  @on-ok="toorderlist" title="挂号提示信息">
        <p>您已存在一个支付成功的挂号订单</p>
      </Modal>
      <Modal v-model="weika"  @on-ok="weikas" title="挂号提示信息">
        <p>请先激活你的卡片</p>
      </Modal>
      <div class="bttn">
        <div class="btn" @click="topayment">确认挂号</div>
      </div>
    </div>
    <tabbar class="pubtabbar"></tabbar>
    <loading v-show="spinShow"></loading>
  </div>
</template>
<script>
import personicon from "../../common/personicon";
import loading from "../../common/loading";
import tabbar from "../../common/tabbar";
import {initwxshare} from "../../common/js/share"
import {hidemenu} from "../../common/js/hide"
export default {
  components: {
    personicon,
    loading,
    tabbar
  },
  data() {
    return {
      paymented:false,
      ispayment:false,
      //查到的所有卡
      allCrads: [],
      isshowlist: true,
      //loading动画
      spinShow: false,
      //就诊人选择的第几个，默认为第一个
      currentindex: 0,
      //就诊卡的集合
      peopleList: [],
      //科室
      depname: "",
      //就诊日期
      regDate: "",
      //就诊费用
      regprice: null,
      modal11: false,
      //确认挂号按钮是否可点击的状态
      clickstate: false,
      timeContro:false,
      name:'',
      cardno:'',
      weika:false
    };
  },
  created(){
    let that=this
    setTimeout(function(){
      const requesturl=that.$store.getters.getUrl + "SweepCode.do";
      hidemenu(requesturl);
    },10)
  },
  mounted() {
    this.spinShow = true;
    this.getAllCards();
    if(this.allCrads.length<=0){
      this.$router.push("/authentication");
    }else if(this.allCrads.length>0){
       if(this.peopleList.length<=0){
        this.weika=true;
      }
    }
    this.depname = this.$store.getters.getDepname;
    this.regDate = this.$store.getters.getRegdata;
    this.regprice = this.$store.getters.getRegprice;
    if(this.peopleList.length>0){
      if(this.$store.getters.getusernums==undefined||this.$store.getters.getusernums==''){
        this.name=this.peopleList[0].name;
        this.cardno=this.peopleList[0].cardno;
      }else{
        var index =parseInt(this.$store.getters.getusernums);
        this.name=this.peopleList[index].name;
        this.cardno=this.peopleList[index].cardno;
      }
    }
    
  },
  methods: {
    //返回上一层
      tobackdetail(){
          history.go(-1);
      },
    valiregistered(){
      let _this=this
      var url = this.$store.getters.getUrl + "register/getVerification.do";
      let cardno=this.$store.getters.getCardCode
      let doctorno =this.$store.getters.getDoccode;
      $.ajax({
        url: url,
        type: "POST",
        dataType: "json",
        async: true,
        data:{cardno:cardno,doctorno:doctorno},
        success: function(res){
          if(res.status=='1'){
              _this.ispayment=true
              _this.timeContro=false
          }else if(res.status=='2'){
              _this.ispayment=true
              _this.timeContro=false
          }else if(res.status=='-1'){
            _this.$Message.warning({
              content:'验证挂号异常',
              duration:1
            })
            let time2=setInterval(function(){
                _this.timeContro=false
                clearInterval(time2)
            },1200)
          }else{
            //如果clickstate为false改成true
            if(!_this.clickstate){
              this.clickstate = true;
              _this.insertcardinfo();
            }
          }
        },
        erroy: function(data) {
           _this.$Message.error('请求失败');
        }
      });
    },
    weikas(){
      this.$router.push("/myCard")
    },
    //选择就诊人
    select(index, item) {
      //改变列表的选择状态
      this.currentindex = index;
      //把就诊人卡号保存到vuex，用来查询患者的详细信息
      this.$store.commit("setName", item.name);
      //把卡号存到vuex
      this.$store.commit("setCardCode", item.cardno);
      //把身份证号存到vuex
      this.$store.commit("setPatientIdnumber", item.idno);
      //把性别存到vuex
      this.$store.commit("setPatientSex", item.sex);
    },
    //添加就诊人
    addPeople() {
      //去添加一张新卡
        this.$router.push("/authentication");
    },
    toorderlist(){
      this.ispayment=false
      this.paymented=false
      this.timeContro=false
      // this.insertcardinfo()
      this.$router.push("/orderList");
    },
    //点击确认挂号按钮触发
    topayment() {
      //判断已绑定的卡片数量是否为0
      if (this.peopleList == 0) {
        this.$Modal.info({
          title: "提示信息",
          content: "请选择一张就诊卡!"
        });
      } else {
        //开始插卡改成true，表示在clickstate为true的时候禁止用户再次点击
        if (!this.timeContro) {
          this.timeContro=true;
          this.valiregistered();
        } else {
          //这时clickstate的状态为true，禁止向后台发出请求
          return;
        }
      }
    },
    //向后台传入信息
    insertcardinfo() {
      let _this = this;
      var obj = {};
      obj.cardNo = this.$store.getters.getCardCode; //患者卡号
      obj.name = this.$store.getters.getName; //患者名字
      obj.sex = this.$store.getters.getPatientSex; //患者性别
      obj.id_no = this.$store.getters.getPatientIdnumber; //患者身份证号
      obj.regDate = this.$store.getters.getRegdata; //就诊日期
      obj.registerFee = this.$store.getters.getRegprice; //挂号费用
      obj.hosdepcode = this.$store.getters.getdepCode; //挂号科室编码
      obj.hosdepname = this.$store.getters.getDepname; //挂号科室名称
      obj.hosdocname = this.$store.getters.getDocName; //挂号医生姓名
      obj.hosdoccode = this.$store.getters.getDoccode; //挂号医生编号
      obj.regname = this.$store.getters.getRegcode; //号源名称
      obj.regcode = this.$store.getters.getRegcode; //号源编码
      obj.TimeRegion = this.$store.getters.getamprom; //白天昼夜
      obj.body = "微信挂号";
      //取到openid
      var openid = localStorage.getItem("openid");
      obj.openid = openid;
      //定义url地址
      var url = _this.$store.getters.getUrl + "register/Work.do";
      //打开动画加载
      _this.spinShow = true;
      
      $.ajax({
        url: url,
        type: "POST",
        dataType: "json",
        async: true,
        data: obj,
        success: function(res) {
          //关闭加载动画
          _this.spinShow = false;
          _this.clickstate = false;
          //保存订单号
          localStorage.setItem("tradeno", res.data); //保存订单号
           localStorage.setItem("body", "微信挂号"); //保存body
           localStorage.setItem("time", _this. getNowFormatDate());
          _this.$router.push("/payment"); //跳到支付页面
        },
        erroy: function(data) {
          _this.clickstate = false;
          //关闭加载动画
          _this.spinShow = false;
          _this.$Message.error('请求失败');
        }
      });
    },
    getNowFormatDate() {//获取当前时间
      var date = new Date();
      var seperator1 = "-";
      var seperator2 = ":";
      var month = date.getMonth() + 1<10? "0"+(date.getMonth() + 1):date.getMonth() + 1;
      var strDate = date.getDate()<10? "0" + date.getDate():date.getDate();
      var currentdate = date.getFullYear() + seperator1  + month  + seperator1  + strDate
          + " "  + date.getHours()  + seperator2  + date.getMinutes()
          + seperator2 + date.getSeconds();
      return currentdate;
    },
    //获取已有绑定卡的全部信息 保存 患者名字  身份证号 性别 卡号到vuex仓库
    _dealdata(data) {
      let _this = this;
      //如果返回的数据不为空
      if (data.data.length != 0) {
        //把所有查到的卡片放到一个数组里 为了判断用户已建过几张卡
        for (let i = 0; i < data.data.length; i++) {
          if(!localStorage.getItem('cardno')&&data.data.length>0){
              localStorage.setItem('cardno',data.data[0].cardno);
              localStorage.setItem('cardername',data.data[0].name);
              _this.$store.commit('setCardCode',data.data[0].cardno);
            }
          _this.allCrads.push(data.data[i]);
          
        }
        //添加状态码为1（状态码为1表示用户绑定的卡，0代表未绑定的卡，查到的所有卡都是用户已经创建的卡）的就诊人信息到peopleList数组，
        for (let i = 0; i < data.data.length; i++) {
          if (data.data[i].stauts == 1) {
            _this.peopleList.push(data.data[i]);
          }
        }
        //在加一层判断
        //如果peoplelist数组为空也就是返回数据里的所有卡片都是解绑的那就不做任何操作
        if (_this.peopleList != 0) {
          //隐藏添加就诊人的提示信息
          _this.isshowlist = false;
          if(_this.$store.getters.getusernums==undefined||_this.$store.getters.getusernums==''){
            var usernums=0;
          }else{
            var usernums=parseInt(_this.$store.getters.getusernums) ;
          }
          //默认选择第一个卡号
          _this.select(usernums, _this.peopleList[usernums]);
        } else {
          //如果查到的卡都是解绑的就显示添加就诊人的提示信息
          _this.isshowlist = true;
        }
      } else {
        //如果返回的卡数为0就不隐藏添加就诊人的提示信息
        _this.isshowlist = true;
        return;
      }
    },
    //只在页面加载时执行一次
    getAllCards() {
      //定义url地址
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
          //关闭加载动画
          _this.spinShow = false;
          //判断已有几张卡
          _this._dealdata(data);
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
      });
    }
  }
};
</script>
<style scoped>
.warning-info img,
.warning-info span {
  vertical-align: middle;
  display: inline-block;
}
.pem{
  height: 100%;
  overflow: auto;
}
.registeredInfo-wrraper {
  padding: 10px 0;
}
.pubtabbar {
  position: fixed;
  bottom: 0;
}
.registeredInfo {
  overflow: auto;
  padding: 0 0 70px 0;
}
.duihao-off {
  display: inline-block;
  width: 16px;
  height: 16px;
  transform: translateY(-50%);
  background: #28b8a1;
  border-radius: 50%;
  margin-top: 15px;
}
/* 患者就诊卡列表样式 */
.list-item {
  display: flex;
  border-bottom: 1px solid rgba(238, 238, 238, 1);
}
.people-info {
  display: flex;
  flex-direction: column;
  font-size: 14px;
}
.people-info .card-name {
  color: rgba(132, 132, 132, 1);
  font-size: 12px;
  text-align: left;
  padding-left: 10px;
  margin-top: 5px;
}
.people-info-top {
  color: rgba(16, 16, 16, 1);
  display: flex;
  line-height: 20px;
  height: 20px;
}
.people-info-top .name {
  padding: 0 10px;
  font-weight: bold;
  border-right: 1px solid rgb(160, 158, 158);
  line-height: 20px;
  height: 20px;
}
.people-info-top .carno {
  padding: 0 10px;
  line-height: 20px;
  height: 20px;
  color: rgb(43, 43, 43);
}
.select-icon {
  color: rgba(16, 16, 16, 1);
  width: 50px;
}
.select-icon img {
  margin-top: 15px;
}

/* .registeredInfo {
  overflow: auto;
} */
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
.arrow-icon{
  position: absolute;
  left: 5px;
  top: 0px;
}
/* 个人中心按钮 */
.personicon {
  position: absolute;
  top: 5px;
  right: 20px;
  border-radius: 50%;
}
.peopleNameTitle {
  color: rgba(16, 16, 16, 1);
  font-size: 14px;
  font-family: PingFangSC-regular;
  margin-left: 15px;
  margin-top: 10px;
  margin-bottom: 10px;
  /* padding: 10px 0; */
  position: relative;
}
.peoplelistwraaper {
  display: flex;
}
.tiptext {
  flex: 1;
  margin: 0 10px;
  color: rgba(255, 152, 0, 1);
  font-size: 12px;
  font-family: PingFangSC-regular;
  padding: 0 20px;
  text-align: center;
}
.btnicon {
  width: 60px;
  position: relative;
}
.btnicon img {
  width: 50px;
  position: absolute;
  top: -12px;
  left: 0;
}
.peopleList {
  /* width: 100%; */
  display: inline-block;
  text-align: right;
}
.peopleList > div {
  height: 50px;
  text-align: center;
  color: white;
}
.addPeople {
  color: rgba(40, 184, 161, 1);
  font-size: 14px;
  font-family: PingFangSC-regular;
  text-align: center;
  border-bottom: 9px solid rgb(187, 187, 187);
  padding-bottom: 9px;
}
.registeredInfo-item {
  padding: 5px 0;
}
.registeredInfo-item {
  font-size: 12px;
}
.registeredInfo-title {
  color: rgba(16, 16, 16, 1);
  font-size: 14px;
  margin-left: 15px;
  font-family: PingFangSC-regular;
}
.item-title {
  display: inline-block;
  width: 100px;
}
.item-text {
  color: rgba(16, 16, 16, 1);
  font-size: 12px;
  font-family: PingFangSC-regular;
}
.item-date {
  color: rgba(255, 152, 0, 1);
  font-size: 14px;
  font-family: PingFangSC-regular;
}
.registeredInfo-item {
  color: rgba(127, 127, 127, 1);
  font-size: 12px;
  margin-left: 15px;
  font-family: PingFangSC-regular;
}
.item-text {
  font-size: 12px;
}
.warning-info {
  color: rgba(255, 152, 0, 1);
  font-size: 12px;
  font-family: PingFangSC-regular;
  background: #eee;
  padding: 7px;
}
.tip {
  color: rgba(16, 16, 16, 1);
  font-size: 14px;
  position: relative;
  font-family: PingFangSC-regular;
  padding: 10px 0;
  padding-left: 15px;
}
.icon {
  display: inline-block;
  border-top: 9px solid transparent;
  border-left: 9px solid rgba(187, 187, 187, 1);
  border-bottom: 9px solid transparent;
  position: absolute;
  right: 20px;
  top: 14px;
  font-size: 14px；;
}
.btn {
  background: #28b8a1;
  /* height: 40px; */
  text-align: center;
  /* line-height: 40px; */
  color: rgb(255, 255, 255);
  font-size: 12px;
  font-family: PingFangSC-regular;
  /* border-radius: 40px; */
  width: 100%;
  padding: 10px 0;
  display: inline-block;
  z-index: 4;
}
.bttn {
  width: 100%;
  position: relative;
}
.ivu-btn {
  opacity: 0;
}
</style>