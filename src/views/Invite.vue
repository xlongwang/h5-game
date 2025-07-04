<template>
    <div class="invite-page">
        <HeaderBack :has-back-icon="true" title="Invitar" />
        <div class="invite-header w-[1051px] h-[389px] mx-auto mb-[17px]">
            <img :src="inviteImg" class="w-[100%] h-[100%]">
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
                <div class="copy-btn">Recibir</div>
            </div>
        </div>

        <div class="mt-[22px] recom-section w-[1051px] mx-auto">
            <div class="invite-mi-title font-bold text-[50px] pb-[30px]">
                Comparte en tus redes sociales
            </div>
            <div class="recom-section-con flex justify-center gap-[20px] text-[28px] pb-[10px]">
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
            <div class="invite_bt flex items-center justify-between pt-[40px]">
                <div class="recom-con">
                    <van-field v-model="value" class="local_input" readonly placeholder="" />
                    <div class="copy-btn" @click="copy">Copiar</div>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
import { showFailToast, showSuccessToast } from 'vant'
import { formatNumber } from '@/utils/tools'

defineOptions({
    name: 'InvitePage',
})
const inviteImg = '/images/invite/banner.png'

const value = ref('')

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
            showSuccessToast('Copiado exitosamente')
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
                showSuccessToast('Copiado exitosamente')
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

function handleShare(title: string) {
    const currentUrl = window.location.origin
    const shareText = `¡Únete a nosotros! ${currentUrl}`

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
    value.value = window.location.origin
})
</script>

<style lang="scss" scoped>
.invite-page {
  padding: 0 10px 300px;
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
  top: 29px;
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

.recom-con {
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

.copy-btn {
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
</style>
