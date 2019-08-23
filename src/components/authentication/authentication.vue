<template>
  <div class="RegistrationJianKa-page">
    
    <div class="title" v-if="isbinen">
      <div class="arrow-icon" @click="tobackdetail">
          <Icon size="30" type="ios-arrow-back" />
      </div>
      身份验证
      <!-- <span class="tto" style="color: #fff;;font-size:18px; " @click="qiehuan()">绑卡</span> -->
    </div>
    <!-- 绑卡切换 -->
    <!-- <div class="title" v-if="!isbinen">
      <div class="arrow-icon" @click="tobackdetail">
          <Icon size="30" type="ios-arrow-back" />
      </div>
      绑定就诊卡
      <span class="tto" style="color: #fff;;font-size:18px; " @click="qiehuan()">建卡</span>
    </div> -->
    <div class="nav">请填写就诊人基本信息</div>
    <div class="inp">
      <p>
        <label for="name">姓名</label>
        <input type="text" name id="name" class="name" placeholder="请输入姓名" v-model="Name"  @input="ischange()" @blur.prevent="inputLoseFocus">
      </p>
      <p>
        <label for="IdNumber">证件号码</label>
        <input type="text" name id="IdNumber" class="name" placeholder="请输入证件号码" v-model="IdNumber" @input="ischange()" @blur.prevent="inputLoseFocus">
      </p>
    </div>
    <div class="nav">就诊人联系电话</div>
    <div class="inp">
      <p>
        <label for="phoneNumber">联系电话</label>
        <input
          type="number" pattern="\d*"
          name
          id="phoneNumber"
          placeholder="填写就诊人手机号"
          v-model="phoneNumber"
          @input="ischange()"
          @blur.prevent="inputLoseFocus"
          class="name"
        >
        <ul style="text-align: right; padding-right:7%; list-style-type:none;font-size:16px">
      </ul>
      </p>
      <p>
        <label for="authCode">验证码</label>
        <span class="span">
          <input  type="number" pattern="\d*" name id="authCode" class="name" placeholder="填写验证码" v-model="authCode" @input="ischange()" @blur.prevent="inputLoseFocus">
          <button @click="verifyclick()" 
           v-bind:disabled="isSend"
          >
            <span v-if="sendMsgDisabled">{{time+'秒后获取'}}</span>
            <span v-if="!sendMsgDisabled">获取验证码</span></button>
        </span>
      </p>
    </div>
    <div>
        
    </div>
    <div class="butn">
      <button
       class="sub-btn"
       @click="verifyBtn()"
       ref="subBtn"
       v-bind:disabled="isDisabl"
       >{{isbinen?'提交':'绑卡'}}</button>
    </div>
   <label for="" style="display:block;color:#EE9A00; margin-top:50px;"><img src="./../../assets/wen.png" alt="" width="20"> 温馨提示：</label>
        <p style="border:0;color:#aaa;padding:0 ;text-indent:1em;">
          感谢您的信任，关注本院公众号，请您如实填写上述信息以方便您之后享受我们提供的服务，祝您愉快!</p>
    <Modal
        v-model="erromodal"
        title="提示">
        <p>该用户已存在,禁止重复建卡!</p>
    </Modal>
    <loading v-show="spinShow"></loading>
  </div>
  
</template>
<script>
import loading from '../../common/loading'
import {hidemenu} from "../../common/js/hide"
export default {
  name:'authentication',
  components: {
    loading
  },
  mounted(){
    let _this=this
    const requesturl=_this.$store.getters.getUrl + "SweepCode.do";
    hidemenu(requesturl);
  },
  data() {
    return {
      erromodal:false,
      Name: "", //姓名
      IdNumber: "", //证件号码
      phoneNumber: "", //电话
      authCode: "", //验证码
      cuow: "",
      time:60,
      sendMsgDisabled: false,
      isList:[],//控制按钮变色需要的数组
      n:0,//按钮变色变量
      isDisabl:true,
      isSend:false,//控制验证码按钮能不能点击
      //控制加载动画的显示
      spinShow: false,
      isbinen:true
    };
  },
  methods: {
    //返回上一层
      tobackdetail(){
        if(location.hash.indexOf('myCard')!=-1){
          history.go(-1);
        }else{
          history.go(-2);
        }
          
      },
      //建卡切换
      qiehuan(){
          this.isbinen=!this.isbinen;
          $('.name').val('');
          this.Name=''; //姓名
          this.IdNumber='';  //证件号码
          this.phoneNumber=''; //电话
          this.authCode='';
      },
    //val是指输入框的总数量
    ischange:function () {
        let val = 0;
        this.isList[0]=this.Name;
        this.isList[1]=this.IdNumber;
        this.isList[2]=this.phoneNumber;
        this.isList[3]=this.authCode;
        this.isList.forEach(item => {
                ++val;
        });              
        this.n = 0;
        this.isList.forEach(item => {
            //inp框中的值可能被清空
            if(item!==''){
                ++this.n;
            }
        });
        if(this.n>=val){
            this.$refs.subBtn.className='sub-btn sub-btn-greed';
            // --n;
            this.isDisabl = false;
        }else{
            this.$refs.subBtn.className='sub-btn';
            this.isDisabl = true;
        }
    },
    //弹出键盘问题
    inputLoseFocus() {
        setTimeout(() => {
          window.scrollTo(0, 0);
        }, 100);
      },
    //提交验证
    verifyBtn(){
        var _this = this;
        if (_this.Name == '') {
              _this.btnTimer("姓名不能为空",0);
              return
          } else if (!/^[\u4E00-\u9FA5A-Za-z]+$/.test(_this.Name)) {
              _this.btnTimer("请输入正确的姓名格式",1);
              return
          }else
         if (_this.IdNumber == '') {
              _this.btnTimer("身份证号不能为空",0);
              return
          } else if (!/^[1-9]\d{7}((0\d)|(1[0-2]))(([0|1|2]\d)|3[0-1])\d{3}$|^[1-9]\d{5}[1-9]\d{3}((0\d)|(1[0-2]))(([0|1|2]\d)|3[0-1])\d{3}([0-9]|X)$/.test(_this.IdNumber)) {
              _this.btnTimer("请输入正确的证件格式",1);
              return
          } else
        if (_this.phoneNumber == '') {
              _this.btnTimer("手机号不能为空",0);
              return
          } else if (!/^1[34578]\d{9}$/.test(_this.phoneNumber)) {
              _this.btnTimer("请输入正确的手机号",1);
              return
          } else
        if (_this.authCode == '') {
              _this.btnTimer("验证码不能为空",0);
              return
            } else if (!/^\d{6,6}$/.test(_this.authCode)) {
              // } else if (0) {
              _this.btnTimer("请输入正确的验证码",1);
              return
            } else 
        if(_this.Name == ''||_this.IdNumber == ''||_this.phoneNumber == ''||_this.authCode == ''){
            _this.btnTimer("请将信息填写完整",0);
            return
        }else if(!/^[\u4E00-\u9FA5A-Za-z]+$/.test(_this.Name)||!/^[1-9]\d{7}((0\d)|(1[0-2]))(([0|1|2]\d)|3[0-1])\d{3}$|^[1-9]\d{5}[1-9]\d{3}((0\d)|(1[0-2]))(([0|1|2]\d)|3[0-1])\d{3}([0-9]|X)$/.test(_this.IdNumber)||!/^1[34578]\d{9}$/.test(_this.phoneNumber)||!/^\d{6,6}$/.test(_this.authCode)){
            _this.btnTimer("请输入正确格式的信息",1);
            return
        }
        else{
          
          var name= _this.Name//姓名
          var idNo= _this.IdNumber//身份证号
          var phone= _this.phoneNumber//电话
          var authCode= _this.authCode//验证码
          var openid=localStorage.getItem('openid') //openid
          _this.spinShow=true;
          
          if(_this.isbinen){
                var url = _this.$store.getters.getUrl+"builbin/insertCard.do";
                $.ajax({
                    url: url,
                    type: "post",
                    dataType: "json",
                    async: true,
                    data: {
                        name:name,
                        idno:idNo,
                        phone:phone,
                        code:authCode,
                        openid:openid
                    },
                    success: function(data) {
                    _this.spinShow=false;
                    //返回数据后关闭加载动画
                        if(data.status=="1"){
                            if(data.data == '1'){
                                _this.erromodal=true;
                                $('.name').val('');
                                _this.Name=''; //姓名
                                _this.IdNumber='';  //证件号码
                                _this.phoneNumber=''; //电话
                                _this.authCode='';
                            }else{
                              // 登录成功后，返回上次进入的页面；
                              _this.$Message.info(data.message);
                               $('.name').val('');
                                _this.Name=''; //姓名
                                _this.IdNumber='';  //证件号码
                                _this.phoneNumber=''; //电话
                                _this.authCode='';
                              history.go(-1);
                            }  
                        }else{
                            if(data==1&&data.status==0){
                                _this.$Message.info(data.message);
                                _this.isbinen=!_this.isbinen;
                            }else{
                                _this.$Message.info(data.message);
                            }
                        }
                    },
                    error: function(data) {
                       _this.spinShow=false;
                        _this.$Message.error('请求失败!');
                    }
                });
          }else if(!_this.isbinen){
              var url = _this.$store.getters.getUrl+"builbin/updateBinding.do";
                $.ajax({
                    url: url,
                    type: "post",
                    dataType: "json",
                    async: true,
                    data: {
                        name:name,
                        idno:idNo,
                        phone:phone,
                        code:authCode,
                        openid:openid
                    },
                    success: function(data) {
                    _this.spinShow=false;
                    //返回数据后关闭加载动画
                        if(data.status=="1"){
                            _this.erromodal=true
                            _this.$Message.info(data.message);
                            _this.$router.push("/home");
                        }else{
                            if(data==1&&data.status==0){
                                _this.$Message.info(data.message);
                                _this.isbinen=!_this.isbinen;
                            }else{
                                 $('.name').val('');
                                _this.Name=''; //姓名
                                _this.IdNumber='';  //证件号码
                                _this.phoneNumber=''; //电话
                                _this.authCode='';
                                 _this.$Message.info(data.message);

                            }
                        }
                    },
                    error: function(data) {
                       _this.spinShow=false;
                        _this.$Message.error('请求失败!');
                    }
                });
          }
         
        }
    },
    //获取验证码
    verifyclick(){
      var _this = this;
      var time= _this.time;
      var url= _this.$store.getters.getUrl + "code/sendcode.do";
      var phone= _this.phoneNumber;
      if (_this.phoneNumber == '') {
              _this.btnTimer("手机号不能为空",0);
          } else if (!/^1[34578]\d{9}$/.test(_this.phoneNumber)) {
              _this.btnTimer("请输入正确的手机号",1);
          }else{
            _this.send();
            $.ajax({
              url: url,
              type: "post",
              dataType: "json",
              // async: false,
              data: {
                  phone:phone,
              },
              success: function(data) {
                if(data.status==1){
                   _this.$Message.success('验证码获取成功');
                }else if(data.status==0){
                     _this.$Message.success('验证码获取失败');
                }else if(data.status==2){
                   _this.$Message.success('验证码获取异常，请重新获取');
                }
              
              },
              error: function(data) {
                _this.$Message.error('请求发送失败！')
              }
            });
          }
    },
    //倒计时
    send() {
        var me = this;
        if(!me.sendMsgDisabled){
        me.sendMsgDisabled = true;
        me.isSend = true;
        var interval = setInterval(function() {
         if (me.time<= 0) {
          me.time = 60;
          me.sendMsgDisabled = false;
          me.isSend = false;
          clearTimeout(interval);
         }else{
           me.time--
         }
        }, 1000);
      }
      
    },
    //按钮弹窗在点击后1.5秒不能再次弹出（1.5秒是弹窗默认出现消失的时间）
    //第一个text是弹窗内的文本 必须是字符串
    //第二个参数是弹窗类型 0/1/2 警告/错误/成功
    //全局必须有一个控制按钮可不可点击的属性 isDisabl:false,
    btnTimer(text,type){
      //警告窗口
      let timer = null;//控制按钮在弹窗结束前多次点击无效
      let n = 0;
      let _this = this;
      _this.isDisabl = true;
      _this.isSend = true;
        if(_this.isDisabl == true){
           if(type === 0){
             _this.$Message.warning(text);
           }else if(type == 1){
             _this.$Message.error(text);
           }else if(type == 2){
             _this.$Message.success(text);
           }
          timer = setInterval(function(){
            if(n<1){
              _this.isDisabl = true;
              _this.isSend = true;
              n = n+1;
            }else{
              n = 0;
              _this.isDisabl = false;
              _this.isSend = false;
              clearInterval(timer);
            }
          },1400)
        }
    }
  }
};
</script>

<style scoped>
.RegistrationJianKa-page {
  height: 100%;
  overflow: auto;
}
.title {
  background: rgb(255, 255, 255);
  height: 50px;
  text-align: center;
  line-height: 50px;
  color: white;
  font-size: 20px;
  font-family: PingFangSC-regular;
  background: #28b8a1;
  position: relative;
}
.arrow-icon{
  position: absolute;
  left: 5px;
  top: 0px;
}
.tto{
  position: absolute;
  right: 5%;
}
.nav {
  background: #bbb;
  padding: 10px 0 10px 10px;
  color: #ff9800;
}
label {
  color: #000;
  font-weight: 800;
  font-size: 20px;
}
p > input {
  border: 0;
  position: absolute;
  right: 3%;
  height: 30px;
  font-size: 18px;
  outline: none;
  width: 65%;
}
.span {
  position: absolute;
  right: 3%;
  text-align: right;
}
.span > input {
  font-size: 18px;
  height: 30px;
  width: 44%;
  border: 0;
  outline: none;
}
button {
  font-size: 18px;
  color: #28b8a1;
  outline: none;
  border: 0;
  background: #fff;
  border-left: 1px solid #bbb;
  padding-left: 10px;
}
p {
  position: relative;
  padding: 10px 7px;
  text-align: left;
  border-bottom: 1px solid #bbb;
}
select {
  position: absolute;
  right: 7%;
  height: 30px;
  font-size: 18px;
  width: 58%;
  border: 0;
  background: #fff;
  outline: none;
  /* float: right; */
  /* height: 40px; */
}
.butn {
  text-align: center;
  margin-top: 40px;
}
/* .btn {
  background: #28b8a1;
  color: #fff;
  padding: 6px 50px;
  border-radius: 20px;
} */
.sub-btn {
  width: 300px;
  height: 40px;
  line-height: 40px;
  color: rgba(255, 255, 255, 1);
  font-weight: 400;
  font-size: 20px;
  text-align: center;
  background-color: rgb(127, 127, 127);
  z-index: 99;
  
}
.sub-btn-greed {
  background-color: rgb(40, 184, 161);
}
</style>