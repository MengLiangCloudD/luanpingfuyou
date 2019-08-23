<template>
    <div  style="height: 100%;overflow: auto;">
        <div class="tittle" style="background: #28b8a1;color:white">
            <div class="arrow-icon" @click="tobackdetail">
                <Icon size="30" type="ios-arrow-back" /><span style="font-size:18px;">描述病情</span>
            </div>
        </div>
        <div class="content">
            <div class="content1">
                <p style="text-align: left;font-size:22px;padding: 10px 5%;padding-left:5%;font-weight: 900">请描述您的病情</p>
                <div class="inp">
                    <Input v-model="value6" type="textarea" :rows="5" placeholder="请描述您的性别年龄，症状就诊经历等信息" style="width:100%;"/>
                </div>
            </div>
            <div class="content1">
                <p style="text-align: left;font-size:18px;padding: 10px 5%;padding-left:5%;font-weight: 400">本次患病多久了</p>
                <div class="rad">
                    <RadioGroup v-model="button4" type="button" size="large">
                        <Radio label="一周内"></Radio>
                        <Radio label="一月内"></Radio>
                        <Radio label="半年内"></Radio>
                        <Radio label="大半年"></Radio>
                    </RadioGroup>
                </div>
            </div>
            <div class="content1">
                <div class="But">
                    <Button shape="circle" class="circle" @click="goSelectionpatients()">选择患者信息</Button>
                </div>  
                
            </div>
        </div>
    </div>
</template>

<script>
    export default {
        data(){
            return {
                value6:'',
                button4:''
            }
        },
        methods:{
            //返回上一层
            tobackdetail(){
               this.$router.push('/ConsultationHome');
            },
            //选择患者
            goSelectionpatients(){
                 this.$router.push('/Selectionpatients');
            }
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
.inp{
     padding: 10px 5% 10px 5%;
}
.rad{
   padding: 10px 5% 10px 5%;
   text-align: center;  
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
    padding: 80px 0;
}
</style>