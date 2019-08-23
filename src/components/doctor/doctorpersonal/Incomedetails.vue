<template>
    <div class="qwer">
        <div class="tittle" style="background: rgb(0, 187, 187);color:white">
            <div class="arrow-icon" @click="tobackdetail">
                <Icon size="30" type="ios-arrow-back" />
            </div>
             收入明细
        </div>
         <div class="xuanze"  style="position: relative;">
            <div style="display:inline-block;width:100%">
            <span style="color:rgb(40, 184, 161);font-size:20px;">选择日期:</span>
            <el-date-picker
                v-model="value1"
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
    </div>
</template>

<script>
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
    export default {
        data(){
            return {
                value1:currentDay
            }
        },
         methods:{
            //返回上一层
            tobackdetail(){
               history.go(-1);
            },
         },
         created(){
           let that=this
           const requesturl=that.$store.getters.getUrl + "SweepCode.do";
            hidemenu(requesturl);
         }
    }
</script>

<style scoped>
.qwer{
  height: 100%;
  overflow: auto;
}
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
</style>