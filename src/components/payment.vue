<template>
  <div class="pem">
    <div class="paymentPage">
      <div class="title">
        <div class="arrow-icon" @click="tobackdetail">
          <Icon size="30" type="ios-arrow-back" />
      </div>
        滦平县妇幼保健院挂号平台
      </div>
      <div class="payment-show">
        <div class="payment-title">支付金额</div>
        <div class="payment-money">￥{{regprice}}</div>
        <p style="line-height:2;" class="b">请在<span class="a" style="color:orange;font-size:18px"></span>内完成支付，超时订单自动取消</p>
        <!-- <div class="payment-tips">
          请在
          <span style="color:orange">{{minute}}分{{second}}秒</span>之内支付完成，超时订单自动取消
        </div>-->
      </div>
      <div class="payment-mode">
        <img class="payment-img" src="../assets/WXpayment.png" alt>
        <span>微信支付</span>
        <img class="duihao-img" src="../assets/WXduihao.png">
      </div>
      <div class="btn">
        <div><button v-bind:disabled="isDisabl" class="add-btn"  id="getBrandWCPayRequest"> 立即支付</button> </div>
      </div>
    </div>
    <tabbar class="pubtabbar"></tabbar>
  </div>
</template>

<script>
import tabbar from "../common/tabbar";
import loading from ".././common/loading";
 
export default {
  components: {
    loading,
    tabbar
  },
  data() {
    return {
      duihaoFlag: false,
      regprice: null,
      paymentdata: {},
      //加载动画
      spinShow: false,
      minutes: 5,
      seconds: 0,
      websocket:'',
      isDisabl:false
    };
  },
  mounted(){
    let _this = this;
    //判断是否需要启动倒计时
    if(localStorage.getItem('body')=='微信挂号'){
        _this.timeFns(localStorage.getItem('time'));
    }else{
      $('.b').html('');
    }
   
    _this.spinShow = true;
    _this.regprice = _this.$store.getters.getRegprice;
    //  _this.regprice = '0.1';
   
    $(function() {
      newpay();
    });
    function newpay() {
      var fee = _this.$store.getters.getRegprice; //费用
      // var fee = '0.1'; //费用
      var openid = localStorage.getItem("openid"); //用户的openid
      var cardNo = _this.$store.getters.getCardCode; //用户卡号
      var tradeno = localStorage.getItem("tradeno"); //用户订单号
      var body = localStorage.getItem("body"); //body支付费用的描述信息
      var data =
        "openid=" +
        openid +
        "&fee=" +
        fee +
        "&body=" +
        body +
        "&cardno=" +
        cardNo +
        "&tradeno=" +
        tradeno;
      let url = _this.$store.getters.getUrl + "wxnewpay.do";
      $.ajax({
        url: url,
        type: "post",
        data: data,
        dataType: "json",
        // async: false,
        success: function(json) {
          //调用wxnewpay接口成功后去执行onBridgeReady方法进行支付
          _this.spinShow = false;
          onBridgeReady(json);
        },
        error: function(e) {
          _this.spinShow = false;
          _this.$Modal.error({
            title: "提示信息",
            content: "请求失败!"
          });
        }
      });
    }
    function onBridgeReady(json) {
      document
        .getElementById("getBrandWCPayRequest")
        .addEventListener("click", function() {
          //如果费用不为0
          if (_this.$store.getters.getRegprice!= 0) {
            WeixinJSBridge.invoke(
              "getBrandWCPayRequest",
              {
                appId: json.appId, //公众号名称，由商户传入
                timeStamp: json.timeStamp, //时间戳，自1970年以来的秒数
                nonceStr: json.nonceStr, //随机串
                package: json.package,
                signType: json.signType, //微信签名方式：
                paySign: json.paySign //微信签名
              },
              function(e) {
                if(e.err_msg == "get_brand_wcpay_request:ok" ){
                  if(localStorage.getItem("body")=='微信挂号'){
                    var url =_this.$store.getters.getUrl+'register/addRegister.do';
                     var tradeno = localStorage.getItem("tradeno");
                     var cardno  = localStorage.getItem('cardno');
                     var hosdoccode =_this.$store.getters.getDoccode; //挂号医生编号
                          _this.spinShow = true;
                    $.ajax({
                      type:"post",
                      url:url,
                      dataType:'json',
                      // async:false,
                      data:{
                      orderno:tradeno,
                      hosdoccode:hosdoccode,
                      cardno:cardno
                      },
                       success:function(data){
                         _this.spinShow = false;
                         if(data.status==1){
                            window.location.href =_this.$store.getters.getUrl + "#/reportss";
                         }else if(data.status==-1){
                           _this.isDisabl=true;
                            $('.b').html('支付异常请重新挂号');
                           alert('支付异常请重新挂号');
                            
                         }else if(data.status==0){
                           _this.isDisabl=true;
                            $('.b').html('挂号失败，请重新挂号');
                           alert('挂号失败，请重新挂号');
                         }
                       },
                       error:function(data){
                         _this.spinShow = false;
                       }
                    })
                  }else if(localStorage.getItem("body")=="微信处方"){
                      // var url =_this.$store.getters.getUrl+'prescription/Modifyorders.do';
                      //   var tradeno = localStorage.getItem("tradeno");
                      //     _this.spinShow = true;
                      //     $.ajax({
                      //       type:"post",
                      //       url:url,
                      //       dataType:'json',
                      //       // async:false,
                      //       data:{
                      //         tradeno:tradeno
                      //       },
                      //       success:function(data){
                            
                      //         if(data.status==1){
                                //插入数据\
                              var url = _this.$store.getters.getUrl+ 'prescription/PayBillTrade.do';
                              var obj=JSON.parse(localStorage.getItem("obj"));
                              obj.tradeno=localStorage.getItem("tradeno");
                              $.ajax({
                                type:"post",
                                url:url,
                                dataType:'json',
                                //async:false,
                                data:obj,
                                success:function(data){
                                  if(data.Response.ResultCode==1){
                                      localStorage.setItem('RecipeID',data.Response.Recipe.RecipeID);
                                      var jsonObj=JSON.stringify(data.Response)
                                      localStorage.setItem('jsonObj',jsonObj);
                                      _this.spinShow = false;
                                      //支付成功后将处方状态修改
                                  window.location.href =_this.$store.getters.getUrl + "#/reportss";
                                  }
                                  if(data.Response.ResultCode==0){
                                  var url =_this.$store.getters.getUrl+'prescriptionRefund.do';
                                  var tradeno = localStorage.getItem("tradeno");
                                  _this.spinShow = true;
                                  $.ajax({
                                    type:"post",
                                      url:url,
                                      dataType:'json',
                                      // async:false,
                                      data:{
                                        tradeno:tradeno
                                      },
                                      success:function(data){
                                          _this.spinShow = false;
                                        if(data.status=1){
                                          _this.$Message.error('支付失败请重新支付');
                                        }
                                      },
                                      error:function(data){
                                        _this.spinShow = false;
                                      }
                                  }) 
                                  }
                                  
                                },
                                error:function(data){
                                  _this.spinShow = false;
                                }
                              })
                              // } if(data.status==0){
                              //   _this.$Message.error(data.message);
                              // } if(data.status==-1){
                              //   _this.$Message.error(data.message);
                              // }
                            // },
                            // error:function(data){
                            //   _this.spinShow = false;
                            // }
                          // })
                  
                  }
                }else{
                  alert('支付失败');
                }
                
              }
            );
          } else {
            //如果费用为0
             if(localStorage.getItem("body")=='微信挂号'){
                  window.location.href = _this.$store.getters.getUrl + "#/orderList";
             }else if(localStorage.getItem("body")=="微信处方"){
                  window.location.href =_this.$store.getters.getUrl + "#/reportss";
             }
          }
        });
    }
  },
  methods: {
    //返回上一层
      tobackdetail(){
          history.go(-1);
      },
    //倒计时
     daojis(){
        var that=this;
        setTimeout(function () {
            that.timeFns(localStorage.getItem('time'))
        }, 1000)
      },
      // 计算两个时间差 dateBegin 开始时间
    timeFns(time) {
        var dateBegin= new Date(time.replace(new RegExp(/-/gm) ,"/")).getTime();
        var dateEnd = new Date();//获取当前时间
        var dateDiff = dateEnd.getTime() - dateBegin;//时间差的毫秒数
        var dayDiff = parseInt(dateDiff / (24 * 3600 * 1000));//计算出相差天数
        var leave1=dateDiff%(24*3600*1000)  //计算天数后剩余的毫秒数
        var hours=parseInt(leave1/(3600*1000))//计算出小时数
        //计算相差分钟数
        var leave2=leave1%(3600*1000)  //计算小时数后剩余的毫秒数
        var minutes=parseInt(leave2/(60*1000))//计算相差分钟数
        //计算相差秒数
        var leave3=leave2%(60*1000)   //计算分钟数后剩余的毫秒数
        var seconds=Math.round(leave3/1000)
        var leave4=leave3%(60*1000)   //计算分钟数后剩余的毫秒数
        var minseconds=Math.round(leave4/1000);
        if(dayDiff==0){
          var a = hours * 60 * 60 + minutes* 60  + seconds; 
          var shengyu = 300 - parseInt(a);
        }else{
          return ''
        }
        var day = parseInt( shengyu/ (24*3600) ); // Math.floor()向下取整 
        var hour = parseInt( (shengyu - day*24*3600) / 3600); 
        var minute = parseInt( (shengyu - day*24*3600 - hour*3600) /60 ); 
        var second = shengyu - day * 24 * 3600 - hour*3600 - minute*60;
        if(shengyu>0){
          this.daojis()
            if(minute<10){
              minute='0' + minute;
            }
            if(second<10){
              second='0' + second;
            }
             $('.a').html(minute + ':'+ second);
          
        // return minute + ':'+ second;
        }else{
            // b[i].innerHTML='';
            this.isDisabl=true;
            $('.b').html('支付超时，请重新挂号');
        }
         
      },
    toorderlist() {
      this.$router.push("/orderList");
    }
  }
};
</script>

<style scoped>
.pubtabbar {
  position: fixed;
  bottom: 0;
}
.paymentPage {
  overflow: auto;
}
.pem{
  height: 100%;
  overflow: auto;
}
.title {
  background: #28b8a1;
  height: 50px;
  text-align: center;
  line-height: 50px;
  color: rgb(255, 255, 255);
  font-size: 16px;
  font-family: PingFangSC-regular;
}
.arrow-icon{
  position: absolute;
  left: 5px;
  top: 0px;
}
.payment-show {
  padding-top: 20px;
  text-align: center;
  border-bottom: 20px solid rgb(204, 204, 204);
  line-height: 60px;
}
.payment-title {
  font-family: PingFangSC;
  font-weight: 400;
  font-size: 18px;
  color: rgb(16, 16, 16);
}
.payment-money {
  font-weight: 400;
  font-size: 30px;
  color: rgba(255, 152, 0, 1);
}
.payment-tips {
  font-weight: 400;
  font-size: 14px;
  color: rgb(16, 16, 16);
}

.add-btn {
  width: 60%;
  border-radius: 40px;
  text-align: center;
  background-color: rgb(40, 184, 161);
  font-family: PingFangSC;
  font-weight: 400;
  font-size: 16px;
  color: rgba(255, 255, 255, 1);
  display: inline-block;
  padding: 7px 0;
  border: 0;
outline: none;
}
.btn {
  width: 100%;
  /* position: fixed; */
  text-align: center;
  margin-top: 100px;
}
.payment-mode {
  font-family: PingFangSC;
  font-weight: 400;
  font-size: 20px;
  color: rgb(16, 16, 16);
  border-bottom: 1px solid rgb(204, 204, 204);
  border-top: 1px solid rgb(204, 204, 204);
  height: 100px;
  line-height: 100px;
  text-align: center;
  position: relative;
}
.payment-img {
  width: 40px;
  height: 40px;
  position: absolute;
  top: 50%;
  left: 5%;
  transform: translateY(-50%);
}
.duihao-img {
  width: 20px;
  height: 20px;
  position: absolute;
  top: 50%;
  right: 5%;
  transform: translateY(-50%);
  z-index: 100;
}
.duihao-off {
  width: 20px;
  height: 20px;
  position: absolute;
  top: 50%;
  right: 10%;
  transform: translateY(-50%);
  background: #28b8a1;
  border-radius: 50%;
}
</style>