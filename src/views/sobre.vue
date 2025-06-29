<template>
  <div class="sobre-page">
    <header-back />
    <div class="sobre-page-con">
      <div class="sobre-page-con-title">Sobre nosotros</div>
      <div class="text-[45px] pt-[40px]">
        xxxxx
      </div>
    </div>
  </div>
</template>
<script setup lang="ts">
defineOptions({
  name: "SobrePage",
});
</script>
<style scoped lang="scss">
.sobre-page {
  padding: 0 10px 300px;
}
.sobre-page-con {
  width: 945px;
  margin: 0 auto;
  height: 1707px;
  background: url("/images/sobre/bg.png") no-repeat center center;
  background-size: 100% 100%;
  box-sizing: border-box; 
  padding: 40px 30px 0;
}

.sobre-page-con-title {
  height: 115px;
  font-size: 50px;
  position: relative;
  &::after {
    content: "";
    position: absolute;
    top: 80px;
    left: 40px;
    width: 233px;
    height: 11px;
    background: url("/images/sobre/line.png") no-repeat center center;
  }
}
</style>
