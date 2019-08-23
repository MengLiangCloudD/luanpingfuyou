<template>
    <div style="height: 100%;overflow: auto;">
        <div class="tittle" style="background: rgb(0, 187, 187);color:white">
            <div class="arrow-icon" @click="tobackdetail">
                <Icon size="30" type="ios-arrow-back" /><span style="font-size:18px;">{{name}}</span>
            </div>
        </div>
        <div class="contents">
            <div class="content"  v-for="(item,index) in neirong" :key="index">
                <div class="comment" v-if="item.type==1">
                    <div class="content1" >
                        <img src="./../../../assets/avatar.png" alt="" width="40px;" style="vertical-align: top;margin:0 15px;float: right;" >
                        <div class="send">
                            <p>{{item.content}}</p> 
                            <div class="arrow"></div>
                        </div>
                        
                    </div> 
                </div>
                <div class="comment"  v-if="item.type==0">
                    <div class="content1">
                        <img src="./../../../assets/头像.png" alt="" width="40px;" style="vertical-align: top;margin:0 15px;" >
                        <div class="send1">
                            <p>{{item.content}}</p> 
                            <div class="arrow1"></div>
                        </div>
                    </div> 
                </div>
                
                    
            </div>
        </div>
        
        <div class="footer">
            <div class="footer1">
                <p style=" text-align: left;margin-left:2%;">
                    <svg t="1566356450194" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="6980" width="30" height="30"><path d="M511.999488 405.668253c-77.143984 0-139.701762 62.545498-139.701762 139.694599 0 77.148078 62.557778 139.681296 139.701762 139.681296 77.159334 0 139.704832-62.533218 139.704832-139.681296C651.70432 468.213751 589.158822 405.668253 511.999488 405.668253z" p-id="6981"></path><path d="M846.780251 300.920584 700.820971 300.920584c-7.763824-23.810289-34.230616-95.059006-72.982198-95.059006L396.15918 205.861578c-35.910884 0-64.97892 71.248717-73.691349 95.059006L177.206446 300.920584c-27.405163 0-49.598628 23.527856-49.598628 52.520167l0 407.012877c0 29.002544 22.193465 52.524261 49.598628 52.524261l669.573805 0c27.409257 0 49.609884-23.521716 49.609884-52.524261L896.390135 353.429495C896.391159 324.437184 874.178251 300.920584 846.780251 300.920584zM511.907391 720.181413c-96.427166 0-174.597527-78.190827-174.597527-174.641529 0-96.451726 78.17036-174.646646 174.597527-174.646646 96.414887 0 174.597527 78.19492 174.597527 174.646646C686.504918 641.989563 608.322277 720.181413 511.907391 720.181413zM762.277672 405.717372c-16.045441 0-29.059849-13.051247-29.059849-29.15604 0-16.112979 13.015432-29.164227 29.059849-29.164227 16.064884 0 29.084409 13.051247 29.084409 29.164227C791.362081 392.665101 778.342556 405.717372 762.277672 405.717372z" p-id="6982"></path><path d="M298.012859 255.598352c0 10.41828-8.445346 18.863626-18.862603 18.863626l-87.653339 0c-10.41828 0-18.863626-8.445346-18.863626-18.863626l0 0c0-10.41828 8.445346-18.862603 18.863626-18.862603l87.653339 0C289.567513 236.734726 298.012859 245.180072 298.012859 255.598352L298.012859 255.598352z" p-id="6983"></path></svg>
                    <svg t="1566356857932" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="7877" width="30" height="30"><path d="M512 116.492c-218.433 0-395.508 177.075-395.508 395.508S293.567 907.508 512 907.508 907.508 730.433 907.508 512 730.433 116.492 512 116.492z m0 760.117c-201.367 0-364.609-163.241-364.609-364.609S310.632 147.391 512 147.391 876.609 310.632 876.609 512 713.368 876.609 512 876.609z" p-id="7878"></path><path d="M512 694.761c-103.67 0-187.713-84.041-187.713-187.713h-30.899c0 120.735 97.875 218.611 218.611 218.611S730.61 627.784 730.61 507.048h-30.899c0 103.67-84.041 187.713-187.713 187.713z" p-id="7879"></path><path d="M293.389 507.049c0 8.533 6.916 15.449 15.449 15.449s15.449-6.916 15.449-15.449-6.916-15.449-15.449-15.449-15.449 6.916-15.449 15.449zM699.713 507.049c0 8.533 6.916 15.449 15.449 15.449s15.449-6.916 15.449-15.449-6.916-15.449-15.449-15.449-15.449 6.916-15.449 15.449zM324.287 381.838c0 19.199 15.563 34.762 34.762 34.762s34.762-15.563 34.762-34.762c0-19.199-15.563-34.762-34.762-34.762-19.199 0-34.762 15.563-34.762 34.762zM630.189 381.838c0 19.199 15.563 34.762 34.762 34.762s34.762-15.563 34.762-34.762c0-19.199-15.563-34.762-34.762-34.762-19.199 0-34.762 15.563-34.762 34.762z" p-id="7880"></path></svg>
                    <svg t="1566356999055" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="9284" width="30" height="30"><path d="M459.894272 564.377928c-68.238151-68.196195-133.458571-147.201573-102.183264-178.429809 44.673455-44.719504 83.615373-72.246441 4.438079-170.812317-79.178317-98.561783-131.995243-22.86987-175.329191 20.465101-49.931203 49.973158-2.628874 236.247632 181.487448 420.400792 184.121438 184.079482 370.432751 231.464699 420.405909 181.454702 43.334971-43.297109 118.978788-96.066963 20.465101-175.287235-98.519828-79.225389-126.093836-40.281425-170.812317 4.432962C607.094822 697.747471 528.131399 632.573099 459.894272 564.377928L459.894272 564.377928 459.894272 564.377928 459.894272 564.377928zM459.894272 564.377928" p-id="9285"></path></svg>
                    <svg t="1566357034569" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="10070" width="30" height="30"><path d="M623.33 203.9H97.748s-88.029 0-88.029 85.44v432.375c0 85.44 88.029 85.44 88.029 85.44H623.33s88.029 0 88.029-85.44V291.928c0-88.028-88.029-88.028-88.029-88.028z m359.882 44.014c-7.767-2.589-15.535-2.589-20.713 2.59L789.031 385.134c-5.178 5.178-7.767 10.357-7.767 15.535v214.893c0 5.178 2.589 12.945 7.767 15.535L962.5 765.73c2.59 2.589 7.768 5.178 12.946 5.178 2.589 0 5.178 0 10.356-2.59 7.767-2.588 10.356-10.356 10.356-18.123V266.038c0-7.768-5.178-15.535-12.945-18.124z" p-id="10071"></path></svg>
                </p>
                <Input v-model="value" placeholder="" style="width: 80%;" @on-blur.prevent="inputLoseFocus"/> <Button type="info" @click="sendxi">发送</Button>
            </div>
        </div>
    </div>
</template>

<script>
    export default {
        data(){
            return {
                neirong:[{
                    content:'你好',
                    type:0,
                },],
                value:'',
                name:''
            }
        },
        methods:{
            //返回上一层
            tobackdetail(){
                 this.$router.push('/Replylist');
            },
             //弹出键盘问题
            inputLoseFocus() {
                setTimeout(() => {
                window.scrollTo(0, 0);
                }, 100);
            },
            //发送消息
            sendxi(){
                var obj = {}
                if(this.value!=''&& this.value.replace(/\s+/g,"").length!==0){
                    obj.content = this.value;
                    obj.type = 1;
                    this.neirong.push(obj);
                } 
                this.value = ''
               
            },
            scrollToBottom() {
                this.$nextTick(() => {
                    var container = this.$el.querySelector(".contents");
                    container.scrollTop = container.scrollHeight;
                })
            }
        },
        
        updated(){
            this.scrollToBottom();
        },
        mounted(){
            this.name = localStorage.getItem('ReplyName')
             this.scrollToBottom();
        }
    }
</script>

<style  scoped>
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
.send {
position:relative;
width:50%;
padding: 15px;
background:#F8C301;
border-radius:5px; /* 圆角 */
/* margin:30px auto 0; */
display: inline-block;
word-wrap: break-word;
word-break: break-all;
float: right;
}
.send1{
    position:relative;
width:50%;
padding: 15px;
background:#F8C301;
border-radius:5px; /* 圆角 */
/* margin:30px auto 0; */
display: inline-block;
word-wrap: break-word;
word-break: break-all;
}
.send1 p{
    text-align: center;
}
.send p{
    text-align: center;
}
 .arrow1 {
position:absolute;
top:5px;
left:-16px; /* 圆角的位置需要细心调试哦 */
width:0;
height:0;
font-size:0;
border:solid 8px;
border-color:#fff #F8C301 #fff #fff;
color: black;
}
 .arrow {
position:absolute;
top:5px;
right:-16px; /* 圆角的位置需要细心调试哦 */
width:0;
height:0;
font-size:0;
border:solid 8px;
border-color:#fff #fff #fff #F8C301;
color: black;
}
.comment{
    width: 100%;
    position: relative;
}
.content1{
    overflow: hidden;
    margin: 21px 0;
}
.footer{
    width: 100%;
    position: fixed;
    bottom: 0;
    background: rgb(245, 245, 245);
}
.footer1{
    text-align: center;
    padding: 10px 2%;
}
.contents{
    height: 80%;
    overflow: auto;
}
</style>