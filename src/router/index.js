import Vue from "vue";
import Router from "vue-router";
Vue.use(Router);
// import homePage from "@/components/home";
// import orderList from "@/components/orderList.vue";
// import appointmentPage from "@/components/appointment";
// import evaluate from "@/components/evaluate";
// import RegistrationJianKa from "@/components/RegistrationJianKa/RegistrationJianKa";
// import bindCardPage from "@/components/bindCard/bindCard";
// import authentication from "@/components/authentication/authentication";
// import loginPage from "@/components/login";
// import registerPage from "@/components/register";
// import RealnameAuthenticationPage from "@/components/RealnameAuthentication/RealnameAuthentication";
// import Myaccount from "@/components/Myaccount/Myaccount";
// import registeredInfo from "@/components/registeredInfo/registeredInfo";
// import myCardPage from "@/components/myCard/myCard";
// import myCollectPage from "@/components/myCollect/myCollect";
// import payment from "@/components/payment";
// import Myevaluation from "@/components/Myevaluation";
// import check from "@/components/reports/check";
// import reports from "@/components/reports/reports";
// import NoPayment from "@/components/reports/NoPayment";
// import YesPayment from "@/components/reports/YesPayment";
// import Currentreports from "@/components/reports/Currentreports";
// import Myincidentals from "@/components/Myincidentals/Myincidentals";

// import Myassay from "@/components/Myassay/Myassay";
// import MyExamine1 from "@/components/MyExamine/MyExamine1";
// import MyExamine from "@/components/MyExamine/MyExamine";
// import Myprescription from "@/components/Myprescription/Myprescription";
// import Myprescription1 from "@/components/Myprescription/Myprescription1";
// import Mycase from "@/components/Mycase/Mycase";
//预约住院
// import hospitalrder from "@/components/hospitalrder/hospitalrder";

/**========================================医生端开始===================================================================== */
// import prescription from "@/components/doctor/prescription";
// import zhprescription from "@/components/doctor/zhprescription";
// import examination from "@/components/doctor/examination";
// import doctorlogin from "@/components/doctor/doctorlogin";
// import registeredlist from "@/components/doctor/registeredlist";
// import medicalrecords from "@/components/doctor/medicalrecords";
// import writecheck from "@/components/doctor/writecheck";
// import writerecords from "@/components/doctor/writerecords";
// import writingtest from "@/components/doctor/writingtest";
/**========================================医生端结束===================================================================== */
export default new Router({
  // mode: "history",
  // base: "dist",
  routes: [
    // 主页
    {
      path: "/",
      name: "indexPage",
      redirect: "/home",
    },
    {
      path: "/home1",
      name: "hometestpage",
      component: resolve=>(require(["@/components/home1"],resolve)),
    },
    //首页
    {
      path: "/home",
      name: "homePage",
      component: resolve=>(require(["@/components/home"],resolve)),
    //   meta: {
    //   requiresAuth: true,
    //   privilege: ['capacityStatus'],
    //   keepAlive: true,//此组件需要被缓存
    //   isBack:false, //用于判断上一个页面是哪个
    // }
    },{
      path: "/authfail",
      name: "authfail",
      component: resolve=>(require(["@/components/authfail"],resolve)),
    },
    //挂号列表
    {
      path: "/orderList",
      name: "orderList",
      component: resolve=>(require(["@/components/orderList.vue"],resolve)),
    },
    //挂号预约页面
    {
      path: "/appointment",
      name: "appointmentPage",
      component: resolve=>(require(["@/components/appointment"],resolve)),
      
    },
    //医生评价
    {
      path: "/evaluate",
      name: "evaluate",
      component: resolve=>(require(["@/components/evaluate"],resolve)),
    },
    //确认挂号信息
    {
      path: "/registeredInfo",
      name: "registeredInfo",
      component: resolve=>(require(["@/components/registeredInfo/registeredInfo"],resolve)),
    },
    //我的账户
    {
      path: "/Myaccount",
      name: "Myaccount",
      component: resolve=>(require(["@/components/Myaccount/Myaccount"],resolve)),
      // meta: {
      //   requiresAuth: true,
      //   privilege: ['capacityStatus'],
      //   keepAlive: true,//此组件需要被缓存
      //   isBack:false, //用于判断上一个页面是哪个
      // }
    },
    //就诊卡
    {
      path: "/myCard",
      name: "myCardPage",
      component: resolve=>(require(["@/components/myCard/myCard"],resolve)),
    },
    //关注的医生
    {
      path: "/myCollect",
      name: "myCollectPage",
      component: resolve=>(require(["@/components/myCollect/myCollect"],resolve)),
    },
    //微信支付
    {
      path: "/payment",
      name: "payment",
      component: resolve=>(require(["@/components/payment"],resolve)),
    },
    //我的评论
    {
      path: "/Myevaluation",
      name: "Myevaluation",
      component: resolve=>(require(["@/components/Myevaluation"],resolve)),
    },
    //身份验证
    {
      path: "/authentication",
      name: "authentication",
      component: resolve=>(require(["@/components/authentication/authentication"],resolve)),
      // meta: {
      //   requiresAuth: true,
      //   privilege: ['capacityStatus'],
      //   keepAlive: true,//此组件需要被缓存
      //   isBack:false, //用于判断上一个页面是哪个
      // }
    },
    {
      path: "/reportss",
      name: "reportss",
      component: resolve=>(require(["@/components/reports/reportss"],resolve)),
      meta: { index:38},
    },
    
    //我的检查
    {
      path: "/MyExamine",
      name: "MyExamine",
      component: resolve=>(require(["@/components/MyExamine/MyExamine"],resolve)),
    },
    //检查处方
    {
      path: "/Myincidentals",
      name: "Myincidentals",
      component: resolve=>(require(["@/components/Myincidentals/Myincidentals"],resolve)),
    },
    
    //我的化验
    {
      path: "/Myassay",
      name: "Myassay",
      component: resolve=>(require(["@/components/Myassay/Myassay"],resolve)),
    },
    //药品处方
    {
      path: "/Myprescription",
      name: "Myprescription",
      component: resolve=>(require(["@/components/Myprescription/Myprescription"],resolve)),
    },
    //化验处方
    {
      path: "/Laboratorys",
      name: "Laboratorys",
      component: resolve=>(require(["@/components/Laboratorys/Laboratorys"],resolve)),
    },
    //我的病例
    {
      path: "/Mycase",
      name: "Mycase",
      component: resolve=>(require(["@/components/Mycase/Mycase"],resolve)),
    },
    //预约住院
    {
      path: "/hospitalrder",
      name: "hospitalrder",
      component: resolve=>(require(["@/components/hospitalrder/hospitalrder"],resolve)),
    },
    //咨询医生
    {
      path: "/Consultadoctor",
      name: "Consultadoctor",
      component: resolve=>(require(["@/components/Consultadoctor/Consultadoctor"],resolve)),
    },
    //咨询列表
    {
      path: "/doctorList",
      name: "doctorList",
      component: resolve=>(require(["@/components/Consultadoctor/doctorList"],resolve)),
    },
    //咨询列表
    {
      path: "/ConsultationHome",
      name: "ConsultationHome",
      component: resolve=>(require(["@/components/Consultadoctor/ConsultationHome"],resolve)),
    },
    //描述病情
    {
      path: "/Describecondition",
      name: "Describecondition",
      component: resolve=>(require(["@/components/Consultadoctor/Describecondition"],resolve)),
    },
    //选择患者
    {
      path: "/Selectionpatients",
      name: "Selectionpatients",
      component: resolve=>(require(["@/components/Consultadoctor/Selectionpatients"],resolve)),
    },
    //订单支付
    {
      path: "/ConsulOrder",
      name: "ConsulOrder",
      component: resolve=>(require(["@/components/Consultadoctor/ConsulOrder"],resolve)),
    },
    //支付成功
    {
      path: "/Successfulpayment",
      name: "Successfulpayment",
      component: resolve=>(require(["@/components/Consultadoctor/Successfulpayment"],resolve)),
    },
    /**====================================================医生端======================================================== */
    {
      path: "/doctorvisit",
      name: "doctorvisit",
      component: resolve=>(require(["@/components/doctor/doctorpersonal/doctorvisit"],resolve))
    },
    {
      path: "/detail",
      name: "detail",
      component: resolve=>(require(["@/components/doctor/detail"],resolve))
    },
    //写拟诊
    {
      path: "/examination",
      name: "examination",
      component: resolve=>(require(["@/components/doctor/examination"],resolve)),
    },
    //开处方
    {
      path: "/prescription",
      name: "prescription",
      component: resolve=>(require(["@/components/doctor/prescription"],resolve)),
    },
    //开中药
    {
      path: "/zhprescription",
      name: "zhprescription",
      component: resolve=>(require(["@/components/doctor/zhprescription"],resolve)),
    },
    //医生验证登录
    {
      path: "/doctorlogin",
      name: "doctorlogin",
      component:resolve=>(require(["@/components/doctor/doctorlogin"],resolve)),
    },
    //医生挂号患者列表
    {
      path: "/registeredlist",
      name: "registeredlist",
      component: resolve=>(require(["@/components/doctor/registeredlist"],resolve)),
    },
    //患者病历详情
    {
      path: "/medicalrecords",
      name: "medicalrecords",
      component: resolve=>(require(["@/components/doctor/medicalrecords"],resolve)),
    },
    {
      path: "/doctorckeck",
      name: "doctorckeck",
      component: resolve=>(require(["@/components/doctor/doctorchecklist"],resolve)),
    },
    //写检查
    {
      path: "/writecheck",
      name: "writecheck",
      component: resolve=>(require(["@/components/doctor/writecheck"],resolve)),
    },
    //写病历
    {
      path: "/writerecords",
      name: "writerecords",
      component: resolve=>(require(["@/components/doctor/writerecords"],resolve)),
    },
    //写化验
    {
      path: "/writingtest",
      name: "writingtest",
      component: resolve=>(require(["@/components/doctor/writingtest"],resolve)),
    },
    //医生查询开过的检查
    {
      path: "/checkresult",
      name: "checkresult",
      component: resolve=>(require(["@/components/doctor/doctorckeckjc"],resolve)),
    },
    //医生查询开过的病历
    {
      path: "/doctorckeckrec",
      name: "doctorckeckrec",
      component: resolve=>(require(["@/components/doctor/doctorckeckrec"],resolve)),
    },
    //医生查询开过的化验
    {
      path: "/doctorckecktest",
      name: "doctorckecktest",
      component: resolve=>(require(["@/components/doctor/doctorckecktest"],resolve)),
    },
    //医生查询开过的药方
    {
      path: "/doctorckeckdrug",
      name: "doctorckeckdrug",
      component: resolve=>(require(["@/components/doctor/doctorckeckdrug"],resolve)),
    },
    //医生查询检查结果
    {
      path: "/doctorckeckjctresult",
      name: "doctorckeckjctresult",
      component: resolve=>(require(["@/components/doctor/doctorckeckjcresult"],resolve)),
    },
    //医生查询化验结果
    {
      path: "/doctorckecktestresult",
      name: "doctorckecktestresult",
      component: resolve=>(require(["@/components/doctor/doctorckecktestresult"],resolve)),
    },
    //医生个人中心
    {
      path: "/Personalcenter",
      name: "Personalcenter",
      component: resolve=>(require(["@/components/doctor/doctorpersonal/Personalcenter"],resolve)),
    },
    //医生个人简介
    {
      path: "/Personalprofile",
      name: "Personalprofile",
      component: resolve=>(require(["@/components/doctor/doctorpersonal/Personalprofile"],resolve)),
    },
    //医生名片
    {
      path: "/MaxCard",
      name: "MaxCard",
      component: resolve=>(require(["@/components/doctor/doctorpersonal/MaxCard"],resolve)),
    },
    //历史患者
    {
      path: "/Historicpatients",
      name: "Historicpatients",
      component: resolve=>(require(["@/components/doctor/doctorpersonal/Historicpatients"],resolve)),
    },
    //评论中心
    {
      path: "/Commentinformation",
      name: "Commentinformation",
      component: resolve=>(require(["@/components/doctor/doctorpersonal/Commentinformation"],resolve)),
    },
    //关注的患者
    {
      path: "/Concernedpatients",
      name: "Concernedpatients",
      component: resolve=>(require(["@/components/doctor/doctorpersonal/Concernedpatients"],resolve)),
    },
    //医生钱包
    {
      path: "/Mywallet",
      name: "Mywallet",
      component: resolve=>(require(["@/components/doctor/doctorpersonal/Mywallet"],resolve)),
    },
    //收入明细
    {
      path: "/Incomedetails",
      name: "Incomedetails",
      component: resolve=>(require(["@/components/doctor/doctorpersonal/Incomedetails"],resolve)),
    },
    //回复列表
    {
      path: "/Replylist",
      name: "Replylist",
      component: resolve=>(require(["@/components/doctor/doctorpersonal/Replylist"],resolve)),
    },
    //医生回复
    {
      path: "/Doctorsreply",
      name: "Doctorsreply",
      component: resolve=>(require(["@/components/doctor/doctorpersonal/Doctorsreply"],resolve)),
    },
    
  ]
});
