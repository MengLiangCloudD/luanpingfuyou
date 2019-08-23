<template>
  <div class="MyExamine">
    <!-- <pull-refresh :next="refresh">
      <div slot="list"> -->
        <div class="title">
          <div class="arrow-icon" @click="tobackdetail">
            <Icon size="30" type="ios-arrow-back" />
          </div>
          我的病历
          </div>
        <div class="xuanze" style="position: relative;">
          <div style="display:inline-block;width:100%">
          <span style="color:rgb(40, 184, 161);font-size:20px;">选择日期:</span>
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
            <div style="text-align: center;font-size:18px;padding:20% ">暂无数据</div>
          </div>
        <div class="fee-item" v-if="caseList!==undefined&&caseList.length>0">
          <div
            v-for="(item,index) in caseList"
            :key="index"
            style=" border-bottom: 1px solid #ccc"
            class="pan"
          >
            <div style="text-align: center;font-size:18px;color:rgb(40, 184, 161);padding:10px">
              <span>—— 病历{{caseList.length - index}} ——</span>
            </div>
            <div slot="content">
              <p v-if="item.visitdate!==undefined&&item.visitdate!=='null'">
                <span>就诊时间：</span>
                <span >{{/\d{4}-\d{1,2}-\d{1,2}/g.exec(datatrans(item.visitdate))[0]}}</span>
              </p>
              <p v-if="item.visitno!==undefined&&item.visitno!=='null'">
                <span>就诊序号：</span>
                <span >{{item.visitno}}</span>
              </p>
              <p v-if="item.patientid!==undefined&&item.patientid!=='null'">
                <span>患者卡号：</span>
                <span>{{item.patientid}}</span>
              </p>
              <p v-if="item.docName!==undefined&&item.docName!=='null'">
                <span>医生姓名：</span>
                <span>{{item.docName}}</span>
              </p>
              <p v-if="item.doctorno!==undefined&&item.doctorno!=='null'">
                <span>医生编码：</span>
                <span>{{item.doctorno}}</span>
              </p>
              <div v-if="item.diagdesc!==undefined&&item.diagdesc!=='null'">
                  <p><span>诊断结果：</span><span>{{item.diagdesc}}</span></p>
              </div>
              <div v-if="item.illnessdesc!==undefined&&item.illnessdesc!=='null'">
                  <p><span>医生主诉：</span><span>{{item.illnessdesc}}</span></p>
              </div>
              <div v-if="item.advice!==undefined&&item.advice!=='null'">
                <p><span>医生建议：</span><span>{{item.advice}}</span></p>
              </div>
              <div v-if="item.memo!==undefined&&item.memo!=='null'">
                <p><span>医生备注：</span><span>{{item.memo}}</span></p>
              </div>
              <div  v-if="item.maternitl!==undefined&&item.maternitl!=='null'">
                <p> <span>婚孕历史：</span><span>{{item.maternitl}}</span></p>
              </div>
              <div  v-if="item.menses!==undefined&&item.menses!=='null'">
                <p> <span>月经历史：</span><span>{{item.menses}}</span></p>
              </div>
              <div  v-if="item.anamnesis!==undefined&&item.anamnesis!=='null'">
                <p> <span>既往病史：</span><span>{{item.anamnesis}}</span></p>
              </div>
              <div  v-if="item.individual!==undefined&&item.individual!=='null'">
                <p> <span>个人病史：</span><span>{{item.individual}}</span></p>
              </div>
              <div  v-if="item.familyill!==undefined&&item.familyill!=='null'">
                <p> <span>家族病史：</span><span>{{item.familyill}}</span></p>
              </div>
              <div  v-if="item.medhistory!==undefined&&item.medhistory!=='null'">
                <p> <span>现在病史：</span><span>{{item.medhistory}}</span></p>
              </div>
              <div  v-if="item.marrital!==undefined&&item.marrital!=='null'">
                <p><span>婚姻历史：</span><span>{{item.marrital}}</span></p>
              </div>
            </div>
          </div>
        </div>
      <!-- </div>
    </pull-refresh> -->
    <tabbar class="tabbar"></tabbar>
    <loading v-show="isshowloading" class="loading"></loading>
  </div>
</template>
<script>
import tabbar from "../../common/tabbar";
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
    tabbar,
    pullRefresh,
    loading
  },
  data() {
    return {
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
      // var url =
      // "http://192.168.33.139:8080/HisCloud/casehistory/getmedicalrecords.do";
      var url =
        that.$store.getters.getUrl +
        "medicalrecord/getmedicalrecord.do";
      // that.$Loading.start();
      var patientid = localStorage.getItem("cardno");
      var size =  that.size;
      var visitdate =  that.datatime(that.value1);
      $.ajax({
        url: url,
        type: "post",
        dataType: "json",
        data: {
          //卡号
          patientid: patientid,
          //条数
          size:size,
          // 时间
          visitdate:visitdate

        },
        success: function(data) { 
          that.isshowloading=false;
          that.caseList = [];
          if(data.status==1){
          // for (var i = 0; i < data.data.length; i++) {
            // if (that.value1 == ""||that.value1 ==null) {
              that.caseList = data.data;
              // return;
            // }
            // if (/\d{4}-\d{1,2}/g.exec(that.datatrans(data.data[i].visitdate))[0]== that.datatime(that.value1)
            // ) {
            //   examine.push(data.data[i]);
            // }
          // }
          // that.caseList = examine;
          }
          
        },
        error: function(data) {
          that.isshowloading=false;
          that.$Message.error('请求失败');
        }
      });
    },
    //返回上一层
    tobackdetail(){
        this.$router.push('/Myaccount');
    },
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
.title {
  background: rgb(40, 184, 161);
  font-size: 20px;
  color: white;
  padding: 10px 0;
  text-align: center;
      position: relative;
}
.arrow-icon{
  position: absolute;
  left: 5px;
  top: 8px;
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
  width: 70%;
  /* text-align: right; */
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
.MyExamine {
  height: 100%;
  padding-bottom: 50px;
  overflow: auto;
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
</style>