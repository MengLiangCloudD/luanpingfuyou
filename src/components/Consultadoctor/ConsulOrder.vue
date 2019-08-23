<template>
    <div style="height: 100%;overflow: auto;">
        <div class="tittle" style="background: #28b8a1;color:white">
            <div class="arrow-icon" @click="tobackdetail">
                <Icon size="30" type="ios-arrow-back" /><span style="font-size:18px;">订单支付</span>
            </div>
        </div>
        <div class="content">
            <div class="content1">
                <p><span>专家问诊-刘淑琴</span><span>￥49.00</span></p>
                <p><span>实付款</span><span style="color:red">￥49.00</span></p>
            </div>
            <div class="content2">
               <p style="text-align: left;font-size:22px;padding: 10px 5%;padding-left:5%;font-weight: 900">支付方式</p>
               <div class="zhif">
                   <p><span><svg t="1566462042230" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="4921" width="30" height="30" style="vertical-align: middle;" ><path d="M390.910187 640.186249c-62.319015 39.657555-73.649745-16.996095-73.649745-16.996095L243.610696 430.567743c-28.326825-96.311206 22.66146-45.32292 22.661461-45.322921s45.32292 39.657555 84.980475 62.319016c33.99219 22.66146 73.649745 5.665365 73.649746 5.665365l498.552123-249.276062C832.80866 79.31511 679.843804 0 509.882853 0 226.614601 0 0 215.283871 0 481.556028c0 152.964856 73.649745 288.933617 192.622411 379.579457L169.960951 997.104246s-11.33073 39.657555 28.326825 22.66146c22.66146-11.33073 84.980476-56.65365 124.638031-84.980475 62.319015 22.66146 124.638031 33.99219 186.957046 33.99219 283.268252 0 509.882853-215.283871 509.882853-481.556028 0-79.31511-16.996095-152.964856-50.988285-215.283871-164.295586 101.976571-532.544313 339.921902-577.867234 368.248727z" fill="#41B035" p-id="4922"></path></svg> &nbsp;&nbsp;&nbsp;&nbsp;微信支付</span><span><svg t="1566462721936" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="4059" width="30" height="30" style="vertical-align: middle;"><path d="M512 204.8c-169.984 0-307.2 137.216-307.2 307.2s137.216 307.2 307.2 307.2 307.2-137.216 307.2-307.2-137.216-307.2-307.2-307.2z m162.816 229.888l-177.664 226.816c-17.408 22.528-50.176 22.528-67.584-0.512l-84.992-113.664c-10.24-13.824-7.168-32.768 6.144-43.008s32.768-7.168 43.008 6.144l69.632 98.304 162.816-212.48c10.752-13.312 29.696-15.872 43.008-5.12 13.824 10.752 15.872 30.208 5.632 43.52z" fill="#41B035" p-id="4060"></path></svg></span></p>
                   
               </div>
                <div class="zhu">
                    <p>咨询价格由医生划定，若医生未接诊或超过24小时未回复，将自动退款至您的账户。</p>
                </div>
            </div>    
        </div>
        <div class="footer">
            <div class="footer_left">
                <p><span>合计：</span><span style="color:red;font-size:25px;">￥49.00</span></p>
            </div>
            <div class="footer_right">
                <p>立即支付</p>
            </div>
        </div>
    </div>
</template>

<script>
    export default {
        methods:{
            //返回上一层
            tobackdetail(){
               this.$router.push('/Selectionpatients');
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
.content1 p{
    line-height: 2;
    font-size: 16px;
    padding:  18px;
    display: flex;
    border-bottom: 1px solid #eee;
}
.content1 p span:nth-child(1){
    flex:1;
}
.zhif{
    font-size:16px;
}
.zhif p{
    display: flex;
    padding:  18px;
     font-size: 16px;
     line-height: 2;
     border-bottom: 1px solid #eee;
}
.zhif p span:nth-child(1){
    flex:1;
}
.zhu p{
    padding:  18px;
     font-size: 14px;
     color: #bbb;
}
.footer{
    width: 100%;
    display: flex;
    position: fixed;
    bottom: 0;
    border-top: 1px #eee solid;
}
.footer_left{
    width: 50%;
    text-align: center;
    display: inline-block;
    padding: 15px 0;
    flex:1;
    font-size: 18px;
}
.footer_right{
    width: 50%;
    text-align: center;
    display: inline-block;
    background: #28b8a1;
    color: white;
    font-size: 18px;
    padding: 15px 0;
}
</style>