<template>
    <div style="height: 100%;overflow: auto;">
        <div class="tittle" style="background: #28b8a1;color:white">
            <div class="arrow-icon" @click="tobackdetail">
                <Icon size="30" type="ios-arrow-back" />
            </div>
             咨询列表
        </div>
        <div class="content">
            <div class="mop"  v-for="(item,index) in huanList" :key="index" @click="addclick(item)">
                  <img src="./../../assets/头像.png" alt="" width="50px;" style="vertical-align: top;margin:0 15px;">
                  <div class="user">
                      <p>{{item.name}}</p>
                      <p>{{item.cardno}}</p>
                  </div>
                  <p class="poop">2019-08-21</p>
            </div>
        </div>
    </div>
</template>

<script>
    export default {
        data() {
            return {
                huanList:[{
                    name:'刘淑琴',
                    cardno:'000LSQ'
                },{
                    name:'王宝民',
                    cardno:'000WBM'
                },{
                    name:'曲博',
                    cardno:'0000QB'
                }],
            }
        },
        methods:{
            //返回上一层
            tobackdetail(){
            //   this.$router.push('/Personalcenter');
            },
            addclick(item){
                localStorage.setItem('dddName',item.name);
                localStorage.setItem('dddcardno',item.cardno);
                this.$router.push('/Consultadoctor');
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
.user{
    display: inline-block;
    
}
.user p{
    line-height: 2;
    font-size: 14px;
}
.mop{
    border: 1px solid #ccc;
    padding: 10px 0;
    position: relative;
}
.poop{
  position: absolute;
  right: 5%;
  top: 5px;
}
</style>