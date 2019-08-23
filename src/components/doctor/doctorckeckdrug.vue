<template>
  <div class="doctorckeckdrug">
    <div class="title">
      <div class="arrow-icon" @click="tobackdetail">
          <Icon size="30" type="ios-arrow-back" />
      </div>
      药品信息
    </div>
    <div class="tipinfo" v-if="checklist.length==0">
        暂无数据
    </div>
    <div v-if="checklist.length>0">
      <div v-for="(items,index) in checklist" :key="index" class="items">
        <div v-for="(item,key) in items.items" :key="key">
          <div class="item">
            <div class="itemname">项目名称</div>
            <div style="text-align:left;overflow: hidden;white-space: nowrap;text-overflow: ellipsis;">{{item.drugname}}</div>
          </div>
          <div class="item">
            <div class="itemname">费用</div>
            <div >{{item.costs}}元</div>
          </div>
          <div class="item">
            <div class="itemname">详情</div>
            <div style="color:rgb(87,197,247)" @click="showmodal(item)">详情</div>
          </div>
        </div>
        <div class="btn">
          <div @click="isdelet(items,index)">撤销</div>
        </div>
      </div>
    </div>
    <Modal
        v-model="itemmodal"
        title="药品详情"
        fullscreen>
            <!-- <p>{{itemdrug.dosage}}</p>
            <p>{{itemdrug.orderno}}</p> -->
            <div class="itemmodal">
              <p><span class="name">用法:</span><span>{{itemdrug.administration}}</span></p>
              <p><span class="name">包装:</span><span>{{itemdrug.drugspec}}</span></p>
              <p><span class="name">每次用量:</span><span>{{itemdrug.dosage}}{{itemdrug.units}}</span></p>              
              <p>
                <span class="name">频次:</span>
                <span>{{itemdrug.frequency}}</span>
              </p>
              <p><span class="name">处方类型:</span><span>{{itemdrug.itemclass=='A'?'西药':'中药'}}</span></p>
              <p><span class="name">用药天数:</span><span>{{itemdrug.abidance}}</span></p>
              <p><span class="name">费用:</span><span>{{itemdrug.costs}}</span></p>
              <p><span class="name">数量:</span><span>{{itemdrug.amount}}</span></p>
            </div>
    </Modal>
    <Modal
        v-model="erromodal"
        title="提示">
        <p>{{errormsg}}</p>
    </Modal>
    <Modal
        v-model="tipmodal"
        title="提示"
        @on-ok="delet()">
        <p>是否撤销此订单？</p>
    </Modal>
    <loading v-show="isshow" class="load"></loading>
  </div>
</template>

<script>
import loading from "../../common/loading"
import {hidemenu} from "../../common/js/hide"
  export default {
    components:{
      loading
    },
    methods:{
      tobackdetail(){
        this.$router.push('/doctorckeck')
      }
    },
    data(){
      return{
        itemmodal:false,
        itemdrug:{},
        isshow:true,
        delitem:null,
        delindex:0,
        tipmodal:false,
        errormsg:'',
        erromodal:false,
        checklist:[]
      }
    },
    created(){
      //请求检查数据
      let _this=this
      setTimeout(function(){
        _this.fetchdruglist()
        const requesturl=_this.$store.getters.getUrl + "SweepCode.do";
        hidemenu(requesturl);
      },10)
    },
    methods:{
      tobackdetail(){
        this.$router.push('/doctorckeck')
      },
      showmodal(item){
        this.itemdrug=item
        this.itemmodal=true
      },
      newdate(){
        let _this=this
          let now=new Date();
          let y = now.getFullYear();
          let m = now.getMonth() + 1;
          let d = now.getDate();
          if(m<10){
              m='0'+m
          }
          if(d<10){
              d="0"+d
          }
          return y+'-'+m+'-'+d;
      },
      isdelet(item,index){
        this.delitem=item.items[0]
        this.delindex=index
        this.tipmodal=true
      },
      delet(){
        let that=this
        let yspatientinfo=JSON.parse(localStorage.getItem('yspatientinfo'))
        let orderclass=this.delitem.itemclass
        let cardno=yspatientinfo.patientid
        let visitdate=this.newdate()
        let visitno=yspatientinfo.visitno
        let serialno=this.delitem.serialno
        let docname=yspatientinfo.hosdocname
        let doccode=yspatientinfo.doctor
        let clinicno=yspatientinfo.clinicno
        var url = that.$store.getters.getUrl + "prescription/delPrescribing.do";
        that.isshow = true;
        $.ajax({
          url: url,
          type: "post",
          dataType: "json",
          async: true,
          data: {
              orderclass,
              cardno,
              visitdate,
              visitno,
              serialno,
              docname,
              doccode,
              clinicno
          },
          success: function(data) {
            that.isshow = false;
            if(data.status==1){
              that.$Message.info('撤销成功！');
              that.checklist.splice(that.delindex,1)
            }else{
              that.errormsg='数据撤销失败！'
              that.erromodal=true
            }
          },
          error: function(data){
            that.isshow = false;
            that.errormsg='撤销药方请求发送失败!'
            that.erromodal=true
          }
        });
      },
      dealdrugresult(data){
        let numarr=[]
        for(let i=0;i<data.length;i++){
          let res=numarr.includes(data[i].serialno)
          if(!res){
            numarr.push(data[i].serialno)
          }
        }
        let _checklist=[]
        for(let i=0;i<numarr.length;i++){
          _checklist.push({serialno:numarr[i],items:[]})
        }
        for(let i=0;i<data.length;i++){
          let index=numarr.indexOf(data[i].serialno)
          _checklist[index].items.push(data[i])
        }
        this.checklist=_checklist
      },
      fetchdruglist(){
        var that =this;
        var url = that.$store.getters.getUrl + "prescription/getBeforeOneDrugNoPay.do";
        let yspatientinfo=JSON.parse(localStorage.getItem('yspatientinfo'))
        let orderedby=yspatientinfo.registerdept;
        let doctorno=yspatientinfo.doctor;
        var cardno = yspatientinfo.patientid;
        //打开加载动画
        that.isshow = true;
        $.ajax({
          url: url,
          type: "post",
          dataType: "json",
          async: true,
          data: {
            cardno,
            doctorno,
            orderedby
          },
          success: function(data) {
            that.isshow = false;
            if(data.status=='1'){
              that.dealdrugresult(data.data)
            }else if(data.status!='0'){
              that.errormsg='查询未交费药品处方订单失败!'
              that.erromodal=true
            }
            
          },
          error: function(data){
            that.isshow = false;
            that.errormsg='请求发送失败!'
            that.erromodal=true
          }
        });
      }
    }
  }
</script>

<style scoped>
.doctorckeckdrug{
  height: 100%;
  overflow: auto;
}
.title{
  background: rgb(0, 187, 187);
  height: 50px;
  line-height: 50px;
  text-align: center;
  font-size: 20px;
  color: white;
  position: relative;
}
.arrow-icon{
  position: absolute;
  left: 5px;
  top: 0px;
}
.tbody{
  border:1px solid rgb(205,205,205);
  border-bottom: none;
  margin: 5px;
}
.theard{
  display: flex;
  height: 50px;
  background: rgb(0, 187, 187);
  color: rgb(255,255,255)
}
.theard>div{
  flex: 1;
  text-align: center;
  height: 50px;
  line-height: 50px;
  border-bottom: 1px solid rgb(205,205,205);
  padding-left: 5px;
  padding-right: 5px;
}
.items{
  margin: 5px 0;
  border-bottom: 1px solid rgb(204, 204, 204);
  border-top: 1px solid rgb(204, 204, 204);
  padding: 0 20px;
}
.item{
  display: flex;
  height: 30px;
  line-height: 30px;
}
.item>div{
  font-size: 16px;
  /* text-align: right; */
}
.itemname{
  flex: 1;
  width: 80px;
  font-size: 16px;
  font-weight: bold;
  /* text-align: left; */
}
.btn{
  margin: 10px 0;
  font-size: 16px;
}
.btn>div{
  text-align: center;
  background: rgb(0, 187, 187);
  padding: 10px 0;
  color: rgb(255,255,255);
  border-radius: 5px;
}
.tipinfo{
  text-align: center;
  font-size: 20px;
  margin: 50px;
}
.itemmodal{
  border-bottom: none;
  padding: 0 20px;
  font-size: 16px;
}
.itemmodal>p{
  display: flex;
  text-align: right;
  height: 30px;
  line-height: 30px;
}
.itemmodal p span{
  flex: 1;
}
.itemmodal p .name{
  flex: none;
  text-align: right;
  width: 120px;
  padding-right: 40px;
  font-weight: bold;
}
</style>