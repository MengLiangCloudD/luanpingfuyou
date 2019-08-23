<template>
  <div class="MyExamine">
    <pull-refresh :next="refresh">
      <div slot="list" style="padding-bottom:60px">
        <div class="title">
          <div class="arrow-icon" @click="tobackdetail">
          <Icon size="30" type="ios-arrow-back" />
      </div>
      药品处方
      </div>
        <div class="xuanze"  style="position: relative;">
         <div style="display:inline-block;width:100%">
          <span style="color:rgb(40, 184, 161);font-size:20px;">选择日期:</span>
          <el-date-picker
            v-model="value1"
            type="month"
            style="width:30%; border:0; position: absolute;right: 5%;top: 7px;"
            @change="GetRecipeList"
            placeholder="选择月份"
            :editable="false"
            :clearable="false"
             size="small"
            >
          </el-date-picker>
          </div>
        </div>
          <div class="ecipeList" v-if="ecipeList.length==0" style="text-align: center;font-size:18px; padding:20% 0;" > 
               暂无数据
          </div>
           <div class="ecipeList"  v-if="ecipeList.length!==0">
             <div class="xiang"  v-for="(item,index) in ecipeList"  :key="index" >
               <div class="chufang"   v-if="item.drug.length!=0" style="border-bottom:1px solid #ccc;padding:10px;">
                  <p><span>处方类型：</span><span>药品处方</span></p>
                  <p><span>就诊序号：</span><span>{{item.drug[0].visitno}}</span></p>             
                  <p><span>生成时间：</span><span>{{formatDate(new Date(item.drug[0].visitdate))}}</span></p>
                  <p><span>项目详情：</span><span style="color:blue" @click="modal(index)">查看></span></p>
                  <p><span>合计金额：</span><span style="color:red;font-size:18px;">￥{{totalMoney(index)}}</span></p>
                <Modal v-model="mod1" fullscreen title="项目详情">
                  <div class="ecipeListmodal" v-for="(item1,index1) in drug" :key="index1" style="font-size:16px;border-bottom:1px solid #ccc;padding:10px 0;font-weight:650;">
                    <div  style="text-align: center;font-size:18px;padding:10px 0" >{{item1.drugname}}</div>
                    <p><span class="titletip">编码：</span><span>{{item1.drugcode}}</span></p>
                    <p><span class="titletip">数量：</span><span>{{item1.amount}}</span></p>
                    <p><span class="titletip">单价：</span><span style="color:red;font-size:18px;">￥{{item1.costs.toFixed(2)}}</span></p>
                    <p><span class="titletip">规格：</span><span>{{item1.drugspec}}</span></p>
                    <p><span class="titletip">单位：</span><span>{{item1.units}}</span></p>
                    <p><span class="titletip">用法：</span><span>{{item1.administration}}</span></p>
                     <p><span class="titletip">频次：</span><span>{{item1.frequency}}</span></p>
                  </div>
                </Modal>
             </div>
             </div>
              <div class="chufang" v-if="ecipeList[0].drug.length==0">
                <p style="font-size:18px; padding:20% 0;text-align: center;">暂无数据</p>
             </div>
           </div>
      </div>
    </pull-refresh>
    <tabbar class="tabbar"></tabbar>
    <loading v-show="isshowloading" class="loading"></loading>
  </div>
</template>

<script>
//引入公共底部
import tabbar from "../../common/tabbar";
//引入下拉刷新
import pullRefresh from "../../common/scrollRefresh";
//引入加载动画
import loading from "../../common/loading";
import {hidemenu} from "../../common/js/hide"
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
  components: {
    tabbar,
    pullRefresh,
    loading
  },
  data() {
    return {
      //所有数据
      ecipeList: [],
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
      mod1:false,
      mod2:false,
      mod3:false,
      assaysList:[],
      examList:[],
      drug:[]
    };
  },
  methods: {
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
          return year+"-"+month+"-"+date; 
    },
    //药品合计金额
    totalMoney(index){
      var tofee=0;
     var drug= this.ecipeList[index].drug;
     for(var i=0;i<drug.length;i++){
       tofee+=parseFloat((drug[i].costs)*(drug[i].amount)); 
     }
     //取小数点后两位
     return tofee.toFixed(2);
    },
    //药品明细弹窗
    modal(index){
      this.mod1=true;
      this.drug = this.ecipeList[index].drug
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
    //下拉刷新
    refresh() {
      return new Promise((resolve, reject) => {
        setTimeout(() => {
          this.GetRecipeList()
          resolve();
        }, 2000);
      });
    },
    // 返回上一层
    tobackdetail(){
        this.$router.push('/Myaccount');
    },
    //药品明细
    GetRecipeList(value){
      var that = this;
      that.modal11 = true;
      that.isshowloading=true;
      //打开加载动画
      var url =
      that.$store.getters.getUrl + "prescription/GetRecipeList.do";
      var patientid =localStorage.getItem("cardno");
      // var RecipeID = this.reportsList[index].RecipeID;
       var RecipeID =localStorage.getItem('RecipeID');
       var visidate =that.datatime(that.value1);
      $.ajax({
        url: url,
        type: "post",
        dataType: "json",
        // async: false,
        data:{
          cardno:patientid,
          // cardno:'1303071024',
          visitdate:visidate,
          // visitdate:'2015-11',
          type:'month',
          doccode:""
        },
        success(data){
          that.isshowloading=false;
          that.ecipeList=[]
            for(var i=0;i<data.data.length;i++){
              that.ecipeList.push(data.data[i]);
            }
            //检查 化验 药品 集合
            var e = that.ecipeList;
            var visilist=[]
            for(let i=0;i<e.length;i++){
                visilist.push(e[i].visitno)
            }
            let visisublist=[]
            for(let i=0;i<visilist.length;i++){
                if(visisublist.length==0){
                  visisublist.push(visilist[0])
                }else{
                  let str=visilist[i]
                  if(visisublist.indexOf(str)==-1){
                    visisublist.push(str)
                  }
                }
            }
            //分类
            var arr=[]
            for(let i=0;i<visisublist.length;i++){
              arr.push({visitno:visisublist[i],subarr:[]})
            }

            for(let i=0;i<e.length;i++){
              let index=visisublist.indexOf(e[i].visitno) 
              arr[index].subarr.push(e[i])
            }

            for(let i=0;i<arr.length;i++){
              arr[i].drug=[]
            }
            for(let i=0;i<arr.length;i++){
                for(let j=0;j<arr[i].subarr.length;j++){
                    if(arr[i].subarr[j].itemclass=="A"||arr[i].subarr[j].itemclass=="B"){
                      arr[i].drug.push(arr[i].subarr[j])
                    }
                }
            }
             that.ecipeList=arr;
        },
        error:function(data){
          that.isshowloading=false;
           that.$Message.error('请求失败');
        }
      })
    },
  },
   //查询患者卡号
  //就诊人
  created(){
    this.isshowloading = true;
    this.GetRecipeList();
    let that=this
    const requesturl=that.$store.getters.getUrl + "SweepCode.do";
    hidemenu(requesturl);
  }
};
</script>

<style scoped>
.arrow-icon{
  position: absolute;
  left: 5px;
  top: 8px;
}
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
.ecipeList p{
   line-height: 2;
  font-size: 14px;
  display: flex;
}
.ecipeList p span {
  display: inline-block;
  padding: 0 20px;
}
.ecipeList p span:nth-of-type(1) {
  font-weight: 650;
  flex:1;
}
.ecipeList p span:nth-of-type(2) {
  text-align: right;
}
.ecipeListmodal p{
  font-size: 14px;
  padding: 0 20px;
  display: flex;
}
.titletip{
  flex: 1
}
</style>