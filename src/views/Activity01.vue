<template>
  <div class="activity01_page">
    <HeaderBack />
    <div class="activity01_content">
      <div class="act_header w-[1043px] h-[529px] mx-auto">
        <img class="w-[100%] h-[100%]" :src="headerImg" alt="" />
      </div>
      <div class="act_day_list">
        <div
          class="act_day_item"
          v-for="item in dayList"
          :key="item.day"
          :class="{ active: currentDay === item.day }"
        >
          <div class="act_day_item_title_top">{{ item.title }}</div>
          <div class="act_day_item_content pt-[36px]">
            <div class="day_icon w-[174px] h-[168px] mx-[auto]">
              <img :src="dayIconImg" class="w-[100%] h-[100%]" />
            </div>
            <div class="act_day_item_num pt-[20px] pb-[20px]">
              ${{ formatNumber(item.num) }}
            </div>
            <div class="day_checkin">CHECK IN</div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
const headerImg = "/images/activity/a1.png";
const dayIconImg = "/images/activity/coin.png";
import { formatNumber } from "@/utils/tools";
const currentDay = ref(1);
const dayList = ref([
  {
    day: 1,
    title: "DAY1",
    num: 1,
  },
  {
    day: 2,
    title: "DAY2",
    num: 1,
  },
  {
    day: 3,
    title: "DAY3",
    num: 1,
  },
  {
    day: 4,
    title: "DAY4",
    num: 1,
  },
  {
    day: 5,
    title: "DAY5",
    num: 1,
  },
  {
    day: 6,
    title: "DAY6",
    num: 1,
  },
]);
defineOptions({
  name: "Activity01",
});
</script>
<style lang="scss" scoped>
.activity01_page{
  padding-bottom: 300px;

}
.act_day_list{
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  gap: 56px 32px;
  padding-top: 30px;
}
.act_day_item_title_top{
  height: 89px;
  font-weight: bold;
  font-size: 50px;
  line-height: 102px;
  text-align: center;
  color: #f3d658;
}
.act_day_item {
  width: 321px;
  height: 497px;
  font-size: 50px;
  text-align: center;
  background: url("/images/activity/day_bg_active.png") no-repeat center center;
  background-size: 100% 100%;
  &.active {
    background: url("/images/activity/day_bg.png") no-repeat center center;
    background-size: 100% 100%;
  }
}

.day_checkin{
 width: 257px;
 height: 74px;
 display: flex;
 align-items: center;
 justify-content: center;
 font-size: 30px;
 color: #f3d658;
 background: url("/images/activity/check.png") no-repeat center center;
 background-size: 100% 100%;
 margin: 0 auto;
}
</style>
