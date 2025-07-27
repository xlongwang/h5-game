<template>
    <div class="invite-page">
        <HeaderBack :has-back-icon="true" :title="t('invite.title')" />
        <div class="invite-header w-[1049px] mx-auto mb-[17px]">
            <img :src="inviteImg" class="w-[100%]">
            <div class="invite-txt text-[36px] text-[#f3d558]">{{ inviteTxt }}</div>
        </div>
        <div class="invite-mi w-[1049px] h-[477px] mx-auto">
            <div class="invite-mi-title font-bold text-[50px] pb-[30px]">{{ t('invite.myInvitation') }}</div>
            <div class="invite-mi-con">
                <div class="'invite-mi-hoy items-center flex h-[147px]">
                    <div class="invite-mi-hoy-title text-[60px] font-bold w-[175px]">{{ t('invite.today') }}</div>
                    <div class="invite-item flex flex-col w-[321px] mr-[51px]">
                        <div class="text-[45px] pb-[8px]">Registro</div>
                        <div class="text-[60px] font-bold">{{ invitationInfo?.today_number_of_invitations || 0 }}</div>
                    </div>
                    <div class="invite-item flex flex-col w-[407px]">
                        <div class="text-[45px] pb-[8px]">Premio</div>
                        <div class="text-[50px] font-bold">${{ formatNumber(Number(invitationInfo?.today_revenue) || 0) }}</div>
                    </div>
                </div>
                <div class="'invite-mi-todo mt-[20px] flex h-[147px]">
                    <div class="invite-mi-hoy-title text-[60px] font-bold w-[175px]">{{ t('invite.todo') }}</div>
                    <div class="invite-item flex flex-col w-[321px] mr-[51px]">
                        <div class="text-[45px] pb-[8px]">Registro</div>
                        <div class="text-[60px] font-bold">{{ invitationInfo?.total_number_of_invitations || 0 }}</div>
                    </div>
                    <div class="invite-item flex flex-col w-[407px]">
                        <div class="text-[45px] pb-[8px]">Premio</div>
                        <div class="text-[50px] font-bold">${{ formatNumber(Number(invitationInfo?.total_revenue) || 0) }}</div>
                    </div>
                </div>
            </div>
        </div>
        <!--
        <div class="recom-mi w-[1051px] h-[263px] mx-auto mt-[22px]">
            <div class="invite-mi-title font-bold text-[50px] pb-[30px]">{{ t('invite.myReward') }}</div>
            <div class="recom-con">
                <span>{{ t('invite.youWillReceive') }}</span>
                <span>0</span>
                <span class="text-[#9e6c15]">{{ t('invite.available') }}</span>
                <span>${{ formatNumber(0) }}</span>
                <div class="copy-btn">{{ t('activity.receive') }}</div>
            </div>
        </div> -->

        <div class="mt-[22px] recom-section w-[1051px] mx-auto">
            <div class="invite-mi-title font-bold text-[50px] pb-[30px]">
                {{ t('invite.shareSocialMedia') }}
            </div>
            <div class="recom-section-con flex justify-center gap-[20px] text-[28px] pb-[30px]">
                <div
                    v-for="item in shareList"
                    :key="item.title"
                    class="share_item flex flex-col items-center gap-[10px]"
                    @click="handleShare(item.title)"
                >
                    <div class="share_item_img">
                        <img :src="item.img" alt="">
                    </div>
                    <div class="share_item_title">
                        {{ item.title }}
                    </div>
                </div>
            </div>
            <div class="line-box"></div>
            <div class="text-[35px] text-[#bb7400] pt-[20px]">Comparte enlace con tus amigos.</div>
            <div class="invite_bt flex items-center justify-between">
                <div class="recom-con">
                    <van-field v-model="value" class="local_input" readonly placeholder="" />
                    <div class="copy-btn" @click="copy">{{ t('invite.copy') }}</div>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
import type { InvitationInfoData } from '@/types'
import { showFailToast, showSuccessToast } from 'vant'
import { userApi } from '@/api/user-api'
import { useGlobal } from '@/composables'
import useUserStore from '@/stores/use-user-store'
import { formatNumber } from '@/utils/tools'

defineOptions({
    name: 'InvitePage',
})

const { i18n } = useGlobal()
const { t } = i18n
const inviteImg = '/images/invite/banner.png'

const value = ref('')

const invitationInfo = ref<InvitationInfoData>()
const shareList = [
    {
        img: '/images/invite/a1.png',
        title: 'Mas',
    },
    {
        img: '/images/invite/a2.png',
        title: 'Facebook',
    },
    {
        img: '/images/invite/a3.png',
        title: 'whatapp',
    },
    {
        img: '/images/invite/a4.png',
        title: 'Telegram',
    },
    {
        img: '/images/invite/a5.png',
        title: 'Twitter',
    },
    {
        img: '/images/invite/a6.png',
        title: 'Instagram',
    },
]

async function copy() {
    try {
        if (navigator.clipboard && window.isSecureContext) {
            // 现代浏览器 + HTTPS
            await navigator.clipboard.writeText(value.value)
            showSuccessToast(t('invite.copied'))
        }
        else {
            // 降级方案
            const textArea = document.createElement('textarea')
            textArea.value = value.value
            textArea.style.position = 'fixed'
            textArea.style.left = '-999999px'
            textArea.style.top = '-999999px'
            document.body.appendChild(textArea)
            textArea.focus()
            textArea.select()

            try {
                document.execCommand('copy')
                showSuccessToast(t('invite.copied'))
            }
            catch (err) {
                console.log('err :>> ', err)
                showFailToast(t('invite.copyError'))
            }
            finally {
                document.body.removeChild(textArea)
            }
        }
    }
    catch (err) {
        console.log('err :>> ', err)
        showFailToast('Error al copiar')
    }
}

function handleShare(title: string) {
    const currentUrl = window.location.origin
    const shareText = `${t('invite.shareText')} ${currentUrl}`

    switch (title.toLowerCase()) {
        case 'facebook':
            shareToFacebook(currentUrl, shareText)
            break
        case 'whatapp':
            shareToWhatsApp(shareText)
            break
        case 'telegram':
            shareToTelegram(shareText)
            break
        case 'twitter':
            shareToTwitter(shareText)
            break
        case 'instagram':
            shareToInstagram(currentUrl)
            break
        case 'mas':
        default:
            // 通用分享，复制到剪贴板
            copyToClipboard(currentUrl)
            break
    }
}

function shareToFacebook(url: string, text: string) {
    const shareUrl = `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(url)}&quote=${encodeURIComponent(text)}`
    openShareWindow(shareUrl, 'Facebook')
}

function shareToWhatsApp(text: string) {
    const shareUrl = `https://wa.me/?text=${encodeURIComponent(text)}`
    openShareWindow(shareUrl, 'WhatsApp')
}

function shareToTelegram(text: string) {
    const shareUrl = `https://t.me/share/url?url=${encodeURIComponent(window.location.origin)}&text=${encodeURIComponent(text)}`
    openShareWindow(shareUrl, 'Telegram')
}

function shareToTwitter(text: string) {
    const shareUrl = `https://twitter.com/intent/tweet?text=${encodeURIComponent(text)}`
    openShareWindow(shareUrl, 'Twitter')
}

function shareToInstagram(url: string) {
    // Instagram不支持直接分享链接，提示用户手动复制
    copyToClipboard(url)
    showSuccessToast('Enlace copiado para Instagram')
}

const userStore = useUserStore()

const userInfo = computed(() => {
    return userStore.userInfo
})

const inviteTxt = computed(() => `i Invita a los usuarios a registrarse y obtén una recompensa en efectivo de $${(userInfo.value?.invitation_reward || 0).toFixed(2)}`)

async function getInvitationInfo() {
    const res = await userApi.getInvitationInfo({
        player_id: String(userInfo.value?.id || 0),
    })
    console.log('res :>> ', res)
    invitationInfo.value = res?.data
}

onMounted(() => {
    getInvitationInfo()
})

function openShareWindow(url: string, platform: string) {
    const width = 600
    const height = 400
    const left = (window.screen.width - width) / 2
    const top = (window.screen.height - height) / 2

    const shareWindow = window.open(
        url,
        `${platform}Share`,
        `width=${width},height=${height},left=${left},top=${top},scrollbars=yes,resizable=yes`,
    )

    if (shareWindow) {
        showSuccessToast(`Compartiendo en ${platform}`)
    }
    else {
        showFailToast('Error al abrir ventana de compartir')
    }
}

async function copyToClipboard(text: string) {
    try {
        if (navigator.clipboard && window.isSecureContext) {
            await navigator.clipboard.writeText(text)
            showSuccessToast('Enlace copiado al portapapeles')
        }
        else {
            // 降级方案
            const textArea = document.createElement('textarea')
            textArea.value = text
            textArea.style.position = 'fixed'
            textArea.style.left = '-999999px'
            textArea.style.top = '-999999px'
            document.body.appendChild(textArea)
            textArea.focus()
            textArea.select()

            try {
                document.execCommand('copy')
                showSuccessToast('Enlace copiado al portapapeles')
            }
            catch (err) {
                console.log('err :>> ', err)
                showFailToast('Error al copiar')
            }
            finally {
                document.body.removeChild(textArea)
            }
        }
    }
    catch (err) {
        console.log('err :>> ', err)
        showFailToast('Error al copiar')
    }
}

onMounted(() => {
    value.value = `${window.location.origin}/?ref=${userInfo.value?.id}`
})
</script>

<style lang="scss" scoped>
.invite-page {
  padding: 0 10px 300px;
}

.invite-header{
    position: relative;
    .invite-txt{
        position: absolute;
        top: 300px;
        left: 0;
        width: 413px;
        left: 42px;
    }
}

.local_input {
  background-color: transparent;
  border: none;
  font-size: 40px;
  text-align: center;
  width: 100%;
  height: 100%;
  padding: 0;
  padding-top: 13px;
  color: #9e6c15;
}

:deep(.van-cell:after) {
  display: none;
  padding: 0;
}

:deep(.van-field__control) {
  color: #9e6c15;
}

.invite_bt {
  position: relative;
  top: 15px;
}

.invite-mi {
  background: url("/images/invite/mi_bg.png") no-repeat center center;
  background-size: 100% 100%;
  padding: 34px 40px 0;
  box-sizing: border-box;
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

.recom-con {
  width: 972px;
  background-color: #1b0a00;
  border: 3px solid #351b00;
  border-radius: 14px;
  height: 108px;
  box-sizing: border-box;
  padding-left: 22px;
  padding-right: 12px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  font-size: 40px;
}

.copy-btn {
  display: inline-block;
  padding: 0 20px;
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

.recom-section {
  border: 20px solid transparent;
  border-radius: 20px;
  border-image: url("/images/invite/big.png") 20 fill stretch;
  box-sizing: border-box;
  padding: 34px 40px 50px;
  min-height: 457px;
}

.share_item_img {
  width: 147px;
  height: 141px;
  img {
    width: 100%;
    height: 100%;
  }
}

.line-box{
    height: 3px;
    width: 981px;
    margin: 0 auto;
    background-color: #693b00;
}
</style>
