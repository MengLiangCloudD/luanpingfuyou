<template>
  <div class="MyExamine">
      <div slot="list" class="box-flex">
        <div class="title">
          <div class="arrow-icon" @click="tobackdetail">
            <Icon size="30" type="ios-arrow-back" />
          </div>
          {{patientname}}的病历
        </div>
        <div class="contentnull" v-if="caseList.length==0">
          <p>暂无数据</p>
        </div>
        <div class="content" v-if="caseList.length>0">
          <div
            v-for="(item,index) in caseList"
            :key="index"
            class="item"
          >
            <div class="cordno">
              {{dealvisitdate(item.visitdate)}}
            </div>
            <div class="content-box">
              <div class="item-flex" v-if="item.doctorno">
                <span class="pro-title">卡号:</span>
                <p class="pro-text">{{item.doctorno}}</p>
              </div>
              <div class="item-flex" v-if="item.doctor">
                <span class="pro-title">医生:</span>
                <p class="pro-text">{{item.doctor}}</p>
              </div>
              <div slot="itemlist-content">
                <div class="item-flex" v-if="item.advice">
                  <span class="pro-title">建议:</span>
                  <p class="pro-text">{{item.advice}}</p>
                </div>
                <div class="item-flex" v-if="item.anamnesis">
                  <span class="pro-title">既往史:</span>
                  <p class="pro-text">{{item.anamnesis}}</p>
                </div>
                <div class="item-flex" v-if="item.diagdesc">
                  <span class="pro-title">诊断:</span>
                  <p class="pro-text">{{item.diagdesc}}</p>
                </div>
                <div class="item-flex" v-if="item.bodymeax">
                  <span class="pro-title">查体:</span>
                  <p class="pro-text">{{item.bodymeax}}</p>
                </div>
                <div class="item-flex" v-if="item.familyill">
                  <span class="pro-title">家族史:</span>
                  <p class="pro-text">{{item.familyill}}</p>
                </div>
                <div class="item-flex" v-if="item.illnessdesc">
                  <span class="pro-title">主诉:</span>
                  <p class="pro-text">{{item.illnessdesc}}</p>
                </div>
                <div class="item-flex" v-if="item.individual">
                  <span class="pro-title">过敏史:</span>
                  <p class="pro-text">{{item.individual}}</p>
                </div>
                <div class="item-flex" v-if="item.marrital">
                  <span class="pro-title">婚姻:</span>
                  <p class="pro-text">{{item.marrital}}</p>
                </div>
                <div class="item-flex" v-if="item.maternitl">
                  <span class="pro-title">婚孕史:</span>
                  <p class="pro-text">{{item.maternitl}}</p>
                </div>
                <div class="item-flex" v-if="item.medhistory">
                  <span class="pro-title">现病史:</span>
                  <p class="pro-text">{{item.medhistory}}</p>
                </div>
                <div class="item-flex" v-if="item.medicalrecord">
                  <span class="pro-title">辅助检查:</span>
                  <p class="pro-text">{{item.medicalrecord}}</p>
                </div>
                <div class="item-flex" v-if="item.memo">
                  <span class="pro-title">备注:</span>
                  <p class="pro-text">{{item.memo}}</p>
                </div>
                <div class="item-flex" v-if="item.menses">
                  <span class="pro-title">月经史:</span>
                  <p class="pro-text">{{item.menses}}</p>
                </div>
                <div class="item-flex" v-if="item.operationrecord">
                  <span class="pro-title">处理:</span>
                  <p class="pro-text">{{item.operationrecord}}</p>
                </div>
              </div>
            
            </div>
          </div>
        </div>
      </div>
      <loading v-show="isshowloading"></loading>
  </div>
</template>

<script>
import tabbar from "../../common/tabbar";
import loading from "../../common/loading"
import pullRefresh from "../../common/scrollRefresh";
export default {
  components: {
    tabbar,
    pullRefresh,
    loading
  },
  data() {
    return {
      isshowloading:false,
      patientname:'',
      caseList: [],
      yspatientinfo:{},
      ysname:'',
      currentdate:''
    };
  },
  methods: {
    tobackdetail(){
      this.$router.push('/detail')
    },
    dealvisitdate(data){
      //shijianchuo是整数，否则要parseInt转换
      var time = new Date(data);
      var y = time.getFullYear();
      var m = time.getMonth()+1;
      var d = time.getDate();
      var h = time.getHours();
      var mm = time.getMinutes();
      var s = time.getSeconds();
      return y+'-'+m+'-'+d;
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
    //正则截取
    execs(data) {
      return /\d{4}-\d{1,2}-\d{1,2}/g.exec(data)[0];
    },
    /**
     * advice: "建议"
        anamnesis: "既往史"
        body_exam: "查修"
        diag_desc: "诊断"
        doctor: "曲博"
        doctor_no: "0000QB"
        family_ill: "家族史"
        illness_desc: " 主诉"
        individual: "过敏史"
        marrital: "无"
        maternity: "婚韵史"
        med_history: "现病史"
        medical_record: "辅助检查"
        memo: "备注"
        menses: "月经史"
        operation_record: "处理"
        ordinal: 1
        patient_id: "01906345"
        visit_date: 1560960000000
        visit_no: 18
     */
    //请求列表
    examineList() {
      var that = this;
      // var url =
      // "http://192.168.33.139:8080/HisCloud/casehistory/getmedicalrecords.do";
      // let url="http://192.168.33.43:8080/medicalrecord/getmedicalrecord.do"
      var url =
        that.$store.getters.getUrl +
        "medicalrecord/getmedicalrecord.do";
      var cardno = this.yspatientinfo.patientid;
      this.isshowloading=true
      // var cardno='1303041112'
      $.ajax({
        url: url,
        type: "post",
        dataType: "json",
        async: true,
        data: {
          patientid: cardno
        },
        success: function(data) {
          that.isshowloading=false
          if(data.status=='1'){
            that.caseList = data.data;
          }else{
            that.caseList
          }
        },
        error: function(data) {}
      });
    }
  },
  //查询患者卡号
  //就诊人

  mounted() {
    let _this=this
    this.yspatientinfo=JSON.parse(localStorage.getItem('yspatientinfo'))
    this.patientname=this.yspatientinfo.name
    this.ysname=this.yspatientinfo.hosdocname
    this.examineList();
    var timestamp = (new Date()).getTime();
    this.currentdate=this.dealvisitdate(timestamp)
  }
};
</script>

<style scoped>
.MyExamine{
  height: 100%;
  width: 100%;
}
.box-flex{
  height: 100%;
  width: 100%;
  display: flex;
  flex-direction: column;
}
.title {
  background: rgb(0,187,187);
  font-size: 20px;
  color: white;
  padding: 10px 0;
  text-align: center;
  position: relative;
}
.arrow-icon{
  position: absolute;
  left: 5px;
  top: 10px;
}
.content{
  flex: 1;
  overflow: auto;
  
}
.contentnull{
  flex: 1;
  display: flex;
  justify-content: center;
  flex-direction: column;
  align-self: center;
}
.contentnull p{
  font-size: 20px;
  
}

.item{
  border:1px solid #dcdee2;
  /* border-radius: 5px; */
  
}
.content-box{
padding: 0 20px;
}
.cordno{
  text-align: center;
  background: rgb(0,187,187);
  /* border-top-left-radius: 5px;
  border-top-right-radius: 5px; */
  padding: 10px;
  font-size: 16px;
  color: white;
}
.item-flex{
  display: flex;
  padding: 5px;
}
.line{
    border: 1px solid rgb(0,187,187);
    /* margin: 0 10px;
    margin-right: 10px; */
}
.pro-title{
  width: 80px;
}
.pro-text{
  flex:1;
}
.btn{
  padding: 10px;
}
</style>