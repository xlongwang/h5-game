<template>
    <div class="api-test">
        <h2>API测试页面</h2>
        
        <div class="test-section">
            <h3>登录测试</h3>
            <button @click="testLogin" :disabled="loading">
                {{ loading ? '测试中...' : '测试登录API' }}
            </button>
            <div v-if="loginResult" class="result">
                <h4>登录结果:</h4>
                <pre>{{ JSON.stringify(loginResult, null, 2) }}</pre>
            </div>
        </div>
        
        <div class="test-section">
            <h3>用户信息测试</h3>
            <button @click="testUserInfo" :disabled="loading">
                {{ loading ? '测试中...' : '测试用户信息API' }}
            </button>
            <div v-if="userInfoResult" class="result">
                <h4>用户信息结果:</h4>
                <pre>{{ JSON.stringify(userInfoResult, null, 2) }}</pre>
            </div>
        </div>
        
        <div class="test-section">
            <h3>环境信息</h3>
            <div class="env-info">
                <p><strong>当前环境:</strong> {{ currentEnv }}</p>
                <p><strong>API基础URL:</strong> {{ apiBaseUrl }}</p>
                <p><strong>设备ID:</strong> {{ deviceId }}</p>
            </div>
        </div>
        
        <div class="test-section">
            <h3>存储信息</h3>
            <div class="storage-info">
                <p><strong>认证信息:</strong> {{ authInfo ? '已存储' : '未存储' }}</p>
                <p><strong>用户信息:</strong> {{ userInfo ? '已存储' : '未存储' }}</p>
                <button @click="clearStorage">清除存储</button>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'
import { useGlobal } from '@/composables'
import { userApi } from '@/api/user-api'
import { StorageUtil } from '@/utils/storage'

defineOptions({
    name: 'ApiTest',
})

const { userStore } = useGlobal()

const loading = ref(false)
const loginResult = ref<any>(null)
const userInfoResult = ref<any>(null)

const currentEnv = computed(() => {
    return import.meta.env.VITE_APP_ENV
})

const apiBaseUrl = computed(() => {
    return import.meta.env.VITE_APP_ENV === 'development' 
        ? 'http://localhost:7775/api' 
        : 'https://mineadmin.thebbxxzm.top/api'
})

const deviceId = computed(() => {
    return StorageUtil.getDeviceId() || '未生成'
})

const authInfo = computed(() => {
    return StorageUtil.getAuthInfo()
})

const userInfo = computed(() => {
    return StorageUtil.getUserInfo()
})

const testLogin = async () => {
    try {
        loading.value = true
        loginResult.value = null
        
        // 生成设备ID
        const deviceId = StorageUtil.generateDeviceId()
        console.log('使用设备ID:', deviceId)
        
        const result = await userApi.login({ device_id: deviceId })
        loginResult.value = result
        
        console.log('登录测试完成:', result)
    } catch (error: any) {
        console.error('登录测试失败:', error)
        loginResult.value = { error: error.message }
    } finally {
        loading.value = false
    }
}

const testUserInfo = async () => {
    try {
        loading.value = true
        userInfoResult.value = null
        
        // 从存储中获取用户ID，如果没有则使用默认值1进行测试
        const authInfo = StorageUtil.getAuthInfo()
        const memberId = authInfo?.user?.id || 1
        
        const result = await userApi.getMemberInfo({ memberId })
        userInfoResult.value = result
        
        console.log('用户信息测试完成:', result)
    } catch (error: any) {
        console.error('用户信息测试失败:', error)
        userInfoResult.value = { error: error.message }
    } finally {
        loading.value = false
    }
}

const clearStorage = () => {
    StorageUtil.clearAllUserData()
    console.log('存储已清除')
}
</script>

<style scoped lang="scss">
.api-test {
    padding: 20px;
    max-width: 800px;
    margin: 0 auto;
    
    h2 {
        color: #ffd700;
        margin-bottom: 30px;
    }
    
    .test-section {
        margin-bottom: 30px;
        padding: 20px;
        background: #2a2a2a;
        border-radius: 8px;
        
        h3 {
            color: #ffd700;
            margin-bottom: 15px;
        }
        
        button {
            background: #51cf66;
            color: #fff;
            border: none;
            padding: 10px 20px;
            border-radius: 6px;
            cursor: pointer;
            font-size: 14px;
            margin-bottom: 15px;
            
            &:disabled {
                background: #666;
                cursor: not-allowed;
            }
            
            &:hover:not(:disabled) {
                background: #40c057;
            }
        }
        
        .result {
            background: #1a1a1a;
            padding: 15px;
            border-radius: 6px;
            margin-top: 15px;
            
            h4 {
                color: #ffd700;
                margin-bottom: 10px;
            }
            
            pre {
                color: #fff;
                font-size: 12px;
                white-space: pre-wrap;
                word-break: break-all;
            }
        }
        
        .env-info, .storage-info {
            p {
                margin: 8px 0;
                color: #fff;
                
                strong {
                    color: #ffd700;
                }
            }
        }
    }
}
</style> 