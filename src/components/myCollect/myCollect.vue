<template>
  <div class="pinglun" style="height: 100%;
    overflow: auto; -webkit-overflow-scrolling: touch;">
  <!-- <pull-refresh :next="refresh"> -->
    <div slot="list"  class="myCard">
      <div class="card-title">
         <div class="arrow-icon" @click="tobackdetail">
          <Icon size="30" type="ios-arrow-back" />
      </div>
        关注的医生
        </div>
      <div class="card-back" v-for="(item,index) in attentionList" :key="index">
        <div class="card">
          <img class="card-img" src="../../assets/avatar.png" alt>
          <div class="card-news">
            <div class="card-bold">
              <span>{{item.docname}}</span>
              <span style="color:#000">主治医生</span>
              <Button class="noCollect" @click="unfollow(item.doccode)">取消关注</Button>
            </div>
            <div class="hos-info">
              <span>{{item.depname}}</span>
              <span>滦平县妇幼保健院</span>
            </div>
            <div class="card-easy">
              <span>擅长：</span>
              <span>{{item.specialty}}</span>
            </div>
            <div class="star-class">
              <img class="star-img" src="../../assets/pingjia.png" alt>
              <span>4.8</span>
            </div>
          </div>
        </div>
      </div>
    </div>
    <!-- </pull-refresh> -->
    <tabbar class="pubtabbar"></tabbar>
     <loading v-show="isshowloading" class="loading"></loading>
  </div>
</template>
<script>
import tabbar from "../../common/tabbar";
import loading from "../../common/loading";
//下拉刷新
import pullRefresh from "../../common/scrollRefresh";
import {hidemenu} from "../../common/js/hide"
export default {
  components: {
    tabbar,
    loading,
    pullRefresh
  },
  data() {
    return {
      //动画加载
      attentionList: [],
      //医生编号
      doccode: "",
      isshowloading:false,
      size:10
    };
  },
  methods: {
     //下拉刷新
    refresh() {
      return new Promise((resolve, reject) => {
        setTimeout(() => {
          this.attention();
          resolve();
        }, 2000);
      });
    },
    //加载关注列表
    attention() {
      var that = this;
      //拿到openid
      that.isshowloading=true;
      var openid = localStorage.getItem("openid");
      var cardno = localStorage.getItem('cardno');
      // 定义url地址
      var url = this.$store.getters.getUrl + "follow/findDoctors.do";
      //开启加载动画
      // that.$Loading.start();
      $.ajax({
        url: url,
        type: "post",
        dataType: "json",
        // async: false,
        data: {
          cardno: cardno,
        },
        success: function(data) {
          that.isshowloading=false;
          //关闭加载动画
          // that.$Loading.finish();
          //拿到所需要的数据
          that.attentionList = data.data;
        },
        error: function(data) {
           that.isshowloading=false;
          //关闭加载的动画
          // that.$Loading.finish();
        }
      });
    },
    //取消关注
    unfollow(doccode) {
      //开启加载动画
      // this.$Loading.start();
      var that = this;
      // 拿到openid
      var openid = localStorage.getItem("openid");
      var cardno = localStorage.getItem('cardno');
      //定义url地址
      var url = this.$store.getters.getUrl + "follow/deleInfo.do";
      $.ajax({
        url: url,
        type: "post",
        dataType: "json",
        // async: false,
        data: {
          cardno: cardno,
          doccode: doccode
        },
        success: function(data) {
          //关闭加载动画
          // that.$Loading.finish();
          //重新调用渲染的方法
          that.attention();
        },
        error: function(data) {
          //关闭加载的动画
          // that.$Loading.finish();
        }
      });
    },
    //返回上一层
    tobackdetail(){
        this.$router.push('/Myaccount');
    },
  },
  mounted() {
    var that  = this;
    //调用渲染的方法
    that.attention();
    const requesturl=that.$store.getters.getUrl + "SweepCode.do";
    hidemenu(requesturl);
  }
};
</script>

<style scoped>
.arrow-icon{
  position: absolute;
  left: 5px;
  top: 0px;
}
.noCollect {
  position: absolute;
  right: 5%;
}
.pubtabbar {
  position: fixed;
  bottom: 0;
}
.myCard {
  overflow: auto;
  padding: 0 0 70px 0;
  
}
.card-title {
  height: 50px;
  text-align: center;
  line-height: 50px;
  font-size: 16px;
  font-family: PingFangSC-regular;
  border-bottom: 1px solid #ccc;
  background-color: rgb(40, 184, 161);
  font-family: PingFangSC;
  font-weight: 400;
  color: rgba(255, 255, 255, 1);
  position: relative;
}

.card-back {
  background: rgba(201, 111, 111, 0);
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
  margin-left: 20%;
  padding-top: 2%;
  padding-bottom: 2%;
}
.card-bold {
  font-weight: 400;
  font-size: 14px;
  color: rgb(16, 16, 16);
  margin: 10px 0;
  position: relative;
}
.hos-info {
  font-weight: 400;
  font-size: 12px;
  color: #000;
  /* margin: 10px 0 10px 10px; */
}
.card-easy {
  font-weight: 400;
  font-size: 12px;
  color: #000;
  margin: 10px 0;
  margin-right: 20px;
}
.star-class {
  font-family: PingFangSC;
  font-weight: 400;
  font-size: 12px;
  color: #ff9800;
  margin: 10px 0;
}
.star-img {
  width: 14px;
  height: 14px;
}
.easy-label {
  margin: 10px 0;
  color: rgb(40, 184, 161);
}
.easy-label span {
  padding: 1px 3px;
  border: 1px solid rgb(40, 184, 161);
  border-radius: 10px;
}
</style>