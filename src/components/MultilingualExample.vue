<template>
    <div class="multilingual-example">
        <div class="example-card">
            <h2>{{ t('settings.title') }}</h2>

            <!-- 语言切换器 -->
            <div class="language-section">
                <h3>{{ t('settings.language') }}</h3>
                <LanguageSwitcher />
            </div>

            <!-- 用户信息示例 -->
            <div class="user-info-section">
                <h3>{{ t('user.balance') }}</h3>
                <div class="balance-display">
                    <span class="currency">{{ formatCurrency(userBalance, 'USD') }}</span>
                    <span class="bonus">+ {{ formatCurrency(userBonus, 'USD') }} {{ t('user.bonus') }}</span>
                </div>
            </div>

            <!-- 游戏状态示例 -->
            <div class="game-status-section">
                <h3>{{ t('game.status') }}</h3>
                <div class="status-items">
                    <div class="status-item">
                        <span class="label">{{ t('game.bet') }}:</span>
                        <span class="value">{{ formatNumber(totalBet) }}</span>
                    </div>
                    <div class="status-item">
                        <span class="label">{{ t('game.win') }}:</span>
                        <span class="value win">{{ formatNumber(totalWin) }}</span>
                    </div>
                </div>
            </div>

            <!-- 操作按钮示例 -->
            <div class="action-buttons">
                <button class="btn btn-primary" @click="handleDeposit">
                    {{ t('finance.deposit') }}
                </button>
                <button class="btn btn-secondary" @click="handleWithdraw">
                    {{ t('finance.withdraw') }}
                </button>
                <button class="btn btn-success" @click="handlePlay">
                    {{ t('game.play') }}
                </button>
            </div>

            <!-- 消息示例 -->
            <div class="messages-section">
                <div class="message success">
                    {{ t('common.success') }}: {{ t('auth.loginSuccess') }}
                </div>
                <div class="message error">
                    {{ t('common.error') }}: {{ t('errors.networkError') }}
                </div>
                <div class="message info">
                    {{ t('common.loading') }}: {{ t('auth.gettingUserInfo') }}
                </div>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { useGlobal } from '@/composables'

defineOptions({
    name: 'MultilingualExample',
})

const { i18n } = useGlobal()

const {
    t,
    formatNumber,
    formatCurrency,
} = i18n

// 模拟数据
const userBalance = ref(1234.56)
const userBonus = ref(100.00)
const totalBet = ref(5000)
const totalWin = ref(7500)

// 处理函数
function handleDeposit() {
    console.log(t('finance.deposit'))
}

function handleWithdraw() {
    console.log(t('finance.withdraw'))
}

function handlePlay() {
    console.log(t('game.play'))
}
</script>

<style scoped lang="scss">
.multilingual-example {
  padding: 20px;
  max-width: 600px;
  margin: 0 auto;
}

.example-card {
  background: rgba(26, 26, 26, 0.9);
  border-radius: 12px;
  padding: 24px;
  border: 1px solid rgba(255, 255, 255, 0.1);
  backdrop-filter: blur(10px);
}

h2 {
  color: #ffd700;
  font-size: 1.8rem;
  margin-bottom: 24px;
  text-align: center;
}

h3 {
  color: #ffd700;
  font-size: 1.2rem;
  margin-bottom: 12px;
}

.language-section {
  margin-bottom: 24px;
  padding: 16px;
  background: rgba(255, 255, 255, 0.05);
  border-radius: 8px;
}

.user-info-section {
  margin-bottom: 24px;
  padding: 16px;
  background: rgba(255, 255, 255, 0.05);
  border-radius: 8px;

  .balance-display {
    display: flex;
    flex-direction: column;
    gap: 8px;

    .currency {
      font-size: 1.5rem;
      font-weight: bold;
      color: #ffd700;
    }

    .bonus {
      font-size: 1rem;
      color: #4caf50;
    }
  }
}

.game-status-section {
  margin-bottom: 24px;
  padding: 16px;
  background: rgba(255, 255, 255, 0.05);
  border-radius: 8px;

  .status-items {
    display: flex;
    flex-direction: column;
    gap: 8px;
  }

  .status-item {
    display: flex;
    justify-content: space-between;
    align-items: center;

    .label {
      color: #fff;
      font-weight: 500;
    }

    .value {
      color: #ffd700;
      font-weight: bold;

      &.win {
        color: #4caf50;
      }
    }
  }
}

.action-buttons {
  display: flex;
  gap: 12px;
  margin-bottom: 24px;
  flex-wrap: wrap;

  .btn {
    padding: 12px 20px;
    border: none;
    border-radius: 6px;
    font-weight: 500;
    cursor: pointer;
    transition: all 0.3s ease;
    flex: 1;
    min-width: 120px;

    &:hover {
      transform: translateY(-2px);
    }

    &.btn-primary {
      background: #ffd700;
      color: #1a1a1a;

      &:hover {
        background: #ffed4e;
      }
    }

    &.btn-secondary {
      background: rgba(255, 255, 255, 0.1);
      color: #fff;
      border: 1px solid rgba(255, 255, 255, 0.2);

      &:hover {
        background: rgba(255, 255, 255, 0.15);
      }
    }

    &.btn-success {
      background: #4caf50;
      color: #fff;

      &:hover {
        background: #45a049;
      }
    }
  }
}

.messages-section {
  display: flex;
  flex-direction: column;
  gap: 12px;

  .message {
    padding: 12px;
    border-radius: 6px;
    font-weight: 500;

    &.success {
      background: rgba(76, 175, 80, 0.2);
      color: #4caf50;
      border: 1px solid rgba(76, 175, 80, 0.3);
    }

    &.error {
      background: rgba(244, 67, 54, 0.2);
      color: #f44336;
      border: 1px solid rgba(244, 67, 54, 0.3);
    }

    &.info {
      background: rgba(33, 150, 243, 0.2);
      color: #2196f3;
      border: 1px solid rgba(33, 150, 243, 0.3);
    }
  }
}
</style>
