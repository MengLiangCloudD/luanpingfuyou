<template>
    <div class="erwem">
        <div class="tittle" style="background: rgb(0, 187, 187);color:white">
            <div class="arrow-icon" @click="tobackdetail">
                <Icon size="30" type="ios-arrow-back" />
            </div>
             二维码名片
        </div>
        <div class="content">
                <div class="mycard">
                    <img src="./../../../assets/avatar.png" alt="" width="50px;" style="vertical-align: middle;margin-left:10px;" >
                    <div class="user" style="display: inline-block;vertical-align: middle;margin-left:10px;">
                        <p><span>{{docName}}</span></p>
                        <p><span>{{docCode}}</span></p>
                    </div>
                    <div class="er">
                        <img :src="imgers" alt="" width="100%">
                    </div>
                    <p style="text-align: center;">扫描上面的二维码关注我</p>
            </div>
        </div>
    </div>
</template>

<script>
    export default {
        name:'MaxCard',
        data(){
            return {
                imgers:'',
                docName:'',
                docCode:''
            }
        },
        methods:{
              //返回上一层
            tobackdetail(){
              this.$router.push('/Personalcenter');
            },
            //查询患者二维码
            QRcode(){
                var that =this;
                var url = that.$store.getters.getUrl + "QRCode.do";
                //科室编码
                var depCode = localStorage.getItem('QBdeptCode');
                //科室名称
                var depname = localStorage.getItem('QBdepName');
                //医生名称
                var docName = localStorage.getItem('ysdocname');
                //医生编码
                var docCode = localStorage.getItem('ysdoccode');
                $.ajax({
                    url:url,
                    type: "post",
                    dataType: "json",
                    data: {
                        depCode,depname,docName,docCode
                    },
                    success:function(data){
                      that.imgers=data.showapi_res_body.imgUrl;
                    },
                    error:function(data){
                    }
                })
            }
        },
        mounted(){
            this.docCode=  localStorage.getItem('ysdoccode');
            this.docName = localStorage.getItem('ysdocname');
            this.QRcode();
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
.content{
     height: calc(100% - 50px);
    background: rgb(245, 245, 245);
    border-top:1px solid rgb(245, 245, 245);
}
.erwem{
    height: 100%;
    overflow: auto;
}
.mycard{
    width: 80%;
    height: 350px;
    /* border: 1px solid red; */
    margin: 20% auto;
    background: #fff;
    padding: 10px;
    border-radius: 5px;
    box-shadow: 5px 5px 3px #999;
}
.er{
    width: 80%;
    margin: 5% auto;
}
</style>