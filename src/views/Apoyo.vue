<!--
 * @Author: along longwang6@163.com
 * @Date: 2025-06-22 12:13:49
 * @LastEditors: along longwang6@163.com
 * @LastEditTime: 2025-07-02 16:26:34
 * @FilePath: /vue3_app/src/views/Promoc.vue
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
-->
<template>
    <div class="apoyo_page p-[20px] text-[50px]">
        <HeaderBack :has-back-icon="true" title="Servicio al Cliente" />
        <div class="apoyo_page_scroll">
            <div class="pb-[350px]">
                <div class="mb-[60px] w-[1045px] h-[608px] mx-auto">
                    <img :src="bannerImg" alt="" class="w-full">
                </div>
                <van-collapse v-model="activeNames" accordion>
                    <van-collapse-item title="¿Cómo puedo retirar dinero?" name="1">
                        Primero verifique el registro de pago y la cuentabancaria.<br>
                        Si la deducción se realizó correctamente pero no se recibió, comuníquese con el
                        servicio al cliente de la plataforma y proporcione el comprobante de la
                        transacción para que el servicio al cliente pueda ayudarlo en el procesamiento.
                    <!-- 这里可以放详细内容 -->
                    </van-collapse-item>
                    <van-collapse-item title="¿Es esta plataforma digna de mi confianza?" name="2">
                        Primero verifique el registro de pago y la cuentabancaria.<br>
                        Si la deducción se realizó correctamente pero no se recibió, comuníquese con el
                        servicio al cliente de la plataforma y proporcione el comprobante de la
                        transacción para que el servicio al cliente pueda ayudarlo en el procesamiento.
                    <!-- 这里可以放详细内容 -->
                    </van-collapse-item>
                    <van-collapse-item
                        title="¿Qué debo hacer si hay un problema con mi depósito?"
                        name="3"
                    >
                        Primero verifique el registro de pago y la cuentabancaria.<br>
                        Si la deducción se realizó correctamente pero no se recibió, comuníquese con el
                        servicio al cliente de la plataforma y proporcione el comprobante de la
                        transacción para que el servicio al cliente pueda ayudarlo en el procesamiento.
                    </van-collapse-item>

                    <van-collapse-item
                        title="¿Por qué el juego se carga lentamente o no se abre?"
                        name="4"
                    >
                        Los problemas de carga del juego pueden deberse a la latencia de la red, el
                        rendimiento del dispositivo o el mantenimiento de la plataforma. Se recomienda
                        verificar la conexión de red o informar el problema al servicio de atención al
                        cliente para obtener ayuda.
                    </van-collapse-item>

                    <van-collapse-item title="¿Qué pasa si el retiro falla?" name="5">
                        Si el retiro falla, verifique si su cuenta de retiro es correcta o cambie la
                        cuenta de retiro y retire dinero nuevamente.
                    </van-collapse-item>
                </van-collapse>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
// import { Collapse as VanCollapse, CollapseItem as VanCollapseItem } from 'vant'

import '@/assets/scss/pages/apoyo.scss'

defineOptions({
    name: 'Apoyo',
})
const bannerImg = '/images/apoyo/header.png'
const router = useRouter()
const activeNames = ref<string | number>('') // 单开模式
</script>

<style scoped lang="scss">
.apoyo_page {
  height: 100vh;
  overflow-y: auto;
}
.apoyo_page_scroll{
    height: calc(100vh - 300px);
    overflow-y: auto;
    font-size: 45px;
}
:deep(.van-cell) {
  background-color: #1d0f02;
  //   height: 145px;
  box-sizing: border-box;
  border: 4px solid #e69110;
  //   border-top: none;
  border-radius: 0px;
  position: relative;
  z-index: 2;
  &::after {
    border: none;
  }
}
:deep(.van-collapse-item__title) {
  font-size: 40px;
  color: #ffd84c;
  background: #231600;
  border-radius: 20px;
  word-break: break-all;
}
:deep(.van-collapse-item__content) {
  font-size: 34px;
  color: #ffd84c;
  background: #231600;
  word-break: break-all;

  border-top: none;
  padding: 30px 30px 30px 30px;
}

:deep(.van-collapse-item__wrapper) {
  position: relative;
  top: -14px;
  border: 4px solid #e69110;
  border-top: none;
  border-radius: 0 0 20px 20px;
}

:deep(.van-collapse-item) {
  // border: 4px solid #e69110;
  // border-radius: 20px;
  box-sizing: border-box;
  margin-bottom: 20px;
}

:deep(.van-hairline--top-bottom) {
  &::after {
    display: none;
  }
}
:deep(.van-collapse-item--border:after) {
  border: none;
}

:deep(.van-cell__right-icon) {
  &::before {
    content: "";
    display: block;
    width: 66px;
    height: 66px;
    background: url("/images/apoyo/right_arrow.png") no-repeat;
    background-size: 100% 100%;
    transform: rotate(0);
  }
}

:deep(.van-collapse-item__title--expanded .van-cell__right-icon:before) {
  transform: rotate(180deg);
}
</style>
