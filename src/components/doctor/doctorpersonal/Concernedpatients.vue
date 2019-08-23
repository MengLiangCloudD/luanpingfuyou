<template>
    <div style="height:100%;overflow: auto;-webkit-overflow-scrolling: touch;" class="his">
      <div>
         <div class="tittle" style="background: rgb(0, 187, 187);color:white">
            <div class="arrow-icon" @click="tobackdetail">
                <Icon size="30" type="ios-arrow-back" />
            </div>
            关注的患者
        </div>
        <div class="content" v-if="PatientList.length>0">
          <div class="guan" v-for="(item,index) in PatientList"  :key="index">
            <img src="./../../../assets/头像.png" alt="" width="50px;" style="vertical-align: middle;margin-left:10px;" >
            <div class="user">
               <p><span>患者姓名：</span><span>{{item.name}}</span></p>
              <p><span>患者卡号：</span><span>{{item.cardno}}</span></p>
            </div>
          </div>
        </div>
        <div class="content" v-if="PatientList.length<=0">
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
          PatientList:[],
          size:10,
          isShowLoading:false
        }
      },
        methods:{
            //返回上一层
            tobackdetail(){
               this.$router.push('/Personalcenter');
            },
            //查询关注患者列表
            Patient(){
              var that =this;
              var url = that.$store.getters.getUrl+ 'DoctorFollow/DoctorsFans.do';
              var doccode=localStorage.getItem('ysdoccode');
              var size = that.size;
              that.isShowLoading = true;
              $.ajax({
                url: url,
                type: "post",
                dataType: "json",
                data:{doccode,size},
                success: function(data) {
                  that.isShowLoading = false;
                  that.PatientList=[];
                  if(data.status==1){
                    that.PatientList=data.data;
                  }else if(data.status==0){
                     that.PatientList=[];
                  }
                },
                error: function(data) {
                  that.isShowLoading = false;
                   that.$Modal.error({
                    title: "提示信息",
                    content: "请求失败!"
                  });
                } 
              })
            }
        },
        mounted(){
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
                  that.Patient();
              }
            }
          },1000)
          this.Patient();
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
.img{
  display: inline-block;
  vertical-align: middle;
}
.user{
  display: inline-block;
  vertical-align: middle;
  margin-left: 20px;
}
.user p{
  line-height: 2;
}
.guan{
  padding: 10px;
  border-bottom: 1px solid #ccc;
}
</style>