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
            <!-- 注意这里ref没有 : -->
            <el-form :model="loginForm" :rules="rules" ref="loginFormRef">
                <!-- 在使用了 validate、resetFields 的方法时，prop属性是必填的!!! -->
                <el-form-item prop="userName">
                    <el-input v-model="loginForm.userName" placeholder="手机号" prefix-icon="Search">
                    </el-input>
                </el-form-item>
                <el-form-item prop="passWord">
                    <el-input v-model="loginForm.passWord" type="password" placeholder="密码" prefix-icon="Lock">
                    </el-input>
                </el-form-item>
                <el-form-item v-if="showRegisterPage" prop="validCode">
                    <el-input v-model="loginForm.validCode" placeholder="验证码" prefix-icon="Lock">
                        <template #append>
                            <span @click="countdownChange">{{ countdown.text }}</span>
                        </template>
                    </el-input>
                </el-form-item>
                <el-form-item>
                    <el-button type="primary" style="width: 100%" @click="submitForm(loginFormRef)">
                        {{ showRegisterPage ? '注册' : '登录' }}
                    </el-button>
                </el-form-item>
            </el-form>
        </el-card>
    </el-row>
</template>

<script setup>
import { ref, reactive, computed, toRaw } from 'vue';
import { getCode, userAuthentication, login, menuPermissions } from '../../api';
// import { ElMessage } from 'element-plus';
import { useRouter } from 'vue-router';
import { useStore } from 'vuex';

const router = useRouter();
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
    userName: [{ validator: validatePass, trigger: 'blur' }],
    passWord: [{ validator: validatePass2, trigger: 'blur' }]
})
// 验证码
const countdown = reactive({
    count: 60,
    text: '获取验证码'
})
// 获取验证码, 注意hasSend不是常量，不能用const
let hasSend = false;
let timer = null;
const countdownChange = () => {
    // 如果已发送，不处理
    if (hasSend) return;
    // 未发送，先判断手机号是否正确
    const phoneReg = /^1[3-9]\d{9}$/;
    const passwordReg = /^[A-Za-z0-9_]{4,12}$/;
    if (!loginForm.userName || !phoneReg.test(loginForm.userName) || !loginForm.passWord || !passwordReg.test(loginForm.passWord)) {
        return ElMessage({ message: '请输入正确的手机号', type: 'error' });
    }
    // 校验成功，倒计时
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
    // 更好的写法是解构出data
    getCode({ tel: loginForm.userName }).then(data => {
        if (data.data.code === 10000) {
            ElMessage.success(data.data.msg)
        }
    })
}

// 表单提交
const loginFormRef = ref();
const store = useStore();
const routerList = computed(() => store.state.menu.routerList)
const submitForm = async (formEl) => {
    if (!formEl) return
    await formEl.validate((valid, fields) => {
        if (valid) {
            // 注册页
            if (showRegisterPage.value) {
                userAuthentication(loginForm).then(({ data }) => {
                    if (data.code === 10000) {
                        ElMessage.success('注册成功，请登录')
                        showRegisterPage.value === false
                    }
                })
            } else {
                // 登录页
                login(loginForm).then(({ data }) => {
                    // if (data.code === -1) return ElMessage.error(data.message);一般错误信息处理在封装request的时候写好
                    if (data.code === 10000) {
                        ElMessage.success('登录成功！')
                        console.log(data)
                        localStorage.setItem('pz_token', data.data.token)
                        // 将token和用户信息缓存到浏览器
                        // data.data.userInfo是一个引用类型，不能直接存到localStorage，需要JSON.stringify
                        localStorage.setItem('pz_userInfo', JSON.stringify(data.data.userInfo))
                        menuPermissions().then(({ data }) => {
                            console.log(data.data)
                            store.commit('dynamicMenu', data.data)
                            console.log(routerList, 'routerList')
                            // 用toRaw方法把routerList转变成一个非响应式的数据
                            toRaw(routerList.value).forEach(item => {
                                router.addRoute('main', item)
                                // 这里就相当于在router文件中添加了路由
                                console.log(router)
                            })
                            router.push('/')
                        })

                        router.push('/')
                    }
                })
            }

        } else {
            console.log('error submit!', fields)
        }
    })
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