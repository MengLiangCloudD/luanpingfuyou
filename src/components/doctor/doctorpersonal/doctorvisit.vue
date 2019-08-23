<template>
    <div style="height:100%;overflow: auto;-webkit-overflow-scrolling: touch;">
        <div class="tittle" style="background: rgb(0, 187, 187);color:white">
            <div class="arrow-icon" @click="tobackdetail">
                <Icon size="30" type="ios-arrow-back" />
            </div>
             医生出诊
        </div>
        <div class="list-content" v-if="visitlist.length>0">
            <div class="item-box" v-for="(item,index) in visitlist" :key="index">
                <div class="text-content">{{item.cliniclabel}}</div>
                <div size="large" class="switchopen" :class="{'activeswitchopen':item.visitstatus=='0'}" @click="ischangestate(item)">
                    {{item.visitstatus=='1'?"出诊":"未出诊"}}
                    <div class="circle" :class="{'activecircle':item.visitstatus=='0'}"></div>
                </div>
            </div>
        </div>
        <Modal
            v-model="infomodel"
            title="提示">
            <p>{{infomsg}}</p>
        </Modal>
        <Modal v-model="statemodel"  @on-ok="changestate" title="挂号提示信息">
            <p>请确认是否修改！</p>
        </Modal>
        <loading v-show="isShowLoading"></loading>
    </div>
</template>

<script>
import {changedoctorstate,fetchdoctorstate} from "./../js/registeredist"
import {hidemenu} from "../../../common/js/hide"
import loading from '../../../common/loading'
    export default {
        name:"doctorvisit",
        data(){
            return{
                visitlist:[],
                isShowLoading:false,
                infomodel:false,
                infomsg:"",
                statemodel:false,
                currentitem:{}
            }
        },
        components:{
            loading
        },
        methods:{
            tobackdetail(){
                this.$router.push('/Personalcenter');
            },
            //查询医生是否出诊状态
            fetchyscode(){
                let that=this
                let url=that.$store.getters.getUrl + "doctorvisit/OutVisit.do";
                let doccode=localStorage.getItem("ysdoccode");
                const codedata=fetchdoctorstate(url,doccode,that);
                if(codedata.status=="1"){
                    this.visitlist=codedata.data
                }else if(codedata.status=="0"){

                }else{
                    that.infomodel=true
                    that.infomsg="获取医生出诊状态异常！" 
                }
            },
            ischangestate(item){
                this.currentitem=item
                this.statemodel=true
            },
            async changestate(){
                let item=this.currentitem
                let that=this
                    const cliniclabel=item.cliniclabel
                    let code
                    if(item.visitstatus=="1"){
                        code=0
                    }else{
                        code=1
                    }
                    let url=that.$store.getters.getUrl + "doctorvisit/NoVisit.do";
                    const codedata=await changedoctorstate(url,cliniclabel,code,that)
                    if(codedata.status=="1"){
                        that.fetchyscode()
                    }else if(codedata.status=="-1"){
                        that.infomodel=true
                        that.infomsg="修改状态失败！"
                    }
            }
        },
        created(){
            let _this=this
            setTimeout(function(){
                _this.fetchyscode()
                const requesturl=_this.$store.getters.getUrl + "SweepCode.do";
                hidemenu(requesturl);
            },10)
            
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
.item-box{
    position: relative;
    height: 50px;
    border:1px solid rgb(156, 153, 153);
    border-radius: 5px;
    margin: 10px;
}
.item-box .text-content{
    height: 50px;
    font-size: 16px;
    line-height: 50px;
    padding: 0 10px;
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
  color: white;
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
</style>