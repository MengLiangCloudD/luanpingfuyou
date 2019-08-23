<template>
  <div class="tabbar">
    <div class="tabitem" :class="{active:currentindex==0}" @click="getpath(0)">
      <Badge :count="num" :offset="[10,25]" :overflow-count="99" v-if="xian">
        <a href="#" class="demo-badge" style="position: absolute;">
        </a>
    </Badge>
     <Icon class="tabicon" type="ios-call"/>
      <span class="text" >诊疗</span>
    </div>
    <div class="tabitem" :class="{active:currentindex==1}" @click="getpath(1)">
      <Icon class="tabicon" type="ios-home"/>
      <span class="text">找医生</span>
    </div>
    <div class="tabitem" :class="{active:currentindex==2}" @click="getpath(2)">
      <Icon class="tabicon" type="ios-cube-outline"/>
      <span class="text">发现</span>
    </div>
    <div class="tabitem" :class="{active:currentindex==3}" @click="getpath(3)">
      <Icon class="tabicon" type="ios-person"/>
      <span class="text">我的</span>
    </div>
    <div style="height:0px;width:0;">
      {{iscradno}}
    </div>
  </div>
</template>
<script>
var heartCheck = {
          timeout: 20000,        //20秒发一次心跳
          timeoutObj: null,
          serverTimeoutObj: null,
          reset: function(){
              clearTimeout(this.timeoutObj);
              clearTimeout(this.serverTimeoutObj);
              return this;
          },
          start: function(){
              var self = this;
              this.timeoutObj = setTimeout(function(){
                  //这里发送一个心跳，后端收到后，返回一个心跳消息，
                  //onmessage拿到返回的心跳就说明连接正常
                  window.websocketobj.send(JSON.stringify({cardno:localStorage.getItem('cardno'),massege:'ping'}));
                  self.serverTimeoutObj = setTimeout(function(){//如果超过一定时间还没重置，说明后端主动断开了
                      window.websocketobj.close();     //如果onclose会执行reconnect，我们执行ws.close()就行了.如果直接执行reconnect 会触发onclose导致重连两次
                  }, self.timeout)
              }, this.timeout)
          }
      }
import {config} from '../config'  
export default {
  data() {
    return {
      currentindex: 1,
      xian:true,
      lockReconnect:false
    };
  },
  watch: {
    
  },
  methods: {
    //判断选中的是哪一个
    getpath(index) {
      this.fetchnum();
      if (index == 0) {
        this.$router.push("/reportss");
        let num=localStorage.getItem('hzwsnum');
        this.$store.commit("setnum", 0);
        localStorage.setItem('hzwsnum',0)
        this.fresh(num)
        //如果为1则跳转到首页
      } else if (index == 1) {
        this.$router.push("/home");
      } else if (index == 2) {
        //如果为3跳转到我的账号页
      } else if (index == 3) {
        this.$router.push("/Myaccount");
      }
      
    },
    initwesocket(cardno){
        if(!localStorage.getItem('cardno')){
            return
        }
         let _this=this
         window.websocketobj=null
          let websocket
          // setInterval(() => {
          //    if ('WebSocket' in window) { 
          //     websocket= new WebSocket("ws://" + 'zhangshenggui.natapp1.cc'+ "/websocket/" +cardno); 
          // } else {  
          // }  
          // }, 3000);
          var wsUrl = "ws://" + config.url+ "/websocket/" +localStorage.getItem('cardno');
          if ('WebSocket' in window) { 
              websocket= new WebSocket("ws://" +config.url+ "/websocket/" +cardno); 
          } else {  
          }  
          //连接发生错误的回调方法
          websocket.onerror = function(e) { 
             _this.reconnect(wsUrl); 
          };
          //连接成功建立的回调方法  
          websocket.onopen = function() {  
              heartCheck.reset().start();  
          }  
          
          //接收到消息的回调方法  
          websocket.onmessage = function(event) {
            //  heartCheck.reset().start();  
              var info=event.data.split(",");
              if(event.data!=''){
                const num=_this.$store.getters.getnum+1;
                  localStorage.setItem('hzwsnum',num)
                  _this.$store.commit("setnum", num);
              }
          }  
              
              //连接关闭的回调方法  
          websocket.onclose = function(e) {  
             _this.reconnect(wsUrl);
              window.websocketobj=null
              
                // _this.initwesocket(localStorage.getItem('cardno'));
          }  
              
              //监听窗口关闭事件，当窗口关闭时，主动去关闭websocket连接，防止连接还没断开就关闭窗口，server端会抛异常。  
          window.onbeforeunload = function() {  
              //closeWebSocket();  
              websocket.close(); 
          }
          window.websocketobj=websocket  
    },
    fresh(num){
        if(num==0){
          return
        }
        this.$emit("freshinit",num);
        let that=this;
        
        //清除后台缓存的消息记录
        let url=that.$store.getters.getUrl + "depart/delcounts.do";
        $.ajax({
          url: url,
          type: "post",
          dataType: "json",
          // async: false,
          data: {cardno:localStorage.getItem("cardno")} ,
          success:function(data){
            
          },
          error:function(data){
          }
        })
    },
    fetchnum(){
      var url = this.$store.getters.getUrl + "depart/getcounts.do";
      const cardno=localStorage.getItem('cardno')
      var _this = this;
      $.ajax({
        url: url,
        type: "post",
        dataType: "json",
        async: false,
        data: {cardno},
        success: function(data) {
          // _this._dealdata(data.data);
          let num=parseInt(data);
          localStorage.setItem('hzwsnum',parseInt(data));
          _this.$store.commit("setnum", num);
        },
        error: function(data) {
        }
      });
    },
    //心跳链接
    // xintiao(){
      
    //   return heartCheck;  
    // },
    reconnect(url) {
      var that =this;
    if(that.lockReconnect) return;
    that.lockReconnect = true;
    setTimeout(function () {     //没连接上会一直重连，设置延迟避免请求过多
        that.initwesocket(localStorage.getItem('cardno'));
        that.lockReconnect = false;
    }, 1000);
}
  },
  computed:{
    num(){
      let _num
      if(this.$store.getters.getnum==0){
        _num=0
      }else{
        _num=this.$store.getters.getnum
      }
      return _num
    },
    iscradno(){
      if(this.$store.getters.getCardCode){
        this.initwesocket(localStorage.getItem('cardno'));
      }
    }
    
  },
  created() {
    // if(localStorage.getItem('cardno')){
    //     if(!window.WebSocketobj){
    //       this.initwesocket(localStorage.getItem('cardno'))
    //     }
    // }
     var pathname = this.$route;
     if (pathname.matched[0].path == "/Currentreports"||pathname.matched[0].path == "/reportss"||(pathname.matched[0].path == "/payment"&&localStorage.getItem("body")=='微信处方')) {
      this.currentindex = 0;
    } else if (pathname.matched[0].path == "/home"||pathname.matched[0].path == "/appointment"||pathname.matched[0].path == "/registeredInfo"||(pathname.matched[0].path == "/payment"&&localStorage.getItem("body")=='微信挂号')) {
      this.currentindex = 1;
    }
    if(location.hash.indexOf('Myaccount')!=-1
      ||location.hash.indexOf('orderList')!=-1
      ||location.hash.indexOf('myCard')!=-1
      ||location.hash.indexOf('MyExamine')!=-1
      ||location.hash.indexOf('Myassay')!=-1
      ||location.hash.indexOf('Myprescription1')!=-1
      ||location.hash.indexOf('Mycase')!=-1
      ||location.hash.indexOf('Myincidentals')!=-1
      ||location.hash.indexOf('myCollect')!=-1
      ||location.hash.indexOf('Myevaluation')!=-1
      ||location.hash.indexOf('Laboratorys')!=-1
      ||location.hash.indexOf('Myprescription')!=-1
      ||location.hash.indexOf('evaluate')!=-1
    ){
      this.currentindex=3
    }
    if(location.hash.indexOf('reportss')!=-1){
      this.currentindex=0
    }
    // if(location.hash.indexOf('home')!=-1){
    //   this.currentindex=1
    // }
    this.fetchnum();
  }
};
</script>
<style scoped>
.tabbar {
  width: 100%;
  height: 50px;
  display: flex;
  background: rgb(40, 184, 161);
  z-index: 1001
}
.tabitem {
  padding-top: 5px;
  color: white;
  text-align: center;
  flex: 1;
  display: flex;
  flex-direction: column;
}
.text {
  font-size: 14px;
  text-align: center;
  flex: 1;
  display: flex;
  flex-direction: column;
}
.tabicon {
  font-size: 20px;
  text-align: center;
  flex: 1;
  display: flex;
  flex-direction: column;
}
.active {
  color: rgb(20, 24, 236);
}
.demo-badge{
        /* width: 10px;
        height: 10px; */
        background: rgba(0, .0, 0, 0);
        border-radius: 6px;
        display: inline-block;
    }
    /* sup {
      position: absolute !important;
    top: -0.66667vmin !important;
    right: 30px !important;
} */
</style>