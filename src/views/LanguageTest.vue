<template>
    <div class="language-test">
        <div class="container_box">
            <h1>{{ t("settings.title") }}</h1>

            <!-- 语言切换器 -->
            <div class="language-section">
                <h2>{{ t("settings.language") }}</h2>
                <LanguageSwitcher />
            </div>

            <!-- 当前语言信息 -->
            <div class="current-language-info">
                <h3>当前语言信息</h3>
                <p><strong>语言代码:</strong> {{ currentLocale }}</p>
                <p><strong>语言名称:</strong> {{ getCurrentLanguageName() }}</p>
                <p><strong>国旗:</strong> {{ getCurrentLanguageFlag() }}</p>
            </div>

            <!-- 多语言文本示例 -->
            <div class="text-examples">
                <h3>文本示例</h3>

                <div class="example-section">
                    <h4>通用文本</h4>
                    <p>{{ t("common.loading") }}</p>
                    <p>{{ t("common.success") }}</p>
                    <p>{{ t("common.error") }}</p>
                </div>

                <div class="example-section">
                    <h4>导航文本</h4>
                    <p>{{ t("nav.casino") }}</p>
                    <p>{{ t("nav.promotion") }}</p>
                    <p>{{ t("nav.withdraw") }}</p>
                    <p>{{ t("nav.support") }}</p>
                    <p>{{ t("nav.profile") }}</p>
                </div>

                <div class="example-section">
                    <h4>用户信息</h4>
                    <p>{{ t("user.balance") }}</p>
                    <p>{{ t("user.points") }}</p>
                    <p>{{ t("user.level") }}</p>
                </div>

                <div class="example-section">
                    <h4>财务相关</h4>
                    <p>{{ t("finance.deposit") }}</p>
                    <p>{{ t("finance.withdraw") }}</p>
                    <p>{{ t("finance.amount") }}</p>
                </div>
            </div>

            <!-- 格式化示例 -->
            <div class="formatting-examples">
                <h3>格式化示例</h3>

                <div class="example-section">
                    <h4>数字格式化</h4>
                    <p>1234.56 → {{ formatNumber(1234.56) }}</p>
                    <p>1000000 → {{ formatNumber(1000000) }}</p>
                </div>

                <div class="example-section">
                    <h4>日期格式化</h4>
                    <p>{{ formatDate(new Date()) }}</p>
                    <p>
                        {{
                            formatDate(new Date(), { year: "numeric", month: "long", day: "numeric" })
                        }}
                    </p>
                </div>

                <div class="example-section">
                    <h4>货币格式化</h4>
                    <p>USD: {{ formatCurrency(1234.56, "USD") }}</p>
                    <p>EUR: {{ formatCurrency(1234.56, "EUR") }}</p>
                    <p>CNY: {{ formatCurrency(1234.56, "CNY") }}</p>
                </div>
            </div>

            <!-- 支持的语言列表 -->
            <div class="supported-languages">
                <h3>支持的语言</h3>
                <div class="language-list">
                    <div
                        v-for="locale in locales"
                        :key="locale.code"
                        class="language-item"
                        :class="{ active: currentLocale === locale.code }"
                        @click="changeLanguage(locale.code)"
                    >
                        <span class="flag">{{ locale.flag }}</span>
                        <span class="name">{{ locale.name }}</span>
                        <span class="code">{{ locale.code }}</span>
                        <span v-if="currentLocale === locale.code" class="current-indicator">当前</span>
                    </div>
                </div>
            </div>

            <!-- 葡萄牙语差异对比 -->
            <div class="portuguese-comparison">
                <h3>葡萄牙语差异对比</h3>
                <div class="comparison-grid">
                    <div class="comparison-item">
                        <h4>🇧🇷 巴西葡萄牙语 (pt-BR)</h4>
                        <div class="example-text">
                            <p><strong>保存:</strong> Salvar</p>
                            <p><strong>删除:</strong> Excluir</p>
                            <p><strong>提现:</strong> Sacar</p>
                            <p><strong>支持:</strong> Suporte</p>
                            <p><strong>用户名:</strong> Nome de Usuário</p>
                            <p><strong>密码:</strong> Senha</p>
                        </div>
                    </div>
                    <div class="comparison-item">
                        <h4>🇵🇹 葡萄牙葡萄牙语 (pt-PT)</h4>
                        <div class="example-text">
                            <p><strong>保存:</strong> Guardar</p>
                            <p><strong>删除:</strong> Eliminar</p>
                            <p><strong>提现:</strong> Levantar</p>
                            <p><strong>支持:</strong> Apoio</p>
                            <p><strong>用户名:</strong> Nome de Utilizador</p>
                            <p><strong>密码:</strong> Palavra-passe</p>
                        </div>
                    </div>
                </div>
            </div>

            <!-- 语言检测功能 -->
            <div class="language-detection">
                <h3>语言检测功能</h3>
                <div class="detection-info">
                    <p><strong>检测到的语言:</strong> {{ detectUserLanguage() }}</p>
                    <p><strong>当前语言:</strong> {{ currentLocale }}</p>
                    <p><strong>是否为葡萄牙语变体:</strong> {{ isPortugueseVariant(currentLocale) ? '是' : '否' }}</p>
                    <p v-if="isPortugueseVariant(currentLocale)">
                        <strong>葡萄牙语变体:</strong> {{ getPortugueseVariantName(currentLocale) }}
                    </p>
                </div>
            </div>

            <!-- 相对时间格式化 -->
            <div class="relative-time-examples">
                <h3>相对时间格式化</h3>
                <div class="example-section">
                    <p>30秒前: {{ formatRelativeTime(new Date(Date.now() - 30000)) }}</p>
                    <p>5分钟前: {{ formatRelativeTime(new Date(Date.now() - 300000)) }}</p>
                    <p>2小时前: {{ formatRelativeTime(new Date(Date.now() - 7200000)) }}</p>
                    <p>3天前: {{ formatRelativeTime(new Date(Date.now() - 259200000)) }}</p>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
// import LanguageSwitcher from '@/components/LanguageSwitcher.vue'
import { useGlobal } from '@/composables'

defineOptions({
    name: 'LanguageTest',
})

const { i18n } = useGlobal()

const {
    t,
    currentLocale,
    locales,
    changeLanguage,
    getCurrentLanguageName,
    getCurrentLanguageFlag,
    formatNumber,
    formatDate,
    formatCurrency,
    detectUserLanguage,
    isPortugueseVariant,
    getPortugueseVariantName,
    formatRelativeTime,
} = i18n
</script>

<style scoped lang="scss">
 h3{
  font-size: 60px;
 }
 h1, h4{
  font-size: 50px;
 }
.language-test {
  min-height: 100vh;
  background: linear-gradient(135deg, #1a1a1a 0%, #2d2d2d 100%);
  color: #fff;
  padding: 20px;
}

.container_box {
  width: 1080px;
  box-sizing: border-box;
  margin: 0 auto;
  padding: 20px;
}

h1 {
  text-align: center;
  color: #ffd700;
  font-size: 60px;
  margin-bottom: 40px;
  text-shadow: 0 2px 4px rgba(0, 0, 0, 0.3);
}

h2,
h3,
h4 {
  color: #ffd700;
  margin-bottom: 15px;
}

.language-section {
  background: rgba(255, 255, 255, 0.05);
  font-size: 50px;
  padding: 20px;
  border-radius: 12px;
  margin-bottom: 30px;
  border: 3px solid rgba(255, 255, 255, 0.1);
  h2{
    font-size: 50px;
  }
  span{
    font-size: 45px;
  }
}

.current-language-info {
  background: rgba(255, 255, 255, 0.05);
  padding: 20px;
  border-radius: 12px;
  margin-bottom: 30px;
  border: 1px solid rgba(255, 255, 255, 0.1);

  p {
    margin: 8px 0;
    font-size: 50px;
  }

  span{
    font-size: 40px;
  }
}

.text-examples,
.formatting-examples {
  background: rgba(255, 255, 255, 0.05);
  padding: 20px;
  border-radius: 12px;
  margin-bottom: 30px;
  border: 1px solid rgba(255, 255, 255, 0.1);
}

.example-section {
  margin-bottom: 20px;

  h4 {
    color: #ffd700;
    margin-bottom: 10px;
  }

  p {
    margin: 5px 0;
    padding: 8px 12px;
    background: rgba(255, 255, 255, 0.1);
    border-radius: 6px;
    font-size: 40px;
  }
}

.supported-languages {
  background: rgba(255, 255, 255, 0.05);
  padding: 20px;
  border-radius: 12px;
  border: 1px solid rgba(255, 255, 255, 0.1);
}

.language-list {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 15px;
}

.language-item {
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 15px;
  background: rgba(255, 255, 255, 0.1);
  border-radius: 8px;
  cursor: pointer;
  transition: all 0.3s ease;
  border: 1px solid rgba(255, 255, 255, 0.1);

  &:hover {
    background: rgba(255, 255, 255, 0.15);
    transform: translateY(-2px);
  }

  &.active {
    background: rgba(255, 215, 0, 0.2);
    border-color: #ffd700;
    color: #ffd700;
  }

  .name {
    flex: 1;
    font-weight: 500;
    font-size: 40px;
  }

  .code {
    opacity: 0.7;
    text-transform: uppercase;
  }
}

.portuguese-comparison {
  background: rgba(255, 255, 255, 0.05);
  padding: 20px;
  border-radius: 12px;
  border: 1px solid rgba(255, 255, 255, 0.1);
  margin-top: 30px;
}

.comparison-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 20px;
}

.comparison-item {
  background: rgba(255, 255, 255, 0.1);
  padding: 20px;
  border-radius: 8px;
  border: 1px solid rgba(255, 255, 255, 0.1);

  h4 {
    color: #ffd700;
    margin-bottom: 10px;
  }
}

.example-text {
  p {
    margin: 5px 0;
    padding: 8px 12px;
    background: rgba(255, 255, 255, 0.1);
    border-radius: 6px;
    font-size: 40px;
  }
}

.current-indicator {
  background: rgba(255, 215, 0, 0.2);
  padding: 2px 8px;
  border-radius: 4px;
  font-size: 30px;
  margin-left: 10px;
}

.language-detection {
  background: rgba(255, 255, 255, 0.05);
  padding: 20px;
  border-radius: 12px;
  border: 1px solid rgba(255, 255, 255, 0.1);
  margin-top: 30px;
}

.detection-info {
  p {
    margin: 5px 0;
    padding: 8px 12px;
    background: rgba(255, 255, 255, 0.1);
    border-radius: 6px;
    font-size: 40px;
  }
}

.relative-time-examples {
  background: rgba(255, 255, 255, 0.05);
  padding: 20px;
  border-radius: 12px;
  border: 1px solid rgba(255, 255, 255, 0.1);
  margin-top: 30px;
}
</style>
