<template>
    <div class="user-info">
        <div v-if="userStore.loading" class="loading">
            加载中...
        </div>
        
        <div v-else-if="userStore.error" class="error">
            {{ userStore.error }}
        </div>
        
        <div v-else-if="userStore.userInfo" class="user-details">
            <div class="user-header">
                <h3>用户信息</h3>
                <span class="status" :class="{ active: userStore.userInfo.status === 1 }">
                    {{ userStore.userInfo.status === 1 ? '正常' : '禁用' }}
                </span>
            </div>
            
            <div class="user-basic">
                <p><strong>用户名:</strong> {{ userStore.userInfo.user_name }}</p>
                <p><strong>设备ID:</strong> {{ userStore.userInfo.device_id }}</p>
                <p><strong>注册时间:</strong> {{ formatDate(userStore.userInfo.created_at) }}</p>
            </div>
            
            <div class="wallet-info">
                <h4>钱包信息</h4>
                <div class="wallet-grid">
                    <div class="wallet-item">
                        <span class="label">余额</span>
                        <span class="value">${{ userStore.getUserBalance }}</span>
                    </div>
                    <div class="wallet-item">
                        <span class="label">奖金</span>
                        <span class="value">${{ userStore.getUserBonus }}</span>
                    </div>
                    <div class="wallet-item">
                        <span class="label">总投注</span>
                        <span class="value">${{ userStore.getUserTotalBet }}</span>
                    </div>
                    <div class="wallet-item">
                        <span class="label">总充值</span>
                        <span class="value">${{ userStore.getUserTotalCharge }}</span>
                    </div>
                </div>
            </div>
            
            <div class="wallet-logs" v-if="userStore.userInfo.wallet_logs.length > 0">
                <h4>钱包记录 (最近{{ userStore.userInfo.wallet_logs.length }}条)</h4>
                <div class="log-list">
                    <div 
                        v-for="log in userStore.userInfo.wallet_logs.slice(0, 5)" 
                        :key="log.id" 
                        class="log-item"
                    >
                        <div class="log-info">
                            <span class="reason">{{ log.reason }}</span>
                            <span class="game">{{ log.game }}</span>
                        </div>
                        <div class="log-amount">
                            <span class="change" :class="{ positive: parseFloat(log.change) > 0 }">
                                {{ parseFloat(log.change) > 0 ? '+' : '' }}${{ log.change }}
                            </span>
                        </div>
                        <div class="log-time">{{ formatDate(log.created_at) }}</div>
                    </div>
                </div>
            </div>
        </div>
        
        <div v-else class="no-data">
            暂无用户信息
        </div>
    </div>
</template>

<script setup lang="ts">
import { useGlobal } from '@/composables'

defineOptions({
    name: 'UserInfo',
})

const { userStore } = useGlobal()

/**
 * 格式化日期
 */
const formatDate = (dateString: string) => {
    const date = new Date(dateString)
    return date.toLocaleString('zh-CN', {
        year: 'numeric',
        month: '2-digit',
        day: '2-digit',
        hour: '2-digit',
        minute: '2-digit'
    })
}
</script>

<style scoped lang="scss">
.user-info {
    padding: 20px;
    background: #1a1a1a;
    border-radius: 12px;
    color: #fff;
    
    .loading, .error, .no-data {
        text-align: center;
        padding: 40px 20px;
        color: #a3a3a3;
    }
    
    .error {
        color: #ff6b6b;
    }
    
    .user-details {
        .user-header {
            display: flex;
            justify-content: space-between;
            align-items: center;
            margin-bottom: 20px;
            padding-bottom: 15px;
            border-bottom: 1px solid #333;
            
            h3 {
                margin: 0;
                color: #ffd700;
                font-size: 18px;
            }
            
            .status {
                padding: 4px 12px;
                border-radius: 20px;
                font-size: 12px;
                background: #ff6b6b;
                color: #fff;
                
                &.active {
                    background: #51cf66;
                }
            }
        }
        
        .user-basic {
            margin-bottom: 25px;
            
            p {
                margin: 8px 0;
                font-size: 14px;
                
                strong {
                    color: #ffd700;
                    margin-right: 8px;
                }
            }
        }
        
        .wallet-info {
            margin-bottom: 25px;
            
            h4 {
                color: #ffd700;
                margin-bottom: 15px;
                font-size: 16px;
            }
            
            .wallet-grid {
                display: grid;
                grid-template-columns: repeat(2, 1fr);
                gap: 15px;
                
                .wallet-item {
                    background: #2a2a2a;
                    padding: 15px;
                    border-radius: 8px;
                    text-align: center;
                    
                    .label {
                        display: block;
                        color: #a3a3a3;
                        font-size: 12px;
                        margin-bottom: 5px;
                    }
                    
                    .value {
                        display: block;
                        color: #ffd700;
                        font-size: 18px;
                        font-weight: bold;
                    }
                }
            }
        }
        
        .wallet-logs {
            h4 {
                color: #ffd700;
                margin-bottom: 15px;
                font-size: 16px;
            }
            
            .log-list {
                .log-item {
                    display: flex;
                    justify-content: space-between;
                    align-items: center;
                    padding: 12px;
                    margin-bottom: 8px;
                    background: #2a2a2a;
                    border-radius: 6px;
                    
                    .log-info {
                        flex: 1;
                        
                        .reason {
                            display: block;
                            color: #fff;
                            font-size: 14px;
                            margin-bottom: 4px;
                        }
                        
                        .game {
                            color: #a3a3a3;
                            font-size: 12px;
                        }
                    }
                    
                    .log-amount {
                        margin: 0 15px;
                        
                        .change {
                            font-size: 16px;
                            font-weight: bold;
                            color: #ff6b6b;
                            
                            &.positive {
                                color: #51cf66;
                            }
                        }
                    }
                    
                    .log-time {
                        color: #a3a3a3;
                        font-size: 12px;
                        min-width: 80px;
                        text-align: right;
                    }
                }
            }
        }
    }
}
</style> 