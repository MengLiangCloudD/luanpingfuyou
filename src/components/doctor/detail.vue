<template>
    <div class="detail-list">
        <div class="title">
            <div class="arrow-icon" @click="tobackdetail">
                <Icon size="30" type="ios-arrow-back" />
            </div>
            <!-- <div class="quite" @click="quite">
                <div>退出</div>
            </div> -->
            滦平县妇幼保健产科门诊
        </div>
        <div class="doctor-info">
            <div class="avatar">
                <img src="../../assets/avatar.png" alt="">
            </div>
            <div class="info">
                <div>患者姓名：{{name}} </div>
                <div>患者卡号：{{cardno}}</div>
            </div>
            <div class="icon-arrow" @click="tomedicalrecords">
                <Icon size='50' color='rgb(0,187,187)' type="ios-arrow-dropright" />
            </div>
        </div>
        <div class="main-box">
            <!-- 病历 -->
            <div class="left"  v-if="currentindex==0">
                <writerecords v-if="type=='1'"></writerecords>
                <writerecordsobs v-if="type=='2'"></writerecordsobs>
                <writerecordschild v-if="type=='3'"></writerecordschild>
            </div>
            <!-- 检查 -->
            <div class="left" v-if="currentindex==1">
                <writecheck></writecheck>
            </div>
            <!-- 化验 -->
            <div class="left" v-if="currentindex==2">
                <writingtest></writingtest>
            </div>
            <!-- 药品处方 -->
            <div class="left" v-if="currentindex==3" id="left" ref="scrollitem">
                <div class="input-wrapper">
                    <RadioGroup v-model="drugstate" @on-change="changeradio">
                        <Radio label="east">
                            <span>中药</span>
                        </Radio>
                        <Radio label="west">
                            <span>西药</span>
                        </Radio>
                    </RadioGroup>
                </div>
                <div v-if="drugindex==0">
                    <prescription ref="prescription"></prescription>
                </div>
                <div v-if="drugindex==1">
                    <zhprescription ref="zhprescription"></zhprescription>
                </div>
            </div>
            <!-- 治疗 -->
            <div class="left" v-if="currentindex==4">
                <p class="tipinfo">暂无住院信息！</p>
            </div>
            <!-- 住院 -->
            <div class="left" v-if="currentindex==5">
                <p class="tipinfo">暂无治疗信息！</p>
            </div>
            
            <div class="right">
                <div>   
                    <div class="btn" @click="record(0)" :class="{active:currentindex==0}">
                        <p>病</p>
                        <p>历</p>
                    </div>
                    <div class="btn" @click="record(1)" :class="{active:currentindex==1}">
                        <p>检</p>
                        <p>查</p>
                    </div>
                    <div class="btn" @click="record(2)" :class="{active:currentindex==2}">
                        <p>化</p>
                        <p>验</p>
                    </div>
                    <div class="btn" @click="record(3)" :class="{active:currentindex==3}">
                        <p>处</p>
                        <p>方</p>
                    </div>
                    <div class="btn" @click="record(5)" :class="{active:currentindex==5}">
                        <p>治</p>
                        <p>疗</p>
                    </div>
                    <div class="btn" @click="record(4)" :class="{active:currentindex==4}">
                        <p>住</p>
                        <p>院</p>
                    </div>
                </div>
            </div>
        </div>
        
    </div>
</template>

<script>
import writecheck from "./writecheck"
import writingtest from "./writingtest"
import writerecords from "./writerecords"
import writerecordsobs from "./writerecordsobs"
import writerecordschild from "./writerecordschild"
import prescription from "./prescription"
import zhprescription from "./zhprescription"
import {websocket} from "./websocket"
import {hidemenu} from "../../common/js/hide"
    export default {
        name:"detail",
        components:{
            writecheck,
            writingtest,
            writerecords,
            prescription,
            zhprescription,
            writerecordsobs,
            writerecordschild
        },
        data(){
            return{
                value6:'',
                currentindex:0,
                drugstate:'west',
                drugindex:0,
                cardno:'',
                name:'',
                type:'-1'
            }
        },
        methods:{
            // quite(){
            //     let _this=this
            //     var url = _this.$store.getters.getUrl + "doctor/DoctorSignOut.do";
            //     var doccode= localStorage.ysdoccode;
            //         $.ajax({
            //             url: url,
            //             type: "post",
            //             dataType: "json",
            //             data: {doccode:doccode},
            //             success: function(data) {
            //                 if(data=='1'){
            //                     _this.$router.push('/doctorlogin')
            //                 }
            //             },
            //                 error: function(data) {
            //             }
            //         });
            // },
            tobackdetail(){
                this.$router.push('/registeredlist')
            },
            //切换标签
            record(idnex){
                if(localStorage.getItem('ysrecordstate')==1){
                    return
                }
                if(this.currentindex==idnex){
                    return
                }
                this.currentindex=idnex
            },
            changeradio(data){
                let index
                if(data=='west'){
                    index=0
                }else{
                    index=1
                }
                if(this.drugindex==index){
                    return
                }
                this.drugindex=index
            },
            tomedicalrecords(){
                localStorage.setItem('tiao',1);
                this.$router.push('/doctorckeck');
            }
        },
        mounted(){
            let _this=this
            const requesturl=_this.$store.getters.getUrl + "SweepCode.do";
            hidemenu(requesturl);
            let patientinfo=localStorage.getItem('yspatientinfo')
            let data=JSON.parse(patientinfo)
            this.name=data.name
            if(data.registerdept=='10010201'||data.registerdept=='10010202'||data.registerdept=='10010203'||data.registerdept=='10010209'){
                this.type='2'
            }else if(data.registerdept=='10010301'){
                this.type='3'
            }else{
                this.type='1'
            }
            this.cardno=data.patientid;
            websocket(localStorage.getItem('ysdoccode'));
        },
        destroyed(){
            window.websocketobj.close();
            delete window.websocketobj
        }
    }
</script>

<style scoped>

.detail-list{
    height: 100%;
    overflow: auto;
}
/* 标题 */
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
.quite{
    position: absolute;
    right: 5px;
    bottom: 0;
}
/* 医生信息 */
.doctor-info{
    display: flex;
    padding: 2px;
    height: 50px;
    margin: 5px;
}
.doctor-info .avatar{
    height: 50px;
}
.doctor-info .avatar img{
    height: 50px;
    width: 50px;
}
.doctor-info .info{
    flex:1;
    display: flex;
    flex-direction: column;
    padding-left: 20px;
}
.doctor-info .info div{
    font-size: 16px;
    line-height: 25px;
}
.icon-arrow{
    display: flex;
    align-items: center
}

/* 主要内容 */
.main-box{
    display: flex;
    margin: 2px;
    margin-top: 10px;
}
/* 左侧内容 */
.main-box .left{
    margin-right: 2px;
    flex: 1;
}
.input-wrapper{
    margin-bottom: 2px;
    border: 1px solid #dcdee2;
    height: 46px;
    line-height: 46px;
    padding-left: 10px;
    border-radius: 5px;
}
.drugitem-wrapper{
    margin-bottom: 2px;
    border: 1px solid #dcdee2;
    padding: 10px;
    border-radius: 5px;
}
.drugitem-wrapper p{
    display: flex;
}
.drugitem-wrapper p .left{
    flex: 1
}
.add-btn{
    margin-bottom: 2px;
    border: 1px solid #dcdee2;
    height: 46px;
    text-align: center;
    background: rgb(0, 187, 187);
    color: white;
    line-height: 46px;
    padding-left: 10px;
    border-radius: 5px;
}
/* 右侧内容 */
.btn{
    border: 1px solid #dcdee2;
    border-radius: 5px;
    padding: 20px;
    margin-bottom: 2px;
    height: 94px;
}
.btn p{
   font-size: 14px;
}
.tipinfo{
    font-size: 20px; 
    text-align: center;
    margin-top: 20px;
}
.active{
    background: rgb(0, 187, 187)
}
</style>