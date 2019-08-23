<template>
    <div style="height:100%;overflow: auto;-webkit-overflow-scrolling: touch" class="his">
        <div class="tittle" style="background: rgb(0, 187, 187);color:white">
            <div class="arrow-icon" @click="tobackdetail">
                <Icon size="30" type="ios-arrow-back" />
            </div>
             历史患者
        </div>
        <div class="xuanze"  style="position: relative;">
         <div style="display:inline-block;width:100%">
          <span style="color:rgb(40, 184, 161);font-size:20px;">选择日期:</span>
          <el-date-picker
            v-model="value1"
            @change="Querypatients"
            type="month"
            style="width:30%; border:0; position: absolute;right: 5%;top: 7px;"
            placeholder="选择月份"
            :editable="false"
            :clearable="false"
             size="small"
            >
          </el-date-picker>
          </div>
        </div>
        <div class="content" v-if="HistoricpatientsList.length>0">
            <div class="list-item" v-for="(item,index) in HistoricpatientsList" :key="index"   @click="todetail(item)">
              <div class="patient-info">
                <img class="avatar" src="../../../assets/头像.png" width="50" alt  >
                <div class="user item-name">
                  <p><span>姓名：</span><span>{{item.name}}</span></p>
                  <p><span>卡号：</span><span>{{item.patientid}}</span></p>
                  <!-- <span><span>ID：</span><span>{{item.idno}}</span></p> -->
                </div>
                <p class="poop">{{datatransss(item.visitdate)}}</p>
                <!-- <span class="item-name">{{item.name}}</span> -->
              </div>
            </div>
        </div>
        <div class="content" v-if="HistoricpatientsList.length<=0">
          <p style=" text-align: center;font-size: 20px;padding:40px 0;">暂无数据</p>
        </div>
        <loading v-show="isshow" class="load"></loading>
    </div>
    
</template>

<script>
import loading from "../../../common/loading"
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
                value1:currentDay,
                HistoricpatientsList:1,
                isshow:false,
                size:15
            }
        },
        methods:{
              //返回上一层
            tobackdetail(){
               this.$router.push('/Personalcenter');
            },
            //标准时间转换
            datatime(data) {
              var d = data;
              var y = this.p(d.getFullYear());
              var m = this.p(d.getMonth() + 1);
              var t = this.p(d.getDate());
              var resDate = y + "-" + m;

              return resDate;
            },
            p(s) {
              return s < 10 ? "0" + s : s;
            },
            //查询患者信息
            Querypatients(){
              var that = this;
              var url = that.$store.getters.getUrl+ 'HistoricPatients/getPatientRegisHistoryInfo.do';
              var doctorno  = localStorage.getItem('ysdoccode');
              var visitdate =that.datatime(that.value1) + ',' + that.size;
              that.isshow = true;
              $.ajax({
                url: url,
                type: "post",
                dataType: "json",
                data:{doctorno,visitdate},
                success: function(data) {
                  that.isshow = false;
                  that.HistoricpatientsList=[];
                  if(data.status==1){
                    that.HistoricpatientsList=data.data;
                  }else if(data.status==0){
                  }
                },
                error: function(data) {
                   that.isshow = false;
                   that.$Modal.error({
                    title: "提示信息",
                    content: "请求失败!"
                  });
                } 
              })
            },
            //查看患者详情
            todetail(item){
              let yspatientinfo = JSON.stringify(item);
              localStorage.setItem("yspatientinfo", yspatientinfo);
              localStorage.setItem('cardno',item.patientid);
              localStorage.setItem('tiao',0);
              this.$router.push("/doctorckeck");
            },
            //时间转换
            datatransss(data) {
              let date = new Date(data);
              //年份
              var Y = date.getFullYear();
              //月份
              var m = date.getMonth() + 1;
              //日期
              var d = date.getDate();
              var H = date.getHours();
              var i = date.getMinutes();
              if (m < 10) {
                m = "0" + m;
              }
              if (d < 10) {
                d = "0" + d;
              }
              if (H < 10) {
                H = "0" + H;
              }
              if (i < 10) {
                i = "0" + i;
              }
              var t = Y + "-" + m + "-" + d;
              if (t !== "NaN-NaN-NaN") {
                return t;
              } else {
                return "";
              }
            },
        },
        mounted(){
          //查询历史患者
          var that  = this;
          const el = document.querySelector('.his');
         const offsetHeight = el.offsetHeight;
         setInterval(function(){
           
           el.onscroll = () => {
            const scrollTop = el.scrollTop;
            const scrollHeight = el.scrollHeight;
            if ((offsetHeight + scrollTop) - scrollHeight >= -1) {
                //每次滚动到底部size+10
                that.size+=10;
                that.Querypatients();
            }
          }
         },1000)
         
          that.Querypatients();
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
.xuanze {
  width: 100%;
  padding: 10px 0;
  border-bottom: 1px solid #ccc;
}
.xuanze span {
  font-size: 16px;
  display: inline-block;
  /* padding: 10px; */
  margin-left: 5%;
}
/* 患者列表 */
.list-wrapper {
  margin-top: 5px;
}
.list-item {
  /* padding:0 5px; */
  position: relative;
}
.poop{
  position: absolute;
  right: 5%;
  top: 5px;
}
.patient-info {
  display: flex;
  height: 50px;
  font-size: 14px;
  align-items: center;
  padding: 30px 20px;
  border-radius: 5px;
  border-bottom: 1px solid rgb(178, 178, 178);
  /* padding: 40px 0; */
}
.avatar{
  border-radius: 50%
}
.item-name {
  font-size: 13px;
  font-weight: bold;
  margin: 0px 5px 0 20px;
}
.sky{
  flex: 1;
  width: 50px;
}
.user{
  display: inline-block;
}
.user p{
  line-height: 1.5;
}
</style>