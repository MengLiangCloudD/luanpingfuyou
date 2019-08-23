<template>
  <div class="spinner-wrapper">
    <div class="spinner-box">
      <div class="spinner"></div>
    </div>
  </div>
</template>
<script>
export default {};
</script>
<style  scoped>
.spinner-box {
  width: 40px;
  height: 40px;
  display: inline-block;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
}
.spinner-wrapper {
  height: 100vh;
  width: 100vw;
  background: rgba(255, 255, 255, 0.9);
  position: absolute;
  top: 0;
  left: 0;
  z-index: 1003;
}
.spinner {
  margin: 0;
  width: 40px;
  height: 40px;
  background-color: rgb(40, 184, 161);
  border-radius: 100%;
  -webkit-animation: scaleout 1s infinite ease-in-out;
  animation: scaleout 1s infinite ease-in-out;
}

@-webkit-keyframes scaleout {
  0% {
    -webkit-transform: scale(0);
  }
  100% {
    -webkit-transform: scale(1);
    opacity: 0;
  }
}

@keyframes scaleout {
  0% {
    transform: scale(0);
    -webkit-transform: scale(0);
  }
  100% {
    transform: scale(1);
    -webkit-transform: scale(1);
    opacity: 0;
  }
}
</style>