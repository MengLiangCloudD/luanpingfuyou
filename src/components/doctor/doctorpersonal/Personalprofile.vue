<template>
    <div style="height:100%;overflow: auto;">
        <div class="tittle" style="background: rgb(0, 187, 187);color:white">
            <div class="arrow-icon" @click="tobackdetail">
                <Icon size="30" type="ios-arrow-back" />
            </div>
             个人简介
        </div>
        <div class="content" v-for="(item,index) in docxiang" :key="index">
            <p style=" padding: 10px 10% 10px 5%;">
                <span style="line-height: 50px;">头像</span>
                <span>
                    <img src="./../../../assets/avatar.png" alt="" width="50" height="50" style="display: inline-block;vertical-align: middle;">
                    <svg t="1565075218960" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="5912" width="20" height="20"><path d="M668.45184 512.03584l-475.17696 433.4592-0.22528 0.22528a39.69024 39.69024 0 0 0 0.22528 56.12032 40.192 40.192 0 0 0 56.64768 0l494.65344-451.31776a39.97184 39.97184 0 0 0 13.14816-8.69888 39.5264 39.5264 0 0 0 11.7248-29.184 39.54176 39.54176 0 0 0-11.6736-30.46912 39.936 39.936 0 0 0-13.29664-8.77056L249.85088 22.13888c-15.64672-15.54944-40.97024-15.54944-56.63232 0l-0.30208 0.29696a39.6288 39.6288 0 0 0 0.30208 56.04352l475.23328 433.55648z" p-id="5913" fill="#8a8a8a"></path></svg>
                </span>
            </p>
            <p>
                <span>医生姓名</span>
                <span>{{item.name}}</span>
            </p>
            <p>
                <span>医生编码</span>
                <span>{{item.username}}</span>
            </p>
            <p>
                <span>所属科室：</span>
                <span>{{ysdepname}}</span>
            </p>
            <p>
                <span>医生职位</span>
                <span>{{item.job}}</span>
            </p>
            <p>
                <span>医生职称</span>
                <span>{{item.title}}</span>
            </p>
            <p>
                <span >医生简介</span>
                <span style="width:75%; text-align: right;" @click="gomodal11">
                    <span class="text" style="width:80%; text-align: right;overflow: hidden;text-overflow:ellipsis;white-space: nowrap;">{{item.expertjob}}</span> 
                    <span>
                        <svg t="1565075218960" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="5912" width="20" height="20"><path d="M668.45184 512.03584l-475.17696 433.4592-0.22528 0.22528a39.69024 39.69024 0 0 0 0.22528 56.12032 40.192 40.192 0 0 0 56.64768 0l494.65344-451.31776a39.97184 39.97184 0 0 0 13.14816-8.69888 39.5264 39.5264 0 0 0 11.7248-29.184 39.54176 39.54176 0 0 0-11.6736-30.46912 39.936 39.936 0 0 0-13.29664-8.77056L249.85088 22.13888c-15.64672-15.54944-40.97024-15.54944-56.63232 0l-0.30208 0.29696a39.6288 39.6288 0 0 0 0.30208 56.04352l475.23328 433.55648z" p-id="5913" fill="#8a8a8a"></path></svg>
                    </span>
                </span>
            </p>
            <Modal v-model="modal11" fullscreen title="个人简介"  @on-ok="tomodify()">
                <div>
                     <Input v-model="value8" @input="descInput" :maxlength="30" type="textarea" :autosize="{minRows: 5,maxRows: 5}" placeholder="个人简介" />
                      <p class="numberV" style="text-align:right;width:100%">{{txtVal}}/30</p>
                </div>
            </Modal>
        </div>
    </div>
</template>

<script>
import {hidemenu} from "../../../common/js/hide"
    export default {
        name:'Personalprofile',
        data(){
            return {
                modal11:false,
                //医生简介
                value8:'',
                txtVal:0,
                //科室名称
                ysdepname:'',
                //医生详细信息
                docxiang:[]
            }
        },
        mounted(){
            let that=this
            //获取医生详情
            this.doctorxinxi();
            //科室名称
            this.ysdepname = localStorage.getItem('ysdepname');
            const requesturl=that.$store.getters.getUrl + "SweepCode.do";
            hidemenu(requesturl);

        },
        methods:{
              //返回上一层
            tobackdetail(){
               this.$router.push('/Personalcenter');
            },
            //修改个人简介
            gomodal11(){
                this.modal11=true;
                this.value8 = $('.text').html();
                this.txtVal = this.value8.length;
            },
            //前往二维码名片
            goMaxCard(){
                this.$router.push('/MaxCard');
            },
            //修改个人简介
            tomodify(){
                var that = this;
                var url = that.$store.getters.getUrl + "doctors/updateDoctorInfo.do";
                //医生编码
                var doccode=localStorage.getItem('ysdoccode');
                //修改内容
                var expertjob = that.value8;
                if(expertjob!=''&& that.value8!=that.docxiang[0].expertjob){
                    $.ajax({
                        url: url,
                        type: "post",
                        dataType: "json",
                        data: {
                        doctorno: doccode,
                        expertjob:expertjob
                        },
                        success:function(data){
                            if(data.status==1){
                                 that.$Message.info('修改成功！')
                                $('.text').html(that.value8);
                            }else{
                                that.$Modal.error({
                                    title:"提示信息",
                                    content:'修改医生简介失败！'
                                })
                            }
                        },
                        error:function(data){
                            that.$Modal.error({
                                title:"提示信息",
                                content:'修改异常请重试。'
                            })
                        }
                    })
                }
               
            },
            //限制字数
            descInput() {
                this.txtVal = this.value8.length;
            },
            //查询医生详细信息
            doctorxinxi(){
              var that = this;
              var url = that.$store.getters.getUrl + "doctors/getdoctor.do";
              //医生编码
              var doccode=localStorage.getItem('ysdoccode');
              $.ajax({
                url: url,
                type: "post",
                dataType: "json",
                data: {
                  doccode: doccode
                },
                success:function(data){
                  that.isshowloading = false;
                  if(data.status==1){
                    that.docxiang=data.data;
                  }
                 
                },
                error:function(data){
                    that.isshowloading = false;
                }
              })
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
.content{
    padding-bottom: 50px;
    font-size: 14px;
}
.content p{
     position: relative;
}
.content p svg {
  vertical-align: middle;
}
.content p span:nth-child(1) {
    flex:1;
}
.content p span {
  display: inline-block;
  vertical-align: middle;
  padding-left: 10px;
}
.content p {
  padding: 16px 10% 16px 5%;
  border-bottom: 1px solid #aaa;
  color: black;
  display: flex;
}
</style>