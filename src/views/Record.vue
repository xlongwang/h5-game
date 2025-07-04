<template>
    <div class="record_page text-[50px]">
        <header-back title="Historial de retiros" :has-back-icon="true" />
        <div class="record_content">
            <div class="record_content_title">
                <div v-for="item in titleList" :key="item" class="record_content_title_item">
                    {{ item }}
                </div>
            </div>
            <div v-if="list.length > 0" class="record_list">
                <div v-for="item in list" :key="item.id" class="record_item">
                    <div class="pr-[20px]">imya</div>
                    <div class="record_item_title_right flex items-center gap-[10px]">
                        <div class="record_item_title_right_top">{{ item?.amount }}</div>
                        <div class="record_item_title_right_top">{{ item?.updated_at }}</div>
                        <div class="record_item_title_right_bottom">{{ item?.time }}</div>
                    </div>
                </div>
            </div>
            <div v-else class="record_emtpy">Sin datos</div>
        </div>
        <div class="record_bt"></div>
    </div>
</template>

<script setup lang="ts">
import useUserStore from '@/stores/use-user-store'
import '@/assets/scss/pages/record.scss'

defineOptions({
    name: 'Record',
})

const userStore = useUserStore()

const titleList = ref(['Cantidad', 'Tiempo', 'Estado', 'Detalles'])
const recordList = ref<any[]>([])
const userInfo = computed(() => {
    return userStore.userInfo
})

async function getList() {
    // 获取提现订单列表
    const res = await userStore.fetchOrderList({
        genre: '2', // 2为提现
        page: '1',
        player_id: userInfo.value?.id?.toString() || '',
    })
    const list = res || []
    recordList.value = list
}

onMounted(() => {
    getList()
})

const list = ref<any[]>([
    // {
    //     title: 'Depósito',
    //     time: '2025-06-29 10:00:00',
    //     money: 100,
    // },
])
</script>
