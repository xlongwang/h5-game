<!--
 * @Author: along longwang6@163.com
 * @Date: 2025-06-29 20:47:26
 * @LastEditors: along longwang6@163.com
 * @LastEditTime: 2025-07-02 16:26:08
 * @FilePath: /vue3_app/src/views/sobre.vue
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
-->
<template>
    <div class="sobre-page">
        <header-back title="Sobre" :has-back-icon="true" />
        <div class="sobre-page-con">
            <div class="sobre-page-con-title">Sobre nosotros</div>
            <div class="sobre-page-con-text text-[45px] pt-[40px] line-height-[1.5]">
                Contamos con una extensa colección de tragamonedas estilo Vegas y ofrecemos la
                gama más amplia de juegos y productos más competitivos del mercado. Todas las
                plataformas solo acceden y seleccionan plataformas de juegos en línea de renombre
                internacional para garantizar que cada jugador pueda jugar en un entorno justo y
                confiable. Al mismo tiempo, el gobierno de Costa Rica también monitoreará los
                datos de la plataforma de juegos para garantizar la equidad y autenticidad del
                juego. ¡Disfruta jugando en Slots!
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
defineOptions({
    name: 'SobrePage',
})
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

.sobre-page-con-text {
  word-break: break-all;
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
