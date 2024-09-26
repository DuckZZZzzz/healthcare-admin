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
            <el-form :model="loginForm" :rules="rules">
                <!-- 在使用了 validate、resetFields 的方法时，prop属性是必填的!!! -->
                <el-form-item prop="phoneNum">
                    <el-input v-model="loginForm.phoneNum" placeholder="手机号" :prefix-icon="Search">
                    </el-input>
                </el-form-item>
                <el-form-item prop="passWord">
                    <el-input v-model="loginForm.passWord" type="password" placeholder="密码" :prefix-icon="Lock">
                    </el-input>
                </el-form-item>
                <el-form-item v-if="showRegisterPage" prop="validCode">
                    <el-input v-model="loginForm.validCode" placeholder="验证码" :prefix-icon="Lock">
                        <template #append>
                            <span @click="countdownChange">{{ countdown.text }}</span>
                        </template>
                    </el-input>
                </el-form-item>
                <el-form-item>
                    <el-button type="primary" style="width: 100%" @click="submitForm">
                        {{ showRegisterPage ? '注册' : '登录' }}
                    </el-button>
                </el-form-item>
            </el-form>
        </el-card>
    </el-row>
</template>

<script setup>
import { ref, reactive } from 'vue';
import { Lock, Search } from '@element-plus/icons-vue'

const backgroundImage = '../../public/images/login-head.png';
// 默认登录页，切换到注册页面
const showRegisterPage = ref(false);
const switchToRegister = () => {
    showRegisterPage.value = !showRegisterPage.value;
};

// 表单数据
const loginForm = reactive({
    phoneNum: '',
    passWord: '',
    validCode: ''
});
// 表单校验

const validatePass = (rule, value, callback) => {
    if (value === '') {
        return callback(new Error('请输入手机号'));
    } else {
        const phoneReg = /^1[3-9]\d{9}$/;
        if (!phoneReg.test(value)) {
            return callback(new Error('请输入正确的手机号'));
        } else {
            callback();
        }
    }
};

const validatePass2 = (rule, value, callback) => {
    if (value === '') {
        return callback(new Error('请输入密码'));
    } else {
        const passwordReg = /^[A-Za-z0-9_]{4,12}$/;
        if (!passwordReg.test(value)) {
            callback(new Error('密码不符合规范, 密码组成为4-12位字母、数字、下划线'));
        } else {
            callback();
        }
    }
};
const rules = reactive({
    phoneNum: [{ validator: validatePass, trigger: 'blur' }],
    passWord: [{ validator: validatePass2, trigger: 'blur' }]
})
// 验证码
const countdown = reactive({
    count: 60,
    text: '获取验证码'
})
// 获取验证码, 
// 注意hasSend不是常量，不能用const
let hasSend = false;
let timer = null;
const countdownChange = () => {
    // 如果已发送，不处理
    if (hasSend) return;
    // 未发送，先判断手机号是否正确
    const phoneReg = /^1[3-9]\d{9}$/;
    if (!loginForm.phoneNum || !phoneReg.test(loginForm.phoneNum)) {
        return ElMessage({ message: '请输入正确的手机号', type: 'error' });
    }
    // 倒计时
    timer = setInterval(() => {
        if (countdown.count <= 0) {
            countdown.count = 60;
            countdown.text = '获取验证码';
            hasSend = false;
            // 注意一定要在对的时机清除定时器，否则会一直循环倒计时
            clearInterval(timer)
        } else {
            countdown.text = `${countdown.count--}秒后重发`;
        }
    }, 1000)
    hasSend = true;
}

// 表单提交
const submitForm = () => {

}
</script>

<style lang="less" scoped>
.login-container {
    height: 100%;

    .card-header {
        background-color: #899fe1;

        img {
            width: 430px;

        }
    }

    .jump-link {
        text-align: right;
        margin-bottom: 10px;
    }
}
</style>