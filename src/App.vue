<template>
  <div id="app">
      <transition :name="transitionName">
          <keep-alive :include="keepAlive">
            <router-view></router-view>
          </keep-alive>
      </transition>
      <!-- <transition :name="transitionName">
         <router-view v-if="!$route.meta.keepAlive"></router-view>
      </transition> -->
  </div>
</template>
<script>
export default {
  components: {},
  name: "App",
  data() {
    return {
      msgList:[],
      websocket:'',
      keepAlive: 'homePage',  //需要缓存的页面 例如首页
      transitionName: 'slide-right', //初始过渡动画方向
    }
  },
  methods:{
   send() {
         var message = '{"cardno":"01906345","massege":"1231231"}';
         this.websocket.send(message);
    }
  },
  watch: {
      $route(to, from) {
        // 切换动画
        let isBack = this.$router.isBack // 监听路由变化时的状态为前进还是后退
        if (isBack) {
          this.transitionName = 'slide-left'
        } else {
          this.transitionName = 'slide-right'
        }
        this.$router.isBack = false;
      }
    },
  mounted(){
    
  }
}

</script>
<style >
body,
html {
  margin: 0;
  padding: 0;
  height: 100%;
}
#app {
  height: 100%;
  width: 100%;
  position: fixed;
  bottom: 0;
  top: 0;
}

.Router {
      position: absolute;
      height: 100%;
      transition: all .377s ease;
      will-change: transform;
      top: 0;
      backface-visibility: hidden;
      perspective: 1000;
    }
    .slide-left-enter,
    .slide-right-leave-active {
      opacity: 0;
      transform: translate3d(-100%, 0, 0);
    }

    .slide-left-leave-active,
    .slide-right-enter {
      opacity: 0;
      transform: translate3d(100%, 0 ,0);
    }
</style>
