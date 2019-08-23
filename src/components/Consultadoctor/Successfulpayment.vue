<template>
    <div style="height: 100%;overflow: auto;">
        <div class="tittle" style="background: #28b8a1;color:white">
            <div class="arrow-icon" @click="tobackdetail">
                <Icon size="30" type="ios-arrow-back" /><span style="font-size:18px;">支付成功</span>
            </div>
        </div>
        <div class="content">
            
        </div>
    </div>
</template>

<script>
    export default {
         methods:{
            //返回上一层
            tobackdetail(){
                // this.$router.push('/Selectionpatients');
            },
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
</style>