<template>
  <div class="MyExamine">
    
    <!-- <pull-refresh :next="refresh">
      <div slot="list"> -->
        <div class="title" style="background: rgb(0, 187, 187);">
      <div class="arrow-icon" @click="tobackdetail">
          <Icon size="30" type="ios-arrow-back" />
      </div>
      患者病历
    </div>
        <div class="xuanze" style="position: relative;">
          <div style="display:inline-block;width:100%">
          <span style="color: rgb(0, 187, 187);;font-size:20px;">选择日期:</span>
          <el-date-picker
            v-model="value1"
            type="month"
            style="width:30%; border:0; position: absolute;right: 5%;top: 7px;"
            @change="examineList"
            placeholder="选择月份"
            :editable="false"
            :clearable="false"
             size="small"
            >
          </el-date-picker>
          </div>
        </div>
          <div class="fee-item" v-if="caseList.length<=0">
            <div style="text-align:center;font-size: 20px;margin: 50px;">暂无数据</div>
          </div>
        <div class="fee-item" v-if="caseList!==undefined&&caseList.length>0">
          <div
            v-for="(item,index) in caseList"
            :key="index"
            style=" border-bottom: 1px solid #ccc"
            class="pan"
          >
            <div style="text-align: center;font-size:18px;color: rgb(0, 187, 187);padding:10px">
              <span>—— 病历{{caseList.length - index}} ——</span>
            </div>
            <div slot="content fee-item">
              <p v-if="item.visitdate!==undefined">
                <span>就诊时间：</span>
                <span >{{/\d{4}-\d{1,2}-\d{1,2}/g.exec(datatrans(item.visitdate))[0]}}</span>
              </p>
              <p v-if="item.visitno!==undefined">
                <span>就诊序号：</span>
                <span >{{item.visitno}}</span>
              </p>
              <p v-if="item.patientid!==undefined">
                <span>患者卡号：</span>
                <span>{{item.patientid}}</span>
              </p>
              <p v-if="item.docName!==undefined">
                <span>医生姓名：</span>
                <span>{{item.doctor}}</span>
              </p>
              <p v-if="item.docName!==undefined">
                <span>医生编码：</span>
                <span>{{item.doctorno}}</span>
              </p>
              <!-- <div v-if="item.diagdesc!==undefined&&item.diagdesc.length>=12">
                  <p> <span>诊断结果：</span></p>
                  <p style="text-indent:2rem;padding:0 20px;padding-right: 39px;">{{item.diagdesc}}</p>
              </div> -->
              <div v-if="item.diagdesc!==undefined">
                  <p><span>诊断结果：</span><span>{{item.diagdesc}}</span></p>
              </div>
              <!-- <div v-if="item.illnessdesc!==undefined&&item.illnessdesc.length>=12">
                  <p><span>医生主诉：</span></p>
                  <p style="text-indent:2rem;padding:0 20px;padding-right: 39px;">{{item.illnessdesc}}</p>
              </div> -->
              <div v-if="item.illnessdesc!==undefined">
                  <p><span>医生主诉：</span><span>{{item.illnessdesc}}</span></p>
              </div>
              
              <!-- <div v-if="item.advice!==undefined&&item.advice.length>=12">
                <p><span>医生建议：</span></p>
                <p style="text-indent:2rem;padding:0 20px;padding-right: 39px;">{{item.advice}}</p>
              </div> -->
              <div v-if="item.advice!==undefined">
                <p><span>医生建议：</span><span>{{item.advice}}</span></p>
              </div>
              <!-- <div v-if="item.memo!==undefined&&item.memo.length>=12">
                <p><span>医生备注：</span></p>
                <p style="text-indent:2rem;padding:0 20px;padding-right: 39px;">{{item.memo}}</p>
              </div> -->
              <div v-if="item.memo!==undefined">
                <p><span>医生备注：</span><span>{{item.memo}}</span></p>
              </div>
              <!-- <div  v-if="item.maternitl!==undefined&&item.maternitl.length>=12">
                <p> <span>婚孕历史：</span></p>
                <p style="text-indent:2rem;padding:0 20px;padding-right: 39px;">{{item.maternitl}}</p>
              </div> -->
              <div  v-if="item.maternitl!==undefined">
                <p> <span>婚孕历史：</span><span>{{item.maternitl}}</span></p>
              </div>
              <!-- <div  v-if="item.menses!==undefined&&item.menses.length>=12">
                <p> <span>月经历史：</span></p>
                <p style="text-indent:2rem;padding:0 20px;padding-right: 39px;">{{item.menses}}</p>
              </div> -->
              <div  v-if="item.menses!==undefined">
                <p> <span>月经历史：</span><span>{{item.menses}}</span></p>
              </div>
              <!-- <div  v-if="item.maternitl!==undefined&&item.maternitl.length>=12">
                <p> <span>既往病史：</span></p>
                <p style="text-indent:2rem;padding:0 20px;padding-right: 39px;">{{item.maternitl}}</p>
              </div> -->
              <div  v-if="item.anamnesis!==undefined">
                <p> <span>既往病史：</span><span>{{item.anamnesis}}</span></p>
              </div>
              <!-- <div  v-if="item.individual!==undefined&&item.individual.length>=12">
                <p> <span>个人病史：</span></p>
                <p style="text-indent:2rem;padding:0 20px;padding-right: 39px;">{{item.individual}}</p>
              </div> -->
              <div  v-if="item.individual!==undefined">
                <p> <span>个人病史：</span><span>{{item.individual}}</span></p>
              </div>
              <!-- <div  v-if="item.familyill!==undefined&&item.familyill.length>=12">
                <p> <span>家族病史：</span></p>
                <p style="text-indent:2rem;padding:0 20px;padding-right: 39px;">{{item.familyill}}</p>
              </div> -->
              <div  v-if="item.familyill!==undefined">
                <p> <span>家族病史：</span><span>{{item.familyill}}</span></p>
              </div>
              <!-- <div  v-if="item.medhistory!==undefined&&item.medhistory.length>=12">
                <p> <span>现在病史：</span></p>
                <p style="text-indent:2rem;padding:0 20px;padding-right: 39px;">{{item.medhistory}}</p>
              </div> -->
              <div  v-if="item.medhistory!==undefined">
                <p> <span>现在病史：</span><span>{{item.medhistory}}</span></p>
              </div>
              <!-- <div  v-if="item.marrital!==undefined&&item.marrital.length>=12">
                <p> <span>婚姻历史：</span></p>
                <p style="text-indent:2rem;padding:0 20px;padding-right: 39px;">{{item.marrital}}</p>
              </div> -->
              <div  v-if="item.marrital!==undefined&&item.marrital.length<12">
                <p><span>婚姻历史：</span><span>{{item.marrital}}</span></p>
              </div>
            </div>
          </div>
        </div>
      <!-- </div>
    </pull-refresh> -->
    <Modal
        v-model="erromodal"
        title="提示">
        <p>{{errormsg}}</p>
    </Modal>
    <loading v-show="isshowloading" class="loading"></loading>
  </div>
</template>
<script>
import pullRefresh from "../../common/scrollRefresh";
import loading from "../../common/loading";
import {hidemenu} from "../../common/js/hide"
let currentDay = new Date();
//获取当前年份
let year = currentDay.getFullYear();
//获取当前月份
let month = currentDay.getMonth() + 1;
//获取当天日期
let day = currentDay.getDate();
//当前年月日
var time = year + "-" + month ;
export default {
  components: {
    pullRefresh,
    loading
  },
  data() {
    return {
      errormsg:'',
      erromodal:false,
      caseList: [],
      value3: "0",
      cardno: [],
      model1: "",
      cityList: [], //select数据
      cardlist: [], //存放所有的绑定卡，没有激活的卡不算
      //当前时间
      value1:currentDay,
      isshowloading:false,
      size:5
    };
  },
  methods: {
    //下拉刷新
    refresh() {
      return new Promise((resolve, reject) => {
        setTimeout(() => {
          this.examineList();
          resolve();
        }, 2000);
      });
    },
    tobackdetail(){
        this.$router.push('/doctorckeck')
      },
    changepanel(value) {
    },
    //时间转换
    datatrans(data) {
      let date = new Date(data);
      var Y = date.getFullYear();
      var m = date.getMonth() + 1;
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
      var t = Y + "-" + m + "-" + d + "-" + " " + H + ":" + i;
      if (t !== "NaN-NaN-NaN- NaN:NaN") {
        return t;
      } else {
        return "";
      }
    },
    //改变就诊人
    selectcard(value) {
      this.examineList(value);
    },
    //正则截取
    execs(data) {
      return /\d{4}-\d{1,2}-\d{1,2}/g.exec(data)[0];
    },
     //正则截取
    execsss(data) {
      return /\d{4}-\d{1,2}/g.exec(data)[0];
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
    //小于十前面默认加0
    p(s) {
      return s < 10 ? "0" + s : s;
    },
    //请求列表
    examineList() {
      var that = this;
      var url =
        that.$store.getters.getUrl +
        "medicalrecord/getmedicalrecord.do";
      // that.$Loading.start();
      let yspatientinfo=JSON.parse(localStorage.getItem('yspatientinfo'));
      let patientid=yspatientinfo.patientid;
      var size = that.size;
      var visitdate = that.datatime(that.value1);
      
      $.ajax({
        url: url,
        type: "post",
        dataType: "json",
        // async: false,
        data: {
          //卡号
          patientid: patientid,
          size:size,
          visitdate:visitdate
        },
        success: function(data) { 
          that.isshowloading=false;
          that.caseList =[];
          if(data.status==1){
            // for (var i = 0; i < data.data.length; i++) {
            //   if (that.value1 == ""||that.value1 ==null) {
                that.caseList = data.data;
                // return;
            //   }
            //   if (/\d{4}-\d{1,2}/g.exec(that.datatrans(data.data[i].visitdate))[0]== that.datatime(that.value1)
            //   ) {
            //     examine.push(data.data[i]);
            //   }
            // }
            // that.caseList = examine;
          }else if(data.status!="0"){
            that.errormsg='获取病历失败!'
            that.erromodal=true
          }
          
        },
        error: function(data) {
          that.isshowloading=false;
          that.errormsg='请求发送失败!'
          that.erromodal=true
          
        }
      });
    }
  },
  //查询患者卡号
  //就诊人
  mounted(){
    var that  = this;
    that.isshowloading=true;
    const el = document.querySelector('.MyExamine');
    const offsetHeight = el.offsetHeight;
    setInterval(function(){
      el.onscroll = () => {
         const scrollTop = el.scrollTop;
         const scrollHeight = el.scrollHeight;
         if ((offsetHeight + scrollTop) - scrollHeight >= -1) {
            //每次滚动到底部size+10
            that.size+=5;
            that.examineList();
        }
      }
    },1000)
    that.examineList();
    const requesturl=that.$store.getters.getUrl + "SweepCode.do";
    hidemenu(requesturl);
  }
};
</script>

<style scoped>
.tabbar {
  position: fixed;
  bottom: 0;
  left: 0;
  
}
.arrow-icon{
  position: absolute;
  left: 5px;
  top: 0px;
}
.title {
  background: rgb(40, 184, 161);
  color: white;
  text-align: center;
  height: 50px;
  line-height: 50px;
  font-size: 20px;
  position: relative;
}
.fee-item {
  /* display: flex; */
  padding: 5px 10px;
  font-size: 14px;
}
.pan {
  padding: 10px;
}
.text-box {
}

.fee-item p {
  line-height: 2;
 
}
.fee-item p span:nth-of-type(2) {
  width: 62%;
  text-align: right;
  display: inline-block;
}
.fee-item span:nth-of-type(1) {
  font-weight: 600;
  margin-left: 5%;
}
.MyExamine {
  height: 100%;
  /* padding-bottom: 50px; */
  overflow: auto;
  -webkit-overflow-scrolling: touch;
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
.ivu-select {
  /* margin-left: 18%; */
}
.ivu-select-selection {
  color: rgb(40, 184, 161);
}
.ivu-date-picker {
  /* margin-left: 10%; */
}
.ivu-select-dropdown {
  position: absolute !important; /* will-change: top, left; */
  transform-origin: center top !important;
  top: 188px !important;
  right: 100px !important;
}
.fee-item p {
  line-height: 2;
 
}
.fee-item p span:nth-of-type(2) {
  width: 70%;
  text-align: left;
  /* padding-left: 2%; */
  display: inline-block;
  vertical-align: top;
  /* text-indent: 1rem; */
}
.fee-item span:nth-of-type(1) {
  font-weight: 600;
  margin-left: 5%;
  vertical-align: top;
}
</style>