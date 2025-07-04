<template>
    <div class="language-switcher">
        <!-- 当前语言显示 -->
        <div class="current-language" @click="toggleDropdown">
            <span class="flag">{{ getCurrentLanguageFlag() }}</span>
            <span class="name">{{ getCurrentLanguageName() }}</span>
            <span class="arrow" :class="{ 'arrow-up': showDropdown }">▼</span>
        </div>

        <!-- 语言选择下拉菜单 -->
        <div v-if="showDropdown" class="language-dropdown">
            <div
                v-for="locale in locales"
                :key="locale.code"
                class="language-option"
                :class="{ active: currentLocale === locale.code }"
                @click="selectLanguage(locale.code)"
            >
                <span class="flag">{{ locale.flag }}</span>
                <span class="name">{{ locale.name }}</span>
                <span v-if="isPortugueseVariant(locale.code)" class="variant-badge">
                    {{ getPortugueseVariantName(locale.code) }}
                </span>
                <span v-if="currentLocale === locale.code" class="check">✓</span>
            </div>
        </div>

        <!-- 遮罩层 -->
        <div v-if="showDropdown" class="overlay" @click="closeDropdown"></div>
    </div>
</template>

<script setup lang="ts">
import { computed, onMounted, onUnmounted, ref } from 'vue'
import { useGlobal } from '@/composables'

defineOptions({
    name: 'LanguageSwitcher',
})

const { i18n } = useGlobal()

const showDropdown = ref(false)

const currentLocale = computed(() => i18n.currentLocale.value)
const locales = computed(() => i18n.locales.value)

function toggleDropdown() {
    showDropdown.value = !showDropdown.value
}

function closeDropdown() {
    showDropdown.value = false
}

function selectLanguage(langCode: string) {
    i18n.changeLanguage(langCode)
    closeDropdown()
}

function getCurrentLanguageName(): string {
    return i18n.getCurrentLanguageName()
}

function getCurrentLanguageFlag(): string {
    return i18n.getCurrentLanguageFlag()
}

function isPortugueseVariant(code: string): boolean {
    return i18n.isPortugueseVariant(code)
}

function getPortugueseVariantName(code: string): string {
    return i18n.getPortugueseVariantName(code)
}

// 点击外部关闭下拉菜单
function handleClickOutside(event: Event) {
    const target = event.target as HTMLElement
    if (!target.closest('.language-switcher')) {
        closeDropdown()
    }
}

// 监听ESC键关闭下拉菜单
function handleKeydown(event: KeyboardEvent) {
    if (event.key === 'Escape') {
        closeDropdown()
    }
}

onMounted(() => {
    document.addEventListener('click', handleClickOutside)
    document.addEventListener('keydown', handleKeydown)
})

onUnmounted(() => {
    document.removeEventListener('click', handleClickOutside)
    document.removeEventListener('keydown', handleKeydown)
})
</script>

<style scoped lang="scss">
.language-switcher {
  position: relative;
  display: inline-block;
}

.current-language {
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 8px 12px;
  background: rgba(255, 255, 255, 0.1);
  border: 1px solid rgba(255, 255, 255, 0.2);
  border-radius: 8px;
  cursor: pointer;
  transition: all 0.3s ease;
  backdrop-filter: blur(10px);

  &:hover {
    background: rgba(255, 255, 255, 0.15);
    border-color: rgba(255, 255, 255, 0.3);
  }

  .flag {
    font-size: 50px;
  }

  .name {
    font-size: 50px;
    color: #fff;
    font-weight: 500;
  }

  .arrow {
    font-size: 50px;
    color: #fff;
    transition: transform 0.3s ease;

    &.arrow-up {
      transform: rotate(180deg);
    }
  }
}

.language-dropdown {
  position: absolute;
  top: 100%;
  left: 0;
  right: 0;
  margin-top: 4px;
  background: rgba(26, 26, 26, 0.95);
  border: 1px solid rgba(255, 255, 255, 0.2);
  border-radius: 8px;
  backdrop-filter: blur(10px);
  z-index: 1000;
  overflow: hidden;
  animation: slideDown 0.3s ease;

  .language-option {
    display: flex;
    align-items: center;
    gap: 8px;
    padding: 12px;
    cursor: pointer;
    transition: all 0.3s ease;
    position: relative;

    &:hover {
      background: rgba(255, 255, 255, 0.1);
    }

    &.active {
      background: rgba(255, 215, 0, 0.2);
      color: #ffd700;
    }

    .flag {
      font-size: 16px;
    }

    .name {
      flex: 1;
      font-size: 50px;
      color: #fff;
    }

    .check {
      font-size: 50px;
      color: #ffd700;
      font-weight: bold;
    }

    .variant-badge {
      background-color: #ffd700;
      color: #262626;
      padding: 2px 4px;
      border-radius: 4px;
      font-size: 12px;
      font-weight: bold;
    }
  }
}

.overlay {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  z-index: 999;
}

@keyframes slideDown {
  from {
    opacity: 0;
    transform: translateY(-10px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}
</style>
