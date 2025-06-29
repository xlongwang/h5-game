<!--
 * @Author: along longwang6@163.com
 * @Date: 2025-06-29 15:40:36
 * @LastEditors: along longwang6@163.com
 * @LastEditTime: 2025-06-29 16:00:45
 * @FilePath: /vue3_app/src/components/RetarirStep2.vue
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
-->
<template>
  <teleport to="body">
    <van-popup v-model:show="show" position="center" class="step2_popup">
      <div class="step2_popup_inner">
        <div class="setp2_pop_content pt-[120px] pb-[100px]">
          <div
            class="step2_t font_cinze text-[50px] font-bold text-center"
            style="text-transform: lowercase; font-variant: normal"
          >
            Vincular cuenta de retirada
          </div>
          <div class="step2_content">
            <van-form @submit="onSubmit">
              <van-cell-group inset>
                <div class="form-item">
                  <div class="form-label">Monto del retiro:</div>
                  <div class="form-input">
                    <van-field
                      v-model="amount"
                      placeholder="$2.00"
                      readonly
                      input-align="left"
                      class="custom-field"
                    />
                  </div>
                </div>
                <div class="form-item">
                  <div class="form-label">Nombre</div>
                  <div class="form-input">
                    <van-field
                      v-model="name"
                      placeholder="Pro favor ingrese tu nombre"
                      input-align="left"
                      class="custom-field"
                    />
                  </div>
                </div>
                <div class="form-item picker_item_form">
                  <div class="form-label">Nombre del banco</div>
                  <div class="form-input">
                    <van-field
                      v-model="fieldValue"
                      is-link
                      readonly
                      placeholder="Selecciona el banco"
                      @click="showPicker = true"
                    />
                    <teleport to="body">
                      <van-popup
                        v-model:show="showPicker"
                        destroy-on-close
                        round
                        position="bottom"
                      >
                        <van-picker
                          :model-value="pickerValue"
                          :columns="columns"
                          @cancel="showPicker = false"
                          @confirm="onConfirmPicker"
                          @change="onChangePicker"
                        />
                      </van-popup>
                    </teleport>
                  </div>
                </div>
                <div class="form-item">
                  <div class="form-label">Numere de cuenta</div>
                  <div class="form-input">
                    <van-field
                      v-model="card"
                      placeholder="Pro favor ingrese el numero de tarjeta bancaria"
                      input-align="left"
                      class="custom-field"
                    />
                  </div>
                  <div class="form-tip">
                    <span class="form-tip-icon">!</span>
                    Ingrese 16 digitos de tarjeta o 18 digitos de Clabe
                  </div>
                </div>
                <div class="form-item phone_item_form">
                  <div class="form-label">Numere telefonico</div>
                  <div class="form-input">
                    <van-field
                      v-model="phone"
                      placeholder="Pro favor ingrese su numero de telefono"
                      input-align="left"
                      class="custom-field"
                    >
                      <template #left-icon>
                        <span class="form-prefix text-[50px]">+52</span>
                      </template>
                    </van-field>
                  </div>
                </div>
              </van-cell-group>
              <div class="form-btn-wrap">
                <van-button
                  round
                  block
                  type="primary"
                  native-type="submit"
                  @click="handleSubmit"
                  class="form-btn text-[#0e0701] text-[40px]"
                >
                  Confirmar
                </van-button>
              </div>
            </van-form>
          </div>
        </div>
      </div>
    </van-popup>
  </teleport>
</template>

<script setup lang="ts">
import { ref } from "vue";
const props = defineProps<{
  onSuccess?: () => void;
}>();
const show = ref(false);

const columns = [
  { text: "STP", value: "STP" },
  { text: "BBVA", value: "BBVA" },
  { text: "Santander", value: "Santander" },
  { text: "Banamex", value: "Banamex" },
];
const fieldValue = ref("");
const pickerValue = ref([]);
const showPicker = ref(false);

function open() {
  show.value = true;
}

function handleSubmit() {
  show.value = false;
  console.log(11111, 'submit ');
  props.onSuccess?.();
}

function onConfirmPicker(val: { selectedValues: string }) {
  fieldValue.value = val.selectedValues;
  pickerValue.value = [val.selectedValues as never];
  showPicker.value = false;
}

defineExpose({
  open,
});
</script>

<style lang="scss" scoped>
.step2_popup {
  width: 978px;
  height: 1738px;
  box-sizing: border-box;
  overflow: hidden;
  padding: 10px 15px;
  background: transparent;
  &::before {
    content: "";
    display: block;
    background: url("/images/retirarStep2/border.png") no-repeat;
    background-size: contain;
    width: 978px;
    height: 1738px;
    left: 0;
    top: 0;
    pointer-events: none;
    z-index: 4;
    position: absolute;
  }
}
.step2_popup_inner {
  background-color: #0c0800;
  position: relative;
  height: 100%;
  width: 100%;
  z-index: 3;
}

// .step2_content {
::v-deep(.van-cell-group) {
  background: transparent !important;
}

::v-deep(.van-cell) {
  background: transparent !important;
  padding: 0 !important;
}

::v-deep(.van-cell-group__wrap) {
  background: transparent !important;
}

::v-deep(.van-button__text) {
  font-size: 50px !important;
  color: #0e0701;
  font-weight: bold;
}
// }

.step2_content {
  // background: #181006;
  padding: 60px 31px 0;
  font-size: 50px;
}

.form-item {
  margin-bottom: 60px;
  &.picker_item_form,
  &.phone_item_form {
    ::v-deep(.van-cell) {
      color: #ffd700;
      background: #190b00;
      border-radius: 15px !important;
      border: 3px solid #b9851f !important;
      padding: 10px 14px !important;
      input {
        font-size: 45px !important;
        color: #b9851f;
        border: none !important;
        &::placeholder {
          color: #b9851f;
        }
      }
    }
    ::v-deep(.van-icon:before) {
      color: #b9851f;
    }
    ::v-deep(.form-prefix) {
      font-size: 45px !important;
      position: relative;
      top: 10px;
    }
  }
}
.form-label {
  color: #f3d559;
  font-weight: 500;
  margin-bottom: 20px;
  line-height: 1.2;
}
.form-input {
  width: 100%;
}
.custom-field :deep(.van-field__control) {
  background: #1a1207;
  border: 2px solid #ffd700;
  border-radius: 10px;
  color: #ffd700;
  font-size: 45px;
  padding: 12px 16px;
}
.custom-field :deep(input) {
  color: #ffd700;
  background: #190b00;
  border-radius: 15px !important;
  border: 3px solid #b9851f !important;
  &::placeholder {
    color: #b9851f;
  }
}
.custom-field :deep(.van-field__body) {
  align-items: center;
}
.form-tip {
  color: #ff9900;
  font-size: 20px;
  margin-top: 4px;
  display: flex;
  align-items: center;
}
.form-tip-icon {
  color: #ff9900;
  font-size: 22px;
  margin-right: 4px;
  font-weight: bold;
}
.form-prefix {
  color: #ffd700;
  font-size: 24px;
  margin-right: 6px;
}
.form-btn-wrap {
  margin-top: 32px;
}
.form-btn {
  width: 859px;
  height: 126px;
  background: url("/images/retirarStep2/submit_btn.png") no-repeat;
  background-size: contain;
  border: none !important;
  margin: 0 auto;
  border-radius: 0 !important;
}
</style>
