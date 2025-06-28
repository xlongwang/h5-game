<template>
    <div class="login-status">
        <div v-if="userStore.loading" class="loading">
            <span>登录中...</span>
        </div>
        
        <div v-else-if="userStore.isLoggedIn" class="logged-in">
            <div class="user-brief">
                <span class="username">{{ userStore.authInfo?.user.user_name }}</span>
                <span class="balance">余额: ${{ userStore.getUserBalance }}</span>
            </div>
            <button class="logout-btn" @click="handleLogout">登出</button>
        </div>
        
        <div v-else class="not-logged-in">
            <span class="status-text">未登录</span>
            <button class="login-btn" @click="handleLogin">无感登录</button>
        </div>
        
        <div v-if="userStore.error" class="error">
            {{ userStore.error }}
        </div>
    </div>
</template>

<script setup lang="ts">
import { useGlobal } from '@/composables'

defineOptions({
    name: 'LoginStatus',
})

const { userStore } = useGlobal()

/**
 * 处理登录
 */
const handleLogin = async () => {
    try {
        await userStore.login()
        console.log('手动登录成功')
    } catch (error) {
        console.error('手动登录失败:', error)
    }
}

/**
 * 处理登出
 */
const handleLogout = () => {
    userStore.logout()
    console.log('用户已登出')
}
</script>

<style scoped lang="scss">
.login-status {
    padding: 15px;
    background: #2a2a2a;
    border-radius: 8px;
    color: #fff;
    margin-bottom: 20px;
    
    .loading {
        text-align: center;
        color: #ffd700;
        font-size: 14px;
    }
    
    .logged-in {
        display: flex;
        justify-content: space-between;
        align-items: center;
        
        .user-brief {
            display: flex;
            flex-direction: column;
            gap: 5px;
            
            .username {
                color: #ffd700;
                font-weight: bold;
                font-size: 16px;
            }
            
            .balance {
                color: #51cf66;
                font-size: 14px;
            }
        }
        
        .logout-btn {
            background: #ff6b6b;
            color: #fff;
            border: none;
            padding: 8px 16px;
            border-radius: 6px;
            cursor: pointer;
            font-size: 12px;
            transition: background 0.3s;
            
            &:hover {
                background: #ff5252;
            }
        }
    }
    
    .not-logged-in {
        display: flex;
        justify-content: space-between;
        align-items: center;
        
        .status-text {
            color: #a3a3a3;
            font-size: 14px;
        }
        
        .login-btn {
            background: #51cf66;
            color: #fff;
            border: none;
            padding: 8px 16px;
            border-radius: 6px;
            cursor: pointer;
            font-size: 12px;
            transition: background 0.3s;
            
            &:hover {
                background: #40c057;
            }
        }
    }
    
    .error {
        margin-top: 10px;
        padding: 8px;
        background: rgba(255, 107, 107, 0.1);
        border: 1px solid #ff6b6b;
        border-radius: 4px;
        color: #ff6b6b;
        font-size: 12px;
        text-align: center;
    }
}
</style> 