<template>
 <div id="publish">
  <!-- 发布内容输入框，利用Html5的新属性contenteditable，实现可编辑文本 ，会自动将插入的IMG标签解析-->
  <div class="publish_container">
    <p contenteditable="true" id="input_conta"></p>
  </div>
 
  <!-- 表情和发送-->
  <div class="face_container">
  <!-- 表情Icon，点击触发事件，动态生成表情并显示 -->
    <span @click=make_face() class="make_face"><i class="icon-emoji" ></i></span>
    <span class="make_img" @click="add_img()"><i class="icon-Pictuer"></i></span>
    <span class="send" @click=send()>发送</span>
  <span class="send"><input type="checkbox" name="top" id="top" value="top">本条置顶</span>
    <!-- 表情容器 ，包裹生成的表情，绑定点击表情事件-->
    <div id="face" @click=choice_face($event)></div>
  </div>
 </div>
 
</template>

<script>
import {hidemenu} from "../../common/js/hide"
    export default {
 data () {
  return {
   id:this.$route.query.id,
   top:"",
  }
 },
 methods:{
   make_face:function(){
     $("div#face").show();         //显示表情容器
     if($("div#face>img").length==0){     //动态生成表情，如果现在没有表情则生成
       for(var i=1;i<=75;i++){      //根据表情文件数量决定循环次数，这里为75个表情
         $("div#face").append('<img src="/static/arclist/'+i+'.gif">'); //为表情容器里添加IMG标签，并赋予src值，路径为表情文件所在路径
       }
     }
   },// 选择表情并插入到输入框
   choice_face:function(e){
     if(e.target.nodeName=="IMG"){
       var choice=e.target;
       var cEle = choice.cloneNode(true); //深度复制，复制节点下面所有的子节点 ，直接将整个表情的IMG标签复制，并添加到发布框的<p></p>里面
       $("p#input_conta").append(cEle);
     }
   },
   // 发送信息给后台
   send:function(){
   // 发送留言
   var text=$("#input_conta").html();  //获得发布框的文本内容，表情会以整个img标签文本显示
   console.log(text);
   $("#input_conta").html("");  //清除发布框的文本内容
   $("div#face").hide();      //隐藏表情选择// 上传图片并发送给后台
   var out_this=this;
     $("#addTextForm").ajaxSubmit({
     url: url+"/index/text/add",
     type: "post",
    data: {'i_text':text, 
      },
     success: function (data) {
       console.info(data);
     }
  });
   }
 },
 
}
</script>
<style scoped>
.title {
  background: rgb(40, 184, 161);
  font-size: 20px;
  color: white;
  padding: 10px 0;
  text-align: center;
}
</style>