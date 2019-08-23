<template>
  <div class="registeredlistpage">
    <!-- 标题 -->
    <div class="title" >
      <div class="quite"  @click="goPersonalcenter">
        <img class="avatar" src="../../assets/avatar.png" width="45" alt>
      </div>
      挂号患者列表
      <!-- <div size="large" class="switchopen" :class="{'activeswitchopen':!active}" @click="toggleswitch">
        {{active?"出诊":"未出诊"}}
        <div class="circle" :class="{'activecircle':!active}"></div>
      </div> -->
    </div>

    <!-- 切换按钮 -->
    <div class="btn-warapper">
      <div @click="changetabstatu(false)" :class="{ active: !tabstatu,disactive: tabstatu}">待就诊</div>
      <div @click="changetabstatu(true)" :class="{ active: tabstatu,disactive: !tabstatu }">已就诊</div>
    </div>

    <!-- 已就诊列表 -->
    <div class="list-wrapper" v-if="tabstatu">
      <div class="list-item" v-for="(item,index) in seekedpatientlist" :key="index"  @click="todetail(item,5)">
        <div class="patient-info" >
          <img class="avatar" src="../../assets/头像.png" width="50" alt>
          <span class="item-name">{{item.name}}</span>
          <div class="sky"></div>
          <span>&nbsp</span>
          <span class="item-name">{{item.starttime}}</span>
        </div>
      </div>
    </div>

    <!-- 未就诊列表 -->
    <div class="list-wrapper" v-if="!tabstatu">
      <div class="list-item" v-for="(item,index) in failurepatientlist" :key="index"  @click="todetail(item,1)">
        <div class="patient-info">
          <img class="avatar" src="../../assets/头像.png" width="50" alt>
          <span class="item-name">{{item.name}}</span>
          <div class="sky"></div>
          <span>&nbsp</span>
          <span class="item-name">{{item.starttime}}</span>
        </div>
      </div>
    </div>
    <Modal
        v-model="infomodel"
        title="提示">
        <p>{{infomsg}}</p>
    </Modal>
    <loading v-show="isShowLoading"></loading>
  </div>

  
</template>

<script>
import {requestpatients,fetchopenid} from "./js/registeredist"
import loading from '../../common/loading'
import {hidemenu} from "../../common/js/hide"
export default {
  components:{
    loading
  },
  data() {
    return {
      failurepatientlist:[],
      seekedpatientlist:[],
      tabstatu:true,
      active:true,
      switchcotroll:false,
      infomodel:false,
      infomsg:"",
      isShowLoading:false,
      yscode:true,
    };
  },
  mounted() {
    let that=this
    this.isShowLoading=true
    setTimeout(function(){
      that.fetchseekedpatientlist();
      that.fetchfailurepatientlist();
      const requesturl=that.$store.getters.getUrl + "SweepCode.do";
      hidemenu(requesturl);
    },10)
  },
  methods: {
    async todetail(data,type){
      let that=this
      
      let obj={}
      let openid
      
      let url=this.$store.getters.getUrl+"check/getOpenid.do"
      const openidresult=fetchopenid(url,data.patientid,that)
      if(openidresult.status=="1"){
        openid=openidresult.data
      }else if(openidresult.status=="0"){
        openid=0
      }else{
        this.infomodel=true
        this.infomsg="openid查询异常"
        return
      }
      data.openid=openid
      let yspatientinfo = JSON.stringify(data);
      localStorage.setItem("yspatientinfo", yspatientinfo);
      this.$router.push("/detail");
    },
    changetabstatu(state){
      if(state==this.tabstatu){
        return
      }
      this.tabstatu=!this.tabstatu
    },
    hasunpatient(arr){
      let bState=true
      for(let i=0;i<arr.length;i++){
        if(arr[i].status=='1'){
          bState=false
        }
      }
      return bState
    },
    //获取已就诊列表
    async fetchseekedpatientlist() {
      let that = this;
      let url =that.$store.getters.getUrl + "doctorPatient/seekedDoctor.do";
      let doccode = localStorage.getItem("ysdoccode");
      // let depcode = localStorage.getItem("ysdepcode");
      let depcode = '%';
      const data=await requestpatients(url,depcode,doccode)
      that.isShowLoading=false
      if(typeof data=='object'){
        if(data.status=="1"){
          for (var i = 0; i < data.data.length; i++) {
            this.seekedpatientlist.push(data.data[i]);
          }
        }
        if(data.status=="-1"){
          this.infomsg="查询待就诊患者信息异常！"
          this.infomodel=true
        }
      }
      if(data==5){
        this.infomsg="请求发送失败！"
        this.infomodel=true
      }
    },
    //获取未就诊列表
    async fetchfailurepatientlist() {
      let that = this;
      let url =that.$store.getters.getUrl + "doctorPatient/failureDoctor.do";
      let doccode = localStorage.getItem("ysdoccode");
      // let depcode = localStorage.getItem("ysdepcode");
      let depcode = '%';
      const data=await requestpatients(url,depcode,doccode)
      that.isShowLoading=false
      if(typeof data=='object'){
        if(data.status=="1"){
          this.tabstatu=false;
          for (var i = 0; i < data.data.length; i++) {
            this.failurepatientlist.push(data.data[i]);
          }
        }
        if(data.status=="-1"){
          this.infomsg="查询待就诊患者信息异常！"
          this.infomodel=true
        }
      }
      if(data==5){
        this.infomsg="请求发送失败！"
        this.infomodel=true
      }
    },
    //个人中心
    goPersonalcenter(){
      this.$router.push('/Personalcenter');
    }
  }
};
</script>

<style scoped>
.registeredlistpage {
  height: 100%;
  overflow: auto;
}
.disactive{
  color: rgb(0, 0, 0);
  background: rgb(160, 165, 170);
}
.active{
  color:white;
  background: rgb(0, 166, 172);
}
.btn-warapper{
  display: flex;
  height: 50px;
}
.btn-warapper div{
  font-size: 16px;
  flex: 1;
  text-align: center;
  line-height: 50px;
}
.quite{
    position: absolute;
    left: 5%;
    top: 3px;
}
/* 标题 */
.title {
  background: rgb(0, 187, 187);
  height: 50px;
  line-height: 50px;
  text-align: center;
  font-size: 20px;
  color: white;
  position: relative;
}
/* 开关 */
.switchopen{
  height: 25px;
  width: 70px;
  border-radius: 15px;
  background: #2d8cf0;
  line-height: 25px;
  font-size: 12px;
  text-align: left;
  padding: 0 10px;
  position: absolute;
  top: 12px;
  right: 10px;
}
.circle{
  width: 19px;
  height: 19px;
  border-radius: 50%;
  background: rgb(255,255,255);
  position: absolute;
  top: 3px;
  right:4px;
}
.activecircle{
  left: 4px;
}
.activeswitchopen{
  text-align: right;
  background: rgb(160,165,170);
}
/* 患者列表 */
.list-wrapper {
  margin-top: 5px;
}
.list-item {
  padding:0 5px;
}
.patient-info {
  display: flex;
  height: 50px;
  font-size: 14px;
  align-items: center;
  padding: 30px 20px;
  border-radius: 5px;
  border: 1px solid rgb(178, 178, 178)
}
.avatar{
  border-radius: 50%
}
.item-name {
  font-size: 14px;
  font-weight: bold;
  margin: 0px 5px 0 30px;
}
.sky{
  flex: 1;
  width: 50px;
}

</style>