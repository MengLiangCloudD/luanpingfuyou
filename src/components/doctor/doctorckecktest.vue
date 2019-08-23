<template>
  <div class="doctorckecktest">
    <div class="title">
      <div class="arrow-icon" @click="tobackdetail">
          <Icon size="30" type="ios-arrow-back" />
      </div>
      化验信息
    </div>
    <div class="tipinfo" v-if="testlist.length==0">
        暂无数据
    </div>
    <div v-if="testlist.length>0">
      <div v-for="(items,index) in testlist" :key="index" class="items">
        <div v-for="(item,key) in items.items" :key="key">
          <div class="item">
            <div class="itemname">项目名称</div>
            <div style="flex:1;text-align:right;overflow: hidden;white-space: nowrap;text-overflow: ellipsis;">{{item.itemname}}</div>
          </div>
          <div class="item">
            <div class="itemname">费用</div>
            <div style="text-align:right;flex:1">{{item.costs}}元</div>
          </div>
        </div>
        <div class="btn">
          <div @click="isdelet(items,index)">撤销</div>
        </div>
      </div>
    </div>
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
    <loading v-show="isshow"></loading>
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
        isshow:false,
        delitem:null,
        delindex:0,
        tipmodal:false,
        errormsg:'',
        erromodal:false,
        testlist:[]
      }
    },
    created(){
      //请求化验数据
      let _this=this
      setTimeout(() => {
          _this.fetchtestlist()
          const requesturl=_this.$store.getters.getUrl + "SweepCode.do";
          hidemenu(requesturl);
      }, 10);
      
    },
    methods:{
      tobackdetail(){
        this.$router.push('/doctorckeck')
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
        let serialno=this.delitem.serialno
        let cardno=yspatientinfo.patientid
        let reqdept=yspatientinfo.registerdept
        let docname=yspatientinfo.hosdocname
        let doccode=yspatientinfo.doctor
        let visitno=yspatientinfo.visitno
        let visitdate=this.newdate()
        let clinicno=yspatientinfo.clinicno
        var url = that.$store.getters.getUrl + "chemicalexam/delAssayItem.do";
        that.isshow = true;
        $.ajax({
          url: url,
          type: "post",
          dataType: "json",
          async: true,
          data: {
              serialno,
              cardno,
              reqdept,
              docname,
              doccode,
              visitno,
              visitdate,
              clinicno,
          },
          success: function(data) {
            that.isshow = false;
            if(data.status==1){
              that.$Message.info('撤销成功！');
              that.testlist.splice(that.delindex,1)
            }else{
              that.errormsg='撤销数据失败！'
              that.erromodal=true
            }
          },
          error: function(data){
            that.isshow = false;
            that.errormsg='撤销化验请求发送失败!'
            that.erromodal=true
          }
        });
      },
      dealtestresult(data){
        let numarr=[]
        for(let i=0;i<data.length;i++){
          let res=numarr.includes(data[i].serialno)
          if(!res){
            numarr.push(data[i].serialno)
          }
        }
        let testlist=[]
        for(let i=0;i<numarr.length;i++){
          testlist.push({serialno:numarr[i],items:[]})
        }
        for(let i=0;i<data.length;i++){
          let index=numarr.indexOf(data[i].serialno)
          testlist[index].items.push(data[i])
        }
        this.testlist=testlist
      },
      fetchtestlist(){
        var that =this;
        var url = that.$store.getters.getUrl + "chemicalexam/getBeforeOneAssayNoPay.do";
        let yspatientinfo=JSON.parse(localStorage.getItem('yspatientinfo'))
        let reqdeptcode=yspatientinfo.registerdept;
        let doctorcode=yspatientinfo.doctor
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
            doctorcode,
            reqdeptcode
          },
          success: function(data) {
            that.isshow = false;
            if(data.status=='1'){
              that.dealtestresult(data.data)
            }else if(data.status!='0'){
              that.errormsg='数据查询失败！'
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
.doctorckecktest{
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
</style>