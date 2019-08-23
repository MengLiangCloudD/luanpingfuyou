import {config} from '../../config'
export const websocket=(doccode)=>{
          let websocket
          var wsurl = doccode; 
          websocket= new WebSocket("ws://" + config.url+ "/websocket/" +doccode); 
          //连接发生错误的回调方法  
          websocket.onerror = function() {  
            console.log("errro")
            reconnect(wsurl)
          };
          //连接成功建立的回调方法  
          websocket.onopen = function() {      //心跳检测重置
          }  
          
          //接收到消息的回调方法  
          websocket.onmessage = function(event) {    //心跳检测重置
              var info=event.data.split(",");
          }  
          //连接关闭的回调方法  
          websocket.onclose = function(e) {  
            delete window.websocketobj
          }  
          //监听窗口关闭事件，当窗口关闭时，主动去关闭websocket连接，防止连接还没断开就关闭窗口，server端会抛异常。  
          window.onbeforeunload = function() {  
              //closeWebSocket();  
              websocket.close(); 
          }
          window.websocketobj=websocket;  
}
function reconnect(url){
  setTimeout(function(){
    websocket(url);
  },2000)
}