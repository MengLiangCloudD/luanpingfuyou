<template>
  <div style="height: 100%; overflow: auto;">
    <div class="evaluate-page">
      <div class="title">
         <div class="arrow-icon1" @click="tobackdetail">
          <Icon size="30" type="ios-arrow-back" />
         </div>
        <span>评价医生</span>
      </div>
      <div class="nav">
        <div class="content">
          <div class="content_left">
            <img src="./../assets/头像.png" alt width="62">
          </div>
          <div class="content_right">
            <p style="padding:5px 10px">{{docName}}</p>
            <p>{{depname}}主治医师</p>
            <p>滦平县妇幼保健院</p>
          </div>
        </div>
        <div class="contenter">
          <button v-if="flage">已关注</button>
          <button v-if="flage==false" @click="attention()">关注</button>
        </div>
      </div>
      <div class="ping">
        <div class="comment">
          <!-- <textarea placeholder="请输入" @input="descInput" v-model="desc"/> -->
          <textarea
            cols="50"
            rows="8"
            id="textarea"
            placeholder="请输入您的评价内容，不超过100个字"
            v-model="content"
            maxlength="100"
            @input="descInput"
          ></textarea>
          <p class="numberV" style="text-align:right;width:80%">{{txtVal}}/100</p>
        </div>
      </div>
      <div class="ping">
        <div class="anonymity">
          <p>
            <Checkbox v-model="single" size="large">匿名</Checkbox>
          </p>
          <p>您的评价可以帮助到其他小伙伴</p>
        </div>
      </div>
      <div class="footer">
        <div class="footer_footer">
          <div class="footer_left">
            <p>态度评价</p>
            <p>诊断评价</p>
          </div>
          <div class="footer_right">
            <div class="div">
              <li
                v-for="(itemClass,index) in itemClasses"
                :class="itemClass"
                class="star-item"
                @click="stars(index)"
                track-by="index"
                :key="index"
              ></li>
            </div>
            <div class="div">
              <li
                v-for="(itemClass,index) in itemClassese"
                :class="itemClass"
                class="star-item"
                @click="starss(index)"
                track-by="index"
                :key="index"
              ></li>
            </div>
          </div>
        </div>
      </div>
      <div class="bttn">
        <button class="btn" @click="submitContent()">提交</button>
      </div>
    </div>
    <tabbar class="pubtabbar"></tabbar>
    <loading v-show="isshowloading" class="loading"></loading>
  </div>
</template>
<script>
import tabbar from "../../src/common/tabbar";
import loading from "../common/loading";
import {hidemenu} from "../common/js/hide"
export default {
  name:"evaluate",
  components: {
    tabbar,
    loading
  },
  data() {
    return {
      single: false,
      content: "",
      //默认态度星级
      score: 1,
      //默认诊断星级
      scores: 1,
      deletion: "",
      flage: false,
      txtVal: 0,
      //医生姓名
      docName: "",
      //所属科室
      depname: "",
      isshowloading:false
    };
  },
  computed: {
    
    //计算属性
    itemClasses() {
      let result = []; // 返回的是一个数组,用来遍历输出星星
      let score = Math.floor(this.score * 2) / 2; // 计算所有星星的数量
      let hasDecimal = score % 1 !== 0; // 非整数星星判断
      let integer = Math.floor(score); // 整数星星判断
      for (let i = 0; i < integer; i++) {
        // 整数星星使用on
        result.push("on"); // 一个整数星星就push一个CLS_ON到数组
      }
      if (hasDecimal) {
        // 非整数星星使用half
        result.push("half"); // 类似
      }
      while (result.length < 5) {
        // 余下的用无星星补全,使用off
        result.push("off");
      }
      return result;
    },
    itemClassese() {
      let result = []; // 返回的是一个数组,用来遍历输出星星
      let scores = Math.floor(this.scores * 2) / 2; // 计算所有星星的数量
      let hasDecimal = scores % 1 !== 0; // 非整数星星判断
      let integer = Math.floor(scores); // 整数星星判断
      for (let i = 0; i < integer; i++) {
        // 整数星星使用on
        result.push("on"); // 一个整数星星就push一个CLS_ON到数组
      }
      if (hasDecimal) {
        // 非整数星星使用half
        result.push("half"); // 类似
      }
      while (result.length < 5) {
        // 余下的用无星星补全,使用off
        result.push("off");
      }
      return result;
    }
  },
  methods: {
    //返回上一层
    tobackdetail(){
        this.$router.push('/Myaccount');
    },
    //判断评价星级
    stars: function(index) {
      this.score = index + 1;
    },
    starss: function(index){
      this.scores = index + 1;
    },
    //限制评论字数
    descInput() {
      this.txtVal = this.content.length;
    },
    //提交评价
    submitContent() {
      var obj = {};
      var that = this;
      var items = JSON.parse(localStorage.getItem('pingitems'));
      //取的评价内容
      obj.content = that.content;
      //态度星级
      obj.tdpj = that.score;
      //诊断星级
      obj.zdpj = that.scores;
      //是否匿名
      obj.deletion = that.deletion;
      //取地openid
      obj.openid = localStorage.getItem("openid");
      //患者卡号
      obj.patientid = localStorage.getItem("cardno");
      //医生编号
      obj.doccode = that.$store.state.doccode;
      //医生姓名
      obj.docname =that.docName;
      //科室名称
      obj.hosdeptname=items.hosdepname;
      //患者性别
      obj.sex=items.sex;
      //门诊号
      obj.clinicno=items.clinicno;
      //患者生日
      obj.birthdate=items.birthdate;
      //患者省份证号
      obj.idno=items.idno;
      //时间段
      obj.amorpm = items.amorpm;
      //支付方式
      obj.cardname=items.cardname;
      //患者姓名
      obj.name=items.name;
      //挂号时间
      obj.regdate=items.regdate;
      //号源编码
      obj.regcode=items.regcode;
      //挂号订单
      obj.registerfee=items.registerfee;
      // 患者年龄
      obj.age=items.age;
      //就诊序号
      obj.visitno=items.visitno;
      //医生姓名
      obj.hosdocname=items.hosdocname;
      //url地址
      var url = that.$store.getters.getUrl + "evaluate/insert.do";
      //判断是否匿名
      if (that.single) {
        obj.deletion = 2;
      } else {
        obj.deletion = 1;
      }
      //判断是否有评论内容
      if (obj.content != "" && obj.tdpj != "" && obj.zdpj != ""&& obj.content.replace(/\s+/g, "").length !==0) {
         that.isshowloading=true;
        $.ajax({
          url: url,
          type: "post",
          dataType: "json",
          // async: false,
          data: obj,
          success: function(data) {
            that.isshowloading=false;
            if (data.status == 1) {
              that.$Message.success("评论成功");
              that.$router.push("/Myaccount");
            } else if (data.status == 1) {
              that.$Message.success("评论失败");
            }
          },
          error: function(data) {
            that.isshowloading=false;
            that.$Message.success("后台请求异常");
          }
        });
        
      } else if (obj.content == "" || obj.tdpj == "" || obj.zdpj == ""||obj.content.replace(/\s+/g, "").length ==0) {
        that.$Message.success("请填写评价内容，并评分");
      }
    },
    //关注医生
    attention() {
      var that = this;
      //取地openid
      var openid = localStorage.getItem("openid");
      //url地址
      var url = that.$store.getters.getUrl + "follow/insert.do";
      //医生编号
      var doccode = that.$store.state.doccode;
      //获取到所评论的医生姓名
      var docName = that.$store.state.CommentDoctornam;
      //获取到所评论的医生科室
      var depname = that.$store.state.ReviewDepartment;
      //获取患者的姓名
      var name = that.$store.state.name;
      //患者卡号
      var cardno = localStorage.getItem('cardno');
      $.ajax({
        url: url,
        type: "post",
        dataType: "json",
        async: false,
        data: {
          openid: openid,
          //医生编号
          doccode: doccode,
          //医生姓名
          hosdocname: docName,
          //科室
          hosdepname: depname,
          //患者姓名
          name: name,
          cardno:cardno
        },
        success: function(data) {
          that.isshowloading=false;
          if(data.status==1){
            that.$Message.success("关注成功");
            that.flage = true;
          }else{
            that.$Message.error("关注失败");
          }
          
        },
        error: function(data) {
          that.isshowloading=false;
        }
      });
    },
    //查询是否已经关注
    select() {
      //取到openid
      var openid = localStorage.getItem("openid");
      var cardno  = localStorage.getItem('cardno');
      //定义url地址
      var url = this.$store.getters.getUrl + "follow/attention.do";
      var that = this;
      //医生编号
      var doccode = that.$store.state.doccode;
      $.ajax({
        url: url,
        type: "post",
        dataType: "json",
        async: false,
        data: {
          cardno: cardno,
          //医生编号
          doccode: doccode
        },
        success: function(data) {
          //判断状态是一时候 表示已关注
          if (data.status == 1) {
            that.flage = true;
            //判断状态是0时候  表示未关注
          } else if ((data.status = 0)) {
            that.flage = false;
          }
        },
        error: function(data) {}
      });
    }
  },
  mounted() {
    this.select();
    //获取到所评论的医生姓名
    this.docName = this.$store.state.CommentDoctornam;
    //获取到所评论的医生科室
    this.depname = this.$store.state.ReviewDepartment;
    let that=this
    const requesturl=that.$store.getters.getUrl + "SweepCode.do";
    hidemenu(requesturl);
  }
};
</script>

<style scoped>
.pubtabbar {
  position: fixed;
  bottom: 0;
}
.evaluate-page {
  height: 100%;
  overflow: auto;
  padding-bottom: 70px;
}
.title {
  background: #28b8a1;
  height: 50px;
  text-align: center;
  line-height: 50px;
  color: #fff;
  font-size: 20px;
  font-family: PingFangSC-regular;
  position: relative;
}
.arrow-icon1{
  position: absolute;
  left: 5px;
  top: 0px;
}
.arrow-icon{
  position: absolute;
  font-size: 16px;
  right: 10px;
  top: 0px;
}
.nav {
  width: 100%;
  padding: 15px 5%;
  position: relative;
}
.content_left {
  display: inline-block;
  vertical-align: middle;
}
.content_right {
  vertical-align: middle;
  display: inline-block;
}
.content_right p {
  color: #000;
  padding: 0 10px;
}
.content {
  vertical-align: middle;
  display: inline-block;
}
.contenter {
  vertical-align: middle;
  display: inline-block;
  position: absolute;
  right: 10%;
  top: 33px;
}
button {
  background: #28b8a1;
  border: 1px solid #fff;
  color: #fff;
  padding: 5px 20px;
  border-radius: 20px;
  outline: none;
}
.ping {
  width: 100%;
  text-align: center;
}
.comment {
  width: 100%;
  display: inline-block;
  padding: 15px 0;
  text-align: center;
  /* margin-top: 20px; */
  border-top: 1px solid #bbb;
  border-bottom: 1px solid #bbb;
}
textarea {
  width: 80%;
  border: 0;
  outline: none;
}
.anonymity {
  width: 80%;
  display: inline-block;
  padding: 20px 0;
  /* border-bottom: 2px solid #ccc; */
  position: relative;
}
.anonymity p {
  display: inline-block;
  vertical-align: middle;
}
.anonymity p:nth-child(2) {
  position: absolute;
  right: 0;
  top: 10px;
}
.anonymity p:nth-child(1) {
  position: absolute;
  left: 0;
  top: 10px;
}
.footer {
  width: 100%;
  background: #28b8a1;
  text-align: center;
  padding: 15px 0;
  /* margin-top: 20px; */
}
.footer_footer {
  width: 80%;
  display: inline-block;
  text-align: left;
  position: relative;
}
.footer_footer p {
  line-height: 3;
  color: #fff;
}
.footer_left {
  display: inline-block;
  vertical-align: middle;
}
.footer_right {
  display: inline-block;
  vertical-align: middle;
  position: absolute;
  right: 0;
}
.footer_right .div {
  line-height: 3;
}
.btn {
    width: 60%;
    font-size: 4.8vw;
    padding: 2.66667vw;
    margin-top: 9.33333vw;
    border-radius: 50px;
}
.bttn {
  text-align: center;
}
.star-item {
  display: inline-block;
  background-repeat: no-repeat;
  width: 1rem;
  height: 1rem;
  margin-left: 0.27rem;
  background-size: 100%;
}
.star-item.on {
  background-image: url(./../assets/_星星1.png);
}
.star-item.half {
  background-image: url(./../assets/_星星0.png);
}
.star-item.off {
  background-image: url(./../assets/_星星0.png);
}
</style>