<template>
  <div class="retirar-detail-page">
    <header-back :has-back-icon="true" />
    <div class="retirar-detail-page-con">
      <div class="retirar-detail-page-con-bg">
        <div class="retirar-detail-page-c1">
          <div class="retirar-detail-page-c1-item-title">
            <span v-if="userInfo?.receiving_account?.receiving_name">{{
              userInfo?.receiving_account?.receiving_name
            }}</span>
          </div>
          <div class="retirar-detail-page-c1-item-content flex items-center gap-[12px]">
            <div class="retirar-detail-page-c1-item-content-item w-[170px] h-[163px]">
              <img :src="coin" alt="" class="w-full h-full" />
            </div>
            <div class="text-[60px] text-gold font-bold">{{ getCoinNum(amount) }}</div>
          </div>
        </div>

        <div class="retirar-detail-page-c2">
          <div class="retirar-detail-page-c2-item-title text-[50px] pt-[30px] pb-[20px]">
            {{ t("withdraw.withdrawalInProgress") }}
          </div>
          <div class="retirar_progress_container">
            <div class="retirar_pro_box">
              <div class="retirar_progress_inner" :style="{ width: `${percent * 100}%` }">
                <div
                  class="progess_txt"
                  :style="{
                    right: percent > 0.9 ? '0.2rem' : '-1.111111rem',
                    color: percent > 0.9 ? '#190b00' : '#f2d458',
                  }"
                >
                  {{ Math.floor(percent * 100) }}%
                </div>
              </div>
            </div>
          </div>
        </div>

        <div class="retirar-detail-log-container">
          <div class="log_scroll_container text-[40px]">
                                      <div
               class="retirar-detail-log-item"
               v-for="item in reversedProgressList"
               :key="item.title"
             >
               <div class="retirar-detail-log-item-title line-clamp-3 line-height-[1.4]">
                 {{ t(item.description, { hours: curHours }) }}
               </div>
               <div class="time">{{ dayjs(item.time).format("YYYY-MM-DD HH:mm:ss") }}</div>
             </div>
            <!-- <div class="retirar-detail-log-item">
              <div class="retirar-detail-log-item-title line-clamp-3 line-height-[1.4]">
                {{ t("withdraw.welcomeMessage") }}
              </div>
              <div class="time">2025-06-30 10:00:00</div>
            </div>
            <div class="retirar-detail-log-item">
              <div class="retirar-detail-log-item-title line-clamp-3 line-height-[1.4]">
                {{ t("withdraw.welcomeMessage") }}
              </div>
              <div class="time">2025-06-30 10:00:00</div>
            </div>
            <div class="retirar-detail-log-item">
              <div class="retirar-detail-log-item-title line-clamp-3 line-height-[1.4]">
                {{ t("withdraw.welcomeMessage") }}
              </div>
              <div class="time">2025-06-30 10:00:00</div>
            </div>
            <div class="retirar-detail-log-item">
              <div class="retirar-detail-log-item-title line-clamp-3 line-height-[1.4]">
                {{ t("withdraw.welcomeMessage") }}
              </div>
              <div class="time">2025-06-30 10:00:00</div> -->
            <!-- </div> -->
          </div>
        </div>

        <div class="retirar-btn text-[50px] font-bold" @click="submit">
          <!-- {{ t('withdraw.useVIPChannel') }} -->{{ btnTxt }}
        </div>
        <!-- 使用 VIP 渠道提款 -->
      </div>
    </div>
    <RetairPop01
      ref="retairPop01Ref"
      :retair-pop-02-ref="retairPop02Ref"
      :on-success="handlePop1Success"
      :active-val="amount"
      :on-pop1-cancel="handlePop1Cancel"
      :set-hours="setHours"
    />
    <RetairPop02
      ref="retairPop02Ref"
      :recharge-ref="OderDetailRecargelRef"
      :active-val="amount"
      :on-success="handlePop2Success"
    />

    <RetairPop03
      ref="retairPop03Ref"
      :pop3-submit="pop3Submit"
      :retair-pop-04-ref="retairPop04Ref"
      :submit-info="submitInfo"
      :active-val="amount"
      :on-success="handleSuccess"
      :recharge-ref="OderDetailRecargelRef"
    />
    <RetairPop04
      ref="retairPop04Ref"
      :pop4-submit="pop4Submit"
      :confirm-info="confirmInfo"
    />
    <RetairPop05
      ref="retairPop05Ref"
      :set-prsonal-tax="setPrsonalTax"
      :amount="amount"
      :retair-pop-06-ref="retairPop06Ref"
      :pop4-submit="pop4Submit"
    />
    <RetairPop06
      ref="retairPop06Ref"
      :retair-pop-07-ref="retairPop07Ref"
      :on-success="handlePaySuccess"
      :amount="amount"
      :tax="taxInfo"
      :retair-pop-05-ref="retairPop05Ref"
      :pop6-submit="pop6Submit"
    />
    <RetairPop07
      ref="retairPop07Ref"
      :on-success="handlePaySuccess"
      :amount="amount"
      :tax="taxInfo"
      :pop6-submit="pop6Submit"
    />
    <OderDetailRecharge
      ref="OderDetailRecargelRef"
      :active-val="200"
      :on-success="handleSuccess"
      :extra="getExtra(200)"
    />
  </div>
</template>

<script setup lang="ts">
import { useRoute, useRouter } from "vue-router";
// import { userApi } from '@/api/user-api'
import { useGlobal } from "@/composables";
import { getCoinNum } from "@/utils";
import { StorageUtil } from "@/utils/storage";
import { rechargAmountList } from "@/config/RechargeConfig";
import dayjs from "dayjs";

defineOptions({
  name: "RetirarDetailPage",
});

const { userStore, i18n } = useGlobal();
const { t } = i18n;
const route = useRoute();
const router = useRouter();
const btnTxt = ref(t("withdraw.useVIPChannel"));
const taxInfo = ref(0);
import retarirProgress from "@/config/retairProgress";

const retairPop01Ref = ref();
const retairPop02Ref = ref();
const retairPop03Ref = ref();
const retairPop04Ref = ref();
const retairPop05Ref = ref();
const retairPop06Ref = ref();
const retairPop07Ref = ref();
const OderDetailRecargelRef = ref();
const percent = ref(Math.random() * 0.2 + 0.4);

const getExtra = (val: number) => {
  const item = rechargAmountList.find((item) => item.val === val);
  return item?.extra || 0;
};

const progressTxtList = ref<Array<{ time: number; title: string; description: string }>>(
  []
);

const step = ref(1);

const curHours = ref(0);

const confirmInfo = ref({
  total: 0,
  coast: 0,
});

// 获取URL参数中的amount
const amount = computed(() => {
  const amountParam = route.query.amount;
  return amountParam ? Number(amountParam) : 5000;
});

async function handleSuccess() {
  await userStore.fetchUserInfo();
  percent.value = 0.9;
  //   retairPop02Ref.value.hide();
    step.value = 4;
}

function setHours(hours: number) {
  curHours.value = hours;
}

function submitInfo(info: { total: number; coast: number }) {
  console.log("submitInfo", info);
  confirmInfo.value = info;
}

function setPrsonalTax(tax: number) {
  percent.value = 0.99;
  taxInfo.value = tax;
}

function handlePop1Success() {
  console.log('handlePop1Success=====')
  step.value = 2;
}

function handlePop1Cancel() {
    console.log("handlePop1Cancel");
}

function handlePop2Success() {  
  console.log('handlePop2Success=====')
  step.value = 3;
}

function handlePaySuccess() {
  percent.value = 1;
  console.log("handlePaySuccess");
  router.push("/");
}



function pop3Submit() {
  console.log("pop3Submit");
  percent.value = 0.99;
  step.value = 4;
  btnTxt.value = "Pagar impuestos personal";
}

function pop4Submit() {
  console.log("pop4Submit");
  percent.value = 0.99;
  step.value = 5;
  btnTxt.value = "Pagar impuestos personal";
}

function pop6Submit() {
  console.log("pop6Submit");
  percent.value = 0.99;
  step.value = 6;
  btnTxt.value = "Pagar impuestos personal";
}

const userInfo = computed(() => {
  return StorageUtil.getUserInfo();
});

const reversedProgressList = computed(() => {
  return [...progressTxtList.value].reverse();
});


watch(reversedProgressList, (newVal, oldVal) => {
  console.log('reversedProgressList', newVal, oldVal)
}, {deep: true})


function submit() {
    console.log('submit=====', step.value)
  if (step.value === 1) {
    retairPop01Ref.value.open();
    // step.value = 2;
    return;
  }

  if(step.value === 4) {
    retairPop03Ref.value.open();
    return;
  }
  if(step.value === 5) {
    retairPop06Ref.value.open();
    return;
  }

}

watch(step, (newVal, oldVal) => {
  console.log("step", newVal, oldVal);
  if (newVal === 2 && progressTxtList.value.length === 2) {
    // retairPop03Ref.value.open();
    progressTxtList.value.push({
      ...retarirProgress[3],
      time: new Date().getTime(),
    });
    progressTxtList.value.push({
      ...retarirProgress[4],
      time: new Date().getTime() + 2000,
    });
  }
    if(newVal === 3 && progressTxtList.value.length === 4) {
      progressTxtList.value.push({
        ...retarirProgress[5],
        time: new Date().getTime(),
      });
    }
    if(newVal === 5 && progressTxtList.value.length === 5) {
      progressTxtList.value.push({
        ...retarirProgress[6],
        time: new Date().getTime(),
      });
      progressTxtList.value.push({
        ...retarirProgress[7],
        time: new Date().getTime() + 3000,
      });
    }
});

onMounted(() => {
  const ct = new Date().getTime();
  progressTxtList.value = [
    {
      ...retarirProgress[1],
      time: ct,
    },
    {
      ...retarirProgress[2],
      time: ct + 3000,
    },
  ];
});

const coin = "/images/retirar/coin.png";

// const extra = ref(0)
</script>

<style scoped lang="scss">
.retirar-detail-page {
  padding: 0 10px 300px;
}

.retirar-detail-page-con {
  width: 1037px;
  height: 1478px;
  position: relative;
  margin: 0 auto;
  box-sizing: border-box;
  padding: 80px 65px 0;
  &::before {
    content: "";
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: url("/images/retirarDetail/border.png") no-repeat center center;
    background-size: contain;
    z-index: 5;
    pointer-events: none;
  }
}

.retirar-detail-page-c1 {
  width: 901px;
  height: 331px;
  background: url("/images/retirarDetail/c1.png") no-repeat center center;
  background-size: 100% 100%;
  margin: 0 auto;
  display: flex;
  flex-direction: column;
  gap: 40px;
  box-sizing: border-box;
  padding: 0 14px 0;
  &-item-title {
    padding: 0 20px;
    height: 102px;
    line-height: 102px;
    font-size: 50px;
    text-align: left;
  }
}

.retirar_progress_container {
  width: 901px;
  height: 80px;
  background: url("/images/retirarDetail/pro_bg.png") no-repeat center center;
  background-size: 100% 100%;
  margin: 0 auto;
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
  box-sizing: border-box;
}

.retirar_pro_box {
  width: 844px;
  height: 55px;
  position: relative;
}

.progess_txt {
  position: absolute;
  right: -120px;
  font-size: 50px;
  color: #190b00;
  height: 55px;
  line-height: 55px;
}

.retirar_progress_inner {
  // width: 104px;
  height: 55px;
  background: repeating-linear-gradient(
    120deg,
    #ffe066 0 20px,
    #ffe066 20px 40px,
    #e6c200 40px 60px,
    #e6c200 60px 80px
  );
  background-size: 110px 100%;
  animation: progress-stripes 1s linear infinite;
  border-radius: 10px;
  box-shadow: 0 2px 8px #e6c20033;
  position: relative;
  transition: width 0.3s ease-in-out;
}

@keyframes progress-stripes {
  0% {
    background-position: 0 0;
  }
  100% {
    background-position: 110px 0;
  }
}

.retirar-detail-log-container {
  width: 901px;
  height: 621px;
  border: 3px solid #b8841e;
  border-radius: 15px;
  background-color: #190b00;
  box-sizing: border-box;
  padding: 30px;
  position: relative;
  margin: 42px auto 0;
}

.log_scroll_container {
  overflow-y: auto;
  height: 100%;
  width: 100%;
  -webkit-overflow-scrolling: touch;
  position: relative;
  &::-webkit-scrollbar {
    display: none;
  }
}

.retirar-detail-log-item {
  padding-bottom: 30px;
}

.retirar-btn {
  width: 909px;
  height: 116px;
  background: url("/images/retirarDetail/btn.png") no-repeat center center;
  background-size: 100% 100%;
  margin: 45px auto 0;
  line-height: 116px;
  text-align: center;
  color: #250d00;
}

.time {
  padding-top: 10px;
}
</style>
