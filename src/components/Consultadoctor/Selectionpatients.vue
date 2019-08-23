<template>
    <div style="height: 100%;overflow: auto;">
        <div class="tittle" style="background: #28b8a1;color:white">
            <div class="arrow-icon" @click="tobackdetail">
                <Icon size="30" type="ios-arrow-back" /><span style="font-size:18px;">选择患者</span>
            </div>
        </div>
        <div class="content">
            <p style="text-align: left;font-size:22px;padding: 10px 5%;padding-left:5%;font-weight: 900">请选择患者信息</p>
            <div class="content1">
                <div class="Patient"  v-for="(item,index) in Patient" :key="index" @click="selects(index)">
                    <p><span style="font-weight: 900">{{item.name}}</span>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span>{{item.sex}}&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;{{item.age}}岁</span></p>
                    <p><span>{{item.id}}</span><span style="position: absolute;right: 15px;">{{item.phone}}</span></p>
                </div>
            </div>
            <div class="content1">
                <div class="Patient1" style="text-align: center;" @click="goauthentication()">
                    <p><svg t="1566457223344" class="icon" viewBox="0 0 1027 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="4050" width="50" height="50"><path d="M853.95951925 475.5066105h-310.08967642v-300.83326917c0-13.88461268-13.88461268-32.39742862-32.39742936-32.39742862-18.51281666 0-32.39742862 18.51281666-32.39742861 37.02563333v300.83326844H178.2417157c-18.51281666-4.62820399-37.02563333 13.88461268-37.02563262 32.39742934s18.51281666 32.39742862 32.39742863 32.39742861h300.83326916v300.83326845c4.62820399 18.51281666 18.51281666 37.02563333 37.02563261 37.02563334s32.39742862-18.51281666 32.39742935-32.39742862v-305.46147317h305.46147243c18.51281666 0 32.39742862-18.51281666 32.39742934-32.39742861s-9.25640796-37.02563333-27.76922535-37.02563333z" fill="#e6e6e6" p-id="4051"></path></svg></p>
                    <p>添加患者</p>
                </div>
            </div>
            <div class="content1">
                <div class="But">
                    <Button shape="circle" class="circle" @click="goConsulOrder()">下一步</Button>
                </div>  
                
            </div>
        </div>
    </div>
</template>

<script>
    export default {
        data() {
                return {
                    Patient:[{
                        name:'李明明',
                        sex:'男',
                        age:'32',
                        id:'610581********2234',
                        phone:'18701113009'
                    },{
                        name:'李明明',
                        sex:'男',
                        age:'32',
                        id:'610581********2234',
                        phone:'18701113009'
                    },{
                        name:'李明明',
                        sex:'男',
                        age:'32',
                        id:'610581********2234',
                        phone:'18701113009'
                    },]
                }
        },
        methods:{
            //返回上一层
            tobackdetail(){
               this.$router.push('/Describecondition');
            },
            //选择患者
            selects(index){
                var Patien = document.getElementsByClassName('Patient');
                for(var i = 0;i<Patien.length;i++){
                    Patien[i].style.border = '1px solid #ddd';
                }
                Patien[index].style.border  = '1px solid  #28b8a1'
            },
            //下一步
            goConsulOrder(){
               this.$router.push('/ConsulOrder'); 
            },
            //添加就诊人
            goauthentication(){
                this.$router.push('/authentication'); 
            }
        },
        mounted(){
            var Patien = document.getElementsByClassName('Patient');
             Patien[0].style.border  = '1px solid  #28b8a1'
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
.content1{
    /* margin-top: 20px; */
    text-align: center;
}
.Patient{
    width: 90%;
    border-radius: 5px;
    border: 1px solid #ddd;
    display: inline-block;
    text-align: left;
    padding: 10px 15px;
    font-size: 16px;
    position: relative;
    margin-top: 20px;
}
.Patient p{
    line-height: 2.3;
}
.Patient p span{
    /* display: inline-block */
}
.Patient1{
    width: 90%;
    border-radius: 5px;
    border: 1px solid #ddd;
    display: inline-block;
    text-align: center;
    padding: 10px 15px;
    font-size: 16px;
    position: relative;
     margin-top: 20px;
}
.Patient1 p{
    line-height: 1;
}
.circle{
    width: 90%;
    background: #28b8a1;
    color: #ffffff;
    font-size: 16px;
    padding: 8px 0;
}
.But{
    text-align: center;
    padding: 60px 0 40px 0;
    
}
</style>