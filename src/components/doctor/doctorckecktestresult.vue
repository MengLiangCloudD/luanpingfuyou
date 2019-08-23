<template>
  <div class="MyExamine">
    <pull-refresh :next="refresh">
      <div slot="list" style="padding-bottom:60px">
        <div class="title">
          患者化验结果
          <div class="arrow-icon" @click="tobackdetail">
                <Icon size="30" type="ios-arrow-back" />
            </div>
        </div>
        <div class="xuanze"  style="position: relative;">
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
        <div class="fee-item" v-if="prescription.length<=0" style="font-size:20px; text-align: center;">
          <p style="padding:50px;">暂无数据</p>
        </div>
        <div class="fee-item" v-if="prescription!==undefined&&prescription.length>0">
          <div v-for="(item,index) in prescription" :key="index">
            <div class="content" >
                <p>
                  <span>检查号</span>
                  <span>{{item.test_no}}</span>
                </p>
                 <p>
                <span>患者卡号</span>
                <span>{{item.patient_id}}</span>
              </p>
                <p>
                  <span>就诊日期</span>
                  <span>{{formatDates(new Date(item.requested_date_time))}}</span>
                </p>
                <p>
                  <span>项目名称</span>
                  <span>{{item.item_name}}</span>
                </p>
                <p>
                  <span>项目明细</span>
                  <span style="color:blue" @click="Testdetails(index)">查看></span>
                </p>
                <Modal v-model="modal11" fullscreen title="化验明细">
                   <div  v-if="TestdeList.length<=0">
                     <p style="text-align: center;font-size:18px;">暂无明细</p>
                     </div> 
                  <div class="content" v-for="(item1,index1) in TestdeList" :key="index1">
                    <p>
                      <span>项目名称</span>
                      <span>{{item1.report_item_name}}</span>
                    </p>
                    <p>
                      <span>项目序号</span>
                      <span>{{item1.item_no}}</span>
                    </p>
                     <p>
                      <span>报告日期</span>
                      <span>{{formatDates(new Date(item1.result_date_time))}}</span>
                    </p>
                    <p>
                      <span>化验结果</span>
                      <span>{{item1.result}}</span>
                    </p>
                    <p>
                      <span>单位</span>
                      <span>{{item1.units}}</span>
                    </p>
                    <p>
                      <span>参考值</span>
                      <span>{{item1.print_context}}</span>
                    </p>
                    <p>
                      <span>异常</span>
                      <span>{{item1.abnormal_indicator}}</span>
                    </p>
                  </div>
              </Modal>
            </div>
          </div>
        </div>
      </div>
    </pull-refresh>
    <Modal
        v-model="erromodal"
        title="提示">
        <p>{{errormsg}}</p>
    </Modal>
    <loading v-show="isshowloading" class="loading"></loading>
  </div>
</template>

<script>
//引入公共底部
import tabbar from "../../common/tabbar";
// 引入下拉刷新
import pullRefresh from "../../common/scrollRefresh";
//打开加载动画
import loading from "../../common/loading";
import {hidemenu} from "../../common/js/hide"
//取当前标准时间
let currentDay = new Date();
//获取当前年份
let year = currentDay.getFullYear();
//获取当前月份
// 当月份小于10 默认在前面加0
if( currentDay.getMonth() + 1<10){
var mon = currentDay.getMonth() + 1;
var month = '0'+mon;
}else{
  var month = currentDay.getMonth() + 1;
}
//获取当前的日期
//当日期小于10默认在前面加0
if( currentDay.getDate()<10){
  var mon =  currentDay.getDate();
  var day = '0'+mon;
}else{
  var day =currentDay.getDate();
}
//当前年月日
var time = year + "-" + month;
export default {
  components: {
    //公共底部
    tabbar,
    //下拉刷新
    pullRefresh,
    //加载动画
    loading
  },
  data() {
    return {
      erromodal:false,
      errormsg:"",
      prescription: [],
      drugList: [],
      value3: "0",
      cardno: [],
      model1: "",
      cityList: [], //select数据
      cardlist: [],
      //弹出框
      modal11: false,
      //当前时间
      value1: currentDay,
      //控制loading组件显示
      isshowloading: false,
      model2:'',
      TestdeList:[]
    };
  },
  methods: {
    tobackdetail(){
      this.$router.push('/doctorckeck')
    },
    //切割时间
    incisionTime(data) {
      var RecipeDate = /\d{4}-\d{1,2}-\d{1,2}/g.exec(data);
      return RecipeDate[0];
    },
    //切割时间
    incisionTimess(data) {
      var RecipeDate = /\d{4}-\d{1,2}/g.exec(data);
      return RecipeDate[0];
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
      formatDates(now) { 
      var year=now.getFullYear();  //取得4位数的年份
      var month=now.getMonth()+1;  //取得日期中的月份，其中0表示1月，11表示12月
      var date=now.getDate();      //返回日期月份中的天数（1到31）
      var hour=now.getHours();     //返回日期中的小时数（0到23）
      var minute=now.getMinutes(); //返回日期中的分钟数（0到59）
      var second=now.getSeconds(); //返回日期中的秒数（0到59）
      return year+"-"+month+"-"+date; 
    } ,
    p(s) {
      return s < 10 ? "0" + s : s;
    },
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
    //改变就诊人
    selectcard(value) {
      this.examineList(value);
    },
    //查询处方记录
    examineList() {
      var that = this;
      var url =that.$store.getters.getUrl + "chemicalexam/getAssayResultTakeNotes.do";
      var cardno = localStorage.getItem("cardno");
      var visidate =that.datatime(that.value1);
      //打开加载动画
      that.isshowloading = true;
      $.ajax({
        url: url,
        type: "post",
        dataType: "json",
        // async: false,
        data: {
          cardno:cardno,
          requestime:visidate
        },
        success: function(data) {
          //关闭加载动画
          that.isshowloading = false;
          var prescription =[];
          //关闭加载动画
          that.isshowloading = false;
          if(data.status==1){
            that.prescription = data.data;
          }else if(data.status!="0"){
              that.errormsg='查询数据失败！'
              that.erromodal=true
          }
        },
        error: function(data){
          that.isshowloading = false;
          that.errormsg='请求发送失败！'
          that.erromodal=true
        }
      });
    },
    formatDate(now) { 
          var year=now.getFullYear();//取得4位数的年份
          if(now.getMonth()+1<10){
            var mon=now.getMonth()+1;
            var month='0'+mon;
          }else{
             var month=now.getMonth()+1;
          }
           //取得日期中的月份，其中0表示1月，11表示12月
          if(now.getDate()<10){
            var da=now.getDate();
            var date='0'+da;
          }else{
            var date=now.getDate();
          }
          //返回日期月份中的天数（1到31）
          var hour=now.getHours();     //返回日期中的小时数（0到23）
          var minute=now.getMinutes(); //返回日期中的分钟数（0到59）
          var second=now.getSeconds(); //返回日期中的秒数（0到59）
          return year+"-"+month;
    },
    //查看化验明细
    Testdetails(index){
      var that = this;
      that.modal11 = true;
      var url =that.$store.getters.getUrl + "chemicalexam/getAssayResult.do";
      var testno = this.prescription[index].test_no;
       that.isshowloading = true;
      $.ajax({
        type:'post',
        url:url,
        dataType:'json',
        data:{
          testno:testno
        },
        success:function(data){
          that.isshowloading = false;
          if(data.status==1){
            that.TestdeList=data.data
          }
        },
        error:function(data){
           that.isshowloading = false;
        }
      })
    }
  },
   //查询患者卡号
  //就诊人
  created(){
    let _this=this
    setTimeout(function(){
      _this.examineList();
      const requesturl=_this.$store.getters.getUrl + "SweepCode.do";
      hidemenu(requesturl);
    },10)
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
  background: rgb(0, 187, 187);
  font-size: 20px;
  color: white;
  height: 50px;
  line-height: 50px;
  text-align: center;
  position: relative;
}
.fee-item {
  padding: 5px 10px;
  font-size: 14px;
}
.box {
  width: 100%;
  border-bottom: 1px solid #ccc;
  font-size: 16px;
  padding: 10px;
}
.box p {
  line-height: 2;
}
.box p span:nth-of-type(2) {
  width: 50%;
  display: inline-block;
  text-align: right;
  vertical-align: top;
}
.box p span:nth-of-type(1) {
  margin-left: 10%;
  display: inline-block;
  vertical-align: top;
  font-weight: 600;
}
.yao {
  text-align: center;
  font-weight: 800;
  font-size: 20px;
  line-height: 2;
}
.fee-item {
  padding: 0 !important;
}
.content p {
  line-height: 2;
}
.content p span:nth-of-type(2) {
  width: 70%;
  text-align: right;
  display: inline-block;
  /* margin-left: 20%; */
}
.content p span:nth-of-type(1) {
  font-weight: 600;
  width: 25%;
  display: inline-block;
}
.MyExamine {
  height: 100%;
}
.content {
  padding: 5px 5%;
  border-bottom: 1px solid #ccc;
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
  color:rgb(0, 187, 187);
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