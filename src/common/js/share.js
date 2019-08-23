const initwxshare=function(requesturl,type,msg,targeturl){
  let config
  let url=location.href 
  let arr=url.split("#")
  if(arr[0].indexOf("?")!=-1){
      window.location.replace(window.location.origin+"/#"+arr[1])
  } 

  //获取参数
  config=fetchconfig(requesturl,targeturl)
  let baseurl=location.href
  // baseurl=encodeURIComponent(window.location.href)
  wx.config({
      debug: false, // 开启调试模式,调用的所有api的返回值会在客户端alert出来，若要查看传入的参数，可以在pc端打开，参数信息会通过log打出，仅在pc端时才会打印。
      appId: config.appId, // 必填，公众号的唯一标识
      timestamp:config.timestamp, // 必填，生成签名的时间戳
      nonceStr: config.noncestr, // 必填，生成签名的随机串
      signature:config.signature,// 必填，签名
      jsApiList: [
          "onMenuShareAppMessage",
          "hideAllNonBaseMenuItem",
          "onMenuShareTimeline"
      ] // 必填，需要使用的JS接口列表
  });

  wx.ready(function() {
        if(type!=0){
          wx.hideAllNonBaseMenuItem({
              success:function(res){
              }
          });
      }
      wx.onMenuShareAppMessage({ 
          title: '滦平县妇幼保健院挂号平台', // 分享标题
          desc: msg, // 分享描述
          link: baseurl, // 分享链接，该链接域名或路径必须与当前页面对应的公众号JS安全域名一致
          imgUrl: 'http://zhangshenggui.natapp1.cc/static/img/logo.18b2d33.jpg', // 分享图标
          
          success:function(res) { 
          }
      });
      wx.onMenuShareTimeline({
        title: '滦平县妇幼保健院挂号平台', // 分享标题
        link: baseurl, // 分享链接，该链接域名或路径必须与当前页面对应的公众号JS安全域名一致
        imgUrl: 'http://zhangshenggui.natapp1.cc/static/img/logo.18b2d33.jpg', // 分享图标
        success: function () {
        // 用户点击了分享后执行的回调函数
        },
    })
  });
  
}

const fetchconfig=function(baseurl,targeturl){
  let url1 = location.href;
  //后台接口
  var url = baseurl;
  let config
  $.ajax({
    url: url,
    type: "post",
    dataType: "json",
    async: false,
    data: { url: targeturl },
    success: function(data) {
      //取消禁止点击扫一扫
      config=data
    },
    error: function(data) {}
  });
  return config
}
export {initwxshare}