<template>
  <div class="invite-page">
    <HeaderBack />
    <div class="invite-header w-[1051px] h-[389px] mx-auto mb-[17px]">
      <img :src="inviteImg" class="w-[100%] h-[100%]" />
    </div>
    <div class="invite-mi w-[1049px] h-[477px] mx-auto">
      <div class="invite-mi-title font-bold text-[50px] pb-[30px]">Mi invitation</div>
      <div class="invite-mi-con">
        <div class="'invite-mi-hoy items-center flex h-[147px]">
          <div class="invite-mi-hoy-title text-[60px] font-bold w-[175px]">Hoy</div>
          <div class="invite-item flex flex-col w-[321px] mr-[51px]">
            <div class="text-[45px] pb-[8px]">Registro</div>
            <div class="text-[60px] font-bold">0</div>
          </div>
          <div class="invite-item flex flex-col w-[407px]">
            <div class="text-[45px] pb-[8px]">Premio</div>
            <div class="text-[50px] font-bold">${{ formatNumber(0) }}</div>
          </div>
        </div>
        <div class="'invite-mi-todo mt-[20px] flex h-[147px]">
          <div class="invite-mi-hoy-title text-[60px] font-bold w-[175px]">Todo</div>
          <div class="invite-item flex flex-col w-[321px] mr-[51px]">
            <div class="text-[45px] pb-[8px]">Registro</div>
            <div class="text-[60px] font-bold">0</div>
          </div>
          <div class="invite-item flex flex-col w-[407px]">
            <div class="text-[45px] pb-[8px]">Premio</div>
            <div class="text-[50px] font-bold">${{ formatNumber(0) }}</div>
          </div>
        </div>
      </div>
    </div>

    <div class="recom-mi w-[1051px] h-[263px] mx-auto mt-[22px]">
      <div class="invite-mi-title font-bold text-[50px] pb-[30px]">Mi recompensa</div>
       <div class="recom-con">
           <span>Recibirás</span>
           <span>0</span>
           <span class="text-[#9e6c15]">Disponible</span>
           <span>${{ formatNumber(0) }}</span>
           <div class="copy-btn">Copiar</div>
       </div>
    </div>

    <div class="mt-[22px] h-[457px] recom-section w-[1051px] mx-auto">
      <div class="invite-mi-title font-bold text-[50px] pb-[30px]">Comparte en tus redes sociales</div>
      <div class="recom-section-con flex justify-center gap-[20px] text-[28px]">
          <div class="share_item flex flex-col items-center gap-[10px]" :key="item.title" v-for="item in shareList">
              <div class="share_item_img">
                <img :src="item.img" alt="">
              </div>  
              <div class="share_item_title">
                {{ item.title }}
              </div>
          </div>
      </div>
      <div class="invite_bt flex items-center justify-between pt-[40px]">
        <div class="invite_bt_item text-[32px] text-[#bc7302]">
           Comparte enlace con tus  amigos.
        </div>
        <div class="copy-btn">Copiar</div>
      </div>
    </div>
  </div>
</template>
<script setup lang="ts">
defineOptions({
  name: "InvitePage",
});
const inviteImg = "/images/invite/banner.png";
import { formatNumber } from "@/utils/tools";

const shareList = [
  {
    img: "/images/invite/a1.png",
    title: "Mas",
  },
  {
    img: "/images/invite/a2.png",
    title: "Facebook",
  },
  {
    img: "/images/invite/a3.png",
    title: "whatapp",
  },
  {
    img: "/images/invite/a4.png",
    title: "Telegram",
  },
  {
    img: "/images/invite/a5.png",
    title: "Twitter",
  },
  {
    img: "/images/invite/a6.png",
    title: "Instagram",
  }
];
</script>
<style lang="scss" scoped>
.invite-page {
  padding: 0 10px 300px;
}

.invite-mi {
  background: url("/images/invite/mi_bg.png") no-repeat center center;
  background-size: 100% 100%;
  box-sizing: border-box;
  padding: 34px 40px 0;
}

.invite-mi-hoy-title {
  display: flex;
  align-items: center;
  justify-content: center;
}

.nvite-mi-con {
  display: flex;
  flex-direction: column;
  gap: 27px;
}

.invite-item {
  background-color: #1e0c00;
  border: 4px solid #8c5400;
  border-radius: 20px;
  justify-content: center;
  align-items: center;
  height: 147px;
  text-align: center;
}

.recom-mi {
  background: url("/images/invite/recom-bg.png") no-repeat center center;
  background-size: 100% 100%;
  box-sizing: border-box;
  padding: 34px 40px 0;
}

.recom-con{
  width: 972px;
  background-color: #1b0a00;
  border: 3px solid #351b00;
  border-radius: 15px;
  height: 108px;
  box-sizing: border-box;
  padding-left: 22px;
  padding-right: 12px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  font-size: 40px;
}

.copy-btn{
  width: 233px;
  height: 78px;
  background: url("/images/invite/share_bg.png") no-repeat center center;
  background-size: 100% 100%;
  text-align: center;
  line-height: 78px;
  color: #140105;
  font-size: 40px;
  color: #1c0801;
  font-weight: bold;
}


.recom-section{
  background: url("/images/invite/big.png") no-repeat center center;
  background-size: 100% 100%;
  box-sizing: border-box;
  padding: 34px 40px 0;
}

.share_item_img{
  width: 147px;
  height: 141px;
  img{
    width: 100%;
    height: 100%;
  }
}
</style>