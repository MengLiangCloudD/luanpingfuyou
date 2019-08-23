<template>
  <div style="height: 100%;
    overflow: auto; -webkit-overflow-scrolling: touch;" class="his">
    <!-- <pull-refresh :next="refresh"> -->
    <div slot="list" class="Myevaluation">
      <div class="tittle">
        <div class="arrow-icon" @click="tobackdetail">
          <Icon size="30" type="ios-arrow-back" />
      </div>
      我的评价</div>
      <div class="coo">
        <Modal
            title
            v-model="modal10"
            class-name="vertical-center-modal"
            @on-ok="deleteEvaluation()"
          >
            <p>您确认要删除吗</p>
          </Modal>
        <div class="content" v-for="(item,index) in commentList" :key="index">
          <!-- <img src=".././assets/x.png" alt width="20" class="sha" @click.stop="test(index)"> -->
          <p>
            <span>
              <img :src="item.headimgurl" alt width="30px" style=" border-radius:50%; vertical-align: middle">
            </span>
            <span style="font-size: 18px">{{item.docnames}}</span>
            <!-- <span style="font-size:18px">{{item.docname}}</span> -->
          </p>
          <p style="  font-size: 16px;">
            <span style="text-indent:25px">{{ /\d{4}-\d{1,2}-\d{1,2}/g.exec(item.pjdate)[0]}}</span>
            <span >{{item.doccode}}</span>
            <span style="  font-size: 20px;color:#f37f12;display: inline-block;vertical-align: middle;">{{calculate(index)}}</span><img src="./../assets/_星星1.png" alt="" width="22" style="vertical-align: middle;">
          </p>
          <p style="text-indent:25px;font-size:18px;">{{item.content}}</p>
        </div>
      </div>
      
    </div>
     <!-- </pull-refresh> -->
    <loading v-show="isShowLoading"></loading>
    <tabbar class="pubtabbar"></tabbar>
  </div>
</template>

<script>
import loading from '../common/loading'
import tabbar from "../common/tabbar";
//下拉刷新
import pullRefresh from "../common/scrollRefresh";
import {hidemenu} from "../common/js/hide"
export default {
  components: {
    tabbar,
    pullRefresh,
    loading
  },
  data() {
    return {
      modal10: false,
      commentList: [],
      testno: "",
      username:'',
      isShowLoading:false,
      size:10
    };
  },
  methods:{
    //显示弹框 确认信息
    test(index) {
      this.currentIndex = index;
      this.modal10 = true;
    },
    //计算平均评分
    calculate(index){
      //态度评价
      var a = this.commentList[index].tdpj;
      //诊断评价
      var b = this.commentList[index].zdpj;
      //平均计分
      var c = (a + b)*0.5;
      return c
    },
    //下拉刷新
    refresh() {
      return new Promise((resolve, reject) => {
        setTimeout(() => {
          this.evaluate();
          resolve();
        }, 2000);
      });
    },
    //我的评价
    evaluate() {
      var that = this;
      var cardno = localStorage.getItem("cardno");
      // var url = "http://192.168.33.159:8080/evaluate/findEvalate.do";
      //url地址
      var url = that.$store.getters.getUrl + "evaluate/findEvalate.do";
      var size = that.size;
      //请求开始 开启加载动画
      // that.$Loading.start();
      that.isShowLoading=true;
      $.ajax({
        url: url,
        type: "post",
        dataType: "json",
        // async: false,
        data: {
          //传送openid
          cardno: cardno,
          size:size
          // openid: "oD2QnwHr_9SiDAQCDj969CGXTCy4"
        },
        success: function(data) {
          that.isShowLoading=false;
          //关闭加载动画进度条
          // that.$Loading.finish();
          var commentList = [];
          //获取评论列表数据
          for (var i = 0; i < data.data.length; i++) {
            if (data.data[i].deletion != 0) {
              commentList.push(data.data[i]);
            }
          }
          that.commentList = commentList;
          //取得订单号
          that.testno = data.data;
        },
        error: function(data) {
          //关闭加载动画进度条
          // that.$Loading.finish();
          that.isShowLoading=false;
        }
      });
    },
    tobackdetail(){
        this.$router.push('/Myaccount');
    },
    //删除评价
    deleteEvaluation() {
      var that = this;
      // var url = "http://192.168.33.159:8080/evaluate/deleteEvalate.do";
      var url = this.$store.getters.getUrl + "evaluate/deleteEvalate.do";
      var patientid = that.commentList[that.currentIndex].patientid;
      var doccode = that.commentList[that.currentIndex].doccode;
      var pjdate = that.commentList[that.currentIndex].pjdate;
      var clinicno = that.commentList[that.currentIndex].clinicno;
      $.ajax({
        url: url,
        type: "post",
        dataType: "json",
        // async: false,
        data: {
          patientid:patientid,
          doccode:doccode,
          pjdate:pjdate,
          clinicno:clinicno
        },
        success: function(data) {
          //关闭加载动画
          // that.$Loading.finish();
          //刷新数据
          that.evaluate();
        },
        error: function(data) {
          //关闭加载动画
          // that.$Loading.finish();
        }
      });
    }
  },
  mounted() {
    var that  = this;
    const el = document.querySelector('.his');
    const offsetHeight = el.offsetHeight;
    setInterval(function(){
      el.onscroll = () => {
      const scrollTop = el.scrollTop;
      const scrollHeight = el.scrollHeight;
      if ((offsetHeight + scrollTop) - scrollHeight >= -1) {
          //每次滚动到底部size+10
          that.size+=10;
          that.evaluate();
      }
     }
    },1000)
    //调用方法加载我的评论数据
    this.evaluate();
    const requesturl=that.$store.getters.getUrl + "SweepCode.do";
    hidemenu(requesturl);
    // this.username = JSON.parse(localStorage.getItem("user")).nickname;
  }
};
</script>

<style scoped>
.arrow-icon{
  position: absolute;
  left: 5px;
  top: 0px;
}
.pubtabbar {
  position: fixed;
  bottom: 0;
}
.Myevaluation {
  overflow: auto;
  padding: 0 0 70px 0;
  background: rgb(255, 255, 255);
  /* height: 100%; */
}
.tittle {
  background: #fff;
  height: 50px;
  text-align: center;
  line-height: 50px;
  color: #fff;
  font-size: 20px;
  font-family: PingFangSC-regular;
  font-weight: 900;
  background: #28b8a1;
  position: relative;
}
.coo {
  margin-top: 15px;
}
.content {
  padding: 15px 2%;
  border-bottom: 3px solid #ccc;
  background: #fff;
  position: relative;
  padding-bottom: 40px;
}
.sha {
  position: absolute;
  right: 3%;
}
.sha1 {
  position: absolute;
  right: 3%;
  bottom: 10px;
}
.sha1 span,.sha1 img{
  display: inline-block;
  vertical-align: middle;
  font-size: 18px;
  color: #f37f12
}
.content p span {
  display: inline-block;
  vertical-align: middle;
  padding: 3px 5px;
}
.content p {
  padding: 2px 10px;
}
.content p:nth-child(3) {
  color: #000;
}
.content p:nth-child(1) {
  font-weight: 700;
}
.content p:nth-child(3) {
  line-height: 1;
}
</style>