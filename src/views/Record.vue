<template>
    <div class="record_page text-[50px]">
        <header-back />
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
                        <div class="record_item_title_right_top">{{ item.title }}</div>
                        <div class="record_item_title_right_bottom">{{ item.time }}</div>
                    </div>
                </div>
            </div>
            <div v-else class="record_emtpy">Sin datos</div>
        </div>
        <div class="record_bt"></div>
       
    </div>
</template>

<script setup lang="ts">
import '@/assets/scss/pages/record.scss'

defineOptions({
    name: 'Record',
})

const titleList = ref(['Cantidad', 'Tiempo', 'Estado', 'Detalles'])

const list = ref([
    // {
    //     title: 'Depósito',
    //     time: '2025-06-29 10:00:00',
    //     money: 100,
    // },
])
</script>
