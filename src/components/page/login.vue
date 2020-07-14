<template>
    <div id="login-box">
        <el-card shadow="hover">
            <div class="login-title">
                <b>用户登录</b>
            </div>
            <el-form ref="LoginForm" :model="LoginForm" :rules="rules">
                <el-form-item prop="username" label="用户名">
                    <el-input
                            v-model="LoginForm.username"
                            prefix-icon="el-icon-user"
                            placeholder="请输入用户名"
                            @keyup.enter.native="$refs['input-psd'].focus()"/>
                </el-form-item>
                <el-form-item prop="password" label="密码">
                    <el-input
                            ref="input-psd"
                            show-password
                            v-model="LoginForm.password"
                            prefix-icon="el-icon-lock"
                            placeholder="请输入密码"
                            @keyup.enter.native="login"/>
                </el-form-item>
                <el-button
                        id="btn-login"
                        type="primary"
                        icon="el-icon-user"
                        @click="login">登录</el-button>
            </el-form>
        </el-card>
    </div>
</template>

<script>
    export default {
        name: 'login',
        data() {
            return {
                LoginForm: {
                    username: '',
                    password: '',
                },
                rules: {
                    username: [{required: true, message: '请输入用户名', trigger: ['blur', 'change', 'focus']}],
                    password: [{required: true, message: '请输入密码', trigger: ['blur', 'change', 'focus']}]
                }
            }
        },
        methods: {
            login() {
                this.$refs['LoginForm'].validate(valid => {
                    if (valid)
                        this.$store.commit('login', {
                            username: this.LoginForm.username,
                            password: this.LoginForm.username
                        })
                })
            }
        }
    }
</script>

<style>
    #login-box {
        position: relative;
        left: 50%;
        transform: translate(-50%, 0);
        width: 500px;
    }

    #btn-login{
        position: relative;
        width: 30%;
        left: 50%;
        transform: translate(-50%, 0);
    }

    .login-title {
        font-size: 20px;
        text-align: center;
        margin-bottom: 15px;
    }
</style>