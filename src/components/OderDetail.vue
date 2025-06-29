<template>
  <van-popup v-model:show="showCenter" round class="recharge_detail_popup">
    <div class="recharge_detail_content">
      <div class="peposito_de_title mx-auto mt-[50px]"></div>
      <div class="recharge_input text-[50px]">
        <div>Tarifa de manejo</div>
        <div class="text-[#f00]">${{ formatVal(activeVal) }}</div>
      </div>
      <div class="text-[37px] text-[#f3d559] px-[12px] line-height-[50px] pt-[37px] detait_re_txt">
        <span class="dot_icon"></span>
        Pague de acuerdo con el monto del pedido. Si el monto del pedido no coincide con
        el monto del pago real, ¡el depósito no será reembolsado!
      </div>
      <div class="detai_re_btns px-[35px] pt-[60px] justify-between flex text-[40px] font-bold">
         <div class="detai_re_cancel" @click="handleCancel">CANCELAR</div>
         <div class="detai_re_submit" @click="handleSubmit">IR A PAGAR</div>
      </div>
    </div>
  </van-popup>
</template>

<script setup lang="ts">
import { ref } from "vue";

const props = defineProps<{
  activeVal: number;
  onSuccess: () => void;
}>();

const formatVal = (val: number) => {
  if (val > 20) {
    return val;
  }
  return val.toFixed(2);
};

const showCenter = ref(true);

const handleCancel = () => {
  showCenter.value = false;
};

const handleSubmit = () => {
  showCenter.value = false;
  props.onSuccess();
};

const open = () => {
  showCenter.value = true;
};

defineExpose({
  open,
});
</script>
<style lang="scss" scoped>
.recharge_detail_popup {
  width: 1000px;
  height: 750px;
  padding: 22px 14px;
  box-sizing: border-box;
  border-radius: 20px;
  background: transparent;
  &::after {
    width: 1000px;
    height: 750px;
    background: url("/images/main/border.png") no-repeat;
    background-size: contain;
    content: "";
    position: absolute;
    top: 0;
    left: 0;
    z-index: 2;
    pointer-events: none;
  }
}
.recharge_detail_content {
  width: 100%;
  height: 100%;
  background-color: #0c0401;
  position: relative;
  z-index: 1;
  box-sizing: border-box;
  padding: 50px 30px 0;
}
.peposito_de_title {
  width: 820px;
  height: 70px;
  background: url("/images/main/detail_t.png") no-repeat;
  background-size: contain;
  margin: 0 auto;
  overflow: hidden;
  text-indent: -9999px;
}

.recharge_input {
  width: 861px;
  height: 111px;
  box-sizing: border-box;
  border: 3px solid #b9851f;
  margin: 60px auto 0;
  line-height: 111px;
  border-radius: 20px;
  padding: 0 30px;
  display: flex;
  align-items: center;
  justify-content: space-between;
}

.dot_icon{
  width: 33px;
  height: 33px;
  display: inline-block;
  background: url("/images/main/do.png") no-repeat;
  background-size: contain;
  background-position: center;
}

.detait_re_txt{
  word-break: break-all;
}

.detai_re_cancel{
  width: 403px;
  height: 103px;
  background: url("/images/main/cancel.png") no-repeat;
  background-size: contain;
  line-height: 103px;
  text-align: center;
  color: #0c0900;
}

.detai_re_submit{
  width: 375px;
  height: 103px;
  background: url("/images/main/ok.png") no-repeat;
  background-size: contain;
  line-height: 103px;
  text-align: center;
  color: #f2d659;
}
</style>
