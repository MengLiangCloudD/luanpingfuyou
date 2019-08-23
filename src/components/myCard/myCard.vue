<template>
  <div style="
    height: 100%;">
    <pull-refresh :next="refresh">
    <div slot="list" class="myCard">
      <div class="card-title">
        <div class="arrow-icon" @click="tobackdetail">
          <Icon size="30" type="ios-arrow-back" />
      </div>
        电子健康卡
        </div>
      <div class="card-group">
        <div class="card-back">
          <div class="card" v-for="(item,index) in myCardType" :key="index" v-if="item.cardno!==''">
            <img class="card-img" :src="headimgurl" alt >
            <div class="card-news">
              <div class="card-bold">
                <span>{{item.name}}</span>
              </div>
              <div class="card-bold">
                <span>卡号：</span>
                <span>{{item.cardno}}</span>
              </div>

              <div class="card-easy">
                <span>身份证号：</span>
                <span>{{item.idno}}</span>
              </div>

              <div class="card-easy">
                <span>手机号：</span>
                <span>{{item.phone}}</span>
              </div>
              <svg :class="'barcode'+index"></svg>
            </div>
            <div class="card-btn">
               <span @click.stop="test(index)" v-if="item.stauts==1" style="display:block;padding:30px 0;">解绑</span>
              <span @click.stop="test(index)" v-if="item.stauts==0" style="display:block;padding:30px 0;">激活</span>
              <span class="recharge">充值</span>
              <!-- <span @click="removeCard(index)">解绑</span> -->
             
              <Modal
                title
                v-model="modal10"
                class-name="vertical-center-modal"
                @on-ok="removeCard()"
              >
                <p>您确认要做修改吗</p>
              </Modal>
            </div>
          </div>
          <div class="add_card">
            <div class="btn" @click="toBindCard()">新建电子卡</div>
          </div>
        </div>
      </div>
    </div>
    </pull-refresh>
    <tabbar class="pubtabbar"></tabbar>
     <loading v-show="isshowloading" class="loading"></loading>
  </div>
</template>

<script>
import tabbar from "../../common/tabbar";
import JsBarcode from "jsbarcode";
//引入加载动画
import loading from "../../common/loading";
//下拉刷新
import pullRefresh from "../../common/scrollRefresh";
import {hidemenu} from "../../common/js/hide"
export default {
  components: {
    //公共底部
    tabbar,
    //加载动画
    loading,
    pullRefresh
  },
  data() {
    return {
      cardAccor: true,
      //返回回来的数据
      myCardType: [{}, {}, {}],
      modal10: false,
      currentIndex: "",
      headimgurl: "",
      isshowloading:false
    };
  },
  mounted() {
    this.isshowloading=true;
    //调用渲染方法
    this.loding();
    
    // 调用生成条形码的方法
    let _this=this
    this.$nextTick(function(){
      _this.setBarcode();
    })
    this.headimgurl = JSON.parse(localStorage.getItem("user")).headimgurl;
    const requesturl=_this.$store.getters.getUrl + "SweepCode.do";
    hidemenu(requesturl);
  },
  methods: {
    //生成条形码
    setBarcode() {
      var that = this;
      for (var i = 0; i < that.myCardType.length; i++) {
        JsBarcode(".barcode" + i, that.myCardType[i].cardno, {
          height: 30,
          width: 2,
          displayValue: true,
          margin: 0,
          displayValue: false
        });
      }
    },
    //下拉刷新
    refresh() {
      return new Promise((resolve, reject) => {
        setTimeout(() => {
          this.loding();
          resolve();
        }, 2000);
      });
    },
    //
    test(index) {
      this.currentIndex = index;
      this.modal10 = true;
    },
    //新建电子卡
    toBindCard() {
      this.$router.push("/authentication");
    },
    //解绑 激活
    removeCard() {
      let index = this.currentIndex;
      var url = this.$store.getters.getUrl + "card/UntiedCard.do";
      var myCardType = this.myCardType;
      var _this = this;
      var cardno = myCardType[index].cardno;
      let _stauts = myCardType[index].stauts;
      $.ajax({
        url: url,
        type: "post",
        dataType: "json",
        // async: false,
        data: { cardno: cardno, status: _stauts },
        success: function(data) {
          this.modal10 = false;
          if (_stauts === 0) {
            //存储患者用户姓名
            _this.$store.commit("setName", _this.myCardType[index].name);
            _this.$store.commit(
              "setPatientCardNo",
              _this.myCardType[index].cardNo
            );
            _this.$store.commit("setCardCode", _this.myCardType[index].cardNo);
          }
          if (data.data === "1") {
            _this.$Message.success("修改成功");
          } else if (data.data === "0") {
            _this.$Message.error("修改失败,请再次点击");
          }
          _this.loding();
        },
        error: function(data) {}
      });
    },
    //返回上一层
    tobackdetail(){
        this.$router.push('/Myaccount');
    },
    //加载渲染
    loding() {
      var url = this.$store.getters.getUrl + "card/getAllCards.do";
      this.doctorType = [];
      var doctorType = this.doctorType;
      var _this = this;
      var code = this.code;
      var openid = localStorage.getItem("openid");
      // _this.$Loading.start();
      $.ajax({
        url: url,
        type: "post",
        dataType: "json",
        async: false,
        data: { openid: openid },
        success: function(data) {
          _this.isshowloading=false;
          //  _this.$Loading.finish();
          //返回回来的数据
          if(data.status==1){
            
          _this.myCardType = data.data;
          }else{
             _this.myCardType = [];
          }
         
        },
        error: function(data) {
          // _this.$Loading.finish();
        }
      });
    },
  },
  computed: {}
};
</script>

<style scoped>
.arrow-icon{
  position: absolute;
  left: 5px;
  top: 0px;
}
.barcode-wraaper {
  padding: 0 20px;
  height: 50px;
}
.pubtabbar {
  position: fixed;
  bottom: 0;
}

.vertical-center-modal {
  display: flex;
  align-items: center;
  justify-content: center;
}
.vertical-center-modal .ivu-modal {
  top: 0;
}
.myCard {
  /* height: 100%; */
  overflow: auto;
}
.card-title {
  height: 50px;
  text-align: center;
  line-height: 50px;
  font-size: 18px;
  font-family: PingFangSC-regular;
  border-bottom: 1px solid #ccc;
  background-color: rgb(40, 184, 161);
  font-family: PingFangSC;
  font-weight: 400;
  color: rgba(255, 255, 255, 1);
  position: relative;
}
/* .card-group {
  overflow: auto;
  padding: 0 0 70px 0;
} */
.card-back {
  background: rgb(244, 244, 244);
}
.card {
  border-bottom: 1px solid #ccc;
  position: relative;
  background: #fff;
}
.card-img {
  width: 40px;
  height: 40px;
  position: absolute;
  top: 13%;
  left: 5%;
  border-radius: 50%;
}
.card-news {
  width: 60%;
  margin-left: 20%;
  padding-top: 2%;
  padding-bottom: 2%;
}
.card-bold {
  font-family: SFUIText;
  font-weight: 400;
  font-size: 14px;
  color: rgb(16, 16, 16);
  margin: 10px 0;
}
.card-easy {
  font-family: PingFangSC;
  font-weight: 400;
  font-size: 12px;
  /* color: rgb(175, 175, 175); */
  color: #000;
  margin: 10px 0;
}
.card-btn {
  position: absolute;
  top: 50%;
  right: 4%;
  transform: translateY(-50%);

  font-weight: 400;
  font-size: 18px;
  color: rgba(40, 184, 161, 1);
}
.card-btn span {
  margin: 0 6px;
}
.btn {
      line-height: 13.33333vw;
    height: 13.33333vw;
    width: 65%;
    border-radius: 44px;
    text-align: center;
    background-color: rgb(40, 184, 161);
    font-family: PingFangSC;
    font-weight: 400;
    font-size: 4.26667vw;
    color: rgba(255, 255, 255, 1);
    display: inline-block;
}
.add_card {
      width: 100%;
    text-align: center;
    /* position: fixed; */
    bottom: 16vw;
    background: #fff;
    padding: 40px 0 80px 0;
}
</style>