<!--
 * @Author: along longwang6@163.com
 * @Date: 2025-06-28 18:09:07
 * @LastEditors: along longwang6@163.com
 * @LastEditTime: 2025-07-04 17:27:50
 * @FilePath: /vue3_app/src/views/About.vue
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
-->
<template>
    <div>
        <h1 class="text-red">
            {{ t('about.title') }}: {{ t('common.sfc') }}
        </h1>
        <Foo1 />
        <Bar page="我也是来自tsx" />
        <div mt-10px>
            <van-button :loading="loading" type="primary" size="small" @click="handleDialog">
                {{ t('common.clickToOpen') }}
            </van-button>
        </div>
        <TheFooter />
    </div>
</template>

<script setup lang="ts">
import { useGlobal } from '@/composables'

defineOptions({
    name: 'About',
})

const { i18n } = useGlobal()
const { t } = i18n

useHead({
    // Can be static or computed
    title: t('about.title'),
    meta: [
        {
            name: 'description',
            content: t('about.title'),
        },
    ],
})

const Foo1 = defineAsyncComponent(() => import('../components/Foo').then(mod => mod.Foo))

const loading = ref(false)

function handleDialog() {
    showDialog({
        title: t('common.title'),
        message: t('about.dialogMessage'),
    }).then(() => {
        // on close
    })
}
</script>
