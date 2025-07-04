<template>
    <div class="api-test">
        <h2>{{ t('apiTest.title') }}</h2>

        <div class="test-section">
            <h3>{{ t('apiTest.loginTest') }}</h3>
            <button :disabled="loading" @click="testLogin">
                {{ loading ? t('apiTest.testing') : t('apiTest.testLoginAPI') }}
            </button>
            <div v-if="loginResult" class="result">
                <h4>{{ t('apiTest.loginResult') }}:</h4>
                <pre>{{ JSON.stringify(loginResult, null, 2) }}</pre>
            </div>
        </div>

        <div class="test-section">
            <h3>{{ t('apiTest.userInfoTest') }}</h3>
            <button :disabled="loading" @click="testUserInfo">
                {{ loading ? t('apiTest.testing') : t('apiTest.testUserInfoAPI') }}
            </button>
            <div v-if="userInfoResult" class="result">
                <h4>{{ t('apiTest.userInfoResult') }}:</h4>
                <pre>{{ JSON.stringify(userInfoResult, null, 2) }}</pre>
            </div>
        </div>

        <div class="test-section">
            <h3>{{ t('apiTest.environmentInfo') }}</h3>
            <div class="env-info">
                <p><strong>{{ t('apiTest.currentEnvironment') }}:</strong> {{ currentEnv }}</p>
                <p><strong>{{ t('apiTest.apiBaseUrl') }}:</strong> {{ apiBaseUrl }}</p>
                <p><strong>{{ t('apiTest.deviceId') }}:</strong> {{ deviceId }}</p>
            </div>
        </div>

        <div class="test-section">
            <h3>{{ t('apiTest.storageInfo') }}</h3>
            <div class="storage-info">
                <p><strong>{{ t('apiTest.authInfo') }}:</strong> {{ authInfo ? t('apiTest.stored') : t('apiTest.notStored') }}</p>
                <p><strong>{{ t('apiTest.userInfo') }}:</strong> {{ userInfo ? t('apiTest.stored') : t('apiTest.notStored') }}</p>
                <button @click="clearStorage">{{ t('apiTest.clearStorage') }}</button>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
import { computed, ref } from 'vue'
import { userApi } from '@/api/user-api'
import { useGlobal } from '@/composables'
import { StorageUtil } from '@/utils/storage'

defineOptions({
    name: 'ApiTest',
})

const { userStore, i18n } = useGlobal()
const { t } = i18n

const loading = ref(false)
const loginResult = ref<any>(null)
const userInfoResult = ref<any>(null)

const currentEnv = computed(() => {
    return import.meta.env.VITE_APP_ENV
})

const apiBaseUrl = computed(() => {
    return import.meta.env.VITE_APP_ENV === 'development' ? 'http://localhost:7775/api' : 'https://mineadmin.thebbxxzm.top/api'
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

async function testLogin() {
    try {
        loading.value = true
        loginResult.value = null

        // 生成设备ID
        const deviceId = StorageUtil.generateDeviceId()
        console.log('使用设备ID:', deviceId)

        const result = await userApi.login({ device_id: deviceId })
        loginResult.value = result

        console.log('登录测试完成:', result)
    }
    catch (error: any) {
        console.error('登录测试失败:', error)
        loginResult.value = { error: error.message }
    }
    finally {
        loading.value = false
    }
}

async function testUserInfo() {
    try {
        loading.value = true
        userInfoResult.value = null

        // 从存储中获取用户ID，如果没有则使用默认值1进行测试
        const authInfo = StorageUtil.getAuthInfo()
        const memberId = authInfo?.user?.id || 1

        const result = await userApi.getMemberInfo({ memberId })
        userInfoResult.value = result

        console.log('用户信息测试完成:', result)
    }
    catch (error: any) {
        console.error('用户信息测试失败:', error)
        userInfoResult.value = { error: error.message }
    }
    finally {
        loading.value = false
    }
}

function clearStorage() {
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
