<template>
    <el-row class="login-container" justify="center" :align="'middle'">
        <el-card style="max-width: 480px;">
            <template #header>
                <div class="card-header">
                    <img :src="backgroundImage" alt="">
                </div>
            </template>
            <div class="jump-link">
                <el-link type="primary" @click="switchToRegister">{{ showRegisterPage ? '切换到登录页' : '切换到注册页' }}</el-link>
            </div>
            <el-form :model="loginForm" label-width="120px">
                <el-form-item>
                    <el-input v-model="loginForm.userName" placeholder="手机号" :prefix-icon="Search">
                    </el-input>
                </el-form-item>
                <el-form-item>
                    <el-input v-model="loginForm.passWord" type="password" placeholder="密码" :prefix-icon="Lock">
                    </el-input>
                </el-form-item>
                <el-form-item v-if="formType" prop="validCode">
                    <el-input v-model="loginForm.validCode" placeholder="验证码" :prefix-icon="Lock">
                        <template #append>
                            <span @click="countdownChange">{{ countdown.text }}</span>
                        </template>
                    </el-input>
                </el-form-item>

            </el-form>
        </el-card>
    </el-row>
</template>

<script setup>
import { ref, reactive } from 'vue';
const backgroundImage = '../../public/images/login-head.png';

// 默认登录页，切换到注册页面
const showRegisterPage = ref(false);
const switchToRegister = () => {
    showRegisterPage.value = !showRegisterPage.value;
};

// 表单数据
const loginForm = reactive({
    userName: '',
    passWord: '',
    validCode: ''
});

// 验证码
const countdown = reactive({
    count: 60,
    text: '获取验证码'
})
// 获取验证码
const countdownChange = () => {
    setInterval(() => {
        countdown.count--,
            countdown.text = countdown.count > 0 ? `${countdown.count}秒后重发` : '获取验证码'
    }, 1000)
}
</script>

<style lang="less" scoped>
.login-container {
    height: 100%;

    .card-header {
        background-color: #899fe1;

        img {
            width: 430px;

            .jump-link {
                text-align: right;
                margin-bottom: 10px;
            }
        }
    }
}
</style>