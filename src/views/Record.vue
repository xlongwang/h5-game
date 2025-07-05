<template>
  <div class="record_page text-[50px]">
    <header-back :title="t('record.title')" :has-back-icon="true" />
    <div class="record_content">
      <div class="record_content_title">
        <div v-for="item in titleList" :key="item" class="record_content_title_item">
          {{ item }}
        </div>
      </div>
      <div v-if="recordList.length > 0" class="record_list">
        <div v-for="item in recordList" :key="item.id" class="record_item">
          <div class="record_item_title_right_top w-[200px] text-center mr-[20px]">
            ${{ item?.amount.toFixed(2) }}
          </div>
          <div class="record_item_title_right flex items-center">
            <div class="record_item_title_right_top w-[250px] text-center mr-[40px]">
              {{ item?.updated_at }}
            </div>

            <div class="record_item_title_right_bottom w-[200px] text-center">
              {{ item?.status }}
            </div>
            <div class="record_detail_btn" @click="handleDetail(item)">details</div>
          </div>
        </div>
      </div>
      <div v-else class="record_emtpy">{{ t("record.noData") }}</div>
    </div>
    <div class="record_bt"></div>
    <!-- <RecordDetailPop ref="recordDetailPopRef" :data="currentRecord" /> -->
  </div>
</template>

<script setup lang="ts">
import { useGlobal } from "@/composables";
import useUserStore from "@/stores/use-user-store";
import "@/assets/scss/pages/record.scss";

defineOptions({
  name: "Record",
});

const { i18n } = useGlobal();
const { t } = i18n;
const recordDetailPopRef = ref<any>(null);

const userStore = useUserStore();
const currentRecord = ref<any>(null);

const titleList = ref([
  t("record.amount"),
  t("record.time"),
  t("record.status"),
  t("record.details"),
]);
const recordList = ref<any[]>([]);
const userInfo = computed(() => {
  return userStore.userInfo;
});

async function getList() {
  // 获取提现订单列表
  const { list = [] } = await userStore.fetchOrderList({
    genre: "2", // 2为提现
    page: "1",
    player_id: userInfo.value?.id?.toString() || "",
  });
  console.log("🚀 ~ getList ~ res:", list);
  recordList.value = list || [];
}

const handleDetail = (item: any) => {
  currentRecord.value = item;
  recordDetailPopRef.value.open();
}

onMounted(() => {
  getList();
});

const list = ref<any[]>([
  // {
  //     title: 'Depósito',
  //     time: '2025-06-29 10:00:00',
  //     money: 100,
  // },
]);
</script>

<style scoped lang="scss">  
.record_detail_btn{
    border-radius: 20px;
    background-color: #a40000;
   width: 190px;
   height: 80px;
   text-align: center;
   line-height: 80px;
   color: #f3d656;
   font-size: 40px;
   margin-left: 45px;
}
</style>