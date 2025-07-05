<!--
 * @Author: along longwang6@163.com
 * @Date: 2025-06-29 15:40:36
 * @LastEditors: along longwang6@163.com
 * @LastEditTime: 2025-07-04 21:51:35
 * @FilePath: /vue3_app/src/components/RetarirStep2.vue
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
-->
<template>
    <teleport to="body">
        <van-popup
            v-model:show="show"
            position="center"
            class="step2_popup"
            @close="resetForm"
        >
            <div class="step2_popup_inner">
                <div class="setp2_pop_content pt-[120px] pb-[100px]">
                    <div
                        class="step2_t font_cinze text-[50px] font-bold text-center"
                        style="text-transform: lowercase; font-variant: normal"
                    >
                        {{ t("components.linkWithdrawalAccount") }}
                    </div>
                    <div class="step2_content">
                        <van-form>
                            <van-cell-group inset>
                                <div class="form-item">
                                    <div class="form-label">{{ t("components.withdrawalAmount") }}:</div>
                                    <div class="form-input">
                                        <van-field
                                            v-model="amount"
                                            :placeholder="`$${props.curValue}`"
                                            readonly
                                            input-align="left"
                                            class="custom-field"
                                        />
                                    </div>
                                </div>
                                <div class="form-item">
                                    <div class="form-label">{{ t("components.name") }}</div>
                                    <div class="form-input">
                                        <van-field
                                            v-model="name"
                                            :placeholder="t('components.pleaseEnterName')"
                                            input-align="left"
                                            class="custom-field"
                                        />
                                    </div>
                                </div>
                                <div class="form-item picker_item_form">
                                    <div class="form-label">{{ t("components.pixKey") }}</div>
                                    <div class="form-input">
                                        <van-field
                                            v-model="fieldValue"
                                            is-link
                                            readonly
                                            placeholder="PHONE/EMAIL/CPF/CNJP"
                                            @click="showPicker = true"
                                        />
                                        <teleport to="body">
                                            <van-popup
                                                v-model:show="showPicker"
                                                class="picker_popup_custom"
                                                destroy-on-close
                                                round
                                                position="bottom"
                                            >
                                                <van-picker
                                                    :model-value="pickerValue"
                                                    :columns="columns"
                                                    :cancel-button-text="t('components.cancel')"
                                                    :confirm-button-text="t('components.confirm')"
                                                    @cancel="showPicker = false"
                                                    @confirm="onConfirmPicker"
                                                />
                                            </van-popup>
                                        </teleport>
                                    </div>
                                </div>

                                <div v-if="fieldValue === 'EMAIL'" class="form-item phone_item_form">
                                    <div class="form-label">{{ t("components.email") }}</div>
                                    <div class="form-input">
                                        <van-field
                                            v-model="email"
                                            :placeholder="t('components.pleaseEnterEmail')"
                                            input-align="left"
                                            class="custom-field"
                                            @blur="validateEmail"
                                        >
                                        </van-field>
                                    </div>
                                    <div v-if="emailError" class="form-tip text-[40px]">
                                        <span class="form-tip-icon">!</span>
                                        {{ emailError }}
                                    </div>
                                </div>

                                <div v-if="fieldValue === 'CPF'" class="form-item phone_item_form">
                                    <div class="form-label">{{ t("components.cpf") }}</div>
                                    <div class="form-input">
                                        <van-field
                                            v-model="cpf"
                                            :placeholder="t('components.pleaseEnterCPF')"
                                            input-align="left"
                                            class="custom-field"
                                        >
                                        </van-field>
                                    </div>
                                </div>

                                <div v-if="fieldValue === 'CNJP'" class="form-item phone_item_form">
                                    <div class="form-label">{{ t("components.cnjp") }}</div>
                                    <div class="form-input">
                                        <van-field
                                            v-model="cnjp"
                                            :placeholder="t('components.pleaseEnterCNJP')"
                                            input-align="left"
                                            class="custom-field"
                                        >
                                        </van-field>
                                    </div>
                                </div>

                                <div class="form-item phone_item_form">
                                    <div class="form-label">{{ t("components.phone") }}</div>
                                    <div class="form-input">
                                        <van-field
                                            v-model="phone"
                                            :placeholder="t('components.pleaseEnterPhone')"
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
                                    class="form-btn text-[#0e0701] text-[40px]"
                                    @click="handleSubmit"
                                >
                                    {{ t("components.confirm") }}
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
import { _ } from 'dist/server/entry-server'
import { computed, nextTick, ref } from 'vue'
import { useRouter } from 'vue-router'
import { useGlobal } from '@/composables'
import useUserStore from '@/stores/use-user-store'
import { StorageUtil } from '@/utils/storage'

const props = defineProps<{
    onSuccess?: () => void
    curValue: number
}>()

const { i18n } = useGlobal()
const { t } = i18n

const userStore = useUserStore()
// console.log("userStore", userStore);

const userInfo = computed(() => {
    return userStore.userInfo
})

// const router = useRouter()
const show = ref(false)

const columns = [
    { text: 'PHONE', value: 'PHONE' },
    { text: 'EMAIL', value: 'EMAIL' },
    { text: 'CPF', value: 'CPF' },
    { text: 'CNJP', value: 'CNJP' },
]
const fieldValue = ref('')
const pickerValue = ref([])
const showPicker = ref(false)

// 表单数据
const amount = ref(props.curValue.toString())
const name = ref('')
const phone = ref('')
const email = ref('')
const cpf = ref('')
const cnjp = ref('')
const emailError = ref('')

function open() {
    show.value = true
}

watch(
    () => props.curValue,
    (newVal) => {
        amount.value = newVal ? `$${newVal.toFixed(2)}` : '$0.00'
    },
    { immediate: true },
)

function resetForm() {
    amount.value = props.curValue.toString()
    name.value = ''
    phone.value = ''
    email.value = ''
    cpf.value = ''
}

async function handleSubmit() {
    try {
    // 根据选择的PIX类型获取对应的账户信息
        let receivingAccount = ''
        let pixType = ''

        switch (fieldValue.value) {
            case 'PHONE':
                receivingAccount = phone.value
                pixType = 'PHONE'
                break
            case 'EMAIL':
                receivingAccount = email.value
                pixType = 'EMAIL'
                break
            case 'CPF':
                receivingAccount = cpf.value
                pixType = 'CPF'
                break
            case 'CNJP':
                receivingAccount = cnjp.value
                pixType = 'CNJP'
                break
            default:
                throw new Error(t('components.pleaseSelectPixType'))
        }

        // 验证必填字段
        if (!name.value) {
            throw new Error(t('components.pleaseEnterName'))
        }

        if (!phone.value) {
            throw new Error(t('components.pleaseEnterPhone'))
        }
        console.log('🚀 ~ handleSubmit ~ receivingAccount:', receivingAccount)
        if (!receivingAccount) {
            throw new Error(t('components.pleaseEnterAccountInfo'))
        }

        // 如果是邮箱类型，验证邮箱格式
        if (fieldValue.value === 'EMAIL' && !validateEmail()) {
            throw new Error(t('components.invalidEmailFormat'))
        }

        // 调用更新用户信息接口
        console.log('🚀 开始更新用户信息，参数:', {
            player_id: userStore.userInfo?.id?.toString() || '',
            pix_type: pixType,
            receiving_name: name.value,
            phone: phone.value || '',
            receiving_account: receivingAccount,
        })

        await userStore.updateUserInfo({
            player_id: userStore.userInfo?.id?.toString() || '',
            pix_type: pixType,
            receiving_name: name.value,
            phone: phone.value || '',
            receiving_account: receivingAccount,
        })

        console.log('✅ 用户信息更新成功')
        console.log('📧 更新后的用户信息:', userStore.userInfo)
        console.log('📧 更新后的 receiving_account:', userStore.userInfo?.receiving_account?.receiving_account)
        console.log('📧 更新后的 pix_type:', userStore.userInfo?.receiving_account?.pix_type)

        // 强制触发响应式更新
        await nextTick()

        show.value = false
        resetForm()

        console.log('🔄 调用 onSuccess 回调')
        if (props.onSuccess) {
            await props.onSuccess()
            console.log('✅ onSuccess 回调执行完成')
        }
        else {
            console.log('⚠️ onSuccess 回调未定义')
        }
    // router.push("/retirarDetail");
    }
    catch (error: any) {
        console.error('Error al actualizar:', error)
    // 这里可以添加错误提示，比如使用Toast
    // alert(error.message || 'Error al actualizar')
    }
}

function onConfirmPicker(val: { selectedValues: string }) {
    fieldValue.value = val.selectedValues[0]
    pickerValue.value = [val.selectedValues as never]
    showPicker.value = false
    // 清空之前的错误信息
    emailError.value = ''
}

// 邮箱验证函数
function validateEmail() {
    if (!email.value) {
        emailError.value = t('components.pleaseEnterEmail')
        return false
    }

    const emailRegex = /^[^\s@]+@[^\s@][^\s.@]*\.[^\s@]+$/
    if (!emailRegex.test(email.value)) {
        emailError.value = t('components.invalidEmailFormat')
        return false
    }

    emailError.value = ''
    return true
}

onMounted(() => {
    console.log('userInfo', userInfo.value)
    amount.value = props.curValue ? `$${props.curValue.toFixed(2)}` : '$0.00'
})

defineExpose({
    open,
})
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

::v-deep(.van-picker__cancel) {
  color: #6a3006 !important;
}

::v-deep(.van-picker__confirm) {
  color: #f3d558 !important;
}

.picker_popup_custom {
  color: #f3d558 !important;
  background: #1a0b00 !important;
  border: 3px solid #f3d558 !important;
  border-bottom: none !important;
  border-radius: 30px 30px 0 0 !important;
  ::v-deep(.van-picker) {
    background: transparent !important;
  }
  ::v-deep(.van-picker__mask) {
    background-image: none;
  }
  ::v-deep(.van-picker-column__item) {
    color: #f3d558 !important;
  }
  ::v-deep(.van-picker-column) {
    position: relative;
    z-index: 3;
  }
  ::v-deep(.van-picker__frame) {
    background-color: #6c2f03 !important;
    border-radius: 15px !important;
    &:after {
      border: none;
      display: none !important;
    }
  }
}

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
      background: #190b00 !important;
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
