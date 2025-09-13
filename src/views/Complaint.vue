<template>
    <div class="complaint_page p-[20px] text-[50px]">
        <HeaderBack :has-back-icon="true" :title="t('complaint.title')" />
        <div class="complaint_page_scroll">
            <div class="pb-[350px]">
                <!-- 邮件发送表单 -->
                <div class="complaint_form w-[1045px] mx-auto">
                    <van-form @submit="handleSubmit">
                        <!-- 标题输入框 -->
                        <van-field
                            v-model="formData.subject"
                            name="subject"
                            :label="t('complaint.form.subject')"
                            :placeholder="t('complaint.form.subjectPlaceholder')"
                            :rules="[{ required: true, message: t('complaint.form.subjectRequired') }]"
                            class="complaint_field"
                        />

                        <!-- 内容输入框 -->
                        <van-field
                            v-model="formData.body"
                            name="body"
                            type="textarea"
                            :label="t('complaint.form.content')"
                            :placeholder="t('complaint.form.contentPlaceholder')"
                            :rules="[{ required: true, message: t('complaint.form.contentRequired') }]"
                            rows="4"
                            class="complaint_field"
                        />

                        <!-- 发件人邮箱输入框 -->
                        <van-field
                            v-model="formData.shippingAddress"
                            name="shippingAddress"
                            type="email"
                            :label="t('complaint.form.senderEmail')"
                            :placeholder="t('complaint.form.senderEmailPlaceholder')"
                            :rules="[
                                { required: true, message: t('complaint.form.senderEmailRequired') },
                                { pattern: /^[^\s@]+@[^\s@]+\.[^\s@]+$/, message: t('complaint.form.emailFormat') },
                            ]"
                            class="complaint_field"
                        />

                        <!-- 发件人姓名输入框 -->
                        <van-field
                            v-model="formData.sender"
                            name="sender"
                            :label="t('complaint.form.senderName')"
                            :placeholder="t('complaint.form.senderNamePlaceholder')"
                            :rules="[{ required: true, message: t('complaint.form.senderNameRequired') }]"
                            class="complaint_field"
                        />

                        <!-- 发送按钮 -->
                        <div class="complaint_submit">
                            <van-button
                                round
                                block
                                type="primary"
                                native-type="submit"
                                :loading="loading"
                                :disabled="loading"
                                class="complaint_btn"
                            >
                                {{ loading ? t('complaint.form.sending') : t('complaint.form.send') }}
                            </van-button>
                        </div>
                    </van-form>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
import type { EmailSendParams } from '@/types'
import { userApi } from '@/api/user-api'
import { useGlobal } from '@/composables'

defineOptions({
    name: 'Complaint',
})

const { i18n } = useGlobal()
const { t } = i18n

// 表单数据
const formData = reactive<EmailSendParams>({
    subject: '',
    body: '',
    shippingAddress: '',
    sender: '',
})

// 加载状态
const loading = ref(false)

// 表单提交处理
async function handleSubmit() {
    if (loading.value)
        return

    try {
        loading.value = true

        // 调用邮件发送API
        const result = await userApi.sendEmail(formData)

        // 显示成功消息
        if (result.code === 200 || result.code === 0) {
            // 清空表单
            formData.subject = ''
            formData.body = ''
            formData.shippingAddress = ''
            formData.sender = ''

            // 显示成功提示
            showToast({
                message: t('complaint.form.sendSuccess'),
                type: 'success',
            })
        }
        else {
            // 显示错误消息
            showToast({
                message: result.message || t('complaint.form.sendFailed'),
                type: 'fail',
            })
        }
    }
    catch (error) {
        console.error('发送邮件失败:', error)
        showToast({
            message: t('complaint.form.sendFailed'),
            type: 'fail',
        })
    }
    finally {
        loading.value = false
    }
}

// 显示提示消息
function showToast(options: { message: string, type: 'success' | 'fail' }) {
    // 这里可以使用项目中已有的消息提示组件
    // 如果没有，可以使用浏览器原生 alert 作为备选
    if (typeof window !== 'undefined')
        console.log(options.message) // 使用 console.log 替代 alert
}
</script>

<style scoped lang="scss">
.complaint_page {
    height: 100vh;
    overflow-y: auto;
}

.complaint_page_scroll {
    height: calc(100vh - 300px);
    overflow-y: auto;
    font-size: 45px;
}

.complaint_form {
    margin-top: 40px;
}

// 表单项样式
:deep(.complaint_field) {
    display: block;
    width: 100%;

    .van-field__label {
        color: #ffffff;
        font-size: 40px;
        font-weight: 500;
        margin-bottom: 20px;
        display: block;
        width: 100%;
        text-align: left;
    }

    .van-field__control {
        background-color: #ffffff;
        border-radius: 8px;
        padding: 20px;
        font-size: 36px;
        color: #333333;
        border: none;
        box-sizing: border-box;
        width: 100%;

        &::placeholder {
            color: #999999;
        }
    }

    .van-field__body {
        margin-top: 15px;
        display: block;
        width: 100%;
    }

    // 多行文本框特殊样式
    &.van-field--textarea {
        .van-field__control {
            min-height: 200px;
            resize: none;
        }
    }

}

// 提交按钮容器
.complaint_submit {
    margin-top: 60px;
}

// 提交按钮样式
:deep(.complaint_btn) {
    height: 120px;
    font-size: 40px;
    font-weight: 600;
    background-color: #ffffff;
    color: #1d0f02;
    border: none;
    border-radius: 12px;
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.3);
    transition: all 0.3s ease;

    &:hover {
        background-color: #f5f5f5;
        transform: translateY(-2px);
        box-shadow: 0 6px 16px rgba(0, 0, 0, 0.4);
    }

    &:active {
        transform: translateY(0);
        box-shadow: 0 2px 8px rgba(0, 0, 0, 0.3);
    }

    &.van-button--disabled {
        background-color: #cccccc;
        color: #999999;
        cursor: not-allowed;

        &:hover {
            transform: none;
            box-shadow: 0 4px 12px rgba(0, 0, 0, 0.3);
        }
    }

    &.van-button--loading {
        background-color: #e69110;
        color: #ffffff;
    }
}

// 表单项间距
:deep(.van-cell) {
    background-color: transparent;
    border: none;
    padding: 0;
    margin-bottom: 40px;
    display: block;

    &::after {
        display: none;
    }
}

// 错误消息样式
:deep(.van-field__error-message) {
    color: #ff6b6b;
    font-size: 32px;
    margin-top: 10px;
}

// 表单验证状态样式
:deep(.van-field--error) {
    .van-field__control {
        border: 2px solid #ff6b6b;
    }
}

:deep(.van-field--success) {
    .van-field__control {
        border: 2px solid #52c41a;
    }
}
</style>
