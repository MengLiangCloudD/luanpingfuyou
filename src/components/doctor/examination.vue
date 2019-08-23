<template>
    <div class="examination-page">
        <div class="title" >
            <div @click="topath"  class="title-arrow-icon">
                <Icon  size="20" color="rgb(255,255,255)" type="ios-arrow-back"/>
            </div>
            <p>拟诊</p>
        </div>
        <div class="content">
            <div class="input-item">
                <div class="text">拟诊:</div>
                <Input v-model="ysinputlist" type="textarea" :autosize="inputsize"  disabled/>
            </div>
        </div>
        <div class="btn-wrapper">
            <Button @click="madeWesternMedicine" type="primary" class="btn" long>开西药</Button>
            <Button @click="madeChineseMedicine" type="primary" class="btn" long>开中药</Button>
        </div>
    </div>
</template>

<script>
    export default {
        data(){
            return{
                inputsize:{ minRows: 6, maxRows: 6 },
                ysinputlist:'',
                cardno:'',
                doctoruser:''

            }
        },
        methods:{
            topath(){
                this.$router.push('/registeredlist')
            },
            async savediagdesc(){
                const result=await this.fetchdiagdesc()
                this.ysinputlist=result
                localStorage.setItem('ysnizhen',result)
            },
            fetchdiagdesc(){
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
                let visitdate=y+'-'+m+'-'+d;
                return new Promise((resolve,reject)=>{
                    let url=_this.$store.getters.getUrl+'check/getOutpMrDiagDesc.do'
                    $.ajax({
                        url: url,
                        type: "post",
                        dataType: "json",
                        async: true,
                        data:{
                            cardno:_this.cardno,
                            visitdate,
                            doctorno:_this.doctoruser
                        },
                        success: function(data) {
                            resolve(data.data[0].diagdesc)
                        },
                        error: function(data) {
                            reject(data)
                        }
                    });
                })
            },
            madeWesternMedicine(){
                let _this=this
                for(let i=0;i<_this.ysinputlist.length;i++){
                    if(_this.ysinputlist[i]==''){
                        this.$Modal.info({
                            title:"提示信息",
                            content:'输入框内容禁止为空,请填写相应信息或者删除没有信息的输入框！'
                            })
                        return
                    }
                }
                localStorage.setItem('ysnizhen',JSON.stringify(_this.ysinputlist))
                localStorage.setItem('ysorderclass','A')
                _this.$router.push('/prescription')
            },
            madeChineseMedicine(){
                let _this=this
                for(let i=0;i<_this.ysinputlist.length;i++){
                    if(_this.ysinputlist[i]==''){
                        this.$Modal.info({
                            title:"提示信息",
                            content:'输入框内容禁止为空,请填写相应信息或者删除没有信息的输入框！'
                            })
                        return
                    }
                }
                localStorage.setItem('ysnizhen',JSON.stringify(_this.ysinputlist))
                localStorage.setItem('ysorderclass','B')
                _this.$router.push('/zhprescription')
            }
        },
        mounted(){
            let _this=this
            let patientinfo=localStorage.getItem('yspatientinfo')
            let data=JSON.parse(patientinfo)
            this.doctoruser=data.doctor//申请医生编码
            this.cardno=data.patientid//患者卡号
            this.savediagdesc()
            // this.inputlist=JSON.parse(localStorage.getItem('inputlist'))
        }
    }
</script>

<style scoped>
.examination-page{
    height: 100%;
    display: flex;
    flex-direction: column;
}
.examination-page .title{
    background: rgb(0,187,187);
    height: 50px;
    line-height: 50px;
    text-align: center;
    font-size: 20px;
    color: white;
}
.examination-page .title-arrow-icon{
  position: absolute;
  left: 0px;
  top: 0px;
  height: 50px;
  width:50px;
}
.examination-page .content{
    padding: 0px;
    flex: 1;
    /* border: 1px solid rgb(187,187,187); */
    border-radius: 10px;
    margin: 10px;
    flex: 1;
    overflow: auto;
}
.input-item{
    display: flex;
}
.input-item .text{
    width: 60px;
    font-size: 16px;
}
.tip-input{
    position: absolute;
    top:40px;
    left: 0;
    width: 100%;
    z-index: 1000;
    background: rgb(255,255,255);
}
.item-tip{
    border: 1px solid rgb(187,187,187);
    padding: 10px;
}
.icon-wrapper{
    width: 50px;
    align-self:center;
    margin: 0 5px;
}

.examination-page .btn-wrapper{
    display: flex;
    justify-content: space-around;
    margin-bottom: 20px;
}
.examination-page .btn{
    padding: 10px 0;
    margin: 0 10px;
}
</style>