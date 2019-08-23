<template>
    <div style="height:100%;overflow: auto;">
        <div class="title">
            <div class="arrow-icon" @click="tobackdetail">
                <Icon size="30" type="ios-arrow-back" />
            </div>
            患者个人基本信息
        </div>
        <div class="header" style="z-index:910;position:relative">
          <div class="users"  style="padding-left: 5%;">
            <img src="./../../assets/头像.png" alt="" width="50px;" style="vertical-align: top;" >
            <div class="user" style="display: inline-block;vertical-align: top;margin-left:10px;">
              <p><span>患者姓名：</span><span>{{name}}</span></p>
              <p><span>患者卡号：</span><span>{{cardno}}</span></p>
              <p><span>身份证号：</span><span>{{idno}}</span></p>
              <!-- <svg :class="'barcodea'"></svg> -->
            </div>
          </div>
        </div>
        <div class="content2">
            <p @click="record">
            <img src="./../../assets/bing.png" alt width="24">
            <span>患者病历</span>
            </p>
            <p @click="check">
                <img src="./../../assets/za.png" alt width="24">
                <span>检查处方</span>
            </p>
            <p @click="test">
                <img src="./../../assets/huayan.png" alt width="24">
                <span>化验处方</span>
            </p>
            <p @click="drug">
                <img src="./../../assets/chu.png" alt width="24">
                <span>药品处方</span>
            </p>
            
            <p @click="checkres">
                <img src="./../../assets/jian.png" alt width="24">
                <span>检查结果</span>
            </p>
            
            <p @click="testres">
                <img src="./../../assets/hua.png" alt width="24">
                <span>化验结果</span>
            </p>
      </div>
    </div>
</template>

<script>
import {hidemenu} from "../../common/js/hide"
    export default {
        data(){
            return{
                name:"",
                cardno:"",
                idno:"",
                namem:''
            }
        },
       methods:{
           checkres(){
               this.$router.push('/doctorckeckjctresult')
           },
           testres(){
               this.$router.push('/doctorckecktestresult')
           },
           tobackdetail(){
             if(this.namem==0){
                this.$router.push('/Historicpatients');
             }else{
               this.$router.push('/detail');
             }
           },
            check(){
                this.$router.push('/checkresult')
            },
            test(){
                this.$router.push("/doctorckecktest")
            },
            drug(){
                this.$router.push("/doctorckeckdrug")
            },
            record(){
                this.$router.push("/doctorckeckrec")
            }
       },
       mounted(){
            let _this=this
            const requesturl=_this.$store.getters.getUrl + "SweepCode.do";
            hidemenu(requesturl);
            this.namem=localStorage.getItem('tiao')
            let yspatientinfo=JSON.parse(localStorage.getItem('yspatientinfo'))
            this.idno=yspatientinfo.idno
            this.name=yspatientinfo.name
            this.cardno=yspatientinfo.patientid
       },
    }
</script>

<style scoped>
.title{
  background: rgb(0, 187, 187);
  height: 50px;
  line-height: 50px;
  text-align: center;
  font-size: 20px;
  color: white;
  position: relative;
}
.content2{
    margin-top: 20px;
    padding-bottom: 50px;
    border-top: 1px solid #aaa;
}
.content2 p img {
  vertical-align: middle;
}
.content2 p span {
  display: inline-block;
  vertical-align: middle;
  padding-left: 15px;
}
.content2 p {
  padding: 16px 10% 16px 10%;
  border-bottom: 1px solid #aaa;
  color: black;
}
.arrow-icon{
  position: absolute;
  left: 5px;
  top: 0px;
  
}
.users{
    display: flex;
    height: 50px;
    margin: 20px 0;
}
.header img,
header span {
  display: inline-block;
  vertical-align: middle;
}
.headerimage {
  vertical-align: middle;
  border-radius: 50%;
}
.name {
  vertical-align: middle;
  display: inline-block;
  padding-left: 10px;
  font-size: 18px;
}
.user p{
  line-height: 1.8;
}
</style>