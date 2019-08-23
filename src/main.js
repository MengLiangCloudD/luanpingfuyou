// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from "vue";
import App from "./App";
import router from "./router";
import store from "./store";
import "./common/style/base.css";
import { Button,Icon,Spin,Collapse,Panel,Modal,Message,Form,FormItem,Select,Option,Checkbox,CheckboxGroup,Radio,Input,Badge,Poptip,Menu,MenuItem,RadioGroup,LoadingBar } from 'iview';
import { DatePicker } from 'element-ui';
import "iview/dist/styles/iview.css";
import Calendar from "vue-mobile-calendar";
import fastClick from "fastclick";
// import ElementUI from 'element-ui';
// import 'element-ui/lib/theme-chalk/index.css';
Vue.config.productionTip = false;
Vue.component('Button', Button);
Vue.component('Icon', Icon);
Vue.component('Collapse', Collapse);
Vue.component('Panel', Panel);
Vue.component('Modal', Modal);
Vue.component('Form', Form);
Vue.component('Select', Select);
Vue.component('Option', Option);
Vue.component('Checkbox', Checkbox);
Vue.component('CheckboxGroup', CheckboxGroup);
Vue.component('Radio', Radio);
Vue.component('Input', Input);
Vue.component('Badge', Badge);
Vue.component('Menu', Menu);
Vue.component('Poptip', Poptip);
Vue.component('MenuItem', MenuItem);
Vue.component('RadioGroup', RadioGroup); 
Vue.component('LoadingBar', LoadingBar ); 
Vue.component('FormItem', FormItem);
Vue.component('Spin', Spin);
Vue.prototype.$Message=Message;
Vue.prototype.$Modal=Modal;
Vue.component(DatePicker.name, DatePicker);
// Vue.use(iView);
Vue.use(Calendar);
// Vue.use(ElementUI);
fastClick.attach(document.body);
window.router = router;
router.beforeEach((to,from,next)=>{
  console.log(to.path)
  let redirectpath
  if(to.path=="/appointment"){
    //处理路由
    redirectpath=to.fullPath
    // console.log(to)
    // console.log(to.query.hasOwnProperty("docCode"))
    if(to.query.hasOwnProperty("docCode")){
      store.commit("setDoccode", to.query.docCode);
      store.commit("setDocName", to.query.docName);
      store.commit("setdepCode", to.query.depCode);
      store.commit("setDepname", to.query.depname);
    }
    //判断localStorage里有没有openid
    if(localStorage.getItem('openid')&&localStorage.getItem('openid')!="undefined"){
        next()
    }else{
      if(document.cookie){
        let cookiestr=document.cookie
        let arr=cookiestr.split(";");
        let cookiearr=[];
        for(let i=0;i<arr.length;i++){
          let _arr=arr[i].split("=");
          let key=_arr[0];
          let value=_arr[1];
          cookiearr.push({key,value});
        }
        for(let i=0;i<cookiearr.length;i++){
          if(cookiearr[i].key.trim()=="openid"){
            // this.key1=cookiearr[i].key
            let value1=cookiearr[i].value
            localStorage.setItem('openid',value1);
          }else if(cookiearr[i].key.trim()=="headimgurl"){
            // this.key2=cookiearr[i].key
            let value2=cookiearr[i].value
            let user={headimgurl:value2}
            localStorage.setItem('user',JSON.stringify(user))
          }
        }
        next()
      }else{
        location.href=store.getters.getUrl + "depart/wxLogin.do?status=2";
      }
      
    }
    
  }else if(to.path=="/home"){
    if(localStorage.getItem('openid')&&localStorage.getItem('openid')!="undefined"){
      next()
    }else{
      if(document.cookie){
        let cookiestr=document.cookie
        let arr=cookiestr.split(";");
        let cookiearr=[];
        for(let i=0;i<arr.length;i++){
            let _arr=arr[i].split("=");
            let key=_arr[0];
            let value=_arr[1];
            cookiearr.push({key,value});
        }
        for(let i=0;i<cookiearr.length;i++){
            if(cookiearr[i].key.trim()=="openid"){
                let value1=cookiearr[i].value
                localStorage.setItem('openid',value1);
            }else if(cookiearr[i].key.trim()=="headimgurl"){
                let value2=cookiearr[i].value
                let user={headimgurl:value2}
                localStorage.setItem('user',JSON.stringify(user))
            }
        }
        next()
      }else{
        location.href=store.getters.getUrl + "depart/wxLogin.do?status=1";
      } 
    }
  }else{
    next()
  }
})
new Vue({
  el: "#app",
  router,
  store,
  components: { App },
  template: "<App/>"
});
