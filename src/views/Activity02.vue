<template>
  <div class="activity01_page">
    <HeaderBack />
    <div class="activity01_content">
      <div class="act_header w-[1043px] h-[529px] mx-auto">
        <img class="w-[100%] h-[100%]" :src="headerImg" alt="" />
      </div>
     <div class="act_btn w-[1046px] h-[143px] mx-auto mt-[53px]">
       Recibir ${{ formatNumber(90) }}
     </div>
    </div>
  </div>
</template>

<script setup lang="ts">
const headerImg = "/images/activity/a1.png";
import { formatNumber } from "@/utils/tools";
defineOptions({
  name: "Activity02",
});
</script>
<style lang="scss" scoped>
.activity01_page {
  padding-bottom: 300px;
}
.act_btn{
  background: url("/images/activity/btn_bg.png") no-repeat center center;
  background-size: 100% 100%;
  font-size: 60px;
  font-weight: bold;
  color: #f3d658;
  color: #0c0701;
  display: flex;
  align-items: center;
  justify-content: center;
}
</style>
