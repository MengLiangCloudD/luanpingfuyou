<template>
    <div class="ping">
      <div>
        <div class="tittle" style="background: rgb(0, 187, 187);color:white">
            <div class="arrow-icon" @click="tobackdetail">
                <Icon size="30" type="ios-arrow-back" />
            </div>
             评论中心
        </div>
        <div class="content" v-if="commentList.length>0">
          <div class="comment" v-for="(item,index) in commentList" :key="index">
              <img src="./../../../assets/头像.png" alt width="50px" style=" border-radius:50%; vertical-align: middle">
             <div style="display: inline-block;vertical-align: middle;margin-left:10px;"> 
              <p style="font-size: 16px">{{item.name}}</p>
            </div>
            <p style="  font-size: 16px;display: inline-block;vertical-align: middle;">
              <span style="text-indent:25px">{{ /\d{4}-\d{1,2}-\d{1,2}/g.exec(item.pjdate)[0]}}</span>
            </p>
            <p style="text-indent:2rem;font-size:18px;padding:10px 0">{{item.content}}</p>
            <p style="float:right;margin-right:10px;">
              <span style="  font-size: 20px;color:#f37f12;display: inline-block;vertical-align: middle;">{{calculate(index)}}</span>
            <img src="./../../../assets/_星星1.png" alt="" width="22" style="vertical-align: middle;">
            </p>
            
          </div>
        </div>
        <div class="content" v-if="commentList.length<=0">
          <p style=" text-align: center;font-size: 20px;padding:40px 0;">暂无数据</p>
        </div>
      </div> 
      <loading v-show="isShowLoading"></loading> 
    </div>
</template>

<script>
import loading from '../../../common/loading'
import {hidemenu} from "../../../common/js/hide"
let currentDay = new Date();
//获取当前年份
let year = currentDay.getFullYear();
//获取当前月份
if( currentDay.getMonth() + 1<10){
var mon = currentDay.getMonth() + 1;
var month = '0'+mon;
}else{
  var month = currentDay.getMonth() + 1;
}
//获取当天日期
if( currentDay.getDate()<10){
  var mon =  currentDay.getDate();
  var day = '0'+mon;
}else{
  var day =currentDay.getDate();
}
//当前年月日
var time = year + "-" + month;
    export default {
      components:{
        loading
      },
      data(){
        return {
          commentList:[],
          size:10,
          isShowLoading:false
        }
      },
           methods:{
              //返回上一层
            tobackdetail(){
               this.$router.push('/Personalcenter');
            },
            //评论列表
            comment(){
              var that =this;
              var url = that.$store.getters.getUrl+ 'PatientEvaluation/EvaluationCenter.do';
              var doccode=localStorage.getItem('ysdoccode');
              var size = that.size;
              that.isShowLoading=true;
              $.ajax({
                url: url,
                type: "post",
                dataType: "json",
                data:{doccode,size},
                success: function(data) {
                  that.isShowLoading=false;
                  that.commentList=[];
                  if(data.status==1){
                    that.commentList=data.data;
                  }else if(data.status==0){
                    that.commentList=[];
                  }
                },
                error: function(data) {
                  that.isShowLoading=false;
                  that.$Modal.error({
                    title: "提示信息",
                    content: "请求失败!"
                  });
                } 
              })
            },
             //计算平均评分
              calculate(index){
                //态度评价
                var a = this.commentList[index].tdpj;
                //诊断评价
                var b = this.commentList[index].zdpj;
                //平均计分
                var c = (a + b)*0.5;
                return c
              },
           },
           mounted(){
              var that  = this;
              const el = document.querySelector('.ping');
              const offsetHeight = el.offsetHeight;
                setInterval(function(){
                  el.onscroll = () => {
                  const scrollTop = el.scrollTop;
                  const scrollHeight = el.scrollHeight;
                  if ((offsetHeight + scrollTop) - scrollHeight >= -1) {
                      //每次滚动到底部size+10
                      that.size+=10;
                      that.comment();
                  }
                }
              },1000)
             this.comment();
             const requesturl=that.$store.getters.getUrl + "SweepCode.do";
             hidemenu(requesturl);
           }
    }
</script>

<style scoped>
.tittle {
  height: 50px;
  text-align: center;
  line-height: 50px;
  font-size: 20px;
  font-family: PingFangSC-regular;
  position: relative;
}
.arrow-icon{
  position: absolute;
  left: 5px;
  top: 0px;
}
.comment {
  padding: 15px 2%;
  border-bottom: 3px solid #ccc;
  background: #fff;
  position: relative;
  padding-bottom: 40px;
}
.ping{
  height: 100%;
  overflow: auto;
  -webkit-overflow-scrolling: touch;
}
</style>