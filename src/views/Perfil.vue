<template>
    <div class="perfil-page">
        <div class="apoyo_icon" @click="handleClick('/apoyo')"></div>
        <!-- <HeaderBack /> -->
        <HeaderInfo :user-info="userInfo" />
        <div class="section01">
            <div class="section01_left">
                <div
                    class="section01_left_top w-[294px] h-[290px] flex items-center justify-center"
                >
                    <img
                        :src="retirarImg"
                        alt="retirar"
                        class="w-[232px] h-[245px]"
                        @click="handleClick('/retirar')"
                    >
                </div>
                <div class="section01_left_bottom font-bold text-[50px]">
                    {{ t("profile.withdraw") }}
                </div>
            </div>
            <div class="section01_right text-center">
                <div
                    class="section01_right_top w-[294px] h-[290px] flex items-center justify-center"
                >
                    <img
                        :src="depositoImg"
                        alt="deposito"
                        class="w-[294px] h-[268px]"
                        @click="handleDeposito"
                    >
                </div>
                <div class="section01_right_bottom font-bold text-[50px]">
                    {{ t("profile.deposit") }}
                </div>
            </div>
        </div>

        <div class="section02">
            <div
                class="section02_item flex items-center text-[50px]"
                @click="handleClick('/invite')"
            >
                <div class="section02_item_left w-[87px] h-[78px] mr-[16px]"></div>
                <div class="section02_item_con flex-1">{{ t("profile.invite") }}</div>
                <div class="section02_item_right flex items-center">
                    <div class="section02_item_right_top">{{ t("profile.monthlyMillion") }}</div>
                    <div class="section02_item_right_arr w-[40px] h-[47px] ml-[16px]"></div>
                </div>
            </div>
            <div
                class="section02_item flex items-center text-[50px]"
                @click="handleLanguageClick"
            >
                <div class="section02_item_left2 w-[88px] h-[69px] mr-[16px]"></div>
                <div class="section02_item_con flex-1">{{ t("profile.language") }}</div>
                <div class="section02_item_right flex items-center">
                    <div class="section02_item_right_top">{{ getCurrentLanguageName() }}</div>
                    <div class="section02_item_right_arr w-[40px] h-[47px] ml-[16px]"></div>
                </div>
            </div>

            <div class="section02_item flex items-center text-[50px]" @click="handleAccountClick">
                <div class="section02_item_lock w-[78px] h-[78px] mr-[16px]"></div>
                <div class="section02_item_con flex-1">{{ t("profile.account") }}</div>
                <div class="section02_item_right flex items-center">
                    <!-- <div class="section02_item_right_top">Spanish</div> -->
                    <div class="section02_item_right_arr w-[40px] h-[47px] ml-[16px]"></div>
                </div>
            </div>

            <div
                class="section02_item flex items-center text-[50px]"
                @click="handleClick('/sobre')"
            >
                <div class="section02_item_left3 w-[88px] h-[73px] mr-[16px]"></div>
                <div class="section02_item_con flex-1">{{ t("profile.about") }}</div>
                <div class="section02_item_right flex items-center">
                    <div class="section02_item_right_top"></div>
                    <div class="section02_item_right_arr w-[40px] h-[47px] ml-[16px]"></div>
                </div>
            </div>
        </div>

        <teleport to="body">
            <van-popup
                v-model:show="showPicker"
                class="picker_popup_custom"
                destroy-on-close
                round
                position="bottom"
            >
                <van-picker
                    :model-value="[pickerValue]"
                    :columns="columns"
                    :cancel-button-text="t('components.cancel')"
                    :confirm-button-text="t('components.confirm')"
                    @cancel="showPicker = false"
                    @confirm="onConfirmPicker"
                />
            </van-popup>
        </teleport>
        <RechargPop ref="rechargPopRef" :on-success="handleRechargeSuccess" />
        <RetarirStep2
            ref="retarirStep2Ref"
            :is-show-amount="false"
        />
    </div>
</template>

<script setup lang="ts">
import { useRouter } from 'vue-router'
import { useGlobal } from '@/composables'
import { StorageUtil } from '@/utils/storage'
import '@/assets/scss/pages/perfil.scss'

// 从 public 目录引用图片
// import retirarImg from '@/assets/images/perfil/retirar_icon.png'

defineOptions({
    name: 'Perfil',
})
const { i18n } = useGlobal()
const { t, getCurrentLanguageName, changeLanguage, currentLocale } = i18n

const showPicker = ref(false)
const userInfo = computed(() => {
    return StorageUtil.getUserInfo()
})

const retarirStep2Ref = ref()

const pickerValue = ref('')
const columns = ref([
    {
        text: 'English',
        value: 'en',
    },
    {
        text: 'Spanish',
        value: 'sp',
    },
    {
        text: 'Português (Brasil)',
        value: 'pt-BR',
    },
    {
        text: 'Português (Portugal)',
        value: 'pt-PT',
    },
])

const router = useRouter()
const rechargPopRef = ref()

// 语言选择器相关函数
function handleLanguageClick() {
    // 设置当前选中的语言
    pickerValue.value = currentLocale.value
    showPicker.value = true
}

function handleAccountClick() {
    retarirStep2Ref.value.open()
}

function onConfirmPicker(value: any) {
    console.log('🚀 ~ onConfirmPicker ~ value:', value)
    const selectedLocale = value.selectedValues[0]
    if (selectedLocale && selectedLocale !== currentLocale.value) {
        changeLanguage(selectedLocale)
    }
    showPicker.value = false
}

function handleDeposito() {
    rechargPopRef.value.open()
}

function handleRechargeSuccess() {
    // 充值成功后的处理逻辑
    console.log('充值成功')
}
function handleRetirar() {
    router.push('/retirar')
}
function handleClick(path: string) {
    router.push(path)
}

onMounted(() => {
    console.log('userInfo', userInfo.value)
})

const depositoImg = '/images/perfil/deposito_icon.png'
const retirarImg = '/images/perfil/retirar.png'
</script>

<style lang="scss" scoped>
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

::v-deep(.van-picker__cancel) {
  color: #6a3006 !important;
}

::v-deep(.van-picker__confirm) {
  color: #f3d558 !important;
}
</style>
