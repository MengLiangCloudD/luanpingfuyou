import Vue from "vue";
import Vuex from "vuex";
import { decode } from "punycode";
Vue.use(Vuex);
let testnum=0
let doccode = "";
let docName = "";
let depname = "";
let depCode = "";
let regcode = "";
let regprice = "";
let regdata = "";
let name = "";
let cardCode = "";
let PatientSex = "";
let PatientIdnumber = "";
let openid = "";
let TimeRegion = "";
let CommentDoctornam = "";
let ReviewDepartment = "";
var num ="";
var usernums = '';
var doctornums=''
var websocket = "";

if (localStorage.getItem("doctornums") != "") {
  doctornums = localStorage.getItem("doctornums");
} else {
  doctornums = "";
}
if (localStorage.getItem("usernums") != "") {
  usernums = localStorage.getItem("usernums");
} else {
  usernums = "";
}
if (localStorage.getItem("websocket") != "") {
  websocket = localStorage.getItem("websocket");
} else {
  websocket = "";
}
if (localStorage.getItem("hzwsnum")) {
  num = localStorage.getItem("hzwsnum");
  num=parseInt(num)
} else {
  num = 0;
}
if (localStorage.getItem("doccode") != "") {
  doccode = localStorage.getItem("doccode");
} else {
  doccode = "";
}
if (localStorage.getItem("docName") != "") {
  docName = localStorage.getItem("docName");
} else {
  docName = "";
}
if (localStorage.getItem("depname") != "") {
  depname = localStorage.getItem("depname");
} else {
  depname = "";
}
if (localStorage.getItem("depname") != "") {
  depname = localStorage.getItem("depname");
} else {
  depname = "";
}
if (localStorage.getItem("depCode") != "") {
  depCode = localStorage.getItem("depCode");
} else {
  depCode = "";
}
if (localStorage.getItem("regcode") != "") {
  regcode = localStorage.getItem("regcode");
} else {
  regcode = "";
}
if (localStorage.getItem("regprice") != "") {
  regprice = localStorage.getItem("regprice");
} else {
  regprice = "";
}
if (localStorage.getItem("regdata") != "") {
  regdata = localStorage.getItem("regdata");
} else {
  regdata = "";
}
if (localStorage.getItem("name") != "") {
  name = localStorage.getItem("name");
} else {
  name = "";
}
if (localStorage.getItem("cardno") != "") {
  cardCode = localStorage.getItem("cardno");
} else {
  cardCode = "";
}
if (localStorage.getItem("PatientSex") != "") {
  PatientSex = localStorage.getItem("PatientSex");
} else {
  PatientSex = "";
}
if (localStorage.getItem("PatientIdnumber") != "") {
  PatientIdnumber = localStorage.getItem("PatientIdnumber");
} else {
  PatientIdnumber = "";
}
if (localStorage.getItem("openid") != "") {
  openid = localStorage.getItem("openid");
} else {
  openid = "";
}
if (localStorage.getItem("TimeRegion") != "") {
  TimeRegion = localStorage.getItem("TimeRegion");
} else {
  TimeRegion = "";
}
if (localStorage.getItem("CommentDoctornam") != "") {
  CommentDoctornam = localStorage.getItem("CommentDoctornam");
} else {
  CommentDoctornam = "";
}
if (localStorage.getItem("ReviewDepartment") != "") {
  ReviewDepartment = localStorage.getItem("ReviewDepartment");
} else {
  ReviewDepartment = "";
}
export default new Vuex.Store({
  state: {
    //地址
    url:"http://2p495946b1.qicp.vip/",
    // url:"http://jiayuan1912.51vip.biz/",//花生壳
    // url:'http://2p495946b1.qicp.vip/',
    // url:"http://zhangshenggui.natapp1.cc/",
    // url: "http://192.168.33.47:8080/", //阿贵
    // url: "http://192.168.1.195:8080/", //志浩33.21
    // url: "http://222.223.131.135:8888/", //春涛
    //医生编码 在首页点击医生跳转时保存
    //支付后保存信息用
    //用来加载预约医生的排班信息
    doccode: doccode,
    //医生名字 在首页点击医生跳转时保存
    //支付后保存信息用
    docName: docName,
    //科室 在首页切换科室时保存
    //支付后保存信息用
    depname: depname,
    //科室编码 在首页切换科室时保存
    //支付后保存信息用
    depCode: depCode,
    //号源编码 医生预约页面请求回医生信息时保存
    //支付后保存信息用
    regcode: regcode,
    //价格 医生预约页面请求回医生信息时保存
    //支付后保存信息用
    regprice: regprice,
    //就诊日期 医生预约页面请求回医生信息时保存
    regdata: regdata,
    //患者名字 绑卡提交的时候赋值  新建卡提交数据返回后赋值 确认信息页选择人物的时候赋值
    //支付后保存信息用
    name: name,
    //卡号 在绑卡提交的时候赋值 新建卡提交数据返回后赋值 确认信息页选择人物的时候赋值
    //支付后保存信息用
    cardCode: cardCode,
    //确认信息页患者性别
    PatientSex: PatientSex,
    //患者id 确认信息页
    //支付后保存信息用
    PatientIdnumber: PatientIdnumber,
    //微信号id
    openid: openid,
    //白天昼夜
    TimeRegion: TimeRegion,
    //评论医生姓名
    CommentDoctornam:CommentDoctornam,
    //评论科室
    ReviewDepartment: ReviewDepartment,
    //通知信息条数
    num:num,
    websocket:'',
    usernums:usernums,
    doctornums:doctornums
  },
  getters: {
    
    getdoctornums(state) {
      return state.doctornums;
    },
    //选中的是那个
    getusernums(state) {
      return state.usernums;
    },
    //websocket
    getwebsocket(state) {
      return state.websocket;
    },
    //白天还是昼夜
    getnum(state) {
      return state.num;
    },
    //白天还是昼夜
    getamprom(state) {
      return state.TimeRegion;
    },
    //获取医生编码
    getDoccode(state) {
      return state.doccode;
    },
    //获取科室
    getDepname(state) {
      return state.depname;
    },
    //获取患者姓名
    getName(state) {
      return state.name;
    },
    //获取用户卡号
    getCardCode(state) {
      return state.cardCode;
    },
    //获取url请求头
    getUrl(state) {
      return state.url;
    },
    //就诊日期
    getRegdata(state) {
      return state.regdata;
    },
    //挂号费用
    getRegprice(state) {
      return state.regprice;
    },
    //获取医生名字
    getDocName(state) {
      return state.docName;
    },
    //获取科室编码
    getdepCode(state) {
      return state.depCode;
    },
    //获取号源编码
    getRegcode(state) {
      return state.regcode;
    },
    //获取确认信息页患者性别
    getPatientSex(state) {
      return state.PatientSex;
    },
    //获取患者id
    getPatientIdnumber(state) {
      return state.PatientIdnumber;
    },
    //获取openid
    getopenid(state) {
      return state.openid;
    },
    //获取评论医生姓名
    getDoctornam(state) {
      return state.CommentDoctornam;
    },
    //获取评论科室
    geteview(state) {
      return state.ReviewDepartment;
    }
  },
  mutations: {
    setdoctornums(state, doctornums) {
      localStorage.setItem("doctornums", doctornums);
      state.doctornums = doctornums;
    },
    setusernums(state, usernums) {
      localStorage.setItem("usernums", usernums);
      state.usernums = usernums;
    },
    // websocket
    setwebsocket(state, websocket) {
      localStorage.setItem("websocket", websocket);
      state.websocket = websocket;
    },
    setnum(state, num) {
      console.log(num,"-"+testnum++)
      localStorage.setItem("num", num);
      state.num = num;
    },
    //保存白天昼夜
    setamprom(state, TimeRegion) {
      localStorage.setItem("TimeRegion", TimeRegion);
      state.TimeRegion = TimeRegion;
    },
    setDoccode(state, doccode) {
      localStorage.setItem("doccode", doccode);
      state.doccode = doccode;
    },
    // 保存科室
    setDepname(state, depname) {
      localStorage.setItem("depname", depname);
      state.depname = depname;
    },
    //保存患者名字
    setName(state, name) {
      localStorage.setItem("name", name);
      state.name = name;
    },
    //保存卡号
    setCardCode(state, cardCode) {

      localStorage.setItem("cardno", cardCode);
      state.cardCode = cardCode;
    },
    //保存url请求头
    setUrl(state, url) {
      localStorage.setItem("url", url);
      state.url = url;
    },
    setRegdata(state, regdata) {
      localStorage.setItem("regdata", regdata);
      state.regdata = regdata;
    },
    //保存挂号费用
    setRegprice(state, regprice) {
      localStorage.setItem("regprice", regprice);
      state.regprice = regprice;
    },
    //设置医生名字
    setDocName(state, docName) {
      localStorage.setItem("docName", docName);
      state.docName = docName;
    },
    //设置科室编码
    setdepCode(state, depCode) {
      localStorage.setItem("depCode", depCode);
      state.depCode = depCode;
    },
    //设置号源编码
    setRegcode(state, regcode) {
      localStorage.setItem("regcode", regcode);
      state.regcode = regcode;
    },
    //设置患者性别
    setPatientSex(state, PatientSex) {
      localStorage.setItem("PatientSex", PatientSex);
      state.PatientSex = PatientSex;
    },
    //设置患者身份证号
    setPatientIdnumber(state, PatientIdnumber) {
      localStorage.setItem("PatientIdnumber", PatientIdnumber);
      state.PatientIdnumber = PatientIdnumber;
    },
    //设置openid
    setopenid(state, openid) {
      localStorage.setItem("openid", openid);
      state.openid = openid;
    },
    //保存评论医生姓名
    setDoctornam(state, CommentDoctornam) {
      localStorage.setItem("CommentDoctornam", CommentDoctornam);
      state.CommentDoctornam = CommentDoctornam;
    },
    //保存评论科室
    setReview(state, ReviewDepartment) {
      localStorage.setItem("ReviewDepartment", ReviewDepartment);
      state.ReviewDepartment = ReviewDepartment;
    }
  }
});
